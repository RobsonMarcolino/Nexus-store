import { useState } from 'react';
import ProductCard from './ProductCard';
import { FaFire } from 'react-icons/fa';
import { productsData } from '../../../data/products';

const ProductArsenal = () => {
    const [filter, setFilter] = useState('Todos');
    const categories = ['Todos', 'Hardware', 'Periféricos', 'Monitores'];

    const filtered = filter === 'Todos' ? productsData : productsData.filter(p => p.category === filter);

    return (
        <section className="py-20 relative bg-[#050B14]">
            {/* Divider Line */}
            <div className="max-w-[1400px] mx-auto px-6 mb-16 relative">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative">

                {/* User Requested 3D Character Decoration */}
                <div className="absolute right-0 -top-32 z-0 hidden lg:block pointer-events-none opacity-90">
                    <img
                        src="https://br.leveluplatam.com/wp-content/uploads/2022/12/bg_benefits.webp"
                        alt="Character"
                        className="w-[500px] h-auto object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Header with Cyber Style */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 relative z-10 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-12 bg-gradient-to-b from-brand-neon to-brand-purple skew-x-[-20deg]"></div>
                        <div>
                            <h2 className="text-4xl font-display font-bold text-white uppercase tracking-wider mb-1">
                                Gamer's <span className="text-brand-purple">Arsenal</span>
                            </h2>
                            <p className="text-gray-400 text-xs font-bold tracking-[0.3em] uppercase">Equipamento de Elite para Jogadores de Elite</p>
                        </div>
                    </div>

                    {/* Cyber Filter Tabs */}
                    <div className="flex gap-2 bg-black/40 p-1.5 rounded-none border border-white/10 backdrop-blur-sm skew-x-[-10deg]">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`
                                    px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300
                                    ${filter === cat
                                        ? 'bg-brand-neon text-black shadow-[0_0_15px_rgba(0,242,234,0.4)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                <span className="skew-x-[10deg] inline-block">{cat}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Featured Item (Left Column - 1x Height) */}
                    <div className="hidden lg:block lg:col-span-1 rounded-3xl overflow-hidden relative group h-full min-h-[500px] border border-white/10">
                        <img
                            src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop"
                            alt="VR Headset"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/90 via-[#050B14]/40 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 p-8">
                            <div className="bg-brand-neon text-black text-xs font-bold px-3 py-1 rounded w-fit mb-4 flex items-center gap-2">
                                <FaFire /> DESTAQUE
                            </div>
                            <h3 className="text-3xl font-display font-bold text-white mb-2">PRONTO PARA VR</h3>
                            <p className="text-gray-200 mb-6 text-sm">Experimente a próxima geração de imersão com nossa coleção VR.</p>
                            <button className="bg-white text-black font-bold py-3 px-8 rounded hover:bg-gray-200 transition-colors w-full">
                                Explorar VR
                            </button>
                        </div>
                    </div>

                    {/* Grid (Right Column - 3x Width) */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filtered.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductArsenal;
