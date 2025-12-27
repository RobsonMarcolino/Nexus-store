import { products } from './data.js';
import { MatrixEffect } from './modules/MatrixEffect.js';
import { Countdown } from './modules/Countdown.js';
import { UI } from './modules/UI.js';
import { Products } from './modules/Products.js';

// Initialize System
document.addEventListener('DOMContentLoaded', () => {
    // 1. UI & Utilities
    const ui = new UI();
    window.showToast = ui.showToast.bind(ui); // Global toast helper

    // 2. Products System
    const store = new Products(products);

    // Wire up global filters
    window.filterSelection = (cat, btn) => {
        // Reset buttons visually
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-brand-neon', 'text-black');
            b.classList.add('bg-white/5', 'text-gray-400');
        });
        // Activate clicked
        btn.classList.remove('bg-white/5', 'text-gray-400');
        btn.classList.add('bg-brand-neon', 'text-black');

        store.render(cat);
    };

    window.toggleCart = () => {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        const isOpen = !sidebar.classList.contains('translate-x-full');

        if (isOpen) {
            sidebar.classList.add('translate-x-full');
            overlay.classList.add('hidden');
            overlay.classList.remove('opacity-100');
        } else {
            sidebar.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.add('opacity-100'), 10);
            store.updateCartUI(); // Ensure fresh data
        }
    };

    window.closeModal = () => store.closeModal();
    window.addToCart = (id) => {
        // Handle both direct product objects or string names (from flash sale)
        let product;
        if (typeof id === 'string') {
            // Mock product for flash sale item if not in DB
            product = { name: id, price: 12500, image: 'https://images.unsplash.com/photo-1591488320449-011701bb968d?q=80&w=1000' };
        } else {
            product = products.find(p => p.id === id);
        }

        if (product) store.addToCart(product);
    };

    // 3. Matrix Effect
    const matrix = new MatrixEffect('matrix-canvas');

    // 4. Flash Sale Timer (24h from now)
    const tomorrow = new Date().getTime() + (24 * 60 * 60 * 1000);
    new Countdown(tomorrow, {
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds'
    });

    console.log('SYSTEM ONLINE: Nexus Store Modules Loaded');
});
