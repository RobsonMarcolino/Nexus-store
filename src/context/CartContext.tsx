import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    rating?: number;
    badge?: string;
    oldPrice?: number;
    fpsStats?: {
        game: string;
        fps: number;
    };
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (index: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    isCartOpen: boolean;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('nexus_cart');
        if (saved) setCart(JSON.parse(saved));
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('nexus_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart([...cart, product]);
        setIsCartOpen(true);
    };

    const removeFromCart = (index: number) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, toggleCart, isCartOpen, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
