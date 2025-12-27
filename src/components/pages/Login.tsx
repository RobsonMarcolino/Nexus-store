import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaGoogle, FaGithub } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

interface LoginProps {
    onClose?: () => void;
    onLogin: () => void;
}

const Login = ({ onClose, onLogin }: LoginProps) => {
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate auth
        setTimeout(() => {
            login('Gamer Agent', email || 'agent@nexus.com'); // Update Global Context
            onLogin();
            if (onClose) onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#0f172a] border border-brand-neon/20 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)]"
            >
                {/* Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-neon to-transparent"></div>

                <div className="text-center mb-8">
                    <FaGamepad className="text-4xl text-brand-neon mx-auto mb-4" />
                    <h2 className="text-3xl font-display font-bold text-white mb-2">
                        {isLogin ? 'SYSTEM ACCESS' : 'NEW RECRUIT'}
                    </h2>
                    <p className="text-gray-400 text-sm">Entre para o esquadrão de elite.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-brand-neon uppercase tracking-wider mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-brand-neon focus:outline-none transition-colors"
                            placeholder="user@nexus.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-brand-neon uppercase tracking-wider mb-1">Senha</label>
                        <input type="password" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-brand-neon focus:outline-none transition-colors" placeholder="••••••••" />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-bold text-brand-neon uppercase tracking-wider mb-1">Confirmar Senha</label>
                            <input type="password" className="w-full bg-black/40 border border-white/10 rounded p-3 text-white focus:border-brand-neon focus:outline-none transition-colors" placeholder="••••••••" />
                        </div>
                    )}

                    <button className="w-full bg-brand-neon text-brand-dark font-bold py-3 rounded hover:bg-white transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                        {isLogin ? 'Login' : 'Registrar'}
                    </button>
                </form>

                <div className="mt-6 flex flex-col gap-3">
                    <button className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded hover:bg-white/10 transition-colors text-sm text-gray-300">
                        <FaGoogle /> Continuar com Google
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded hover:bg-white/10 transition-colors text-sm text-gray-300">
                        <FaGithub /> Continuar com GitHub
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-gray-400 hover:text-brand-neon text-sm transition-colors"
                    >
                        {isLogin ? 'Não tem conta? Crie agora' : 'Já tem conta? Fazer login'}
                    </button>
                </div>

                {/* Close Button if Modal */}
                {onClose && (
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                        ✕
                    </button>
                )}
            </motion.div>
        </div>
    );
};

export default Login;
