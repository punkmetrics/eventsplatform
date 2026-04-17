import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
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
  if (isNaN(num) || num <= 0) return 100;
  return Math.round(num * 100);
}

function formatDisplayPrice(price: string): string {
  const cents = parsePriceToCents(price);
  if (cents === 100 && !/\d/.test(price)) return '$1.00';
  return price;
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchClientSecret = useCallback(async () => {
    setError(null);
    setIsLoading(true);
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
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error ${res.status}`);
      }
      const data = await res.json();
      if (!data.clientSecret) throw new Error('No client secret returned');
      return data.clientSecret as string;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [eventName, eventVenue, price]);

  if (!isOpen) return null;

  // Use a portal so the sheet is mounted at document.body, above all other z-index stacking contexts
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Full-height sheet */}
      <div className="relative z-10 w-full max-w-md mx-auto h-[95vh] flex flex-col bg-background rounded-t-3xl shadow-[0_-10px_60px_rgba(0,0,0,0.6)] overflow-hidden">

        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-2 pb-4 shrink-0">
          <div className="flex-1 min-w-0 pr-3">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-0.5">Checkout</p>
            <h2 className="text-lg font-bold text-foreground leading-tight line-clamp-1">{eventName}</h2>
            <p className="text-sm text-muted-foreground line-clamp-1">{eventVenue}</p>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shrink-0 mt-1"
            onClick={onClose}
            aria-label="Close checkout"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="border-t border-border mx-5 shrink-0" />

        {/* Price summary */}
        <div className="flex items-center justify-between px-5 py-4 shrink-0">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-xl font-bold text-foreground">{formatDisplayPrice(price)}</span>
        </div>

        <div className="border-t border-border mx-5 shrink-0" />

        {/* Stripe Embedded Checkout — scrollable */}
        <div className="flex-1 overflow-y-auto">
          {error ? (
            <div className="p-6 text-center space-y-4">
              <p className="text-destructive text-sm">{error}</p>
              <Button variant="outline" onClick={onClose} className="rounded-full">Close</Button>
            </div>
          ) : (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              ) : (
                <EmbeddedCheckout />
              )}
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default StripeCheckoutSheet;
