#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/var/www/mcf.codesurmesure.ca

sudo mkdir -p "$APP_DIR"
sudo chown -R ubuntu:ubuntu "$APP_DIR"

# Wipe only the app source, never the env file which lives outside APP_DIR.
sudo rm -rf "$APP_DIR"/{app,components,lib,public,.next}

# Extract as root: the archive comes from Windows tar, which records read-only
# directory modes that block a non-root extract partway through.
sudo tar -xzf /tmp/mcf-deploy.tar.gz -C "$APP_DIR" --no-same-owner --no-same-permissions 2>/dev/null
sudo chown -R ubuntu:ubuntu "$APP_DIR"
sudo chmod -R u+rwX,go+rX "$APP_DIR"
rm -f /tmp/mcf-deploy.tar.gz

cd "$APP_DIR"
echo "=== node ==="
node -v
echo "=== npm ci ==="
npm ci --no-audit --no-fund 2>&1 | tail -5
echo "=== build ==="
npm run build 2>&1 | tail -25

# The standalone server does not serve public/ or .next/static itself.
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

echo "=== standalone tree ==="
ls -1 .next/standalone
du -sh .next/standalone
