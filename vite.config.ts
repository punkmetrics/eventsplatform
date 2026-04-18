import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createRequire } from 'module';
import {defineConfig, loadEnv} from 'vite';

const require = createRequire(import.meta.url);

// Vite plugin that registers Express-style API routes inside the Vite dev server,
// so no separate process is needed.
function apiPlugin(secretKey: string) {
  return {
    name: 'api-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/stripe/payment-intent', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', async () => {
          try {
            if (!secretKey) throw new Error('STRIPE_SECRET_KEY is not set in environment');

            const body = JSON.parse(Buffer.concat(chunks).toString());
            const { eventName, eventVenue, priceInCents } = body;
            const amount = priceInCents && priceInCents > 0 ? priceInCents : 100;

            const Stripe = require('stripe');
            const stripe = new Stripe(secretKey);

            const paymentIntent = await stripe.paymentIntents.create({
              amount,
              currency: 'usd',
              automatic_payment_methods: { enabled: true },
              description: `${eventName || 'Event Ticket'} @ ${eventVenue || 'Barcelona'}`,
            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ clientSecret: paymentIntent.client_secret }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, path.resolve(__dirname), '');
  const secretKey = env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY || '';
  return {
    plugins: [react(), tailwindcss(), apiPlugin(secretKey)],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY),
      'process.env.STRIPE_PUBLISHABLE_KEY': JSON.stringify(env.STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
