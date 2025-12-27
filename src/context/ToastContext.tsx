import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            layout
                            className="pointer-events-auto min-w-[300px]"
                        >
                            <div className={`
                                relative overflow-hidden p-4 rounded-lg bg-[#0f172a]/90 backdrop-blur-md border-l-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]
                                ${toast.type === 'success' ? 'border-brand-neon' :
                                    toast.type === 'error' ? 'border-red-500' : 'border-blue-500'}
                            `}>
                                {/* Scanline Effect */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,6px_100%] pointer-events-none"></div>

                                <div className="relative z-10 flex items-start gap-3">
                                    <div className={`mt-0.5 text-lg
                                        ${toast.type === 'success' ? 'text-brand-neon' :
                                            toast.type === 'error' ? 'text-red-500' : 'text-blue-500'}
                                    `}>
                                        {toast.type === 'success' && <FaCheckCircle />}
                                        {toast.type === 'error' && <FaExclamationTriangle />}
                                        {toast.type === 'info' && <FaInfoCircle />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-bold text-sm uppercase tracking-wider mb-1
                                            ${toast.type === 'success' ? 'text-brand-neon' :
                                                toast.type === 'error' ? 'text-red-500' : 'text-blue-500'}
                                        `}>
                                            {toast.type === 'success' ? 'System Notification' :
                                                toast.type === 'error' ? 'Critical Error' : 'Info Log'}
                                        </h4>
                                        <p className="text-gray-300 text-xs font-mono">{toast.message}</p>
                                    </div>
                                    <button
                                        onClick={() => removeToast(toast.id)}
                                        className="text-gray-500 hover:text-white transition-colors"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};
