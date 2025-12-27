import { FaSteam, FaDiscord, FaPlaystation, FaXbox, FaTwitch, FaWindows, FaApple } from 'react-icons/fa';
import { SiNvidia, SiIntel, SiAmd, SiAsus, SiRazer, SiLogitech } from 'react-icons/si';

const BrandsMarquee = () => {
    return (
        <div className="bg-[#050505] py-12 relative z-20 layer-3d overflow-hidden border-t border-b border-brand-neon/10">
            <div className="absolute inset-0 bg-brand-neon/5 blur-3xl opacity-20"></div>

            <div className="marquee-container relative">
                <div className="flex items-center gap-16 animate-scroll whitespace-nowrap w-max hover:[animation-play-state:paused] cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16">
                            <FaSteam className="text-4xl text-gray-500 hover:text-white transition-colors hover:scale-110 duration-300" />
                            <FaDiscord className="text-4xl text-gray-500 hover:text-[#5865F2] transition-colors hover:scale-110 duration-300" />
                            <FaPlaystation className="text-4xl text-gray-500 hover:text-[#00439C] transition-colors hover:scale-110 duration-300" />
                            <FaXbox className="text-4xl text-gray-500 hover:text-[#107C10] transition-colors hover:scale-110 duration-300" />
                            <FaTwitch className="text-4xl text-gray-500 hover:text-[#9146FF] transition-colors hover:scale-110 duration-300" />
                            <FaWindows className="text-4xl text-gray-500 hover:text-[#0078D6] transition-colors hover:scale-110 duration-300" />
                            <FaApple className="text-4xl text-gray-500 hover:text-white transition-colors hover:scale-110 duration-300" />
                            <SiNvidia className="text-4xl text-gray-500 hover:text-[#76B900] transition-colors hover:scale-110 duration-300" />
                            <SiIntel className="text-4xl text-gray-500 hover:text-[#0071C5] transition-colors hover:scale-110 duration-300" />
                            <SiAmd className="text-4xl text-gray-500 hover:text-[#ED1C24] transition-colors hover:scale-110 duration-300" />
                            <SiAsus className="text-4xl text-gray-500 hover:text-white transition-colors hover:scale-110 duration-300" />
                            <SiRazer className="text-4xl text-gray-500 hover:text-[#44D62C] transition-colors hover:scale-110 duration-300" />
                            <SiLogitech className="text-4xl text-gray-500 hover:text-white transition-colors hover:scale-110 duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandsMarquee;
