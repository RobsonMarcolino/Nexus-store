import React from 'react';
import { motion } from 'framer-motion';
import { FaPlaystation, FaXbox, FaSteam, FaTwitch, FaDiscord } from 'react-icons/fa';
import { SiNvidia, SiAmd, SiIntel, SiRazer, SiLogitech } from 'react-icons/si';

const brands = [
    { name: 'PlayStation', icon: FaPlaystation },
    { name: 'Xbox', icon: FaXbox },
    { name: 'Steam', icon: FaSteam },
    { name: 'Nvidia', icon: SiNvidia },
    { name: 'AMD', icon: SiAmd },
    { name: 'Intel', icon: SiIntel },
    { name: 'Razer', icon: SiRazer },
    { name: 'Logitech', icon: SiLogitech },
    { name: 'Twitch', icon: FaTwitch },
    { name: 'Discord', icon: FaDiscord },
];

const BrandsMarquee: React.FC = () => {
    return (
        <section className="relative w-full overflow-hidden bg-black/40 border-y border-white/5 py-8 backdrop-blur-sm z-20">
            {/* 3D Perspective Container */}
            <div className="max-w-[1920px] mx-auto perspective-[1000px]">

                {/* Tilted Track */}
                <motion.div
                    className="flex whitespace-nowrap gap-32 items-center"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Infinite Logic: Duplicate list multiple times */}
                    {[...Array(2)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="flex gap-32 items-center shrink-0"
                            animate={{ x: "-100%" }}
                            transition={{
                                duration: 40, // Slower for readability
                                ease: "linear",
                                repeat: Infinity
                            }}
                        >
                            {brands.map((Brand, index) => (
                                <div
                                    key={index}
                                    className="group flex flex-col items-center justify-center gap-2 transform transition-all duration-300 hover:scale-110 cursor-pointer"
                                >
                                    {/* 3D Icon Effect */}
                                    <div className="relative text-5xl text-gray-600 group-hover:text-brand-neon transition-colors duration-300 drop-shadow-[0_4px_0_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(0,242,234,0.6)]">
                                        <Brand.icon />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-700 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {Brand.name}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Shine/Reflection Overlay for 3D feel */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050B14] via-transparent to-[#050B14] pointer-events-none z-10"></div>
            </div>
        </section>
    );
};

export default BrandsMarquee;
