import crypto from "crypto";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const secret = "b95f667dd6325d17250693c7695d4e07"; // Hardcoded for now

  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const rawBody = Buffer.concat(buffers).toString("utf8");

  const signature = req.headers["x-signature"];
  const computed = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  if (computed !== signature) {
    console.error("Invalid signature");
    return res.status(400).end("Invalid signature");
  }

  try {
    const event = JSON.parse(rawBody);
    console.log("Webhook received:", event);
    return res.status(200).end("OK");
  } catch (err) {
    console.error("Webhook JSON parse error:", err);
    return res.status(400).end("Invalid JSON");
  }
}
