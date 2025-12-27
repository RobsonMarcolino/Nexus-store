import React from 'react';

const CyberDivider: React.FC = () => {
    return (
        <div className="w-full relative h-24 overflow-hidden -mt-1 z-20 pointer-events-none">
            {/* Neon Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-neon to-transparent opacity-70 blur-[1px]"></div>

            {/* Slanted Section */}
            <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,0 L1440,0 L1440,20 L720,80 L0,20 Z"
                    fill="#050B14"
                    className="drop-shadow-[0_10px_20px_rgba(0,242,234,0.05)]"
                />
                <path
                    d="M0,20 L720,80 L1440,20"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                />
            </svg>

            {/* Glow effect at center */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-brand-neon/5 blur-[50px] rounded-full"></div>
        </div>
    );
};

export default CyberDivider;
