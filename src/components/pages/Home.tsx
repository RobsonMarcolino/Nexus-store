import { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroV2 from '../features/HeroV2';
import TrendingGames from '../features/TrendingGames';
import CategoryGrid from '../features/CategoryGrid';
import ProductArsenal from '../features/Products/ProductArsenal';
import FlashSale from '../features/FlashSale';
import BrandsMarquee from '../features/BrandsMarquee';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-[#050B14]"
        >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 h-[100%] overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-blue-900/10 z-0"></div>
                <img
                    src="https://br.leveluplatam.com/wp-content/webp-express/webp-images/uploads/2023/03/Display-banner-principal-V2.png.webp"
                    alt="Gamer Background"
                    className="w-full h-full object-contain object-top md:object-[center_15%] opacity-80 mix-blend-normal transform translate-y-0 md:-translate-y-96 scale-100 md:scale-105"
                />
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-[#050B14]"></div>
            </div>

            <div className="relative z-10">
                <HeroV2 />
            </div>

            {/* Brands Marquee */}
            <div className="relative z-20 -mt-10 mb-10">
                <BrandsMarquee />
            </div>

            {/* Categories Section */}
            <div id="categories" className="relative bg-[#0b111e]/80 backdrop-blur-sm z-20 pt-20 pb-20 border-y border-white/5">
                <CategoryGrid />
            </div>

            {/* Flash Sales */}
            <div className="relative z-20">
                <FlashSale />
            </div>

            {/* Trending Games */}
            <div id="trending" className="relative bg-[#050B14] z-30 py-10">
                <TrendingGames />
            </div>

            {/* Gamer's Arsenal */}
            <div id="arsenal" className="relative bg-[#0b111e] z-10 pt-20 pb-20 border-t border-white/5">
                <ProductArsenal />
            </div>
        </motion.div>
    );
};

export default Home;
