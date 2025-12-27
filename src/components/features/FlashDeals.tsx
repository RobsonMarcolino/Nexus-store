import React from 'react';
import { FaBolt } from 'react-icons/fa';

const FlashDeals: React.FC = () => {
    return (
        <section className="py-12 relative z-10">
            <div className="max-w-[1400px] mx-auto px-6">

                {/* Banner Container */}
                <div className="relative rounded-3xl overflow-hidden border border-brand-purple/30 bg-[#1a103c]">

                    {/* Background Pattern/Image */}
                    <div className="absolute inset-0 opacity-40">
                        <img
                            src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2000&auto=format&fit=crop"
                            alt="Gaming Setup"
                            className="w-full h-full object-cover mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple via-[#050B14]/80 to-[#050B14]"></div>
                    </div>

                    <div className="relative z-10 px-8 py-12 md:px-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">

                        {/* Text Content */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-brand-neon/10 text-brand-neon px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-brand-neon/20 animate-pulse">
                                <FaBolt /> FLASH SALE LIVE
                            </div>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                                UP TO <span className="text-brand-purple bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">50% OFF</span> <br />
                                ON PERIPHERALS
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-lg">
                                Grab the best gaming gear at unbeatable prices. Limited time offer ends soon.
                            </p>

                            <div className="flex items-center gap-4 justify-center md:justify-start">
                                <div className="text-center">
                                    <div className="bg-[#050B14] w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center text-2xl font-bold text-white mb-1">02</div>
                                    <span className="text-xs text-gray-500 font-bold uppercase">Days</span>
                                </div>
                                <div className="text-2xl font-bold text-white/20">:</div>
                                <div className="text-center">
                                    <div className="bg-[#050B14] w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center text-2xl font-bold text-white mb-1">14</div>
                                    <span className="text-xs text-gray-500 font-bold uppercase">Hours</span>
                                </div>
                                <div className="text-2xl font-bold text-white/20">:</div>
                                <div className="text-center">
                                    <div className="bg-[#050B14] w-16 h-16 rounded-xl border border-white/10 flex items-center justify-center text-2xl font-bold text-white mb-1">45</div>
                                    <span className="text-xs text-gray-500 font-bold uppercase">Mins</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Product Highlight (Right Side) */}
                        <div className="hidden md:block w-96 relative">
                            <div className="absolute inset-0 bg-brand-purple blur-[60px] opacity-30 animate-pulse-glow"></div>
                            <img
                                src={new URL('./JOGOS.png', import.meta.url).href}
                                alt="Feature Highlight"
                                className="relative z-10 w-full hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                            />
                            <div className="absolute -bottom-4 right-4 bg-brand-neon text-[#050B14] font-bold text-xl px-4 py-2 rounded-lg rotate-3 shadow-lg z-20">
                                -50%
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlashDeals;
