import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [statusText, setStatusText] = useState("CONNECTING TO SERVER");

    useEffect(() => {
        // Progress Simulation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStatusText("MATCH FOUND");
                    setTimeout(() => setIsComplete(true), 800);
                    return 100;
                }
                // Random tactical jumps
                return Math.min(prev + Math.random() * 8, 100);
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    // Trigger onComplete after exit animation
    useEffect(() => {
        if (isComplete) {
            setTimeout(onComplete, 1000);
        }
    }, [isComplete, onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 bg-[#0f1923] z-[100] flex flex-col items-center justify-center overflow-hidden"
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        transition: { duration: 0.5, ease: "circIn" }
                    }}
                >
                    {/* VALORANT Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/e89ed4f29436931ec80e58d85def28cb1df0e8b1-3440x1020.png?accountingTag=valorant_website?auto=format&fit=fill&q=80&h=725"
                            alt="Valorant Background"
                            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-[#0f1923]/60 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
                    </div>

                    {/* Content Container - Valorant UI Style */}
                    <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-center">

                        {/* Center Logo / Icon */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mb-12 relative"
                        >
                            <div className="w-24 h-24 border-2 border-white/20 rotate-45 flex items-center justify-center backdrop-blur-sm bg-white/5">
                                <div className="w-16 h-16 bg-[#ff4655] rotate-0 flex items-center justify-center shadow-[0_0_30px_#ff4655]">
                                    <FaPlay className="text-white text-3xl ml-1" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Status Text (Tactical Font) */}
                        <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter mb-2 font-display uppercase drop-shadow-xl glitch-text">
                            {statusText}
                        </h2>

                        <div className="flex items-center gap-4 w-full max-w-lg mt-8">
                            <span className="text-xs font-bold text-[#ff4655] tracking-widest">LOADING</span>

                            {/* Sharp Progress Bar */}
                            <div className="h-1 flex-1 bg-white/10 relative overflow-hidden skew-x-[-20deg]">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-[#ff4655]"
                                    style={{ width: `${progress}%` }}
                                    initial={{ width: 0 }}
                                />
                            </div>

                            <span className="text-xl font-bold text-white font-mono">{Math.round(progress)}%</span>
                        </div>

                    </div>

                    {/* Bottom Deco Elements */}
                    <div className="absolute bottom-10 left-10 text-white/30 font-mono text-xs tracking-[0.3em] flex gap-4">
                        <span>RIOT GAMES // API CONNECTION</span>
                        <span>REGION: BR-LATAM</span>
                    </div>

                    {/* Overlay Flash on Finish */}
                    {progress === 100 && (
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.8, 0] }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
