import React from 'react';

const categories = [
    {
        id: 1,
        name: "FPS Shooters",
        count: "42+ Jogos",
        image: "https://i.pinimg.com/1200x/f4/01/ae/f401ae0f5666acb5cedff1d2c193b717.jpg"
    },
    {
        id: 2,
        name: "Aventuras RPG",
        count: "85+ Jogos",
        image: "https://i.pinimg.com/1200x/6e/81/cc/6e81ccca52532365c37a45303070898b.jpg"
    },
    {
        id: 3,
        name: "Corrida",
        count: "28+ Jogos",
        image: "https://i.pinimg.com/736x/f7/97/74/f797748f3859be61a2c362caaa6402a5.jpg"
    },
    {
        id: 4,
        name: "Battle Royale",
        count: "15+ Jogos",
        image: "https://i.pinimg.com/1200x/7e/87/92/7e8792681d1a1dc0b131e5a74cdc682d.jpg"
    }
];

const CategoryGrid: React.FC = () => {
    return (
        <section className="py-16 relative z-10 overflow-hidden">
            {/* User Requested Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-30"
                >
                    <source src="https://cdn.akamai.steamstatic.com/apps/csgo/videos/csgo_react/cs2/cs2_header.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/80 to-transparent"></div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-10 bg-brand-purple skew-x-[-20deg]"></div>
                        <div>
                            <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wider leading-none mb-1">
                                Explorar <span className="text-brand-neon">Categorias</span>
                            </h2>
                            <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase">Encontre sua próxima aventura</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-brand-neon/50 transition-all duration-300">
                            {/* Background Image */}
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-xl font-bold text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{cat.name}</h3>
                                <p className="text-brand-neon text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                    {cat.count}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
