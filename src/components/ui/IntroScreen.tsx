import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
    onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Progress Bar Simulation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsVisible(false), 800);
                    return 100;
                }
                return prev + Math.random() * 8;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
                    exit={{
                        opacity: 0,
                        clipPath: "inset(0 0 100% 0)",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Background Video/Image */}
                    <div className="absolute inset-0 z-0 opacity-40">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover scale-110 blur-sm"
                        >
                            <source src="https://cdn.akamai.steamstatic.com/steam/apps/256965171/movie480_vp9.webm" type="video/webm" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
                        <div className="absolute inset-0 bg-brand-purple/20 mix-blend-overlay"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center">

                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="mb-12 relative"
                        >
                            <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter text-white font-display mix-blend-difference">
                                NEXUS
                            </h1>
                            <div className="absolute top-0 left-0 w-full h-full text-brand-neon opacity-50 blur-[2px] animate-pulse">
                                NEXUS
                            </div>
                        </motion.div>

                        {/* Loading Bar */}
                        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative mb-4">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-brand-neon shadow-[0_0_15px_#00ff9d]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Tech Specs Text */}
                        <div className="flex gap-8 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                            <span className="animate-pulse">Inicialização do Sistema</span>
                            <span>Ver 2.4.0</span>
                        </div>

                    </div>

                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]"></div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroScreen;
