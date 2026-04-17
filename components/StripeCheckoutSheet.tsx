import React, { useCallback, useState } from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string);

// Parse a price string like "€31", "$22", "Free", "TBA" → cents
function parsePriceToCents(price: string): number {
  if (!price) return 100;
  const cleaned = price.replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  if (isNaN(num) || num <= 0) return 100; // $1.00 placeholder
  return Math.round(num * 100);
}

interface StripeCheckoutSheetProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventVenue: string;
  price: string;
}

const StripeCheckoutSheet: React.FC<StripeCheckoutSheetProps> = ({
  isOpen,
  onClose,
  eventName,
  eventVenue,
  price,
}) => {
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName,
          eventVenue,
          priceInCents: parsePriceToCents(price),
        }),
      });

      if (!res.ok) throw new Error('Failed to create checkout session');
      const data = await res.json();
      return data.clientSecret as string;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [eventName, eventVenue, price]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 max-h-[92vh] flex flex-col">
        <div className="bg-background rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
            {/* Handle */}
            <div className="absolute left-1/2 -translate-x-1/2 top-3 w-10 h-1 bg-muted-foreground/30 rounded-full" />

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Checkout</p>
              <h2 className="text-base font-bold text-foreground leading-tight line-clamp-1">{eventName}</h2>
              <p className="text-xs text-muted-foreground line-clamp-1">{eventVenue}</p>
            </div>

            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shrink-0"
              onClick={onClose}
              aria-label="Close checkout"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="border-t border-border mx-5" />

          {/* Price summary */}
          <div className="flex items-center justify-between px-5 py-3 shrink-0">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">
              {parsePriceToCents(price) === 100 && !/\d/.test(price) ? '$1.00' : price}
            </span>
          </div>

          <div className="border-t border-border mx-5" />

          {/* Stripe Embedded Checkout */}
          <div className="overflow-y-auto flex-1 px-2 py-2">
            {error ? (
              <div className="p-6 text-center text-destructive text-sm">{error}</div>
            ) : (
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ fetchClientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StripeCheckoutSheet;
