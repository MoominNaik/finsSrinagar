
import React from 'react';

export const BonelessFishIllustration = ({ className }) => (
    <svg viewBox="0 0 200 160" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Floating Group */}
        <g className="animate-float-slow">
            {/* Fries - Back */}
            <rect x="60" y="40" width="12" height="60" fill="#fccb06" rx="2" transform="rotate(-15 66 70)" />
            <rect x="90" y="30" width="12" height="70" fill="#fccb06" rx="2" transform="rotate(5 96 65)" />
            <rect x="120" y="45" width="12" height="55" fill="#fccb06" rx="2" transform="rotate(20 126 72)" />

            {/* Fish Fillet */}
            <path
                d="M40 80 C40 60 70 50 100 50 S160 60 160 80 S130 110 100 110 S40 100 40 80 Z"
                fill="#fccb06"
                stroke="#0B2545"
                strokeWidth="3"
                filter="url(#glow-gold)"
            />

            {/* Detail lines on fillet */}
            <path d="M70 70 Q90 60 110 70" fill="none" stroke="#0B2545" strokeWidth="2" opacity="0.5" />
            <path d="M70 90 Q90 80 110 90" fill="none" stroke="#0B2545" strokeWidth="2" opacity="0.5" />

            {/* Fries - Front */}
            <rect x="50" y="60" width="10" height="40" fill="#e6b800" rx="2" transform="rotate(-45 55 80)" />
        </g>
    </svg>
);

export const TroutIllustration = ({ className }) => (
    <svg viewBox="0 0 200 160" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow-gold-2" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Floating Group */}
        <g className="animate-float-medium">
            {/* Fries */}
            <rect x="80" y="110" width="80" height="12" fill="#fccb06" rx="2" />
            <rect x="70" y="105" width="60" height="12" fill="#fccb06" rx="2" transform="rotate(-5 100 111)" />

            {/* Whole Trout */}
            <path
                d="M20 80 Q50 40 100 40 Q150 40 180 80 L195 70 V90 L180 80 Q150 120 100 120 Q50 120 20 80 Z"
                fill="#fccb06"
                stroke="#0B2545"
                strokeWidth="3"
                filter="url(#glow-gold-2)"
            />
            {/* Eye */}
            <circle cx="40" cy="70" r="3" fill="#0B2545" />
            {/* Gills */}
            <path d="M55 60 Q45 80 55 100" fill="none" stroke="#0B2545" strokeWidth="2" />
            {/* Fins */}
            <path d="M100 40 L90 20 L110 40 Z" fill="#e6b800" />
            <path d="M100 120 L90 140 L110 120 Z" fill="#e6b800" />
        </g>
    </svg>
);

export const ButterGarlicIllustration = ({ className }) => (
    <svg viewBox="0 0 200 160" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow-gold-3" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g className="animate-float-slow">
            {/* Sauce Pool */}
            <path d="M40 100 Q100 130 160 100" fill="none" stroke="#fccb06" strokeWidth="4" opacity="0.6" strokeLinecap="round" />

            {/* Fish Fillet */}
            <path
                d="M50 70 Q100 40 150 70 Q160 90 150 110 Q100 130 50 110 Q40 90 50 70 Z"
                fill="#fccb06"
                stroke="#0B2545"
                strokeWidth="3"
                filter="url(#glow-gold-3)"
            />

            {/* Garlic Cloves / Butter Chunks */}
            <circle cx="80" cy="80" r="5" fill="#fff" stroke="#0B2545" strokeWidth="1" />
            <circle cx="110" cy="90" r="6" fill="#fff" stroke="#0B2545" strokeWidth="1" />
            <circle cx="130" cy="75" r="4" fill="#fff" stroke="#0B2545" strokeWidth="1" />

            {/* Herbs */}
            <path d="M90 85 L95 80 M115 95 L120 90" stroke="#0B2545" strokeWidth="2" strokeLinecap="round" />
        </g>
    </svg>
);

export const MasalaTroutIllustration = ({ className }) => (
    <svg viewBox="0 0 200 160" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow-gold-4" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g className="animate-float-medium">
            {/* Trout Shape */}
            <path
                d="M30 80 Q60 50 110 50 Q160 50 180 80 L190 70 V90 L180 80 Q160 110 110 110 Q60 110 30 80 Z"
                fill="#fccb06"
                stroke="#0B2545"
                strokeWidth="3"
                filter="url(#glow-gold-4)"
            />
            {/* Tail */}
            <path d="M30 80 L10 60 V100 Z" fill="#e6b800" stroke="#0B2545" strokeWidth="2" />

            {/* Spices / Texture */}
            <circle cx="80" cy="80" r="1.5" fill="#0B2545" opacity="0.6" />
            <circle cx="90" cy="70" r="1.5" fill="#0B2545" opacity="0.6" />
            <circle cx="100" cy="90" r="1.5" fill="#0B2545" opacity="0.6" />
            <circle cx="120" cy="80" r="1.5" fill="#0B2545" opacity="0.6" />
            <circle cx="140" cy="75" r="1.5" fill="#0B2545" opacity="0.6" />

            {/* Garnish */}
            <path d="M100 80 L110 60" stroke="#0B2545" strokeWidth="2" opacity="0.5" />
        </g>
    </svg>
);

