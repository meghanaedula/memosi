import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onStoryClick }) => {
  return (
    <section className="relative bg-[#F4F1EA] border-b border-[#EAE5D9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8A8175] font-medium">
              <span>Collection 03</span>
              <span aria-hidden="true">·</span>
              <span>Autumn / Winter</span>
              <span aria-hidden="true">·</span>
              <span>Pure Fibers</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#191817] leading-[1.08] tracking-tight">
              Subtle Silhouettes, <br />
              <span className="italic font-normal">Uncompromising Craft.</span>
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-[#5A554D] max-w-xl leading-relaxed font-light">
              Architectural tailoring cut from Italian virgin wool, fluid mulberry silk, 
              and organic Mongolian cashmere. Designed for tactile permanence in a calm, 
              nuanced palette of sand, ecru, and charcoal.
            </p>

            {/* Action Buttons & Value Props */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 bg-[#191817] text-[#FAF9F5] hover:bg-[#322E2B] px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all rounded-sm shadow-xs group"
              >
                <span>Explore The Wardrobe</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onStoryClick}
                className="inline-flex items-center justify-center gap-2 border border-[#C4B89F] hover:border-[#191817] text-[#191817] px-7 py-4 text-xs uppercase tracking-widest font-medium transition-all rounded-sm hover:bg-[#FAF9F5]/70"
              >
                <span>The Atelier Manifesto</span>
              </button>
            </div>

            {/* Quiet Craft Highlights (Unboxed with typographic separators) */}
            <div className="pt-6 sm:pt-8 border-t border-[#EAE5D9]/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#8A8175]">Origins</p>
                <p className="text-sm font-serif font-medium text-[#191817] mt-0.5">Biella & Como</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#8A8175]">Materials</p>
                <p className="text-sm font-serif font-medium text-[#191817] mt-0.5">100% Traceable</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#8A8175]">Philosophy</p>
                <p className="text-sm font-serif font-medium text-[#191817] mt-0.5">Limited Editions</p>
              </div>
            </div>

          </div>

          {/* Right Column: Campaign Media Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden rounded-xs bg-[#EAE5D9] shadow-sm">
              <img
                src={HERO_IMAGE}
                alt="memosi Campaign Autumn/Winter Editorial tailored trench and silk trousers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              {/* Subtle luxury caption plate */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#FAF9F5]/90 backdrop-blur-md p-3 sm:p-4 border border-[#EAE5D9]/80 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8A8175]">Campaign Look 01</p>
                  <p className="text-xs sm:text-sm font-serif font-medium text-[#191817]">The Double-Breasted Trench in Dune</p>
                </div>
                <button
                  onClick={onExploreClick}
                  className="text-xs uppercase tracking-widest underline underline-offset-4 font-medium text-[#191817] hover:opacity-75"
                >
                  Shop Look
                </button>
              </div>
            </div>

            {/* Subtle decorative framing hairline */}
            <div className="hidden sm:block absolute -bottom-3 -right-3 w-full h-full border border-[#DCD4C3] -z-0 pointer-events-none rounded-xs" />
          </div>

        </div>
      </div>
    </section>
  );
};
