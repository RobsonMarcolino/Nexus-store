import { useState } from 'react';
import { Product } from '../../../context/CartContext';
import ProductCard from './ProductCard';

const productsData: Product[] = [
    { id: 1, name: 'RTX 4090 ROG Strix', category: 'Hardware', price: 14500.00, oldPrice: 15999.00, image: 'https://m.media-amazon.com/images/I/81xW62XhRCL._AC_SL1500_.jpg', badge: 'HOT' },
    { id: 2, name: 'Intel Core i9 14900K', category: 'Hardware', price: 4200.00, image: 'https://m.media-amazon.com/images/I/61uJ8+8yAIL._AC_SL1000_.jpg' },
    { id: 3, name: 'Mouse Logitech G Pro X', category: 'Periféricos', price: 799.00, image: 'https://resource.logitech.com/w_1200,h_1200,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight/pro-x-superlight-black-gallery-1.png?v=1' },
    { id: 4, name: 'Headset Cloud Alpha', category: 'Periféricos', price: 599.00, image: 'https://m.media-amazon.com/images/I/711V1-x-K+L._AC_SL1500_.jpg' },
    { id: 5, name: 'Monitor Alienware 360Hz', category: 'Monitores', price: 3200.00, image: 'https://m.media-amazon.com/images/I/81I-E6k1wLL._AC_SL1500_.jpg' },
    { id: 6, name: 'Teclado Apex Pro TKL', category: 'Periféricos', price: 1400.00, image: 'https://m.media-amazon.com/images/I/71K+nE-1yBL._AC_SL1500_.jpg', badge: 'BEST SELLER' }
    // Add more mock data as needed
];

const ProductGrid = () => {
    const [filter, setFilter] = useState('Todos');

    const filtered = filter === 'Todos' ? productsData : productsData.filter(p => p.category === filter);

    return (
        <section id="loja" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h2 className="text-4xl font-display font-bold text-white mb-6 md:mb-0">
                        NEXUS <span className="text-brand-neon">ARSENAL</span>
                    </h2>
                    <div className="flex gap-2">
                        {['Todos', 'Hardware', 'Periféricos', 'Monitores'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded border border-white/10 text-sm font-bold uppercase transition-all ${filter === cat ? 'bg-brand-neon text-black' : 'hover:bg-brand-neon hover:text-black text-gray-400'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                            onQuickView={(p) => console.log('Quick View', p)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
