import React, { useState } from 'react';
import { Heart, Search, Menu, Share2, MapPin, Calendar, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const EventDetailsPage: React.FC = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock event data
  const event = {
    id: '2',
    title: 'Novah',
    artist: 'NITSA en Apollo',
    date: 'Fri, May 29',
    time: '11:59 PM',
    venue: 'Apollo',
    location: 'Barcelona',
    category: 'DJ',
    price: '€31',
    image: 'https://picsum.photos/seed/novah2026/800/1000',
    description:
      'NITSA: Novah - Experience an unforgettable night with cutting-edge sound and immersive visuals.',
    ageRestriction: 'This is an 18+ event',
    priceDescription: "The price you'll pay. No surprises later.",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between pt-6 pb-4 px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="106" height="38" fill="none" viewBox="0 0 106 38" className="h-8 w-auto">
              <g clipPath="url(#dice-lockup_svg__a)">
                <path fill="currentColor" d="M45.978 27.735h-1.02c-.127 0-.23-.1-.23-.224V10.96c0-.124.103-.225.23-.225h1.06c2.604 0 3.603.791 3.603 8.392 0 7.714-.924 8.608-3.643 8.608m8.97-21.126c-1.187-1.454-3.117-2.939-8.434-2.939h-9.306a.57.57 0 0 0-.572.562V34.67c0 .31.256.562.572.562h9.181c4.39 0 6.994-1.026 8.706-3.43 1.755-2.466 2.538-6.488 2.538-13.041 0-6.131-.828-9.88-2.685-12.152m43.254 16.095h6.939a.57.57 0 0 0 .573-.562v-5.756a.57.57 0 0 0-.573-.562h-6.94c-.126 0-.228-.101-.228-.225V10.96c0-.124.102-.225.229-.225h7.225a.567.567 0 0 0 .573-.561V4.232a.567.567 0 0 0-.573-.562H90.452a.567.567 0 0 0-.573.562V34.67c0 .31.257.562.573.562h14.975a.567.567 0 0 0 .573-.562v-6.372a.567.567 0 0 0-.573-.562h-7.225c-.127 0-.23-.1-.23-.225V22.93c0-.124.103-.224.23-.224M66.282 3.67H59.32a.564.564 0 0 0-.566.566v30.485c0 .28.235.51.52.51h7.053c.286 0 .52-.23.52-.51V4.236a.564.564 0 0 0-.565-.566m22.592 20.593c0-1.104-.17-2.505-1.469-2.505h-5.684c-.772.001-.756.495-.744.675.025.232.07.712.07 1.118 0 3.935-1.202 4.44-2.25 4.44-1.247 0-2.662 0-2.662-8.946 0-8.003 1.07-8.621 2.58-8.621 1.23 0 2.248.319 2.248 4.235 0 .446-.022 1.15-.034 1.477 0 .174-.02.681.758.681h5.642c1.106 0 1.394-1.057 1.454-2.016.01-.277.49-5.938-2.252-8.89-1.637-1.762-4.145-2.647-7.733-2.647-7.794 0-10.83 4.435-10.83 15.821 0 6.177.824 10.267 2.593 12.874 1.704 2.51 4.295 3.678 8.154 3.678 3.383 0 5.952-.979 7.637-2.909 1.659-1.901 2.485-4.676 2.527-8.468z"></path>
                <path fill="#fff" d="M25.241 31.107c-1.027-.398-1.579-.978-1.597-1.677-.005-.218-.053-5.376-.042-7.751.003-.816.016-1.507.026-1.944.01-.42.14-.827.376-1.177.71-1.052 2.488-3.663 3.654-5.185.34-.444.47-.875.399-1.317-.142-.875-1.037-1.503-1.075-1.529-.523-.37-12.846-9.066-14.144-10.068C12.444.154 12.06 0 11.702 0c-.618 0-1.031.44-1.035.445l-.019.021C10.544.58 8.075 3.28 6.902 5.291 6.178 6.532 5.795 6.826 5.424 7.11c-.265.203-.516.394-.954 1.036-.962 1.408-2.692 4.287-3.837 6.192l-.345.574c-.358.596-.383 1.162-.072 1.684.24.404.612.625.616.628l.025.014 4.795 3.752.01.186c.265 5.33.159 9.059.022 11.248l-.058.989s-.196 2.116.139 2.764c.376.719 1.122 1.027 1.634 1.157.69.174 2.75.543 4.609.646q.326.02.61.02c.812 0 1.353-.129 1.714-.402.434-.326.567-.827.633-1.479.234-2.294-2.172-3.28-2.199-3.291-.141-.05-1.396-.533-1.88-1.856-.45-1.232-.584-5.817-.597-6.336a.31.31 0 0 1 .153-.278c.1-.058.219-.059.319 0l.151.087c.036.021 3.597 2.088 4.982 2.898.302.177.587.267.845.267.462 0 .724-.295.756-.333l1.038-1.373a.31.31 0 0 1 .349-.11.3.3 0 0 1 .216.29c.035 2.225.097 6.235.112 8.11.01 1.184 1.239 1.532 1.379 1.568l.006.002c.16.029 3.968.72 5.24.72q.17.005.318.005c1.764 0 2.389-.509 2.389-1.945 0-1.878-2.068-2.96-3.301-3.437"></path>
              </g>
              <defs>
                <clipPath id="dice-lockup_svg__a">
                  <path fill="#fff" d="M0 0h106v38H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="icon" className="rounded-full">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto pb-32 px-4">
          {/* Featured Image with Badge and Action Buttons */}
          <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden bg-card mb-6">
            {/* Background Image */}
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />

            {/* Action Buttons - Bottom Right */}
            <div className="absolute bottom-4 right-4 flex gap-3">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                  isFavorited
                    ? 'bg-primary text-background'
                    : 'bg-background/90 text-foreground'
                )}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFavorited ? 'currentColor' : 'none'}
                />
              </button>
              <button className="w-12 h-12 rounded-full bg-background/90 text-foreground flex items-center justify-center hover:bg-background/95 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Event Info Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">{event.title}</h1>
            <p className="text-muted-foreground mb-4">{event.artist}</p>

            {/* Date/Time */}
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold">
                {event.date}, {event.time}
              </span>
            </div>

            {/* Category and Location */}
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <Music className="w-4 h-4" />
                <span>{event.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          {/* Got a code? Section */}
          <div className="mb-6 pb-4 border-b border-border">
            <h2 className="text-lg font-bold text-foreground mb-2">Got a code?</h2>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground mb-3">About</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              {event.description}
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Music className="w-3 h-3" />
              <span>{event.ageRestriction}</span>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Sheet - Price & CTA */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-t from-background via-background to-background/80 border-t border-border px-4 py-4">
          <div className="mb-3">
            <p className="text-primary font-bold text-2xl">{event.price}</p>
            <p className="text-muted-foreground text-xs">{event.priceDescription}</p>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-background font-bold rounded-full py-6 text-lg">
            BUY NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
