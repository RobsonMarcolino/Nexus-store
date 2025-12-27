import React from 'react';
import { motion } from 'framer-motion';

interface CyberMarqueeProps {
    items: string[];
    speed?: number;
}

const CyberMarquee: React.FC<CyberMarqueeProps> = ({ items, speed = 20 }) => {
    return (
        <div className="relative w-full bg-[#050B14] border-b border-white/10 overflow-hidden py-2 z-50">
            {/* Gradient Fade Edges */}
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#050B14] to-transparent z-10"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#050B14] to-transparent z-10"></div>

            <div className="flex overflow-hidden whitespace-nowrap">
                <motion.div
                    className="flex gap-12 items-center"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: speed,
                        ease: "linear"
                    }}
                >
                    {[...items, ...items, ...items, ...items].map((item, index) => (
                        <div key={index} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                            <span className="w-2 h-2 bg-brand-neon rotate-45"></span>
                            <span>{item}</span>
                        </div>
                    ))}
                </motion.div>
                {/* Duplicate for seamless loop if needed, though the array map above mimics it roughly. 
                    For true seamless, we usually render children twice. 
                    The above x: -1000 is naive. 
                    Better approach: Two identical divs translating.
                */}
            </div>

            {/* Better Seamless Marquee Structure */}
            <div className="absolute top-0 py-2 flex overflow-hidden whitespace-nowrap select-none w-full">
                <div className="animate-marquee flex gap-16 min-w-full">
                    {items.concat(items).concat(items).map((item, i) => ( // Repeat 3 times to fill screen
                        <div key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 group cursor-pointer hover:text-brand-neon transition-colors">
                            <span className="w-1.5 h-1.5 bg-brand-neon rotate-45 group-hover:bg-white transition-colors"></span>
                            {item}
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 animate-marquee2 flex gap-16 min-w-full ml-4">
                    {items.concat(items).concat(items).map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 group cursor-pointer hover:text-brand-neon transition-colors">
                            <span className="w-1.5 h-1.5 bg-brand-neon rotate-45 group-hover:bg-white transition-colors"></span>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// We need to add custom tailwind animations for 'marquee' if not present, but framer motion is easier.
// Let's stick to Framer Motion for reliability without messing with tailwind config.

const CyberMarqueeFramer: React.FC<CyberMarqueeProps> = ({ items, speed = 30 }) => {
    return (
        <div className="relative w-full bg-black/80 backdrop-blur-sm border-b border-white/5 overflow-hidden py-1.5 z-[60]">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-16 min-w-full pr-16"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: speed,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {[...items, ...items, ...items, ...items].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-brand-neon transition-colors cursor-pointer">
                            <span className="text-brand-purple">///</span>
                            {item}
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    className="flex gap-16 min-w-full pr-16"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: speed,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    {[...items, ...items, ...items, ...items].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-brand-neon transition-colors cursor-pointer">
                            <span className="text-brand-purple">///</span>
                            {item}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default CyberMarqueeFramer;
