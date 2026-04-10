/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share, ChevronLeft, Music, Play, Users, MapPin, Ticket, Info, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// --- Reusable Components (shadcn-like) ---

const SearchInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }>(
  ({ className, icon, ...props }, ref) => (
    <div className="relative flex items-center w-full">
      {icon && <div className="absolute left-4 text-muted-foreground">{icon}</div>}
      <Input
        ref={ref}
        className={cn(
          "w-full bg-muted text-foreground rounded-full py-6 text-base border-none focus-visible:ring-2 focus-visible:ring-ring",
          icon ? 'pl-12' : 'pl-6',
          className
        )}
        {...props}
      />
    </div>
  )
);
SearchInput.displayName = "SearchInput";

const FilterPill = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }>(
  ({ className, active, children, ...props }, ref) => (
    <Button
      ref={ref}
      variant={active ? "default" : "secondary"}
      className={cn(
        "rounded-full px-5 py-5 text-xs font-bold tracking-wider uppercase",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
);
FilterPill.displayName = "FilterPill";

const CategoryCard = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { title: string }>(
  ({ className, title, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative flex flex-col justify-end text-left w-[104px] h-[120px] p-3.5 rounded-2xl bg-muted text-foreground hover:bg-muted/80 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      <span className="text-[15px] font-medium leading-tight">{title}</span>
    </button>
  )
);
CategoryCard.displayName = "CategoryCard";

const CodeBlock = ({ code, language = 'tsx', title }: { code: string, language?: string, title?: string }) => (
  <div className="relative rounded-xl overflow-hidden bg-card border border-border my-4">
    <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border text-xs text-muted-foreground font-mono">
      <span>{title || language}</span>
    </div>
    <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-foreground/90 leading-relaxed [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <code>{code.trim()}</code>
    </pre>
  </div>
);

// --- Showcase Page ---

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-12 max-w-5xl mx-auto space-y-16 sm:space-y-24">
      
      {/* Header */}
      <header className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight">DICE Design System</h1>
          <div className="flex flex-wrap gap-2">
            <Link to="/login">
              <Button variant="outline" className="rounded-full font-bold">
                View Login Page
              </Button>
            </Link>
            <Link to="/events">
              <Button variant="default" className="rounded-full font-bold">
                View Events Page
              </Button>
            </Link>
          </div>
        </div>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
          Extracted visual patterns, tokens, and components inspired by the DICE mobile app interface. Built with Tailwind CSS and shadcn/ui.
        </p>
      </header>

      {/* 1. Design Tokens */}
      <section className="space-y-10 sm:space-y-12">
        <div className="space-y-3 sm:space-y-4 border-b border-border pb-4">
          <h2 className="text-xl sm:text-2xl font-bold">1. Design Tokens</h2>
          <p className="text-sm sm:text-base text-muted-foreground">The foundational elements of the visual language.</p>
        </div>

        {/* Colors */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <ColorSwatch name="Primary" color="bg-primary" hex="var(--primary)" text="text-primary-foreground" />
            <ColorSwatch name="Background" color="bg-background" hex="var(--background)" border />
            <ColorSwatch name="Card" color="bg-card" hex="var(--card)" border />
            <ColorSwatch name="Muted" color="bg-muted" hex="var(--muted)" />
            <ColorSwatch name="Border" color="bg-border" hex="var(--border)" />
            <ColorSwatch name="Muted Text" color="bg-muted-foreground" hex="var(--muted-foreground)" text="text-background" />
            <ColorSwatch name="Foreground" color="bg-foreground" hex="var(--foreground)" text="text-background" />
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Typography</h3>
          <div className="space-y-6 sm:space-y-8 bg-card p-4 sm:p-8 rounded-xl border border-border">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Display (e.g., Event Title)</div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">Palosanto On The Roof: Oktave, Temil</h1>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Heading 1 (e.g., Section Title)</div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">This week</h2>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Heading 2 (e.g., List Item Title)</div>
              <h3 className="text-base sm:text-lg font-bold leading-snug">Heavy Feather and the Magic Word</h3>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Body Primary</div>
              <p className="text-sm sm:text-base">Rooftop at Arlo Williamsburg</p>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Body Muted (e.g., Venue, Subtitle)</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Happening in the next 7 days.</p>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Accent (e.g., Date, Price)</div>
              <p className="text-xs sm:text-sm font-semibold text-primary">Thu, May 16 at 7:00 PM EDT</p>
            </div>
          </div>
        </div>

        {/* Radii & Spacing */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Border Radius</h3>
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-card border border-border rounded-md"></div>
                <span className="text-xs text-muted-foreground">md</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-card border border-border rounded-xl"></div>
                <span className="text-xs text-muted-foreground">xl</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-10 sm:w-24 sm:h-12 bg-primary rounded-full"></div>
                <span className="text-xs text-muted-foreground">full</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-12 sm:w-24 sm:h-16 bg-foreground rounded-t-3xl border-b-0 border border-border"></div>
                <span className="text-xs text-muted-foreground">t-3xl</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Icons (Lucide)</h3>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-foreground">
              <Heart className="w-6 h-6" />
              <Share className="w-6 h-6" />
              <ChevronLeft className="w-6 h-6" />
              <Music className="w-6 h-6" />
              <Play className="w-6 h-6" />
              <Users className="w-6 h-6" />
              <MapPin className="w-6 h-6" />
              <Ticket className="w-6 h-6" />
              <Search className="w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Components */}
      <section className="space-y-10 sm:space-y-12">
        <div className="space-y-3 sm:space-y-4 border-b border-border pb-4">
          <h2 className="text-xl sm:text-2xl font-bold">2. Components</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Reusable UI elements built with the design tokens.</p>
        </div>

        {/* Buttons */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Buttons</h3>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-card p-4 sm:p-8 rounded-xl border border-border">
            <Button variant="default" className="w-full sm:w-auto rounded-full font-bold px-6 py-6">BUY NOW</Button>
            <Button variant="default" className="w-full sm:w-auto rounded-full font-bold px-6 py-6">PURCHASE</Button>
            <Button variant="outline" className="rounded-full text-xs font-semibold tracking-wider w-full sm:w-auto py-6">DATE <ChevronLeft className="w-4 h-4 ml-1 rotate-[-90deg]" /></Button>
            
            {/* Icon Buttons over a simulated image background */}
            <div className="relative w-full sm:w-32 h-16 bg-gradient-to-r from-purple-900 to-black rounded-md flex items-center justify-center gap-4 sm:gap-2">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-black/50 hover:text-white"><Heart className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-black/50 hover:text-white"><Share className="w-5 h-5" /></Button>
            </div>
            <Button variant="outline" size="icon" className="rounded-full mx-auto sm:mx-0"><ChevronLeft className="w-5 h-5" /></Button>
          </div>
        </div>

        {/* Search, Filters & Categories */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Search, Filters & Categories</h3>
          <div className="bg-background border border-border py-4 sm:py-6 rounded-xl space-y-4 sm:space-y-6 max-w-2xl overflow-hidden">
            <div className="px-4 sm:px-6 space-y-4">
              <SearchInput 
                icon={<Search className="w-5 h-5" />} 
                placeholder="Search for an event, artist or venue" 
              />
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <FilterPill>DATE</FilterPill>
                <FilterPill>PRICE</FilterPill>
                <FilterPill className="gap-1.5">
                  <MapPin className="w-4 h-4" /> NEW YORK
                </FilterPill>
              </div>
            </div>
            
            {/* Categories Scrollable Row */}
            <div className="flex overflow-x-auto gap-3 px-4 sm:px-6 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <CategoryCard title="Shows" />
              <CategoryCard title="DJ" />
              <CategoryCard title="Party" />
              <CategoryCard title="Social" />
              <CategoryCard title="Comedy" />
              <CategoryCard title="Live" />
            </div>
          </div>
        </div>

        {/* Complex Components Layout */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
          
          {/* Event List Item */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">List Item (Event)</h3>
            <div className="bg-background border border-border p-3 sm:p-4 rounded-xl">
              <div className="flex gap-3 sm:gap-4 items-start">
                {/* Simulated Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-gradient-to-br from-purple-600 to-blue-900 rounded-md overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white/50">IMG</div>
                </div>
                
                {/* Details */}
                <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
                  <h4 className="text-sm sm:text-base font-bold leading-tight truncate">Heavy Feather and the Magic Word</h4>
                  <p className="text-xs sm:text-sm font-semibold text-primary">Fri, May 17</p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">Union Pool, New York</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">$18.54</p>
                </div>
                
                {/* Action */}
                <button className="shrink-0 p-1 sm:p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Sheet / Checkout */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Bottom Sheet (Checkout)</h3>
            
            {/* Simulated Mobile Viewport for Sheet */}
            <div className="relative w-full max-w-sm mx-auto h-[400px] bg-background border border-border rounded-3xl overflow-hidden flex flex-col justify-end">
              
              {/* Background content simulation */}
              <div className="absolute top-8 left-6 right-6 space-y-4 opacity-50">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-card rounded-md"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-card rounded w-3/4"></div>
                    <div className="h-3 bg-primary/20 rounded w-1/2"></div>
                  </div>
                </div>
              </div>

              {/* The Sheet */}
              <div className="bg-foreground text-background rounded-t-3xl p-6 space-y-6 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                
                {/* Handle */}
                <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-2"></div>

                <div className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-lg font-medium">Payment</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm bg-background text-foreground px-2 py-1 rounded">Pay</span>
                    <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium">Total</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">$20</span>
                    <Info className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                  <p className="text-sm text-background/70 leading-tight">
                    Get updates from Avant Gardner. Check out their <a href="#" className="text-blue-400 underline">privacy policy</a>.
                  </p>
                </div>

                <Button variant="default" className="w-full text-lg py-6 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90">PURCHASE</Button>
                
                <p className="text-xs text-center text-background/60">
                  By purchasing you'll agree to our <strong className="text-background">Terms of Use</strong> and <strong className="text-background">Purchase Terms</strong>. Our <strong className="text-background">Privacy Policy</strong> will apply.
                </p>
              </div>
            </div>
          </div>

          {/* Price Details & CTA */}
          <div className="space-y-4 sm:space-y-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Price Details & CTA</h3>
            <div className="bg-muted rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 max-w-3xl">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">€22.05</div>
                <div className="text-sm sm:text-base text-muted-foreground">The price you'll pay. No surprises later.</div>
              </div>
              <Button variant="default" className="w-full sm:w-auto shrink-0 rounded-full font-bold px-8 py-6">BUY NOW</Button>
            </div>
          </div>

          {/* Event Hero Card */}
          <div className="space-y-4 sm:space-y-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wider">Event Hero Card</h3>
            <div className="w-full max-w-md mx-auto md:mx-0 space-y-4 sm:space-y-5">
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-card border border-border">
                <img 
                  src="https://picsum.photos/seed/electronic/800/1000" 
                  alt="Event Cover" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Actions */}
                <div className="absolute bottom-4 right-4 flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 text-white hover:text-white">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80 text-white hover:text-white">
                    <Share className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="space-y-4 px-1">
                <p className="text-[17px] text-muted-foreground leading-relaxed">
                  DICE protects fans and artists from resellers. Tickets will be securely stored in the app.
                </p>
                <h4 className="text-xl font-bold text-foreground">Got a code?</h4>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Documentation */}
      <section className="space-y-10 sm:space-y-12 pt-12 border-t border-border">
        <div className="space-y-3 sm:space-y-4 border-b border-border pb-4">
          <h2 className="text-xl sm:text-2xl font-bold">3. Documentation & Code Reference</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Definitions and implementation details for all tokens and components.</p>
        </div>

        <div className="space-y-12">
          {/* Tokens Doc */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">Design Tokens</h3>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Colors</h4>
              <p className="text-sm text-muted-foreground">Defined in <code className="text-foreground bg-card px-1.5 py-0.5 rounded">src/index.css</code> using shadcn/ui CSS variables.</p>
              <CodeBlock language="css" title="index.css" code={`
@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-muted: var(--muted);
  --color-primary: var(--primary);
  --color-border: var(--border);
}
              `} />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Typography & Fonts</h4>
              <p className="text-sm text-muted-foreground">Using 'Geist Variable' font family. Hierarchy is established through Tailwind text size and weight utilities.</p>
              <CodeBlock language="tsx" title="Typography Classes" code={`
// Display (Massive titles)
<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">...</h1>

// Section Headings
<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">...</h2>

// Item Titles
<h3 className="text-base sm:text-lg font-bold leading-snug">...</h3>

// Body Text
<p className="text-sm sm:text-base">...</p>
<p className="text-xs sm:text-sm text-muted-foreground">...</p>

// Accents (Dates, Prices)
<p className="text-xs sm:text-sm font-semibold text-primary">...</p>
              `} />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Border Radius & Spacing</h4>
              <p className="text-sm text-muted-foreground">Specific radii are used to distinguish different types of containers.</p>
              <CodeBlock language="tsx" title="Radii Classes" code={`
// Images & small containers
className="rounded-md" // 6px

// Standard Cards & Inputs
className="rounded-xl" // 12px

// Category Cards & Price Details
className="rounded-2xl" // 16px

// Event Hero Cards
className="rounded-[24px]" // 24px

// Bottom Sheets
className="rounded-t-3xl" // 24px top only

// Buttons & Pills
className="rounded-full" // 9999px
              `} />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Icons</h4>
              <p className="text-sm text-muted-foreground">Using <code className="text-foreground bg-card px-1.5 py-0.5 rounded">lucide-react</code> for consistent, crisp SVG icons.</p>
              <CodeBlock language="tsx" title="Lucide Icons" code={`
import { Heart, Share, ChevronLeft, Search, MapPin, Info } from "lucide-react";

// Usage
<Heart className="w-6 h-6" />
<Share className="w-5 h-5" />
              `} />
            </div>
          </div>

          {/* Components Doc */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold tracking-tight">Core Components</h3>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Button</h4>
              <p className="text-sm text-muted-foreground">Using shadcn/ui Button with custom rounded-full styling.</p>
              <CodeBlock language="tsx" title="Usage" code={`
import { Button } from "@/components/ui/button";

<Button variant="default" className="rounded-full px-6 py-6 font-bold">BUY NOW</Button>
<Button variant="outline" className="rounded-full">DATE</Button>
<Button variant="ghost" size="icon" className="rounded-full"><Heart /></Button>
              `} />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Input (Search)</h4>
              <p className="text-sm text-muted-foreground">Search input wrapping shadcn/ui Input with a left icon slot and pill shape.</p>
              <CodeBlock language="tsx" title="SearchInput.tsx" code={`
const SearchInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }>(
  ({ className, icon, ...props }, ref) => (
    <div className="relative flex items-center w-full">
      {icon && <div className="absolute left-4 text-muted-foreground">{icon}</div>}
      <Input
        ref={ref}
        className={cn(
          "w-full bg-muted text-foreground rounded-full py-6 text-base border-none focus-visible:ring-2 focus-visible:ring-ring",
          icon ? 'pl-12' : 'pl-6',
          className
        )}
        {...props}
      />
    </div>
  )
);
              `} />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">FilterPill</h4>
              <p className="text-sm text-muted-foreground">Toggleable pill buttons for filtering lists, built on shadcn/ui Button.</p>
              <CodeBlock language="tsx" title="FilterPill.tsx" code={`
const FilterPill = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }>(
  ({ className, active, children, ...props }, ref) => (
    <Button
      ref={ref}
      variant={active ? "default" : "secondary"}
      className={cn(
        "rounded-full px-5 py-5 text-xs font-bold tracking-wider uppercase",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
);
              `} />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">CategoryCard</h4>
              <p className="text-sm text-muted-foreground">Square-ish cards used in horizontal scrollable lists for categories.</p>
              <CodeBlock language="tsx" title="CategoryCard.tsx" code={`
const CategoryCard = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { title: string }>(
  ({ className, title, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative flex flex-col justify-end text-left w-[104px] h-[120px] p-3.5 rounded-2xl bg-muted text-foreground hover:bg-muted/80 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      <span className="text-[15px] font-medium leading-tight">{title}</span>
    </button>
  )
);
              `} />
            </div>
          </div>
        </div>
      </section>
      
      <footer className="pt-12 pb-24 text-center text-sm text-muted-foreground border-t border-border">
        Design System Showcase &copy; 2026
      </footer>
    </div>
  );
}

// --- Helper Components ---

function ColorSwatch({ name, color, hex, text = "text-foreground", border = false }: { name: string, color: string, hex: string, text?: string, border?: boolean }) {
  return (
    <div className="space-y-2">
      <div className={`h-24 w-full rounded-xl ${color} ${border ? 'border border-border' : ''} flex items-end p-3 shadow-sm`}>
        <span className={`text-xs font-mono font-medium ${text}`}>{hex}</span>
      </div>
      <div className="text-sm font-medium">{name}</div>
    </div>
  );
}
