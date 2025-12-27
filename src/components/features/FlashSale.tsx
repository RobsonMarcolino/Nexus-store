import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FlashSale = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date().getTime() + (24 * 60 * 60 * 1000); // 24h from now

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                // Reset for demo
            } else {
                setTimeLeft({
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center glass p-4 rounded-lg min-w-[80px]">
            <span className="text-3xl md:text-4xl font-mono font-bold text-white">
                {value < 10 ? `0${value}` : value}
            </span>
            <span className="text-xs text-gray-500 uppercase">{label}</span>
        </div>
    );

    return (
        <section id="flash-sale" className="py-20 bg-gradient-to-r from-[#111] via-[#1a0b2e] to-[#111] relative border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="text-center md:text-left"
                >
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block animate-pulse">Oferta Relâmpago</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 leading-tight">
                        RTX 4090 <span className="text-brand-purple">SUPRIM X</span>
                    </h2>
                    <p className="text-gray-400">Desconto insano por tempo limitado. Não perca a chance.</p>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="flex gap-4 md:gap-6"
                >
                    <TimeUnit value={timeLeft.hours} label="Horas" />
                    <TimeUnit value={timeLeft.minutes} label="Min" />
                    <TimeUnit value={timeLeft.seconds} label="Seg" />
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button className="bg-brand-purple hover:bg-brand-neon text-white hover:text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_#00ff9d]">
                        COMPRAR AGORA <br /> <span className="text-xs font-normal opacity-80">R$ 12.500,00</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default FlashSale;