export const JapaneseFriesIllustration = ({ className }) => (
    <svg viewBox="0 0 200 160" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow-gold-5" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g className="animate-float-slow">
            {/* Container */}
            <path d="M70 140 L50 60 H150 L130 140 H70 Z" fill="none" stroke="#fccb06" strokeWidth="3" />

            {/* Long Fries */}
            <rect x="60" y="20" width="10" height="80" fill="#fccb06" stroke="#0B2545" strokeWidth="2" filter="url(#glow-gold-5)" transform="rotate(-15 65 60)" />
            <rect x="85" y="10" width="10" height="90" fill="#fccb06" stroke="#0B2545" strokeWidth="2" filter="url(#glow-gold-5)" />
            <rect x="110" y="15" width="10" height="85" fill="#fccb06" stroke="#0B2545" strokeWidth="2" filter="url(#glow-gold-5)" transform="rotate(10 115 60)" />
            <rect x="130" y="30" width="10" height="70" fill="#fccb06" stroke="#0B2545" strokeWidth="2" filter="url(#glow-gold-5)" transform="rotate(25 135 65)" />

            {/* Seaweed Flakes */}
            <path d="M90 60 L95 62 M85 40 L90 42" stroke="#0B2545" strokeWidth="2" />
        </g>
    </svg>
);

export const CutletIllustration = ({ className }) => (
    <svg viewBox="0 0 200 160" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow-gold-6" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g className="animate-float-medium">
            {/* Cutlet 1 */}
            <ellipse cx="70" cy="90" rx="35" ry="25" fill="#fccb06" stroke="#0B2545" strokeWidth="3" filter="url(#glow-gold-6)" transform="rotate(-10 70 90)" />

            {/* Cutlet 2 */}
            <ellipse cx="130" cy="80" rx="35" ry="25" fill="#fccb06" stroke="#0B2545" strokeWidth="3" filter="url(#glow-gold-6)" transform="rotate(10 130 80)" />

            {/* Crumbs Texture */}
            <circle cx="60" cy="90" r="1" fill="#0B2545" />
            <circle cx="80" cy="85" r="1" fill="#0B2545" />
            <circle cx="120" cy="80" r="1" fill="#0B2545" />
            <circle cx="140" cy="85" r="1" fill="#0B2545" />

            {/* Steam */}
            <path d="M70 50 Q80 30 70 20" fill="none" stroke="#fccb06" strokeWidth="2" opacity="0.5" />
            <path d="M130 40 Q140 20 130 10" fill="none" stroke="#fccb06" strokeWidth="2" opacity="0.5" />
        </g>
    </svg>
);
export const PeriPeriFriesIllustration = ({ className }) => (
    <svg viewBox="0 0 200 160" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="glow-gold-7" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g className="animate-float-slow">
            {/* Container */}
            <path d="M70 140 L50 60 H150 L130 140 H70 Z" fill="none" stroke="#fccb06" strokeWidth="3" />

            {/* Reddish Fries */}
            <rect x="60" y="20" width="10" height="80" fill="#ff4d00" stroke="#0B2545" strokeWidth="2" filter="url(#glow-gold-7)" transform="rotate(-15 65 60)" />
            <rect x="85" y="10" width="10" height="90" fill="#fccb06" stroke="#0B2545" strokeWidth="2" filter="url(#glow-gold-7)" />
            <rect x="110" y="15" width="10" height="85" fill="#ff4d00" stroke="#0B2545" strokeWidth="2" filter="url(#glow-gold-7)" transform="rotate(10 115 60)" />
            <rect x="130" y="30" width="10" height="70" fill="#fccb06" stroke="#0B2545" strokeWidth="2" filter="url(#glow-gold-7)" transform="rotate(25 135 65)" />

            {/* Spice Dusting */}
            <circle cx="90" cy="60" r="1.5" fill="#0B2545" opacity="0.8" />
            <circle cx="95" cy="70" r="1.5" fill="#ff4d00" opacity="0.8" />
            <circle cx="115" cy="40" r="1.5" fill="#0B2545" opacity="0.8" />
            <circle cx="85" cy="30" r="1.5" fill="#ff4d00" opacity="0.8" />
        </g>
    </svg>
);

