import { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NavbarV5 from './components/layout/NavbarV5';
import { CartProvider } from './context/CartContext';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';
import Home from './components/pages/Home';

import IntroScreen from './components/ui/IntroScreen';
import CyberMarqueeFramer from './components/ui/CyberMarquee';
import { FaSpinner } from 'react-icons/fa';

// Lazy Load Heavy Components
const Login = lazy(() => import('./components/pages/Login'));
const Checkout = lazy(() => import('./components/pages/Checkout'));
const ProductDetails = lazy(() => import('./components/pages/ProductDetails'));
const Dashboard = lazy(() => import('./components/pages/Dashboard'));

// Simple Loading Fallback for Route Transitions
const RouteLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#050B14]">
        <FaSpinner className="text-4xl text-brand-neon animate-spin" />
    </div>
);

function App() {
    const [loading, setLoading] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const location = useLocation();

    return (
        <CartProvider>
            <div className="relative min-h-screen overflow-x-hidden font-sans bg-[#050B14] text-gray-200 selection:bg-brand-neon selection:text-black cursor-crosshair">
                {/* Intro Screen - Cinematic Reveal */}
                <AnimatePresence>
                    {loading && <IntroScreen onComplete={() => setLoading(false)} />}
                </AnimatePresence>

                {/* Global UI Elements */}
                <Suspense fallback={null}>
                    <AnimatePresence>
                        {showLogin && <Login onClose={() => setShowLogin(false)} onLogin={() => setShowLogin(false)} />}
                    </AnimatePresence>
                </Suspense>

                {/* Cyber Marquee - Top News Ticker */}
                <div className="fixed bottom-0 left-0 w-full z-[100]">
                    <CyberMarqueeFramer items={[
                        "LANÇAMENTO: RTX 4090 TI DISPONÍVEL",
                        "NOVO DROP DE SKINS: VALORANT - SEASON 8",
                        "PROMOÇÃO RELÂMPAGO: -50% EM PERIFÉRICOS RAZER",
                        "NEXUS PRIME: FRETE GRÁTIS EM TODO O BRASIL",
                        "CS2 MAJOR: ACOMPANHE A COBERTURA COMPLETA"
                    ]} speed={40} />
                </div>

                {/* Layout - Navbar V5 (Cyber HUD) */}
                <NavbarV5 onLoginClick={() => setShowLogin(true)} />

                {/* Sidebar handles navigation internally now */}
                <CartSidebar />

                <main className="relative z-10 pt-0 bg-[#050B14]">
                    <Suspense fallback={<RouteLoader />}>
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<Home />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/product/:id" element={<ProductDetails />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Routes>
                        </AnimatePresence>
                    </Suspense>
                </main>

                <div id="footer">
                    <Footer />
                </div>
            </div>
        </CartProvider>
    );
}

export default App;
