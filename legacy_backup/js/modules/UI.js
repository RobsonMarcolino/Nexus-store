export class UI {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.init();
    }

    init() {
        this.setupCursor();
        this.setupObservers();
        this.setupMobileMenu();
        this.setupFaq();
    }

    setupCursor() {
        this.cursor = document.createElement('div');
        this.cursor.id = 'cursor';
        document.body.appendChild(this.cursor);

        this.cursorFollower = document.createElement('div');
        this.cursorFollower.id = 'cursor-follower';
        document.body.appendChild(this.cursorFollower);

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';

            // Throttle follower for performance
            requestAnimationFrame(() => {
                this.cursorFollower.style.left = e.clientX + 'px';
                this.cursorFollower.style.top = e.clientY + 'px';
            });
        });

        document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
        });
    }

    setupObservers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal, .group').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    setupMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const icon = btn?.querySelector('i');

        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
                menu.classList.toggle('glass'); // Ensure glass style
                if (menu.classList.contains('hidden')) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                }
            });
        }
    }

    setupFaq() {
        // Simple delegator for accordion
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close others
                document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

                if (!isActive) item.classList.add('active');
            });
        });
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container') || this.createToastContainer();
        const toast = document.createElement('div');

        // Colors
        const colors = type === 'success'
            ? 'border-brand-neon text-brand-neon bg-black/80'
            : 'border-red-500 text-red-500 bg-black/80';

        toast.className = `flex items-center gap-3 px-6 py-4 rounded-lg border ${colors} shadow-2xl backdrop-blur-md transform translate-x-[120%] transition-transform duration-300 font-bold`;
        toast.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-check' : 'fa-triangle-exclamation'}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.remove('translate-x-[120%]'));

        setTimeout(() => {
            toast.classList.add('translate-x-[120%]');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    createToastContainer() {
        const div = document.createElement('div');
        div.id = 'toast-container';
        div.className = 'fixed bottom-5 right-5 z-[70] flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(div);
        return div;
    }
}
