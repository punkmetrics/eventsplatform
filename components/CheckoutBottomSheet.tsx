import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CheckoutBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  price: string;
}

const CheckoutBottomSheet: React.FC<CheckoutBottomSheetProps> = ({
  isOpen,
  onClose,
  eventTitle,
  price,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className={cn(
        'fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card rounded-t-3xl shadow-2xl z-50 animate-in slide-in-from-bottom-4 duration-300',
        isOpen ? 'block' : 'hidden'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Order Summary</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {/* Event Info */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Event</p>
            <p className="text-foreground font-semibold">{eventTitle}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Price Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ticket Price</span>
              <span className="text-foreground font-semibold">{price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Service Fee</span>
              <span className="text-foreground font-semibold">€2.50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Processing Fee</span>
              <span className="text-foreground font-semibold">€1.00</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-foreground font-bold">Total</span>
            <span className="text-primary font-bold text-lg">
              {price.replace('€', '€')} + fees
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="p-4 border-t border-border space-y-2">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-background font-bold rounded-full py-6 text-base"
          >
            Proceed to Checkout
          </Button>
          <button
            onClick={onClose}
            className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutBottomSheet;
