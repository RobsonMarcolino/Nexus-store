const SectionDivider = ({ position = 'bottom', color = '#0a0a0a' }: { position?: 'top' | 'bottom', color?: string }) => {
    return (
        <div className={`absolute left-0 w-full overflow-hidden leading-none z-20 ${position === 'top' ? 'top-0 rotate-180' : 'bottom-0'}`}>
            <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" fill={color} className="shape-fill"></path>
                {/* Tech Deco Elements */}
                <rect x="100" y="0" width="20" height="20" fill="#00ff9d" opacity="0.5" />
                <rect x="1100" y="0" width="50" height="10" fill="#8b5cf6" opacity="0.5" />
            </svg>
        </div>
    );
};

export default SectionDivider;
