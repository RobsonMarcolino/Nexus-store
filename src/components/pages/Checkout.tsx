import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { FaCreditCard, FaCheckCircle, FaLock, FaUser, FaMapMarkerAlt, FaMoneyBillWave, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, total, removeFromCart, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const { addOrder } = useOrders();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    // Auth Guard
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-[#050B14]">
                <div className="max-w-md w-full bg-[#0f172a] border border-red-500/30 p-8 rounded-2xl text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/5"></div>
                    <FaLock className="text-5xl text-red-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-white mb-2">RESTRICTED AREA</h2>
                    <p className="text-gray-400 mb-8">Access denied. Personnel identification required to proceed with arsenal acquisition.</p>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-white/5 border border-white/10 text-white font-bold py-3 rounded hover:bg-white/10 transition-colors mb-4"
                    >
                        RETURN TO BASE
                    </button>
                    <p className="text-xs text-gray-500">Please log in via the main terminal (Navbar).</p>
                </div>
            </div>
        );
    }

    const handleNext = () => {
        if (step === 2) {
            // Play Success Sound/Effect here if available
            addOrder(cart, total);
            clearCart();
        }
        setStep(step + 1);
    };

    if (step === 3) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-[#050B14] relative overflow-hidden">
                {/* Victory Particles */}
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-brand-neon rounded-full"
                        initial={{
                            x: '50%',
                            y: '50%',
                            opacity: 1
                        }}
                        animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            opacity: 0,
                            scale: 0
                        }}
                        transition={{
                            duration: 1.5,
                            ease: "easeOut",
                            delay: Math.random() * 0.2
                        }}
                    />
                ))}

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-2xl w-full bg-[#0f172a] border border-brand-neon/30 p-12 rounded-2xl relative overflow-hidden text-center z-10"
                >
                    <div className="absolute inset-0 bg-brand-neon/5"></div>
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="w-24 h-24 bg-brand-neon rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,242,234,0.6)]"
                    >
                        <FaCheckCircle className="text-5xl text-black" />
                    </motion.div>

                    <h2 className="text-4xl font-display font-bold text-white mb-2">MISSÃO CUMPRIDA</h2>
                    <p className="text-gray-400 mb-8">Equipamento adquirido. Enviando suprimentos para suas coordenadas.<br />Pedido #NX-{Math.floor(Math.random() * 99999)} confirmado.</p>

                    <div className="bg-black/30 p-6 rounded-lg mb-8 text-left border border-white/5">
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Resumo do Pedido</h3>
                        {cart.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-gray-400 text-sm mb-2">
                                <span>{item.name}</span>
                                <span className="text-brand-neon">R$ {item.price.toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t border-white/10 mt-4 pt-4 flex justify-between text-white font-bold">
                            <span>TOTAL</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link to="/" className="inline-block bg-brand-neon text-black font-bold px-8 py-3 rounded hover:bg-white transition-colors w-full sm:w-auto transform hover:scale-105 duration-200">
                        RETORNAR À BASE
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen pt-32 pb-20 px-4 max-w-[1200px] mx-auto bg-[#050B14]"
        >

            {/* Back to Home */}
            <div className="mb-8">
                <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-brand-neon transition-colors w-fit">
                    <FaArrowLeft /> Return to Home
                </Link>
            </div>

            {/* Stepper Header */}
            <div className="flex justify-center mb-12">
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-neon' : 'text-gray-600'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold ${step >= 1 ? 'border-brand-neon bg-brand-neon/20' : 'border-gray-600'}`}>1</div>
                        <span className="font-bold hidden sm:block">SHIPPING</span>
                    </div>
                    <div className="w-12 h-px bg-white/10"></div>
                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand-neon' : 'text-gray-600'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold ${step >= 2 ? 'border-brand-neon bg-brand-neon/20' : 'border-gray-600'}`}>2</div>
                        <span className="font-bold hidden sm:block">PAYMENT</span>
                    </div>
                    <div className="w-12 h-px bg-white/10"></div>
                    <div className={`flex items-center gap-2 ${step >= 3 ? 'text-brand-neon' : 'text-gray-600'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold ${step >= 3 ? 'border-brand-neon bg-brand-neon/20' : 'border-gray-600'}`}>3</div>
                        <span className="font-bold hidden sm:block">CONFIRMATION</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Forms */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Step 1: Shipping Details */}
                    {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-[#0f172a] p-8 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><FaUser className="text-brand-neon" /> Personal Info</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all" placeholder="Full Name" />
                                    <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all" placeholder="Email Address" />
                                    <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all md:col-span-2" placeholder="CPF" />
                                </div>
                            </div>

                            <div className="bg-[#0f172a] p-8 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><FaMapMarkerAlt className="text-brand-neon" /> Shipping Address</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all" placeholder="CEP" />
                                    <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all" placeholder="City" />
                                    <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all md:col-span-2" placeholder="Address (Street, Number)" />
                                    <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all" placeholder="State" />
                                    <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all" placeholder="Neighborhood" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Payment */}
                    {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            <div className="bg-[#0f172a] p-8 rounded-2xl border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><FaMoneyBillWave className="text-brand-neon" /> Payment Method</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    <button
                                        onClick={() => setPaymentMethod('card')}
                                        className={`p-4 rounded-xl font-bold flex flex-col items-center gap-2 transition-all border-2 ${paymentMethod === 'card' ? 'bg-brand-neon/10 border-brand-neon text-brand-neon' : 'bg-black/40 border-white/10 text-gray-400 hover:border-white'}`}
                                    >
                                        <FaCreditCard className="text-2xl" />
                                        Credit Card
                                    </button>
                                    <button
                                        onClick={() => setPaymentMethod('pix')}
                                        className={`p-4 rounded-xl font-bold flex flex-col items-center gap-2 transition-all border-2 ${paymentMethod === 'pix' ? 'bg-brand-neon/10 border-brand-neon text-brand-neon' : 'bg-black/40 border-white/10 text-gray-400 hover:border-white'}`}
                                    >
                                        <span className="text-2xl font-black">PIX</span>
                                        Instant Approval
                                    </button>
                                </div>

                                {paymentMethod === 'card' ? (
                                    <div className="space-y-4 animate-fade-in">
                                        <input className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all" placeholder="Card Number (0000 0000 0000 0000)" maxLength={19} />
                                        <input className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all" placeholder="Cardholder Name" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all" placeholder="Expiry (MM/YY)" maxLength={5} />
                                            <input className="bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-brand-neon focus:outline-none focus:ring-1 focus:ring-brand-neon transition-all" placeholder="CVV" maxLength={3} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-4 py-8 animate-fade-in bg-black/20 rounded-xl border border-dashed border-white/10">
                                        <div className="w-32 h-32 bg-white p-2 mx-auto rounded-lg">
                                            {/* QR Code Placeholder - using a simple div structure for visual simulation without external image deps for stability */}
                                            <div className="w-full h-full bg-white flex items-center justify-center p-2">
                                                <div className="w-full h-full bg-black flex items-center justify-center">
                                                    <span className="text-[10px] text-white text-center font-mono">SCAN QR<br />CODE</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm">Scan the QR Code with your bank app</p>
                                        <div className="inline-block bg-white/5 px-4 py-2 rounded text-xs font-mono text-brand-neon cursor-pointer hover:bg-white/10 border border-white/5">
                                            00020126580014BR.GOV.BCB.PIX... (Click to copy)
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                </div>

                {/* Right Column: Order Summary (Sticky) */}
                <div className="h-fit lg:sticky lg:top-24">
                    <div className="bg-[#0f172a] p-6 rounded-2xl border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item, index) => (
                                <div key={index} className="flex gap-3 text-sm group">
                                    <div className="relative">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-white/5 border border-white/5" />
                                        <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">1</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-200 font-bold leading-tight mb-1">{item.name}</p>
                                        <p className="text-gray-500 text-xs uppercase">{item.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-mono">R$ {item.price.toFixed(2)}</p>
                                        <button onClick={() => removeFromCart(index)} className="text-red-500 text-xs hover:underline mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 text-sm text-gray-400 border-t border-white/10 pt-4 mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>R$ {total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-brand-neon">Calculated next step</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taxes</span>
                                <span>R$ 0.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-xl font-bold text-white mb-8 pt-4 border-t border-white/10">
                            <span>Total</span>
                            <span>R$ {total.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full bg-brand-neon hover:bg-white text-black font-black uppercase tracking-widest py-4 rounded-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_20px_#00ff9d]"
                        >
                            {step === 1 ? 'PROCEED TO PAYMENT' : 'COMPLETE ORDER'} <FaLock size={12} />
                        </button>

                        <div className="mt-6 flex flex-col items-center gap-2 text-xs text-center text-gray-500">
                            <div className="flex gap-2 text-lg">
                                <FaCreditCard /> <FaLock /> <FaShieldAlt className="text-brand-neon" />
                            </div>
                            <span>Protected by 256-bit SSL Encryption.<br />Your data is safe with us.</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Checkout;
