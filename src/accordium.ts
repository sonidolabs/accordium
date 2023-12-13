interface Options {
    mode: string | string[];
    customClass: string;
}

class Accordium {
    options: Options;
    defaultOptions: Options;
    accordions: NodeListOf<HTMLElement>
    accordiumMap: { 
        [index: number]: { 
            [index: number]: HTMLElement 
        } 
    }

    constructor(options = {}) {
        this.defaultOptions = {
            mode: ['multiple', 'single', 'nested'],
            customClass: 'active'
        }

        this.options = Object.assign(this.defaultOptions, options);
        this.accordions = document.querySelectorAll('[data-accordion]');
        this.accordiumMap = {};

        for (let i = 0; i < this.accordions.length; i++) {
            const parentIndex: number = i;
            const headerElements: NodeListOf<HTMLElement> = this.accordions[i].querySelectorAll('[data-accordion-header]');
            const contentElements: NodeListOf<HTMLElement> = this.accordions[i].querySelectorAll('[data-accordion-content]');

            this.accordiumMap[i] = {};

            for (let j = 0; j < contentElements.length; j++) {
                headerElements[j].innerText = `${j} - src`;
                headerElements[j].setAttribute('id', `accordium-${j}`);
                
                contentElements[j].style.maxHeight = '0px';
                contentElements[j].style.overflow = 'hidden';

                this.accordiumMap[i][j] = contentElements[j];
            }

            this.accordions[i].addEventListener('click', (e: MouseEvent) => {
                const target = e.target as HTMLElement;

                if (!target.hasAttribute('data-accordion-header')) return;
                
                const { mode } = this.options;
                const modeState = Array.isArray(mode) ? mode[i] : mode;
                const headerElement = e.target as HTMLElement;
                const headerIndex: number = this.parseElementId(headerElement);

                this.toggleAccordium(parentIndex, headerIndex, modeState);
            });
        }
    }

    parseElementId(element: HTMLElement): number {
        return parseInt(element.id.replace('accordium-', ''));
    }

    findFirstParent (element: HTMLElement | undefined, targetAttribute: string): HTMLElement | null {
        if (element) {
            while (element.parentElement) {
                if (element.parentElement.hasAttribute(targetAttribute)) {
                    return element.parentElement;
                }
                element = element.parentElement;
            }
        }

        return null
    }

    setContentHeight(content: HTMLElement, shouldClose: boolean): void {
        const { customClass } = this.options;

        if (shouldClose) {
            content.classList.add(customClass);
            content.style.maxHeight = `${content.scrollHeight}px`;

            return
        }

        content.classList.remove(customClass);
        content.style.maxHeight = '0px';
    }

    isClose(element: HTMLElement): boolean {
        return element.style.maxHeight === '0px';
    }

    runMultiple(parentIndex: number, elIndex: number): void {
        const contentElement = this.accordiumMap[parentIndex][elIndex] as HTMLElement;
        const shouldClose = this.isClose(contentElement);
        
        this.setContentHeight(contentElement, shouldClose);
    }

    runSingle(parentIndex: number, elIndex: number): void {
        const contentElement = this.accordiumMap[parentIndex][elIndex] as HTMLElement;
        const shouldClose = this.isClose(contentElement);

        this.setContentHeight(contentElement, shouldClose);
        
        Object.entries(this.accordiumMap[parentIndex]).forEach(([key, value]) => {
            if (parseInt(key) !== elIndex) {
                this.setContentHeight(value, false);
            }
        });
    }

    runNested(parentIndex: number, elIndex: number): void {
        const contentElement = this.accordiumMap[parentIndex][elIndex] as HTMLElement;
        const shouldClose = this.isClose(contentElement);
        const currentElementHeight = contentElement.scrollHeight;

        this.setContentHeight(contentElement, shouldClose);

        let parentElement = this.findFirstParent(contentElement, 'data-accordion-content');        

        while (parentElement) {
            const parentElementHeight = parentElement?.scrollHeight;

            parentElement.style.maxHeight = `${parentElementHeight + currentElementHeight}px`;
    
            parentElement = this.findFirstParent(parentElement, 'data-accordion-content');
        }
    }

    toggleAccordium(parentIndex: number, elIndex: number, mode: string | string[]): void {
        switch (mode) {
            case 'nested':
                this.runNested(parentIndex, elIndex);
                break;

            case 'single':
                this.runSingle(parentIndex, elIndex);
                break;

            default:
                this.runMultiple(parentIndex, elIndex);
                break;
        }
    }
}

new Accordium();