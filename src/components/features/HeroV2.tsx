import React, { useState, useEffect } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';
import GlitchText from '../ui/GlitchText';
import { useSound } from '../../context/SoundContext';

const HeroV2: React.FC = () => {
    const { playSound } = useSound();
    const [showModal, setShowModal] = useState(false);

    // Lock scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [showModal]);

    const handleArsenalClick = () => {
        playSound('click');
        const element = document.getElementById('arsenal');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative pt-32 pb-40 overflow-hidden">
            {/* Enhanced Content Container */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 h-full flex items-center pt-20">
                <div className="max-w-full lg:max-w-[900px]">

                    {/* Floating Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-neon/20 to-brand-purple/20 border border-brand-neon/30 rounded-none mb-8 skew-x-[-10deg] animate-fade-in-up backdrop-blur-md">
                        <span className="w-2 h-2 bg-brand-neon rounded-full animate-pulse"></span>
                        <span className="text-brand-neon font-bold text-xs tracking-[0.2em] uppercase skew-x-[10deg]">Nova Geração Disponível</span>
                    </div>

                    {/* Main Title with Glitch Effect */}
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-black text-white leading-[0.9] tracking-tight mb-8 animate-fade-in-up delay-100">
                        <GlitchText text="CYBER" />
                        <br />
                        <span className="text-brand-neon">
                            <GlitchText text="REVOLUTION" />
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-300 text-lg md:text-xl font-light mb-10 max-w-xl leading-relaxed border-l-4 border-brand-neon pl-6 animate-fade-in-up delay-200 bg-black/30 py-2 backdrop-blur-sm">
                        Experimente o auge absoluto da performance gamer.
                        <span className="text-white font-bold block mt-1">Pronto para o futuro?</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up delay-300">
                        {/* Primary Button (Cyber Shape) */}
                        <button
                            onClick={handleArsenalClick}
                            onMouseEnter={() => playSound('hover')}
                            className="relative group px-10 py-4 bg-brand-neon text-black font-bold text-lg tracking-widest uppercase hover:bg-white transition-all transform hover:scale-105 duration-300 skew-x-[-10deg] shadow-[0_0_20px_rgba(0,242,234,0.4)]"
                        >
                            <span className="block skew-x-[10deg]">ACESSAR ARSENAL</span>
                            <div className="absolute inset-0 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        {/* Secondary Button - Updated with GTA VI Image */}
                        <button
                            onClick={() => {
                                setShowModal(true);
                                playSound('click');
                            }}
                            onMouseEnter={() => playSound('hover')}
                            className="relative flex items-center gap-4 px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all skew-x-[-10deg] group backdrop-blur-sm overflow-hidden"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity group-hover:scale-110 duration-700"
                                style={{
                                    backgroundImage: "url('https://s2-techtudo.glbimg.com/IGEpsR_2QPPbk7c5uity1skfJ-8=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2024/a/Z/c3hiH4RAKU3xd0s8pN8g/grand-theft-auto-vi-gta-6-rockstar-pagina-oficial-site.jpg')"
                                }}
                            ></div>

                            <span className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full group-hover:scale-110 transition-transform skew-x-[10deg] relative z-10 border border-white/20">
                                <FaPlay className="text-xs ml-1" />
                            </span>
                            <span className="skew-x-[10deg] relative z-10 shadow-black drop-shadow-md">VER TRAILER: GTA VI</span>
                        </button>
                    </div>

                    {/* Tech Specs / Trust Indicators */}
                    <div className="mt-16 flex items-center gap-8 md:gap-12 text-gray-400 animate-fade-in-up delay-500 overflow-x-auto pb-2 scrollbar-hide">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest mb-1 text-brand-purple">Atualização</span>
                            <span className="text-2xl font-display font-bold text-white">360<span className="text-sm">Hz</span></span>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest mb-1 text-brand-purple">Latência</span>
                            <span className="text-2xl font-display font-bold text-white">1<span className="text-sm">ms</span></span>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest mb-1 text-brand-purple">Resolução</span>
                            <span className="text-2xl font-display font-bold text-white">8K<span className="text-sm">HDR</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Modal Overlay */}
            {showModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in p-4 cursor-pointer"
                    onClick={() => setShowModal(false)}
                >
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
                    >
                        <FaTimes className="text-3xl" />
                    </button>
                    <div
                        className="w-full max-w-5xl aspect-video bg-black rounded-lg border border-white/10 shadow-[0_0_50px_rgba(0,242,234,0.1)] overflow-hidden cursor-default relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/QdBZY2fkU-0?autoplay=1&rel=0"
                            title="GTA VI Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HeroV2;
