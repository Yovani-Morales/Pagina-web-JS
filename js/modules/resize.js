class Resize {
    constructor(element) {
        this.element = element;
    }


    moveSubmenu() {
        const clientWidth = document.documentElement.clientWidth;
        const DOMRect = this.element.getBoundingClientRect();

        if (DOMRect.x + DOMRect.width > clientWidth) {
            this.element.style.left = '-200px'
        }
    }
}

