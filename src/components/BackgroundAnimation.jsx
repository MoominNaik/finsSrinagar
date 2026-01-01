
import React from 'react';

const FishIcon = ({ className }) => (
    <svg
        viewBox="0 0 100 60"
        className={className}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Minimal abstract fish shape */}
        <path d="M95 30C80 25 60 10 40 10S10 25 5 30C10 35 30 50 40 50S80 35 95 30Z" />
        <path d="M5 30L0 20V40L5 30Z" /> {/* Tail */}
    </svg>
);

const BackgroundAnimation = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* School of fish */}

            {/* Top Layer */}
            <div className="absolute top-[10%] left-0 w-full animate-swim-slow" style={{ '--fish-opacity': '0.3' }}>
                <FishIcon className="w-24 h-16 text-fins-gold" />
            </div>

            <div className="absolute top-[30%] left-0 w-full animate-swim-medium animation-delay-2000" style={{ '--fish-opacity': '0.4' }}>
                <FishIcon className="w-16 h-12 text-fins-gold" />
            </div>

            <div className="absolute top-[60%] left-0 w-full animate-swim-fast animation-delay-500" style={{ '--fish-opacity': '0.2' }}>
                <FishIcon className="w-32 h-20 text-fins-gold" />
            </div>

            <div className="absolute top-[80%] left-0 w-full animate-swim-slow animation-delay-4000" style={{ '--fish-opacity': '0.25' }}>
                <FishIcon className="w-20 h-14 text-fins-gold" />
            </div>

            {/* Background gradient hint */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-fins-gold/10 rounded-full blur-[120px] mix-blend-overlay" />
        </div>
    );
};

export default BackgroundAnimation;
