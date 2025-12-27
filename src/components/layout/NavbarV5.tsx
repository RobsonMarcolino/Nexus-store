import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaDiscord, FaUserAstronaut } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSound } from '../../context/SoundContext';
import { productsData } from '../../data/products';
import GlitchText from '../ui/GlitchText';
import FloatingController from '../ui/FloatingController';

interface NavbarProps {
    onLoginClick: () => void;
    cartCount?: number; // Optional now, using context
}

const NavbarV5: React.FC<NavbarProps> = ({ onLoginClick }) => {
    const { user, isAuthenticated } = useAuth();
    const { cart, toggleCart } = useCart(); // Use Cart Context
    const { playSound } = useSound();

    // Use real cart count
    const realCartCount = cart.length;

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    // Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<typeof productsData>([]);
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const location = useLocation();
    const navigate = useNavigate();

    // Handle Search
    useEffect(() => {
        if (searchTerm.length > 1) {
            const results = productsData.filter(p =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results.slice(0, 5)); // Limit to 5
            setShowSearch(true);
        } else {
            setShowSearch(false);
        }
    }, [searchTerm]);

    // Close search on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll Spy Logic only on Home
    useEffect(() => {
        if (location.pathname !== '/') return;

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = ['hero', 'categories', 'trending', 'arsenal'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Handle Navigation (Cross-Page Support)
    const handleNavClick = (id: string) => {
        playSound('click');
        setMobileMenuOpen(false);

        if (location.pathname === '/') {
            // Smooth Scroll if already on Home
            if (id === 'hero') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else {
            // Navigate to Home then Scroll
            navigate('/');
            // Use setTimeout to allow route change before scrolling
            setTimeout(() => {
                if (id === 'hero') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 100);
        }
    };

    const navLinks = [
        { name: 'INÍCIO', id: 'hero' },
        { name: 'CATEGORIAS', id: 'categories' },
        { name: 'JOGOS', id: 'trending' },
        { name: 'LOJA', id: 'arsenal' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-0' : 'py-2'}`}>

            {/* Main Cyber Bar - Full Width with Angled Edges effect concept (visual only) */}
            <div className={`
                relative w-full transition-all duration-500 border-b border-white/5
                ${scrolled
                    ? 'bg-[#050B14]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-gradient-to-b from-[#050B14]/90 to-transparent backdrop-blur-[2px]'
                }
            `}>

                {/* Top Accent Line (Neon) */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-neon/50 to-transparent"></div>

                <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">

                    {/* Left: Logo & Brand */}
                    <div className="flex items-center gap-8">
                        {/* Recursive Logo Style */}
                        <div className="flex items-center gap-3 group cursor-pointer relative" onClick={() => handleNavClick('hero')} onMouseEnter={() => playSound('hover')}>
                            <div className="absolute -inset-2 bg-brand-neon/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="font-display font-bold text-3xl text-white italic tracking-tighter transform -skew-x-12 group-hover:text-brand-neon transition-colors">
                                <GlitchText text="NEXUS" />
                            </span>
                            <div className="h-6 w-[2px] bg-brand-neon rotate-12 hidden md:block"></div>
                            <span className="text-[0.65rem] font-bold text-gray-400 tracking-[0.2em] uppercase hidden md:block">
                                Loja Oficial
                            </span>
                        </div>
                    </div>

                    {/* Center: Cyber Links (Trapezoid feel) */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div key={link.name} className="flex items-center">
                                <button
                                    onClick={() => handleNavClick(link.id)}
                                    onMouseEnter={() => playSound('hover')}
                                    className={`
                                        relative px-6 py-2 group overflow-hidden
                                    `}
                                >
                                    <span className={`
                                        relative z-10 text-sm font-bold tracking-widest transition-colors duration-300
                                        ${activeSection === link.id && location.pathname === '/' ? 'text-brand-neon drop-shadow-[0_0_5px_rgba(0,242,234,0.8)]' : 'text-gray-400 group-hover:text-white'}
                                    `}>
                                        {link.name}
                                    </span>
                                    {/* Hover Glitch Line */}
                                    <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-neon transform transition-transform duration-300 origin-left ${activeSection === link.id && location.pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                                </button>
                                {/* Insert Floating Controller Before or After 'LOJA' (arsenal) */}
                                {link.id === 'arsenal' && (
                                    <div className="ml-2 -mt-2">
                                        <FloatingController />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right: HUD Actions */}
                    <div className="flex items-center gap-6">

                        {/* Search Input (Hidden on mobile) */}
                        <div className="hidden xl:flex items-center relative group" ref={searchRef}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => searchTerm.length > 1 && setShowSearch(true)}
                                placeholder="BUSCAR..."
                                className="bg-[#0f172a] border border-white/5 text-gray-300 text-xs font-bold py-2.5 pl-4 pr-10 w-48 focus:w-64 focus:border-brand-neon/50 transition-all outline-none skew-x-[-10deg] placeholder-gray-600"
                            />
                            <FaSearch className="absolute right-4 text-gray-500 text-xs" />

                            {/* Search Dropdown */}
                            {showSearch && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-[#0f172a] border border-brand-neon/30 rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in-up">
                                    {searchResults.length > 0 ? (
                                        searchResults.map(result => (
                                            <div
                                                key={result.id}
                                                onClick={() => {
                                                    navigate(`/product/${result.id}`);
                                                    setShowSearch(false);
                                                    setSearchTerm('');
                                                    playSound('click');
                                                }}
                                                className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 group"
                                                onMouseEnter={() => playSound('hover')}
                                            >
                                                <img src={result.image} alt={result.name} className="w-10 h-10 object-cover rounded" />
                                                <div className="overflow-hidden">
                                                    <h4 className="text-white text-xs font-bold truncate group-hover:text-brand-neon transition-colors">{result.name}</h4>
                                                    <p className="text-gray-500 text-[10px] uppercase">{result.category}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-gray-500 text-xs">Nenhum resultado encontrado</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-4">
                            <button className="text-gray-400 hover:text-white transition-colors relative" onMouseEnter={() => playSound('hover')}>
                                <FaDiscord className="text-xl" />
                            </button>
                            <button
                                onClick={toggleCart} // Toggle Cart Sidebar
                                className="text-gray-400 hover:text-brand-neon transition-colors relative"
                                onMouseEnter={() => playSound('hover')}
                            >
                                <FaShoppingCart className="text-xl" />
                                {realCartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-brand-neon text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center skew-x-[-10deg]">
                                        {realCartCount}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Login/Profile Button (Cyber Button) */}
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="hidden md:flex items-center gap-3 bg-brand-neon/10 text-brand-neon border border-brand-neon/50 px-6 py-2.5 font-bold text-xs tracking-wider uppercase hover:bg-brand-neon hover:text-black transition-all skew-x-[-10deg] group"
                            >
                                <FaUserAstronaut className="text-sm" />
                                <span className="skew-x-[10deg]">{user?.name?.split(' ')[0] || 'AGENTE'}</span>
                            </Link>
                        ) : (
                            <button
                                onClick={onLoginClick}
                                className="hidden md:flex items-center gap-3 bg-white text-black px-6 py-2.5 font-bold text-xs tracking-wider uppercase hover:bg-brand-neon transition-colors skew-x-[-10deg] group border-l-4 border-transparent hover:border-black"
                            >
                                <FaUser />
                                <span className="skew-x-[10deg]">Entrar</span>
                            </button>
                        )}

                        <button className="lg:hidden text-white text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 top-20 z-40 bg-[#050B14]/95 backdrop-blur-xl p-8 flex flex-col gap-6 animate-fade-in">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavClick(link.id)}
                            className="text-left text-2xl font-bold text-white hover:text-brand-neon uppercase tracking-wider"
                        >
                            {link.name}
                        </button>
                    ))}
                    <div className="h-px bg-white/10 my-4"></div>
                    {isAuthenticated ? (
                        <Link to="/dashboard" className="flex items-center gap-3 text-xl font-bold text-white hover:text-brand-neon">
                            <FaUserAstronaut className="text-brand-neon" /> {user?.name}
                        </Link>
                    ) : (
                        <button onClick={onLoginClick} className="flex items-center gap-3 text-xl font-bold text-white">
                            <FaUser className="text-brand-neon" /> LOGIN
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavbarV5;
