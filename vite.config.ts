import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

// Vite plugin that registers Express-style API routes inside the Vite dev server,
// so no separate process is needed.
function apiPlugin(env: Record<string, string>) {
  return {
    name: 'api-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/stripe/create-checkout-session', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', async () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString());
            const { eventName, eventVenue, priceInCents } = body;
            const amount = priceInCents && priceInCents > 0 ? priceInCents : 100;

            // Dynamically import Stripe to avoid bundling issues
            const Stripe = (await import('stripe')).default;
            const stripe = new Stripe(env.STRIPE_SECRET_KEY);

            const session = await stripe.checkout.sessions.create({
              ui_mode: 'embedded',
              redirect_on_completion: 'never',
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: eventName || 'Event Ticket',
                      description: eventVenue ? `@ ${eventVenue}` : 'Barcelona',
                    },
                    unit_amount: amount,
                  },
                  quantity: 1,
                },
              ],
              mode: 'payment',
            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ clientSecret: session.client_secret }));
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
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), apiPlugin(env)],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.STRIPE_PUBLISHABLE_KEY': JSON.stringify(env.STRIPE_PUBLISHABLE_KEY),
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
