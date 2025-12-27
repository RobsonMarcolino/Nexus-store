import React from 'react';
import { motion } from 'framer-motion';

interface CyberMarqueeProps {
    items: string[];
    speed?: number;
}

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
