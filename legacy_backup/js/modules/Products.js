export class Products {
    constructor(productsData) {
        this.products = productsData;
        this.cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
        this.grid = document.getElementById('products-grid');
        this.modal = document.getElementById('quick-view-modal');
        this.activeFilter = 'todos';

        // Initial render
        this.render();
        this.updateCartUI();
    }

    render(category = 'todos') {
        this.activeFilter = category.toLowerCase();
        if (!this.grid) return;

        this.grid.innerHTML = '';

        const filtered = this.activeFilter === 'todos'
            ? this.products
            : this.products.filter(p => p.category === this.activeFilter);

        if (filtered.length === 0) {
            this.grid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-10">Nenhum produto encontrado.</p>';
            return;
        }

        filtered.forEach((product, index) => {
            const card = this.createCard(product, index);
            this.grid.appendChild(card);
        });
    }

    createCard(product, index) {
        const div = document.createElement('div');
        div.className = 'product-card glass rounded-xl overflow-hidden transition-all duration-300 border border-white/5 flex flex-col group reveal cursor-pointer';
        div.style.transitionDelay = `${index * 50}ms`;
        div.onclick = (e) => {
            // Did we click the Quick View or Add to Cart button?
            if (e.target.closest('button')) return;
            this.openModal(product);
        };

        div.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                ${product.badge ? `<span class="absolute top-3 left-3 bg-brand-neon text-brand-dark text-xs font-bold px-2 py-1 rounded z-20 shadow-lg">${product.badge}</span>` : ''}
                <div class="img-overlay h-full w-full">
                    <img src="${product.image}" class="product-img object-cover h-full w-full transition-transform duration-500">
                </div>
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <button class="quick-view-btn bg-white text-black font-bold py-2 px-4 rounded-full transform scale-90 group-hover:scale-100 transition-transform hover:bg-brand-neon hover:text-black border-none cursor-pointer">Quick View</button>
                </div>
            </div>
            <div class="p-5 flex-1 flex flex-col">
                <div class="mb-2">
                    <span class="text-xs text-gray-500 font-medium uppercase tracking-wider">${product.category}</span>
                    <div class="flex text-yellow-500 text-xs mt-1">
                        ${this.getStars(product.rating)}
                    </div>
                </div>
                <h3 class="text-lg font-bold text-white mb-2 leading-tight group-hover:text-brand-neon transition-colors">${product.name}</h3>
                <div class="mt-auto flex items-center justify-between">
                    <div>
                        ${product.oldPrice ? `<span class="block text-gray-500 text-sm line-through">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                        <span class="text-xl font-bold text-white">R$ ${product.price.toFixed(2)}</span>
                    </div>
                    <button class="add-to-cart-btn bg-brand-neon/10 hover:bg-brand-neon text-brand-neon hover:text-brand-dark w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 transform active:scale-95">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;

        // Bind events manually to avoid polluting global scope
        const quickView = div.querySelector('.quick-view-btn');
        const addToCart = div.querySelector('.add-to-cart-btn');

        quickView.addEventListener('click', () => this.openModal(product));
        addToCart.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addToCart(product);
        });

        return div;
    }

    addToCart(product) {
        this.cart.push(product);
        localStorage.setItem('nexus_cart', JSON.stringify(this.cart));
        this.updateCartUI();

        // Dispatch event for UI to pick up toast
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Adicionado: ${product.name}`, type: 'success' } }));
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('nexus_cart', JSON.stringify(this.cart));
        this.updateCartUI();
    }

    updateCartUI() {
        const count = document.getElementById('cart-count');
        const totalEl = document.getElementById('cart-total');
        const container = document.getElementById('cart-items-container');
        const emptyState = document.getElementById('cart-empty-state');

        if (count) {
            count.innerText = this.cart.length;
            count.classList.toggle('opacity-0', this.cart.length === 0);
        }

        if (container && emptyState) {
            if (this.cart.length === 0) {
                container.classList.add('hidden');
                emptyState.classList.remove('hidden');
            } else {
                container.classList.remove('hidden');
                emptyState.classList.add('hidden');
                container.innerHTML = '';

                let total = 0;
                this.cart.forEach((item, index) => {
                    total += item.price;
                    const el = document.createElement('div');
                    el.className = 'flex gap-4 mb-4 bg-white/5 p-3 rounded-lg border border-white/5 animate-pulse-glow';
                    el.innerHTML = `
                        <img src="${item.image}" class="w-16 h-16 object-cover rounded">
                        <div class="flex-1">
                            <h4 class="text-sm font-bold text-white leading-tight">${item.name}</h4>
                            <span class="text-brand-neon font-mono text-sm">R$ ${item.price.toFixed(2)}</span>
                        </div>
                        <button class="text-gray-500 hover:text-red-500 transition-colors h-full px-2" data-index="${index}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    `;
                    el.querySelector('button').onclick = () => this.removeFromCart(index);
                    container.appendChild(el);
                });

                if (totalEl) totalEl.innerText = `R$ ${total.toFixed(2)}`;
            }
        }
    }

    openModal(product) {
        if (!this.modal) return;

        // Populate modal
        document.getElementById('modal-title').innerText = product.name;
        document.getElementById('modal-price').innerText = `R$ ${product.price.toFixed(2)}`;
        document.getElementById('modal-img').src = product.image;

        const btn = document.getElementById('modal-add-btn');
        // Clone button to remove previous event listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);

        newBtn.onclick = () => {
            this.addToCart(product);
            this.closeModal();
        };

        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    getStars(rating) {
        return Array(5).fill(0).map((_, i) =>
            i < Math.floor(rating)
                ? '<i class="fa-solid fa-star"></i>'
                : (i === Math.floor(rating) && rating % 1 !== 0
                    ? '<i class="fa-solid fa-star-half-stroke"></i>'
                    : '<i class="fa-regular fa-star"></i>')
        ).join('');
    }
}
