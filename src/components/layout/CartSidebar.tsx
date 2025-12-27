import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
    onCheckout?: () => void;
}

const CartSidebar = ({ onCheckout }: CartSidebarProps) => {
    const { isCartOpen, toggleCart, cart, removeFromCart, total } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
        if (onCheckout) onCheckout();
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="fixed inset-y-0 right-0 w-full md:w-96 bg-[#111] z-[70] border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0f0f0f]">
                            <h3 className="text-xl font-display font-bold text-white">SEU CARRINHO</h3>
                            <button onClick={toggleCart} className="text-gray-400 hover:text-brand-neon">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                    <p>Seu carrinho está vazio.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map((item, index) => (
                                        <div key={index} className="flex gap-4 bg-white/5 p-3 rounded-lg border border-white/5">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-white leading-tight mb-1">{item.name}</h4>
                                                <span className="text-brand-neon font-mono text-sm">R$ {item.price.toFixed(2)}</span>
                                            </div>
                                            <button onClick={() => removeFromCart(index)} className="text-gray-500 hover:text-red-500 px-2 transition-colors">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-white/10 bg-[#0f0f0f]">
                            <div className="flex justify-between mb-4 text-white font-bold text-lg">
                                <span>Total</span>
                                <span className="text-brand-neon">R$ {total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-brand-neon text-brand-dark font-bold py-3 rounded cyber-clip hover:bg-white transition-colors"
                            >
                                FINALIZAR COMPRA
                            </button>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
