import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaShieldAlt, FaTruck, FaUndo, FaCheck, FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useSound } from '../../context/SoundContext';
import { useWishlist } from '../../context/WishlistContext';
import { productsData } from '../../data/products';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, toggleCart } = useCart();
    const { showToast } = useToast();
    const { playSound } = useSound();
    const { toggleWishlist, isInWishlist } = useWishlist();

    // Find Product
    const product = productsData.find(p => p.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const isWishlisted = product ? isInWishlist(product.id) : false;

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image, // Fixed: use product.image as main image
                category: product.category
            });
            toggleCart();
            showToast(`${product.name} ADDED TO ARSENAL`, 'success');
            playSound('success');
        }
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050B14] text-white">
                <h1 className="text-4xl font-display">PRODUCT NOT FOUND</h1>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#050B14]"
        >
            {/* Nav Offset */}
            <div className="h-20"></div>

            {/* Breadcrumb / Back */}
            <div className="container mx-auto px-4 py-6">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-neon transition-colors">
                    <FaArrowLeft /> Voltar para Loja
                </Link>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">

                {/* Left Column: Gallery */}
                <div>
                    <div className="aspect-square bg-[#0f172a] rounded-2xl overflow-hidden border border-white/10 mb-4 group relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {product.fpsStats && (
                            <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded border border-brand-neon/50">
                                <span className="text-brand-neon font-bold text-sm tracking-widest">{product.fpsStats.fps} FPS</span>
                                <span className="text-gray-400 text-xs ml-2">IN {product.fpsStats.game.toUpperCase()}</span>
                            </div>
                        )}
                    </div>

                    {/* Thumbnails (Mocked since we reused main image in data mainly) */}
                    <div className="grid grid-cols-4 gap-4">
                        {product.gallery.map((img, idx) => (
                            <div key={idx} className={`aspect-square bg-[#0f172a] rounded-lg overflow-hidden border ${idx === 0 ? 'border-brand-neon' : 'border-white/10 cursor-pointer hover:border-white/30'}`}>
                                <img src={img} className="w-full h-full object-cover" alt="" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="text-gray-200">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="bg-brand-neon/10 text-brand-neon text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{product.category}</span>
                        {product.badge && <span className="bg-[#ff4655] text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{product.badge}</span>}
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-display font-black text-white mb-4 leading-none uppercase">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-8 text-sm">
                        <div className="flex text-yellow-500">
                            {Array(5).fill(0).map((_, i) => <FaStar key={i} />)}
                        </div>
                        <span className="text-gray-400 underline">{product.reviews} Reviews</span>
                        <span className="text-gray-600">|</span>
                        <span className="text-green-500 font-bold flex items-center gap-1"><FaCheck /> In Stock</span>
                    </div>

                    {/* Price Box */}
                    <div className="bg-[#0f172a] p-6 rounded-xl border border-white/5 mb-8">
                        <div className="flex items-end gap-4 mb-2">
                            <span className="text-4xl font-bold text-white">R$ {product.price.toFixed(2)}</span>
                            {product.oldPrice && <span className="text-gray-500 line-through mb-1">R$ {product.oldPrice.toFixed(2)}</span>}
                        </div>
                        <p className="text-gray-400 text-sm mb-6">Em até 12x de R$ {(product.price / 12).toFixed(2)} sem juros</p>

                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-brand-neon hover:bg-white text-black font-black uppercase tracking-widest py-4 rounded-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_20px_#00ff9d]"
                            >
                                <FaShoppingCart /> Add to Arsenal
                            </button>
                            <button
                                onClick={() => product && toggleWishlist(product)}
                                className={`w-16 rounded-lg flex items-center justify-center transition-all border ${isWishlisted ? 'bg-brand-neon/20 border-brand-neon text-brand-neon shadow-[0_0_15px_rgba(0,242,234,0.3)]' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}
                            >
                                {isWishlisted ? <FaHeart className="text-xl" /> : <FaRegHeart className="text-xl" />}
                            </button>
                        </div>
                    </div>

                    {/* Quick Specs */}
                    <div className="mb-8 p-6 bg-[#0f172a]/50 rounded-xl border border-white/5">
                        <h3 className="font-bold text-white mb-4 uppercase tracking-wider">Tech Specs</h3>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            {Object.entries(product.specs).map(([key, value]) => (
                                <div key={key}>
                                    <span className="block text-gray-500 text-xs uppercase">{key}</span>
                                    <span className="text-white font-mono">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Value Props */}
                    <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-400">
                        <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/5">
                            <FaShieldAlt className="text-xl text-brand-purple" />
                            <span>2 Year Warranty</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/5">
                            <FaTruck className="text-xl text-brand-purple" />
                            <span>Fast Shipping</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/5">
                            <FaUndo className="text-xl text-brand-purple" />
                            <span>30 Day Returns</span>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-white/10 pt-8">
                        <h3 className="font-bold text-white mb-2 uppercase tracking-wider">Description</h3>
                        <p className="text-gray-400 leading-relaxed">{product.description}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetails;
