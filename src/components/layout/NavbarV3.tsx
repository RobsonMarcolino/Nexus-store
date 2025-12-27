import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';

interface NavbarProps {
    onLoginClick?: () => void;
    cartCount?: number;
}

const NavbarV3: React.FC<NavbarProps> = ({ onLoginClick, cartCount = 0 }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-[#050B14]/90 backdrop-blur-xl py-4 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center gap-12">
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-brand-neon rounded flex items-center justify-center text-[#050B14] font-bold text-xl skew-x-[-10deg] group-hover:skew-x-0 transition-transform duration-300">
                            N
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-display font-bold text-2xl tracking-widest leading-none">NEXUS</span>
                            <span className="text-brand-purple text-[0.6rem] font-bold tracking-[0.3em] uppercase">Gaming Store</span>
                        </div>
                    </a>

                    {/* Desktop Navigation - Steam-like */}
                    <div className="hidden xl:flex items-center gap-8">
                        {['STORE', 'COMMUNITY', 'ABOUT', 'SUPPORT'].map((item) => (
                            <a key={item} href="#" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-colors hover:scale-105 transform duration-200">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right Section: Search & Actions */}
                <div className="flex items-center gap-6">

                    {/* Search Bar */}
                    <div className="hidden lg:flex items-center bg-[#111827] border border-white/10 rounded-full px-4 py-2 w-64 focus-within:border-brand-neon/50 focus-within:w-80 transition-all duration-300">
                        <FaSearch className="text-gray-500 w-3.5 h-3.5" />
                        <input
                            type="text"
                            placeholder="Search games, gear..."
                            className="bg-transparent border-none outline-none text-sm text-white ml-3 w-full placeholder-gray-600"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                        <button className="text-gray-400 hover:text-white transition-colors relative group">
                            <FaShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-neon text-[#050B14] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={onLoginClick}
                            className="hidden sm:flex items-center gap-2 text-gray-400 hover:text-brand-neon transition-colors text-xs font-bold uppercase tracking-wider"
                        >
                            <FaUser className="w-4 h-4" />
                            Sign In
                        </button>

                        <button className="bg-brand-purple hover:bg-brand-purple/90 text-white text-xs font-bold uppercase px-6 py-2.5 rounded hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all duration-300 skew-x-[-10deg]">
                            <span className="skew-x-[10deg] inline-block">Download App</span>
                        </button>

                        <button className="lg:hidden text-white">
                            <FaBars className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarV3;
