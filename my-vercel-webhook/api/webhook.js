export default function handler(req, res) {
  if (req.method === 'POST') {
    // Get webhook event payload
    const event = req.body;

    // Log received event (viewable in Vercel logs)
    console.log('Webhook event received:', event);

    // Respond with status 200 to acknowledge
    return res.status(200).json({ received: true });
  } else {
    // Only POST allowed
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
