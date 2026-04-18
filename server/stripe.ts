import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { eventName, eventVenue, priceInCents } = req.body as {
      eventName: string;
      eventVenue: string;
      priceInCents: number;
    };

    // Use $1.00 as placeholder if price is missing or zero
    const amount = priceInCents && priceInCents > 0 ? priceInCents : 100;

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

    res.json({ clientSecret: session.client_secret });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
