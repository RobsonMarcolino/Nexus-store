import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen flex items-center overflow-hidden">
            {/* Background Content */}
            <div className="absolute inset-0 bg-brand-dark">
                {/* Cyber Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [transform:perspective(500px)_rotateX(60deg)] origin-top h-[200%]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="z-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-brand-neon/30 rounded bg-brand-neon/5 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse"></span>
                        <span className="text-brand-neon font-mono text-xs uppercase tracking-widest">System v3.0 Online</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl sm:text-8xl font-display font-bold text-white leading-none mb-6 tracking-tight"
                    >
                        FUTURE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-white to-brand-pink drop-shadow-[0_0_20px_rgba(0,243,255,0.5)]">
                            READY
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-gray-400 text-lg sm:text-xl mb-10 max-w-lg leading-relaxed border-l-2 border-brand-neon/50 pl-6"
                    >
                        A nova geração de performance chegou. Equipamentos forjados para dominação total.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button className="bg-brand-neon text-brand-dark px-8 py-4 font-display font-bold text-xl clip-path-polygon hover:bg-white hover:shadow-[0_0_40px_rgba(0,243,255,0.6)] transition-all transform hover:-translate-y-1">
                            EXPLORAR LOJA
                        </button>
                        <button className="px-8 py-4 font-display font-bold text-xl text-white border border-white/20 hover:border-brand-pink hover:text-brand-pink transition-all bg-white/5 backdrop-blur-sm">
                            VER OFERTAS
                        </button>
                    </motion.div>
                </div>

                {/* New Hero Visual: Floating Cards / HUD instead of Cube */}

            </div>
        </section>
    );
};

export default Hero;
