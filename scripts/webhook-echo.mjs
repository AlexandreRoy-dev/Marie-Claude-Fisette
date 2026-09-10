/**
 * Throwaway local receiver for testing the lead route end to end.
 * Run it, point GHL_WEBHOOK_URL at http://127.0.0.1:5055/hook, submit the form,
 * and the payload that GoHighLevel would receive is printed here.
 *
 *   node scripts/webhook-echo.mjs
 */
import { createServer } from "node:http";

createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    console.log(`\n--- ${req.method} ${req.url} ---`);
    try {
      console.log(JSON.stringify(JSON.parse(body), null, 2));
    } catch {
      console.log(body);
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ received: true }));
  });
}).listen(5055, "127.0.0.1", () => console.log("echo listening on http://127.0.0.1:5055/hook"));
