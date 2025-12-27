import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes, FaStar, FaShoppingCart } from 'react-icons/fa';
import { Product, useCart } from '../../../context/CartContext';

interface Props {
    product: Product | null;
    onClose: () => void;
}

const ProductModal = ({ product, onClose }: Props) => {
    const { addToCart } = useCart();

    if (!product) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-[#161616] border border-white/10 rounded-xl w-full max-w-4xl p-6 shadow-2xl overflow-hidden flex flex-col md:flex-row gap-8 z-10"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20">
                        <FaTimes className="text-2xl" />
                    </button>

                    <div className="w-full md:w-1/2 relative bg-white/5 rounded-lg flex items-center justify-center p-4">
                        <img src={product.image} alt={product.name} className="max-h-80 object-contain" />
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <span className="text-brand-neon font-bold text-sm mb-2 uppercase tracking-wide">Nexus Gear</span>
                        <h3 className="text-3xl font-display font-bold text-white mb-4">{product.name}</h3>

                        <div className="flex items-center gap-2 text-yellow-500 mb-4">
                            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                            <span className="text-gray-500 text-sm ml-2">(128 avaliações)</span>
                        </div>

                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Equipamento de alta performance projetado para eSports. Latência ultra-baixa, materiais premium e durabilidade extrema para aguentar suas sessões mais intensas.
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-3xl font-bold text-white">R$ {product.price.toFixed(2)}</span>
                            <button
                                onClick={() => {
                                    addToCart(product);
                                    onClose();
                                }}
                                className="bg-brand-neon text-black font-bold px-6 py-3 rounded hover:bg-white transition-colors flex items-center gap-2"
                            >
                                <FaShoppingCart /> ADICIONAR
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProductModal;
