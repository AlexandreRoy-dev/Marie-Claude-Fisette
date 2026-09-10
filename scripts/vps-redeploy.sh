#!/usr/bin/env bash
set -euo pipefail

DOMAIN=mcf.codesurmesure.ca
APP_DIR=/var/www/$DOMAIN
SITE=/etc/nginx/sites-available/$DOMAIN

# --- patch nginx in place ---------------------------------------------------
# certbot rewrote this file to add the TLS server block, so patch rather than
# regenerate. $proxy_add_x_forwarded_for preserves a client-supplied
# X-Forwarded-For; the rate limiter trusts the first entry, so a bot could
# rotate that header to get past it. This is the edge proxy, so replace it.
if grep -q 'proxy_add_x_forwarded_for' "$SITE"; then
  sudo sed -i 's/\$proxy_add_x_forwarded_for/$remote_addr/g' "$SITE"
  echo "nginx: X-Forwarded-For now set from \$remote_addr"
else
  echo "nginx: already patched"
fi
sudo nginx -t 2>&1 | tail -2
sudo systemctl reload nginx

# --- rebuild ----------------------------------------------------------------
sudo rm -rf "$APP_DIR"/{app,components,lib,public,.next}
sudo tar -xzf /tmp/mcf-deploy.tar.gz -C "$APP_DIR" --no-same-owner --no-same-permissions 2>/dev/null
sudo chown -R ubuntu:ubuntu "$APP_DIR"
sudo chmod -R u+rwX,go+rX "$APP_DIR"
rm -f /tmp/mcf-deploy.tar.gz

cd "$APP_DIR"
npm ci --no-audit --no-fund 2>&1 | tail -3
npm run build 2>&1 | tail -16
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

sudo systemctl restart mcf-fisette
sleep 4
echo "service: $(systemctl is-active mcf-fisette)"
