# Vercel Webhook Handler

This is a simple webhook handler for receiving POST requests from Tebex.

## Deployment

1. Sign up for Vercel and connect this repository.
2. Deploy the project.
3. Use the deployed path `/api/webhook` as your Tebex webhook endpoint URL.

## Notes

- Only POST requests are allowed.
- Responds with 200 OK for successful webhook receipt.
