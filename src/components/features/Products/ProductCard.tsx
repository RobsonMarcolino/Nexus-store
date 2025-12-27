import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { DetailedProduct } from '../../../data/products';
import { Link } from 'react-router-dom';

interface Props {
    product: DetailedProduct; // Updated type
    index: number;
    onQuickView: (product: DetailedProduct) => void;
}

const ProductCard = ({ product, index, onQuickView }: Props) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-[#0f172a] border border-white/5 rounded-2xl overflow-hidden hover:border-brand-neon/50 hover:shadow-[0_0_20px_rgba(0,242,234,0.15)] transition-all duration-300"
        >
            {/* Wishlist Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                }}
                className={`absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isWishlisted ? 'bg-brand-neon text-black scale-110' : 'bg-black/50 text-white hover:bg-white hover:text-red-500'}`}
            >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>

            <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-[4/3] relative overflow-hidden cursor-pointer">
                    {product.badge && (
                        <span className="absolute top-3 left-3 bg-brand-neon text-black text-xs font-bold px-2 py-1 rounded z-20">
                            {product.badge}
                        </span>
                    )}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <span className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-neon">
                            Ver Detalhes
                        </span>
                    </div>
                </div>
            </Link>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-gray-500 text-xs uppercase font-bold tracking-wider">{product.category}</span>
                    <div className="flex text-yellow-500 text-xs">
                        {Array(5).fill(0).map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>
                </div>

                <Link to={`/product/${product.id}`}>
                    <h3 className="text-white font-bold text-lg mb-4 group-hover:text-brand-neon transition-colors truncate">{product.name}</h3>
                </Link>

                {/* FPS Performance Bar (New Feature) */}
                {product.fpsStats && (
                    <div className="mb-4 bg-black/40 p-2 rounded border border-white/5">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-400 mb-1">
                            <span>{product.fpsStats.game}</span>
                            <span className="text-brand-neon">{product.fpsStats.fps} FPS</span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-brand-purple to-brand-neon"
                                style={{ width: `${Math.min((product.fpsStats.fps / 500) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div>
                        {product.oldPrice && <span className="block text-gray-500 text-sm line-through">R$ {product.oldPrice.toFixed(2)}</span>}
                        <span className="text-white font-bold text-xl">R$ {product.price.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-white/5 text-brand-neon w-10 h-10 rounded-lg flex items-center justify-center hover:bg-brand-neon hover:text-black transition-all"
                    >
                        <FaShoppingCart />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
