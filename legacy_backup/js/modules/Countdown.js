export class Countdown {
    constructor(targetDate, elementIds) {
        this.targetDate = targetDate;
        this.elements = {
            hours: document.getElementById(elementIds.hours),
            minutes: document.getElementById(elementIds.minutes),
            seconds: document.getElementById(elementIds.seconds)
        };
        this.interval = null;
        this.start();
    }

    start() {
        this.update(); // Run immediately
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;

        if (distance < 0) {
            // Restart timer for demo purposes (24h loop)
            this.targetDate = new Date().getTime() + (24 * 60 * 60 * 1000);
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (this.elements.hours) this.elements.hours.innerHTML = hours < 10 ? '0' + hours : hours;
        if (this.elements.minutes) this.elements.minutes.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        if (this.elements.seconds) this.elements.seconds.innerHTML = seconds < 10 ? '0' + seconds : seconds;
    }
}
