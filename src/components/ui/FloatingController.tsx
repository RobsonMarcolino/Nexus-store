import controllerImg from '../pages/GamerNavBar.png';

const FloatingController = () => {
    return (
        <div className="relative w-20 h-14 hidden xl:flex items-center justify-center pointer-events-none">
            {/* Controller Image (User Asset) */}
            <img
                src={controllerImg}
                alt="Gamer Controller"
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,242,234,0.3)]"
            />

            {/* Static Glow Underneath */}
            <div className="absolute -bottom-2 w-10 h-2 bg-brand-neon/30 blur-xl rounded-full" />
        </div>
    );
};

export default FloatingController;
