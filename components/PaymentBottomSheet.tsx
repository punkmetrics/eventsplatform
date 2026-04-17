import React, { useState } from 'react';
import { ChevronLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StripeCheckoutSheet from '@/components/StripeCheckoutSheet';

interface PaymentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  price: string;
  eventName?: string;
  eventVenue?: string;
}

const PaymentBottomSheet: React.FC<PaymentBottomSheetProps> = ({
  isOpen,
  onClose,
  price,
  eventName = 'Event Ticket',
  eventVenue = 'Barcelona',
}) => {
  const [isStripeOpen, setIsStripeOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet Modal */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
        <div className="bg-foreground text-background rounded-t-3xl p-6 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          {/* Handle */}
          <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-2"></div>

          {/* Payment Header */}
          <div className="flex justify-between items-center border-b border-border pb-4">
            <span className="text-lg font-medium">Payment</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm bg-background text-foreground px-2 py-1 rounded">Pay</span>
              <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-xl font-medium">Total</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{price}</span>
              <Info className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <p className="text-sm text-background/70 leading-tight">
              Get updates from DICE Events. Check out their{' '}
              <a href="#" className="text-blue-400 underline">
                privacy policy
              </a>
              .
            </p>
          </div>

          {/* Purchase Button */}
          <Button
            onClick={() => setIsStripeOpen(true)}
            className="w-full text-lg py-6 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            PURCHASE
          </Button>

          {/* Terms Footer */}
          <p className="text-xs text-center text-background/60">
            By purchasing you&apos;ll agree to our <strong className="text-background">Terms of Use</strong> and{' '}
            <strong className="text-background">Purchase Terms</strong>. Our <strong className="text-background">Privacy Policy</strong> will
            apply.
          </p>
        </div>
      </div>

      {/* Stripe Embedded Checkout */}
      <StripeCheckoutSheet
        isOpen={isStripeOpen}
        onClose={() => setIsStripeOpen(false)}
        eventName={eventName}
        eventVenue={eventVenue}
        price={price}
      />
    </>
  );
};

export default PaymentBottomSheet;
