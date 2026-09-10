#!/usr/bin/env bash
B=https://mcf.codesurmesure.ca
H='Content-Type: application/json'

VALID='{"firstName":"Test","lastName":"Deploiement","email":"test@example.com","phone":"819 272-8422","projectType":"achat","timeline":"3mois","contactMethod":"courriel","message":"Verification.","consent":true,"website":""}'
BOT='{"firstName":"Bot","lastName":"Spam","email":"bot@spam.co","phone":"8190000000","projectType":"achat","timeline":"3mois","contactMethod":"courriel","message":"x","consent":true,"website":"http://spam.example"}'
NOCONSENT='{"firstName":"Test","lastName":"X","email":"t@example.com","phone":"819 272-8422","projectType":"achat","timeline":"3mois","contactMethod":"courriel","consent":false,"website":""}'

echo "=== routes ==="
for p in / /a-propos /contact /mentions-legales /nope; do
  printf "  %-20s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' $B$p)"
done

echo
echo "=== honeypot filled (expect 200 ok:true, no field error naming 'website') ==="
curl -s -X POST $B/api/lead -H "$H" -d "$BOT" -w "  [%{http_code}]\n"

echo
echo "=== consent refused (expect 422, consent error only) ==="
curl -s -X POST $B/api/lead -H "$H" -d "$NOCONSENT" -w "  [%{http_code}]\n"

echo
echo "=== valid submit, webhook unset (expect 503 + fallback contact) ==="
curl -s -X POST $B/api/lead -H "$H" -d "$VALID" -w "  [%{http_code}]\n"

echo
echo "=== X-Forwarded-For spoof must NOT get a fresh rate-limit bucket ==="
for i in 1 2 3 4 5 6 7; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -X POST $B/api/lead \
    -H "$H" -H "X-Forwarded-For: 10.0.0.$i" -d "$VALID")
  printf "  spoofed IP 10.0.0.%s -> %s\n" "$i" "$code"
done

echo
echo "=== timeline markup reached the live build ==="
curl -s $B/ | grep -c 'data-item' | xargs -I{} echo "  data-item occurrences: {}"
curl -s $B/ | grep -c 'data-fill' | xargs -I{} echo "  data-fill occurrences: {}"
curl -s $B/ | grep -q 'data-step' && echo "  WARNING: old pinned data-step still present" || echo "  old data-step markup gone"

echo
echo "=== webhook secret must not appear in client JS ==="
curl -s $B/ | grep -oE '/_next/static/chunks/[^"]+\.js' | sort -u | while read -r j; do
  curl -s "$B$j" | grep -qi "GHL_WEBHOOK\|leadconnector" && echo "  LEAK in $j"
done
echo "  leak scan done"
