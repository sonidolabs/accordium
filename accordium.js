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
            const contents = this.accordions[i].querySelectorAll('[data-accordion-content]');
            
            for (let j = 0; j < headers.length; j++) {
                contents[j].style.overflow = 'hidden';
                contents[j].style.maxHeight = '0px';

                headers[j].addEventListener('click', () => {
                    const modeStatement = Array.isArray(mode) ? mode[i] : mode;
                    
                    this.toggleAccordium(contents[j], modeStatement);
                });
            }
        }
    }

    runMultiple(content) {
        const isClose = content.style.maxHeight === '0px';

        if(isClose) {
            content.style.maxHeight = `${content.scrollHeight}px`;

            return
        }

        content.style.maxHeight = '0px';
    }

    runSingle(content) {
        console.log(content);
    }

    runNested(content) {
        console.log(content);
    }

    getCurrentHeader(index) {
        return this.headers[index];
    }

    getCurrentContent(index) {
        return this.contents[index];
    }

    toggleAccordium(content, mode) {
        switch (mode) {
            case 'nested':
                this.runSingle(content);
                break;

            case 'single':
                console.log({ content, mode });
                break;
                
            default:
                this.runMultiple(content);
                break;
        }
    }

    findFirstParent (element, target) {
        while (element.parentElement) {
            if (element.parentElement.hasAttribute(target)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    
        return null;
    }
    
    removeFirstParent(arr, value) {
        let index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }
}

new Accordium();