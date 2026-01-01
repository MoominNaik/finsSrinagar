
import React from 'react';

const MarketingSection = () => {
    return (
        <div className="w-full max-w-4xl mx-auto mt-16 px-6 text-center">

            {/* Catchy Headline with Shine Effect */}
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-fins-gold via-white to-fins-gold animate-shimmer bg-[length:200%_auto]">
                Golden. Crispy. Unforgettable.
            </h3>

            {/* Separator Line */}
            <div className="w-24 h-1 bg-fins-gold/30 mx-auto my-8 rounded-full" />

            {/* About Copy */}
            <p className="text-lg md:text-xl text-potato/90 font-light leading-relaxed max-w-2xl mx-auto">
                We believe in the simple art of perfection.
                <span className="text-fins-gold font-medium"> Wild-caught freshness</span> met with our
                <span className="text-fins-gold font-medium"> secret golden batter</span>.
                It’s not just fish and chips; it’s a tribute to flavor, texture, and tradition.
            </p>
            {/* Separator Line */}
            <div className="w-24 h-1 bg-fins-gold/30 mx-auto my-8 rounded-full" />
            {/* Call to Action Phrase */}
            <p className="mt-8 text-sm md:text-base uppercase tracking-[0.3em] text-fins-gold/60">
                Taste the Crunch
                <br />
                Savor the Flake
            </p>
        </div>
    );
};

export default MarketingSection;
