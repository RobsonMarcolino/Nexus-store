interface SectionDivider3DProps {
    position: 'top' | 'bottom';
}

const SectionDivider3D = ({ position }: SectionDivider3DProps) => {
    return (
        <div className={`absolute left-0 w-full overflow-hidden leading-none z-10 pointer-events-none ${position === 'top' ? '-top-1 rotate-180' : '-bottom-1'}`}>
            <div className="relative w-full h-[120px] sm:h-[180px]">

                {/* Layer 1: Perspective Grid (The "Floor") */}
                <div className="absolute inset-x-0 bottom-0 h-full opacity-30 select-none"
                    style={{
                        background: 'linear-gradient(0deg, transparent 24%, rgba(0, 243, 255, .3) 25%, rgba(0, 243, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 243, 255, .3) 75%, rgba(0, 243, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 243, 255, .3) 25%, rgba(0, 243, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 243, 255, .3) 75%, rgba(0, 243, 255, .3) 76%, transparent 77%, transparent)',
                        backgroundSize: '50px 50px',
                        transform: 'perspective(200px) rotateX(60deg) scale(2)',
                        transformOrigin: 'bottom center'
                    }}>
                </div>

                {/* Layer 2: Black Mountain Silhouette (Background) */}
                <svg className="absolute bottom-0 w-full h-[90%]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,120 L0,80 L200,40 L400,100 L600,20 L800,90 L1000,50 L1200,100 L1200,120 Z" fill="#020617" opacity="0.8"></path>
                </svg>

                {/* Layer 3: Main "Tech" Cutout with Neon Border */}
                <svg className="absolute bottom-0 w-full h-full drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#00f3ff" stopOpacity="1" />
                            <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>

                    {/* The Fill - Matches Section Background */}
                    <path d="M1200 120L0 45V0h1200v120z" className="fill-[#020617]"></path>

                    {/* The Border - Neon Pulse */}
                    <path d="M1200 120L0 45" fill="none" stroke="url(#neonGradient)" strokeWidth="3" className="animate-pulse"></path>

                    {/* Tech Details - Small "Circuit" nodes along the line */}
                    <circle cx="200" cy="107.5" r="3" fill="#00f3ff" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx="800" cy="70" r="3" fill="#00f3ff" className="animate-ping" style={{ animationDuration: '4s' }} />
                </svg>
            </div>
        </div>
    );
};

export default SectionDivider3D;
