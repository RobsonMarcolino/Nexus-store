import { motion } from 'framer-motion';
import { FaCheck, FaTruck, FaBoxOpen, FaHome } from 'react-icons/fa';

const steps = [
    { label: 'Confirmado', icon: FaCheck, date: '26 Dez, 14:30' },
    { label: 'Em Separação', icon: FaBoxOpen, date: '26 Dez, 16:45' },
    { label: 'Em Trânsito', icon: FaTruck, date: 'Em breve' },
    { label: 'Entregue', icon: FaHome, date: '--' },
];

const OrderStatus = ({ currentStep = 2 }: { currentStep?: number }) => {
    return (
        <div className="w-full max-w-4xl mx-auto py-8">
            <div className="relative flex justify-between">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0"></div>
                <div
                    className="absolute top-1/2 left-0 h-1 bg-brand-neon -translate-y-1/2 z-0 transition-all duration-1000"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= currentStep;

                    return (
                        <div key={index} className="relative z-10 flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isActive ? 'bg-[#0f172a] border-brand-neon text-brand-neon shadow-[0_0_20px_rgba(0,243,255,0.5)]' : 'bg-[#0f172a] border-white/10 text-gray-600'}`}
                            >
                                <Icon className="text-xl" />
                            </motion.div>
                            <div className="mt-4 text-center">
                                <p className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-600'}`}>{step.label}</p>
                                <p className="text-xs text-brand-neon font-mono mt-1">{step.date}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderStatus;
