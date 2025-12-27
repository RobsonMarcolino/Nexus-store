import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { FaUserAstronaut, FaBoxOpen, FaHeart, FaCog, FaTrophy, FaSignOutAlt, FaChevronRight, FaTimes, FaCheckCircle, FaTrash } from 'react-icons/fa';

const OrderDetailsModal = ({ order, isOpen, onClose }: { order: any, isOpen: boolean, onClose: () => void }) => {
    if (!order) return null;

    const steps = [
        { label: 'Processando', completed: true },
        { label: 'Enviado', completed: ['Enviado', 'Entregue'].includes(order.status) },
        { label: 'Em Trânsito', completed: order.status === 'Entregue' || (order.status === 'Enviado' && Math.random() > 0.5) }, // Mock logic
        { label: 'Entregue', completed: order.status === 'Entregue' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                            <FaTimes className="text-xl" />
                        </button>

                        <div className="p-8 border-b border-white/5 bg-black/20">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-brand-neon text-black text-xs font-bold px-2 py-1 rounded uppercase">Pedido Confidencial</span>
                                <span className="text-gray-400 text-sm font-mono">#{order.id}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white">Rastreamento de Missão</h2>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Tracking Timeline */}
                            <div className="relative">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 transform -translate-y-1/2 rounded-full"></div>
                                <div className="absolute top-1/2 left-0 h-1 bg-brand-neon transform -translate-y-1/2 rounded-full transition-all duration-1000" style={{ width: order.status === 'Entregue' ? '100%' : order.status === 'Enviado' ? '50%' : '25%' }}></div>

                                <div className="relative flex justify-between">
                                    {steps.map((step, index) => (
                                        <div key={index} className="flex flex-col items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 z-10 transition-colors ${step.completed ? 'bg-black border-brand-neon text-brand-neon' : 'bg-[#0f172a] border-gray-700 text-gray-600'}`}>
                                                {step.completed ? <FaCheckCircle /> : <div className="w-2 h-2 bg-gray-600 rounded-full"></div>}
                                            </div>
                                            <span className={`text-xs font-bold uppercase transition-colors ${step.completed ? 'text-brand-neon' : 'text-gray-600'}`}>{step.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="bg-white/5 rounded-lg p-6 border border-white/5">
                                <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Itens Adquiridos</h3>
                                <div className="space-y-4">
                                    {order.itemsDetails && order.itemsDetails.map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center text-gray-300">
                                            <div className="flex items-center gap-3">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded bg-gray-800 object-cover" />
                                                <span>{item.name}</span>
                                            </div>
                                            <span className="text-white font-bold">R$ {item.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                    {(!order.itemsDetails) && (
                                        <div className="flex justify-between items-center text-gray-300">
                                            <span>{order.items}</span>
                                            <span className="text-white font-bold">R$ {order.total.toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xl font-bold text-brand-neon">
                                    <span>Total</span>
                                    <span>R$ {order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const Dashboard = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { wishlist, removeFromWishlist } = useWishlist();
    const { orders } = useOrders();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'settings'>('orders');
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        if (!isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    if (!user) return null;

    // Mock Data Localized
    const stats = {
        rank: 'Agente de Elite',
        level: 42,
        xp: 75, // percentage
        joined: 'Dez 2025'
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-[#050B14]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar Profile */}
                <aside className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-neon"></div>
                        <div className="w-24 h-24 bg-brand-neon/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-brand-neon relative group">
                            <div className="absolute inset-0 bg-brand-neon/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <FaUserAstronaut className="text-4xl text-brand-neon relative z-10" />
                        </div>
                        <h2 className="text-xl font-bold text-white">{user.name}</h2>
                        <p className="text-gray-400 text-sm mb-4">{user.email}</p>

                        <div className="bg-black/40 rounded-lg p-3 mb-6 border border-white/5">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Patente</span>
                                <span className="text-brand-neon font-bold">{stats.rank}</span>
                            </div>
                            <div className="flex justify-between text-xs text-brand-purple mb-2">
                                <span>Nvl {stats.level}</span>
                                <span>{stats.xp}% XP</span>
                            </div>
                            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-brand-purple to-brand-neon shadow-[0_0_10px_#8b5cf6]" style={{ width: `${stats.xp}%` }}></div>
                            </div>
                        </div>

                        <nav className="space-y-2 text-left">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 p-3 rounded transition-all duration-300 ${activeTab === 'orders' ? 'bg-brand-neon text-black font-bold shadow-[0_0_15px_rgba(0,242,234,0.3)]' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                            >
                                <FaBoxOpen /> Missões Ativas (Pedidos)
                            </button>
                            <button
                                onClick={() => setActiveTab('wishlist')}
                                className={`w-full flex items-center gap-3 p-3 rounded transition-all duration-300 ${activeTab === 'wishlist' ? 'bg-brand-neon text-black font-bold shadow-[0_0_15px_rgba(0,242,234,0.3)]' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                            >
                                <FaHeart /> Arsenal (Favoritos)
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`w-full flex items-center gap-3 p-3 rounded transition-all duration-300 ${activeTab === 'settings' ? 'bg-brand-neon text-black font-bold shadow-[0_0_15px_rgba(0,242,234,0.3)]' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                            >
                                <FaCog /> Configurações
                            </button>
                            <button
                                onClick={() => { logout(); navigate('/'); }}
                                className="w-full flex items-center gap-3 p-3 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors mt-8 border border-transparent hover:border-red-500/30"
                            >
                                <FaSignOutAlt /> Deslogar
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-3 space-y-8">

                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-brand-purple/20 to-brand-neon/5 border border-brand-neon/20 rounded-2xl p-8 flex items-center justify-between backdrop-blur-sm">
                        <div>
                            <h1 className="text-3xl font-display font-bold text-white mb-2 uppercase">BEM-VINDO DE VOLTA, AGENTE</h1>
                            <p className="text-gray-400">Você tem <span className="text-brand-neon font-bold">{orders.length} missões ativas</span> no histórico.</p>
                        </div>
                        <FaTrophy className="text-6xl text-brand-neon/20 hidden sm:block animate-pulse" />
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'orders' && (
                            <motion.div
                                key="orders"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-[#0f172a] border border-white/5 rounded-2xl overflow-hidden"
                            >
                                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <FaBoxOpen className="text-brand-neon" /> Registro de Missões
                                    </h3>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {orders.length === 0 ? (
                                        <div className="p-8 text-center text-gray-400">
                                            Nenhuma missão registrada, agente.
                                        </div>
                                    ) : (
                                        orders.map((order) => (
                                            <div
                                                key={order.id}
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer group"
                                            >
                                                <div className="flex-1 text-center md:text-left">
                                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                                                        <span className="font-mono text-brand-neon font-bold group-hover:text-white transition-colors">#{order.id}</span>
                                                        <span className="text-gray-500 text-xs">{order.date}</span>
                                                    </div>
                                                    <p className="text-white font-bold">{order.items}</p>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'Processando' ? 'bg-yellow-500/10 text-yellow-500' :
                                                        order.status === 'Entregue' ? 'bg-green-500/10 text-green-500' : 'bg-gray-700 text-gray-300'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                    <div className="text-right hidden md:block">
                                                        <p className="text-gray-400 text-xs">Total</p>
                                                        <p className="text-white font-bold">R$ {order.total.toFixed(2)}</p>
                                                    </div>
                                                    <button className="text-gray-500 hover:text-brand-neon transition-colors transform group-hover:translate-x-1 duration-300">
                                                        <FaChevronRight />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'wishlist' && (
                            <motion.div
                                key="wishlist"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <FaHeart className="text-brand-purple" /> Seu Arsenal Desejado
                                </h3>

                                {wishlist.length === 0 ? (
                                    <div className="text-center py-20 bg-[#0f172a] rounded-2xl border border-white/5 border-dashed">
                                        <FaHeart className="text-6xl text-gray-700 mx-auto mb-4" />
                                        <p className="text-gray-400 text-lg">Seu arsenal está vazio, agente.</p>
                                        <button onClick={() => navigate('/')} className="mt-4 text-brand-neon hover:text-white underline font-bold transition-colors">
                                            Explorar Equipamentos
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {wishlist.map(item => (
                                            <div key={item.id} className="bg-[#0f172a] border border-white/5 rounded-xl overflow-hidden group">
                                                <div className="relative aspect-video">
                                                    <img src={item.image || "https://placehold.co/600x400/1a1a1a/FFF"} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                                        <button
                                                            onClick={() => removeFromWishlist(item.id)}
                                                            className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-full backdrop-blur-md transition-all"
                                                            title="Remover dos favoritos"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h4 className="text-white font-bold truncate mb-1">{item.name}</h4>
                                                    <p className="text-brand-neon font-mono">R$ {item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-[#0f172a] border border-white/5 rounded-2xl p-8"
                            >
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><FaCog /> Configurações da Conta</h3>
                                <p className="text-gray-400">Funcionalidades de configuração estarão disponíveis na próxima atualização do sistema.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </main>
            </div>

            {/* Order Details Modal */}
            <OrderDetailsModal
                order={selectedOrder}
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </div>
    );
};

export default Dashboard;
