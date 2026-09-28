import React from 'react';
import { CRAFT_IMAGE } from '../data/products';

export const AtelierStory: React.FC = () => {
  return (
    <section id="atelier-story" className="bg-[#F4F1EA] border-y border-[#EAE5D9] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#8A8175] font-medium mb-2">
            The Atelier Manifesto
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#191817] leading-tight">
            An antidote to the ephemeral: <br />
            <span className="italic font-normal">clothing made for quiet permanence.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A554D] leading-relaxed font-light">
            Founded on the conviction that a wardrobe should be an intentional architecture rather than a seasonal cycle, 
            memosi develops garments slowly with heritage European and Asian textile mills.
          </p>
        </div>

        {/* Media & 3 Editorial Chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Macro Textile Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-xs bg-[#EAE5D9] shadow-sm">
              <img
                src={CRAFT_IMAGE}
                alt="Close-up macro detail of unbleached organic linen and brushed cashmere fibers with hand-finished horn buttons"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#8A8175] uppercase tracking-wider">
              <span>Textile Archive Ref. 042/C</span>
              <span>Como, Italy</span>
            </div>
          </div>

          {/* 3 Editorial Chapters */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="border-l-2 border-[#191817] pl-5 sm:pl-6 space-y-1.5">
              <span className="text-xs uppercase tracking-widest text-[#8A8175] font-semibold">
                01. Material Integrity
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-medium text-[#191817]">
                Uncompromising Natural Provenance
              </h3>
              <p className="text-sm text-[#5A554D] leading-relaxed font-light">
                We refuse synthetic fillers and microplastics. Every sweater is spun from 100% certified Mongolian cashmere, 
                our suiting originates from certified Biella wool mills, and our linen is grown exclusively in Flanders.
              </p>
            </div>

            <div className="border-l-2 border-[#DCD4C3] hover:border-[#191817] pl-5 sm:pl-6 space-y-1.5 transition-colors">
              <span className="text-xs uppercase tracking-widest text-[#8A8175] font-semibold">
                02. Slow Patternmaking
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-medium text-[#191817]">
                Architectural Drape & Proportions
              </h3>
              <p className="text-sm text-[#5A554D] leading-relaxed font-light">
                Each silhouette undergoes up to seven fit revisions. Sleeves are cut with subtle articulation, shoulders 
                feature natural hand-molded padding, and trousers are tailored with generous hem insets for lifelong adjustment.
              </p>
            </div>

            <div className="border-l-2 border-[#DCD4C3] hover:border-[#191817] pl-5 sm:pl-6 space-y-1.5 transition-colors">
              <span className="text-xs uppercase tracking-widest text-[#8A8175] font-semibold">
                03. The Lifetime Care Guarantee
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-medium text-[#191817]">
                Enduring Responsibility
              </h3>
              <p className="text-sm text-[#5A554D] leading-relaxed font-light">
                Every memosi garment includes replacement horn buttons and matching yarn cards. We provide complimentary 
                repairs on seams and hems through our studio concierge for the garment's lifetime.
              </p>
            </div>

          </div>

        </div>

        {/* Editorial Pull Quote */}
        <div className="mt-16 pt-12 border-t border-[#EAE5D9] text-center max-w-2xl mx-auto">
          <blockquote className="text-xl sm:text-2xl font-serif italic text-[#191817] leading-relaxed">
            "True luxury does not clamor for attention; it breathes through the calm weight of the fabric and the precision of the line."
          </blockquote>
          <cite className="block mt-3 text-xs uppercase tracking-widest text-[#8A8175] font-medium not-italic">
            Elena Rossi · Head of Pattern Architecture, memosi
          </cite>
        </div>

      </div>
    </section>
  );
};
