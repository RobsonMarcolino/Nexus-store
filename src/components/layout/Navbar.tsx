import { useState, useEffect } from 'react';
import { FaGamepad, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

interface NavbarProps {
    onLoginClick?: () => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed left-1/2 -translate-x-1/2 top-4 z-50 w-[95%] max-w-7xl transition-all duration-300 rounded-2xl border ${scrolled ? 'bg-brand-dark/90 backdrop-blur-xl border-brand-neon/40 shadow-[0_0_20px_rgba(0,243,255,0.2)]' : 'bg-transparent border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - V3 Style */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer group">
                        <FaGamepad className="text-brand-neon text-3xl mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="font-display font-bold text-3xl tracking-wider text-white group-hover:text-brand-neon transition-colors">
                            NEXUS <span className="text-xs bg-brand-neon text-black px-1 rounded ml-1 align-top">v3.0</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {['Início', 'Loja', 'Ofertas', 'Suporte'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                                    className="text-gray-300 hover:text-brand-neon px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/5 relative group"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-neon transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="relative cursor-pointer hover:text-brand-neon transition-colors group">
                            <FaShoppingCart className="text-xl group-hover:scale-110 transition-transform" />
                            <span className="absolute -top-2 -right-2 bg-brand-neon text-brand-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">0</span>
                        </div>
                        <button onClick={onLoginClick} className="bg-transparent border border-brand-neon text-brand-neon hover:bg-brand-neon hover:text-brand-dark px-4 py-1.5 rounded font-display font-bold text-sm transition-all uppercase tracking-wider shadow-[0_0_10px_transparent] hover:shadow-[0_0_20px_#00f3ff]">
                            LOGIN
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 hover:text-white">
                            {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            {mobileMenuOpen && (
                <div className="md:hidden glass absolute w-full left-0 border-t border-gray-800 animate-float rounded-b-2xl">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {['Início', 'Loja', 'Ofertas', 'Suporte'].map((item) => (
                            <a key={item} href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-brand-neon hover:bg-white/5">{item}</a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
