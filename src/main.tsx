import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { SoundProvider } from './context/SoundContext';
import { ToastProvider } from './context/ToastContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <SoundProvider>
                <ToastProvider>
                    <AuthProvider>
                        <WishlistProvider>
                            <OrderProvider>
                                <CartProvider>
                                    <App />
                                </CartProvider>
                            </OrderProvider>
                        </WishlistProvider>
                    </AuthProvider>
                </ToastProvider>
            </SoundProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
