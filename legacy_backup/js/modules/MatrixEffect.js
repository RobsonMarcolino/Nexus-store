export class MatrixEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.letters = '010101 NEXUS HACKED 010101 KATANA CYBERPUNK 2077';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.isActive = false;
        this.animationFrame = null;
        this.lastTime = 0;
        this.fps = 30; // Limit FPS for Matrix to save performance
        this.interval = 1000 / this.fps;

        // Code Konami
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('keydown', (e) => this.checkCode(e));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / this.fontSize;
        this.drops = Array(Math.floor(this.columns)).fill(1);
    }

    checkCode(e) {
        if (e.key === this.konamiCode[this.konamiIndex]) {
            this.konamiIndex++;
            if (this.konamiIndex === this.konamiCode.length) {
                this.toggle();
                this.konamiIndex = 0;
                if (window.showToast) window.showToast('SYSTEM HACKED: MATRIX MODE ACTIVATED', 'success');
            }
        } else {
            this.konamiIndex = 0;
        }
    }

    toggle() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.canvas.style.display = 'block';
            this.animate(0);
        } else {
            this.canvas.style.display = 'none';
            cancelAnimationFrame(this.animationFrame);
        }
    }

    animate(timestamp) {
        if (!this.isActive) return;

        this.animationFrame = requestAnimationFrame((t) => this.animate(t));

        const deltaTime = timestamp - this.lastTime;
        if (deltaTime > this.interval) {
            this.lastTime = timestamp - (deltaTime % this.interval);
            this.draw();
        }
    }

    draw() {
        // Overlay semitransparente para rastro
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0F0';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.letters.charAt(Math.floor(Math.random() * this.letters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
}
