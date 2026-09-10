#!/usr/bin/env bash
B=https://mcf.codesurmesure.ca

echo "=== images (old two should be 404, office should be 200) ==="
for f in marie-claude-fisette.webp marie-claude-fisette-hero.webp marie-claude-fisette-office.webp; do
  printf "  %-36s %s\n" "$f" "$(curl -s -o /dev/null -w '%{http_code}' $B/img/$f)"
done

echo
echo "=== routes ==="
for p in / /a-propos /contact /mentions-legales /nope; do
  printf "  %-20s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' $B$p)"
done

echo
echo "=== em dashes in rendered HTML ==="
for p in / /a-propos /contact /mentions-legales; do
  printf "  %-20s %s\n" "$p" "$(curl -s $B$p | grep -o $'\u2014' | wc -l)"
done

echo
echo "=== lead route still behaving (expect 503, webhook unset) ==="
curl -s -X POST $B/api/lead -H 'Content-Type: application/json' \
  -d '{"firstName":"Test","lastName":"D","email":"t@example.com","phone":"819 272-8422","projectType":"achat","timeline":"3mois","contactMethod":"courriel","consent":true,"website":""}' \
  -w "  [%{http_code}]\n"
