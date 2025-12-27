import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

export interface Order {
    id: string;
    date: string;
    items: string; // Summary of items e.g., "RTX 4090 + 2 others"
    total: number;
    status: 'Processando' | 'Enviado' | 'Entregue';
    itemsDetails: any[]; // Full cart items
}

interface OrderContextType {
    orders: Order[];
    addOrder: (cartItems: any[], total: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { showToast } = useToast();

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('nexus_orders');
        if (saved) setOrders(JSON.parse(saved));
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('nexus_orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (cartItems: any[], total: number) => {
        const newOrder: Order = {
            id: `NX-${Math.floor(Math.random() * 10000)}`,
            date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
            items: cartItems.map(i => i.name).join(', '),
            total: total,
            status: 'Processando',
            itemsDetails: cartItems
        };

        setOrders(prev => [newOrder, ...prev]);
        // showToast('Pedido realizado com sucesso!', 'success'); // Checkout already shows success
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) throw new Error('useOrders must be used within a OrderProvider');
    return context;
};
