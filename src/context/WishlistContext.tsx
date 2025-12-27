import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    rating?: number;
    badge?: string;
    oldPrice?: number;
}

interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const { showToast } = useToast();

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('nexus_wishlist');
        if (saved) setWishlist(JSON.parse(saved));
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('nexus_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product: Product) => {
        setWishlist(prev => {
            if (prev.some(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
        showToast(`${product.name} adicionado aos favoritos!`, 'success');
    };

    const removeFromWishlist = (id: number) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
        showToast(`Item removido dos favoritos.`, 'info');
    };

    const isInWishlist = (id: number) => {
        return wishlist.some(item => item.id === id);
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
    return context;
};
