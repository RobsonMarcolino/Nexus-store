import React, { useState } from 'react';
import GameModal from './GameModal';

interface GameCardProps {
    title: string;
    image: string;
    followers: string;
    isPlus?: boolean;
    onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ title, image, followers, isPlus, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer transition-all duration-300 hover:z-20 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,242,234,0.3)]"
        >
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

            {/* Logo/Title overlay at bottom */}
            <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-center text-center">
                {/* Title */}
                {!isPlus && (
                    <span className="text-white font-bold text-xl drop-shadow-md mb-2 uppercase tracking-wider">
                        {title}
                    </span>
                )}

                {/* Followers Count */}
                <div className="flex items-center gap-1.5 text-gray-300 text-xs font-medium">
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    <span>{followers} Seguidores</span>
                </div>
            </div>

            {/* Plus Button Overlay */}
            {isPlus && (
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-600/20 backdrop-blur-[1px]">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

const TrendingGames: React.FC = () => {
    const [selectedGame, setSelectedGame] = useState<any>(null);

    const games = [
        {
            title: "Halo Infinite",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1240440/library_600x900_2x.jpg",
            followers: "128k",
            videoUrl: "https://www.youtube.com/embed/PyMlV5_HRWk",
            description: "Torne-se o Master Chief e explore a escala massiva do anel Halo no jogo Halo mais ambicioso já feito.",
            price: "Grátis"
        },
        {
            title: "Fortnite",
            image: "https://i.pinimg.com/736x/c2/cc/aa/c2ccaae35a17d7c49001ff9b43b3d859.jpg",
            isPlus: false, // Changed to false to show details
            followers: "945k",
            videoUrl: "https://www.youtube.com/embed/WJW-bzXZM8M",
            description: "Entre na ação no Battle Royale de 100 jogadores. Construa, batalhe e crie no mundo de Fortnite.",
            price: "Grátis"
        },
        {
            title: "Cyberpunk 2077",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900_2x.jpg",
            followers: "1.2M",
            videoUrl: "https://www.youtube.com/embed/8X2kIfS6fb8",
            description: "Cyberpunk 2077 é um RPG de ação e aventura em mundo aberto ambientado no futuro sombrio de Night City.",
            price: "R$ 199,90"
        },
        {
            title: "Ori and the Will of the Wisps",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1057090/library_600x900_2x.jpg",
            followers: "45k",
            videoUrl: "https://www.youtube.com/embed/2reK8k8nwBc",
            description: "Embarque em uma nova aventura em um vasto mundo cheio de novos amigos e inimigos que ganham vida com arte pintada à mão.",
            price: "R$ 129,00"
        },
        {
            title: "Valorant",
            image: "https://i.pinimg.com/736x/7f/e2/76/7fe2762045cd672f6f7ed248ca4c407c.jpg",
            followers: "892k",
            videoUrl: "https://www.youtube.com/embed/e_E9W2vsRbQ",
            description: "Misture seu estilo e experiência em um cenário global e competitivo. Você tem 13 rodadas para atacar e defender seu lado.",
            price: "Grátis"
        },
        {
            title: "Elden Ring",
            image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900_2x.jpg",
            followers: "3.4M",
            videoUrl: "https://www.youtube.com/embed/E3Huy2cdih0",
            description: "O NOVO RPG DE AÇÃO DE FANTASIA. Levante-se, Maculado, e deixe-se guiar peça graça para brandir o poder de Elden Ring.",
            price: "R$ 229,90"
        }
    ];

    return (
        <section className="py-20 max-w-[1920px] mx-auto relative overflow-hidden">
            {/* Background Video (Street Fighter 6 WebM) */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-20"
                >
                    <source src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/extras/65f6053f32d73fd63f096f6e02e2f935.webm?t=1761116384" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/80 to-transparent"></div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                {/* Floating Character REMOVED for better alignment */}

                <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-10 bg-brand-neon skew-x-[-20deg]"></div>
                        <h3 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
                            Jogos em <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-purple">Destaque</span>
                        </h3>
                    </div>

                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-neon/50 text-white px-6 py-2 rounded-none skew-x-[-10deg] transition-all group">
                        <span className="skew-x-[10deg] font-bold text-sm tracking-widest uppercase group-hover:text-brand-neon transition-colors">Ver Todos</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
                    {games.map((game, index) => (
                        <GameCard
                            key={index}
                            {...game}
                            onClick={() => setSelectedGame(game)}
                        />
                    ))}
                </div>
            </div>

            {/* Interactive Game Modal */}
            <GameModal
                isOpen={!!selectedGame}
                game={selectedGame}
                onClose={() => setSelectedGame(null)}
            />
        </section>
    );
};

export default TrendingGames;
