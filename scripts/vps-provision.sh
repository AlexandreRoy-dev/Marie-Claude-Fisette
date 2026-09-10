#!/usr/bin/env bash
set -euo pipefail

DOMAIN=mcf.codesurmesure.ca
APP_DIR=/var/www/$DOMAIN
PORT=3001
NODE_BIN=$(command -v node)
ENV_FILE=/etc/mcf-fisette.env

# --- secret env file -------------------------------------------------------
# Root-owned and 0600: systemd (PID 1) reads it before dropping to the ubuntu
# user, so the app gets the value but the unprivileged account cannot read it.
if [ ! -f "$ENV_FILE" ]; then
  printf '# Server-side only. Never expose to the client bundle.\nGHL_WEBHOOK_URL=\n' \
    | sudo tee "$ENV_FILE" >/dev/null
fi
sudo chown root:root "$ENV_FILE"
sudo chmod 600 "$ENV_FILE"

# --- systemd unit ----------------------------------------------------------
sudo tee /etc/systemd/system/mcf-fisette.service >/dev/null <<UNIT
[Unit]
Description=Marie-Claude Fisette - courtiere hypothecaire (Next.js standalone)
After=network.target

[Service]
Type=simple
User=ubuntu
Group=ubuntu
WorkingDirectory=$APP_DIR/.next/standalone
Environment=NODE_ENV=production
Environment=PORT=$PORT
Environment=HOSTNAME=127.0.0.1
EnvironmentFile=$ENV_FILE
ExecStart=$NODE_BIN server.js
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal
SyslogIdentifier=mcf-fisette

NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$APP_DIR

[Install]
WantedBy=multi-user.target
UNIT

sudo systemctl daemon-reload
sudo systemctl enable --now mcf-fisette
sleep 4
sudo systemctl is-active mcf-fisette
echo "=== local smoke test ==="
curl -s -o /dev/null -w "port $PORT -> %{http_code}\n" "http://127.0.0.1:$PORT/"

# --- nginx -----------------------------------------------------------------
sudo tee /etc/nginx/sites-available/$DOMAIN >/dev/null <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;

    # Next.js emits immutable hashed filenames here; let the browser keep them.
    location /_next/static/ {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_set_header Host \$host;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        # Replace rather than append. \$proxy_add_x_forwarded_for would keep a
        # client-supplied X-Forwarded-For, and the rate limiter reads the first
        # entry, so a bot could rotate that header to bypass the limit.
        proxy_set_header X-Forwarded-For \$remote_addr;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
        client_max_body_size 2m;
    }
}
NGINX

sudo ln -sfn /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN
sudo nginx -t
sudo systemctl reload nginx
echo "=== http (pre-TLS) ==="
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: $DOMAIN" http://127.0.0.1/
