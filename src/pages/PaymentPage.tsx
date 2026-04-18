import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string);

// ---------- Inner checkout form ----------
function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message ?? 'Payment failed. Please try again.');
      setIsSubmitting(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: 'tabs',
          wallets: { applePay: 'auto', googlePay: 'auto' },
        }}
      />

      {errorMessage && (
        <p className="text-sm text-destructive text-center">{errorMessage}</p>
      )}

      <Button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="w-full py-6 rounded-full font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {isSubmitting ? 'Processing…' : 'Pay Now'}
      </Button>

      <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Secured by Stripe</span>
      </div>
    </form>
  );
}

// ---------- Page ----------
export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const eventName = searchParams.get('name') || 'Event Ticket';
  const eventVenue = searchParams.get('venue') || 'Barcelona';
  const priceParam = searchParams.get('price') || '';

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

  // Parse price string (e.g. "€31", "$22", "Free") → cents
  function parsePriceToCents(price: string): number {
    const cleaned = price.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) || num <= 0 ? 100 : Math.round(num * 100);
  }

  const displayPrice = (() => {
    const cents = parsePriceToCents(priceParam);
    if (cents === 100 && !/\d/.test(priceParam)) return '$1.00';
    return priceParam || '$1.00';
  })();

  useEffect(() => {
    const createIntent = async () => {
      try {
        const res = await fetch('/api/stripe/payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName,
            eventVenue,
            priceInCents: parsePriceToCents(priceParam),
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.clientSecret) {
          throw new Error(data.error || 'Failed to initialise payment');
        }
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        setError(err.message);
      }
    };

    createIntent();
  }, []);  // intentionally run once on mount

  if (paid) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6">
        <ShieldCheck className="w-16 h-16 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Payment confirmed!</h1>
        <p className="text-muted-foreground text-center">
          Your ticket for <strong>{eventName}</strong> has been booked.
        </p>
        <Button className="rounded-full px-8" onClick={() => navigate('/events')}>
          Back to Events
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto flex flex-col min-h-screen">

        {/* Header */}
        <header className="flex items-center gap-3 px-4 pt-6 pb-4 shrink-0">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-foreground leading-tight line-clamp-1">
              {eventName}
            </h1>
            <p className="text-xs text-muted-foreground line-clamp-1">{eventVenue}</p>
          </div>
        </header>

        <div className="border-t border-border mx-4" />

        {/* Order summary */}
        <div className="flex items-center justify-between px-4 py-4 shrink-0">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-2xl font-bold text-foreground">{displayPrice}</span>
        </div>

        <div className="border-t border-border mx-4 mb-6" />

        {/* Payment form area */}
        <div className="flex-1 px-4 pb-10">
          {error ? (
            <div className="space-y-4 text-center pt-8">
              <p className="text-destructive text-sm">{error}</p>
              <Button variant="outline" className="rounded-full" onClick={() => navigate(-1)}>
                Go back
              </Button>
            </div>
          ) : !clientSecret ? (
            <div className="flex justify-center pt-16">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#a855f7',
                    colorBackground: '#0a0a0a',
                    colorText: '#ffffff',
                    colorTextSecondary: '#a1a1aa',
                    borderRadius: '12px',
                    fontFamily: 'inherit',
                  },
                },
              }}
            >
              <CheckoutForm onSuccess={() => setPaid(true)} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
}
