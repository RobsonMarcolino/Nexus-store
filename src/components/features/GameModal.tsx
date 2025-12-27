import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSteam, FaHeart, FaCartPlus, FaWindows, FaApple } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useWishlist } from '../../context/WishlistContext';

interface Game {
    id: number; // Added ID to interface
    title: string;
    image: string;
    followers: string;
    videoUrl?: string;
    description?: string;
    price?: string;
}

interface GameModalProps {
    game: Game | null;
    isOpen: boolean;
    onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const { toggleWishlist, isInWishlist } = useWishlist();

    if (!isOpen || !game) return null;

    const isWishlisted = isInWishlist(game.id || Date.now()); // Fallback ID if missing, typically game should have ID

    // Use provided video or fallback to generic gameplay
    const videoSrc = game.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";

    const handleAddToCart = () => {
        // Parse price string to number "R$ 149,90" -> 149.90
        const priceString = game.price?.replace('R$', '').replace('.', '').replace(',', '.').trim() || "0";
        const price = parseFloat(priceString);

        addToCart({
            id: game.id || Date.now(), // Use generic ID if missing
            name: game.title,
            price: isNaN(price) ? 0 : price,
            category: "Game Key",
            image: game.image,
            rating: 5
        });

        // showToast handled by CartContext mostly, but here we can show specific
        showToast(`${game.title} adicionado ao carrinho!`, 'success');
        onClose();
    };

    const handleWishlist = () => {
        // Construct product object for wishlist
        const priceString = game.price?.replace('R$', '').replace('.', '').replace(',', '.').trim() || "0";
        const price = parseFloat(priceString);

        toggleWishlist({
            id: game.id || Date.now(),
            name: game.title,
            price: isNaN(price) ? 0 : price,
            category: "Game Key",
            image: game.image,
            rating: 5
        });
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                onClick={onClose}
            >
                <div
                    className="w-full max-w-5xl bg-[#0F172A] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,242,234,0.1)] relative flex flex-col lg:flex-row"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-brand-neon hover:text-black transition-all backdrop-blur-sm border border-white/10"
                    >
                        <FaTimes />
                    </button>

                    {/* Video Section (Left/Top) - 65% width on desktop */}
                    <div className="lg:w-[65%] aspect-video lg:aspect-auto bg-black relative">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`${videoSrc}?autoplay=1&rel=0&controls=1&modestbranding=1`}
                            title={game.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full object-cover"
                        ></iframe>
                    </div>

                    {/* Details Section (Right/Bottom) - 35% width on desktop */}
                    <div className="lg:w-[35%] p-8 flex flex-col justify-between bg-[#0b111e] border-l border-white/5 text-left">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-brand-neon text-black rounded-sm">
                                    Jogo Base
                                </span>
                            </div>
                            <h2 className="text-3xl font-display font-bold text-white mb-2 leading-none">{game.title}</h2>
                            <div className="flex items-center gap-3 text-xs text-gray-400 mb-6">
                                <span className="flex items-center gap-1"><FaSteam /> Steam</span>
                                <span>•</span>
                                <span>{game.followers} Seguidores</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-sm mb-6 opacity-80">
                                {game.description || `Mergulhe no mundo de ${game.title}. Experimente gráficos de nova geração e jogabilidade imersiva neste título aclamado.`}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {['Ação', 'Multijogador', 'Co-op'].map(tag => (
                                    <span key={tag} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-white font-bold text-xl border-t border-white/10 pt-4">
                                <span className="text-2xl">{game.price || "R$ 149,90"}</span>
                                <div className="flex gap-2 text-gray-400">
                                    <FaWindows title="Windows" />
                                    <FaApple title="macOS" />
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 bg-brand-neon text-black font-bold uppercase tracking-wider hover:bg-white transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,234,0.3)]"
                            >
                                <FaCartPlus /> Adicionar ao Carrinho
                            </button>
                            <button
                                onClick={handleWishlist}
                                className={`w-full py-3 font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-xs border ${isWishlisted ? 'bg-brand-neon text-black border-brand-neon' : 'bg-white/5 text-white hover:bg-white/10 border-white/10'}`}
                            >
                                <FaHeart className={isWishlisted ? 'text-red-600' : ''} />
                                {isWishlisted ? 'Remover da Lista' : 'Lista de Desejos'}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default GameModal;
