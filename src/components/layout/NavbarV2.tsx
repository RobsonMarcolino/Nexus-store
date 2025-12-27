import React, { useState } from 'react';

interface NavbarV2Props {
    onLoginClick?: () => void;
}

const NavbarV2: React.FC<NavbarV2Props> = ({ onLoginClick }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 mx-auto w-[95%] max-w-7xl transition-all duration-300">
            {/* Cyber Container */}
            <div className="relative bg-[#050B14]/90 backdrop-blur-xl border-y border-brand-neon/20 px-6 py-4 shadow-[0_0_20px_rgba(0,242,234,0.1)] clip-path-cyber-nav">

                {/* Decorative Tech Lines */}
                <div className="absolute top-0 left-0 w-20 h-[1px] bg-brand-neon shadow-[0_0_10px_#00f2ea]"></div>
                <div className="absolute bottom-0 right-0 w-20 h-[1px] bg-brand-purple shadow-[0_0_10px_#7c3aed]"></div>

                <div className="flex items-center justify-between">

                    {/* Left Section: Logo & Nav Links */}
                    <div className="flex items-center gap-12">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-2 group relative">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-brand-neon to-brand-purple blur opacity-25 group-hover:opacity-75 transition duration-500 rounded-lg"></div>
                                <div className="relative w-10 h-10 bg-[#0f172a] border border-white/10 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                                    <div className="w-5 h-5 bg-brand-neon clip-path-polygon"></div>
                                </div>
                            </div>
                            <span className="text-white font-display font-bold text-2xl tracking-widest group-hover:text-brand-neon transition-colors">NEXUS</span>
                        </a>

                        {/* Nav Links - Desktop */}
                        <div className="hidden md:flex items-center gap-8">
                            {['STORE', 'COMMUNITY', 'SUPPORT'].map((item) => (
                                <a key={item} href="#" className="relative text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-colors py-2 group">
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-neon transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00f2ea]"></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Center Section: Search */}
                    <div className="flex-1 max-w-md px-8 hidden lg:block">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-neon/20 to-brand-purple/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                            <div className="relative bg-[#0f172a] rounded-xl flex items-center border border-white/5 group-hover:border-brand-neon/30 transition-colors">
                                <div className="pl-4 text-gray-500 group-hover:text-brand-neon transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="w-full bg-transparent text-gray-200 text-sm pl-3 pr-4 py-2.5 focus:outline-none placeholder-gray-600 font-medium"
                                    placeholder="SEARCH COMMAND..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Auth */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={onLoginClick}
                            className="text-gray-400 hover:text-brand-neon text-xs font-bold tracking-wider transition-colors uppercase"
                        >
                            Log In
                        </button>
                        <button className="relative overflow-hidden bg-brand-purple hover:bg-brand-purple/80 text-white text-xs font-bold tracking-wider uppercase py-3 px-6 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] group/btn">
                            <span className="relative z-10">Connect</span>
                            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-700"></div>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default NavbarV2;
