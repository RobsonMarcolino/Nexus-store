import { useState } from 'react';
import ProductCard from './ProductCard';
import { productsData } from '../../../data/products';

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
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
