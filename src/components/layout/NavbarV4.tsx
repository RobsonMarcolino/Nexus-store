import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

interface NavbarProps {
    onLoginClick: () => void;
    cartCount: number;
}

const NavbarV4: React.FC<NavbarProps> = ({ onLoginClick, cartCount }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 flex justify-center`}>
            {/* 
                Floating Glass Capsule 
                - Lighter background (white/10 instead of black) 
                - Rounded Full
                - Max width constrained
            */}
            <div className={`
                w-[95%] max-w-[1400px] rounded-2xl transition-all duration-300
                ${scrolled
                    ? 'bg-[#050B14]/80 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-3 px-6'
                    : 'bg-transparent border border-transparent py-5 px-6'
                }
            `}>
                <div className="flex items-center justify-between">

                    {/* Brand */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-tr from-brand-neon to-brand-purple rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-brand-neon/20">
                            <span className="text-black font-bold text-xl">N</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-2xl text-white tracking-wider group-hover:text-brand-neon transition-colors">NEXUS</span>
                        </div>
                    </div>

                    {/* Desktop Links (Centered) */}
                    <div className="hidden md:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/5 backdrop-blur-sm">
                        {['Store', 'Distribution', 'Support', 'Community'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="text-white/70 hover:text-brand-neon transition-colors p-2">
                            <FaSearch className="text-lg" />
                        </button>

                        <div className="h-6 w-px bg-white/20 hidden md:block"></div>

                        <button className="relative group p-2">
                            <FaShoppingCart className="text-white/70 group-hover:text-brand-neon transition-colors text-lg" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-neon text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={onLoginClick}
                            className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl transition-all font-medium border border-white/5 hover:border-brand-neon/30"
                        >
                            <FaUser className="text-sm" />
                            <span>Sign In</span>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1f2e] border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-xl md:hidden animate-fade-in-up">
                        {['Store', 'Distribution', 'Support', 'Community'].map((item) => (
                            <a key={item} href="#" className="p-3 text-gray-300 hover:bg-white/5 rounded-xl transition-colors">
                                {item}
                            </a>
                        ))}
                        <div className="h-px bg-white/10 my-2"></div>
                        <button onClick={onLoginClick} className="flex items-center gap-2 p-3 text-brand-neon font-bold">
                            <FaUser /> Sign In
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavbarV4;
