import React, { useState } from 'react';
import { Heart, Search, MapPin, Menu, Music, Disc, Users, Laugh, Mic, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/SearchInput';
import { FilterPill } from '@/components/FilterPill';
import { CategoryCard } from '@/components/CategoryCard';
import { cn } from '@/lib/utils';

// --- Mock Data ---

const FILTERS = ['DATE', 'PRICE', 'NEARBY'];

const CATEGORIES = [
  { id: 'gigs', title: 'Gigs', icon: <Music className="w-5 h-5" /> },
  { id: 'party', title: 'Party', icon: <Disc className="w-5 h-5" /> },
  { id: 'dj', title: 'DJ', icon: <Zap className="w-5 h-5" /> },
  { id: 'social', title: 'Social', icon: <Users className="w-5 h-5" /> },
  { id: 'comedy', title: 'Comedy', icon: <Laugh className="w-5 h-5" /> },
  { id: 'live', title: 'Live', icon: <Mic className="w-5 h-5" /> },
];

const HERO_EVENT = {
  id: 'hero',
  title: 'Palosanto On The Roof: Oktave, Temil & Guests',
  date: 'Sat, Apr 19',
  venue: 'Rooftop at Arlo Williamsburg',
  price: '$22',
  image: 'https://picsum.photos/seed/rooftop2026/800/1000',
  tag: 'Featured',
};

const EVENTS = [
  {
    id: '1',
    title: 'L0RNA · SUDOR XL',
    date: 'Thu, Apr 23',
    venue: 'Sala Salamandra',
    price: 'Free',
    image: 'https://picsum.photos/seed/lorna2026/160/160',
  },
  {
    id: '2',
    title: 'Novah',
    date: 'Fri, May 29',
    venue: 'Sala Apolo',
    price: '€31',
    image: 'https://picsum.photos/seed/novah2026/160/160',
  },
  {
    id: '3',
    title: 'Ben Klock / Oval: Sega Bodega',
    date: 'Fri, Jun 10',
    venue: 'Nitsa Club',
    price: '€18',
    image: 'https://picsum.photos/seed/benklock2026/160/160',
  },
  {
    id: '4',
    title: 'Heavy Feather and the Magic Word',
    date: 'Sat, Jun 14',
    venue: 'Union Pool, New York',
    price: '$18.54',
    image: 'https://picsum.photos/seed/heavyfeather2026/160/160',
  },
  {
    id: '5',
    title: 'Floating Points',
    date: 'Wed, Jul 2',
    venue: 'Barbican Centre',
    price: '£25',
    image: 'https://picsum.photos/seed/floatingpoints2026/160/160',
  },
];

// --- Sub-components ---

function EventListItem({
  event,
}: {
  event: (typeof EVENTS)[0];
}) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="flex gap-4 items-start py-4 border-b border-border last:border-none">
      {/* Thumbnail */}
      <div className="w-[72px] h-[72px] shrink-0 rounded-lg overflow-hidden bg-muted">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <h3 className="text-sm font-bold leading-snug line-clamp-2 text-foreground">
          {event.title}
        </h3>
        <p className="text-xs font-semibold text-primary">{event.date}</p>
        <p className="text-xs text-muted-foreground truncate">{event.venue}</p>
        <p className="text-xs text-muted-foreground">{event.price}</p>
      </div>

      {/* Favorite */}
      <button
        onClick={() => setFavorited((f) => !f)}
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        className="shrink-0 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Heart
          className={cn('w-5 h-5', favorited && 'fill-primary text-primary')}
        />
      </button>
    </div>
  );
}

function EventHeroCard({ event }: { event: typeof HERO_EVENT }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="w-full space-y-4">
      {/* Image */}
      <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-card">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
            {event.tag}
          </span>
        </div>

        {/* Floating action */}
        <div className="absolute bottom-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFavorited((f) => !f)}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 text-white hover:text-white"
          >
            <Heart
              className={cn('w-5 h-5', favorited && 'fill-white')}
            />
          </Button>
        </div>

        {/* Bottom text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 pb-6">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">
            {event.date} &middot; {event.venue}
          </p>
          <h2 className="text-xl font-extrabold text-white leading-snug text-balance">
            {event.title}
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <Button
              variant="default"
              className="rounded-full px-6 py-5 text-sm font-bold bg-primary hover:bg-primary/90"
            >
              BUY {event.price}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Page ---

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto px-4 pb-12">

        {/* Header */}
        <header className="flex items-center justify-between pt-6 pb-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/dice-logo.png"
              alt="DICE Events"
              className="h-8 w-auto"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full w-10 h-10"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full w-10 h-10"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Search */}
        <div className="pt-2 pb-4">
          <SearchInput
            icon={<Search className="w-5 h-5" />}
            placeholder="Search events, artists or venues"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-4">
          {FILTERS.map((filter) => (
            <FilterPill
              key={filter}
              active={activeFilter === filter}
              onClick={() =>
                setActiveFilter((prev) => (prev === filter ? null : filter))
              }
            >
              {filter === 'NEARBY' ? (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {filter}
                </span>
              ) : (
                filter
              )}
            </FilterPill>
          ))}
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto gap-3 pb-6 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.title}
              icon={cat.icon}
              className={cn(
                activeCategory === cat.id && 'bg-secondary border border-primary/40'
              )}
              onClick={() =>
                setActiveCategory((prev) => (prev === cat.id ? null : cat.id))
              }
            />
          ))}
        </div>

        {/* Hero Event Banner */}
        <section aria-label="Featured event">
          <EventHeroCard event={HERO_EVENT} />
        </section>

        {/* Events List */}
        <section className="mt-8" aria-label="Popular events">
          <h2 className="text-2xl font-bold tracking-tight mb-1">
            Popular Events{' '}
            <span className="text-muted-foreground font-normal">in Your City</span>
          </h2>

          <div className="mt-4">
            {EVENTS.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
