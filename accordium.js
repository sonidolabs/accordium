class Accordium {
    constructor(userOptions = {}) {
        this.accordions = document.querySelectorAll('[data-accordion]');

        this.defaultOptions = {
            mode: ['multiple', 'single']
        }

        this.options = Object.assign(this.defaultOptions, userOptions);

        this.init();
    }

    init() {
        const { mode } = this.options;
    
        for (let i = 0; i < this.accordions.length; i++) {
            const headers = this.accordions[i].querySelectorAll('[data-accordion-header]');
    
            for (let j = 0; j < headers.length; j++) {
                headers[j].addEventListener('click', () => {
                    const modeStatement = Array.isArray(mode) ? mode[i] : mode;
                    
                    this.attachHeaderEvent(headers[j], modeStatement);
                });
            }
        }
    }

    getCurrentHeader(index) {
        return this.headers[index];
    }

    getCurrentContent(index) {
        return this.contents[index];
    }

    attachHeaderEvent(element, mode) {
        console.log({element, mode});
    }

    toggleAccordion(index) {
        console.log(index);
    }
}

new Accordium();