interface Options {
    mode: string | string[];
    customClass: string;
}

const map = {
    0: { // data-accordion
        0: {
            body: '[data-accordion-body]',
            header: '[data-accordion-header]',
            content: '[data-accordion-content]'
        },
        1: {
            body: '[data-accordion-body]',
            header: '[data-accordion-header]',
            content: '[data-accordion-content]'
        }
    },
    1: { // data-accordion
        0: {
            body: '[data-accordion-body]',
            header: '[data-accordion-header]',
            content: '[data-accordion-content]',
            children: {
                body: '[data-accordion-body]',
                header: '[data-accordion-header]',
                content: '[data-accordion-content]',
                children: {
                    body: '[data-accordion-body]',
                    header: '[data-accordion-header]',
                    content: '[data-accordion-content]'
                }
            }
        },
        1: {
            body: '[data-accordion-body]',
            header: '[data-accordion-header]',
            content: '[data-accordion-content]',
            children: {
                body: '[data-accordion-body]',
                header: '[data-accordion-header]',
                content: '[data-accordion-content]',
                children: {
                    body: '[data-accordion-body]',
                    header: '[data-accordion-header]',
                    content: '[data-accordion-content]'
                }
            }
        }
    }
}

class Accordium {
    accordions?: HTMLElement[] | undefined;
    // defaultOptions: Options;
    // options: Options;

    constructor(options = {}) {
        const accortions = document.querySelectorAll('[data-accordion]');
        const teste = this.createAccordiumMap(accortions);

        // this.accordions = Array.from(document.querySelectorAll('[data-accordion]'));

        // this.defaultOptions = {
        //     mode: 'multiple',
        //     customClass: 'active'
        // }
        // this.options = Object.assign(this.defaultOptions, options);

        // if (this.accordions === undefined) return;

        // const { mode } = this.options;

        // for (let i = 0; i < this.accordions.length; i++) {
        //     const modeStatement: string | string[] = Array.isArray(mode) ? mode[i] : mode;

        //     for (let j = 0; j < this.headers.length; j++) {
        //         this.headers[j].innerText = `${j} - src`;
        //         this.contents[j].style.maxHeight = "0px";
        //         this.contents[j].style.overflow = "hidden";

        //         this.headers[j].addEventListener('click', () => {
        //             this.toggleAccordium(j, modeStatement);
        //         });
        //     }
        // }
        
        // this.init();
    }

    createAccordiumMap(element: any) {
        
    }

    // init(): void {
    //     if (this.accordions === undefined) return;
        
    //     const { mode } = this.options;

    //     for (let i = 0; i < this.accordions.length; i++) {
    //         const headers: NodeListOf<HTMLElement> = this.accordions[i].querySelectorAll('[data-accordion-header]');
    //         const contents: NodeListOf<HTMLElement> = this.accordions[i].querySelectorAll('[data-accordion-content]');
            
    //         for (let j = 0; j < headers.length; j++) {
    //             headers[j].innerText = `${j} - src`  
    //             // contents[j].style.maxHeight = "0px";
    //             contents[j].style.overflow = "hidden";

    //             headers[j].addEventListener('click', () => {
    //                 const modeStatement: string | string[] = Array.isArray(mode) ? mode[i] : mode;
                    
    //                 this.toggleAccordium(j, contents, modeStatement);
    //             });
    //         }
    //     }
    // }

    // setContentHeight(elIndex: number, contents: NodeListOf<HTMLElement>, isClose: boolean): void {
    //     const { customClass } = this.options;
        
    //     if (isClose) {
    //         contents[elIndex].classList.add(customClass);
    //         contents[elIndex].style.maxHeight = `${contents[elIndex].scrollHeight}px`;
    //         return
    //     }

    //     contents[elIndex].classList.remove(customClass);
    //     contents[elIndex].style.maxHeight = '0px';
    // }

    // isClose(element: HTMLElement): boolean {
    //     return element.style.maxHeight === '0px';
    // }

    // runMultiple(elIndex: number): void {
    //     // const content: HTMLElement | undefined = this.contents[elIndex];

    //     // if (content && this.isClose(content)) {
    //     //     this.setContentHeight(elIndex, content, this.isClose(content))
    //     //     return
    //     // }

    //     // this.setContentHeight(elIndex, content, this.isClose(content))
    // }

    // runSingle(elIndex: number, contents: NodeListOf<HTMLElement>): void {
    //     const { customClass } = this.options;
    //     const content: HTMLElement = contents[elIndex];

    //     if (this.isClose(content)){
    //         this.setContentHeight(elIndex, contents, this.isClose(content))

    //         for (let i = 0; i < contents.length; i++) {
    //             if(i != elIndex){
    //                 contents[i].classList.remove(customClass);
    //                 contents[i].style.maxHeight = '0px';
    //             }
    //         }
    //         return
    //     }

    //     this.setContentHeight(elIndex, contents, this.isClose(content))
    // }

    // runNested(elIndex: number, contents: NodeListOf<HTMLElement>): void {
    //     const content: HTMLElement = contents[elIndex];
    //     const contentsParent: Map<number, HTMLElement> = new Map();
    //     const firstContentParent: HTMLElement | null = this.findFirstParent(content, 'data-accordion-content');

    //     this.setContentHeight(elIndex, contents, this.isClose(content));

    //     if (firstContentParent && contentsParent.has(elIndex)) contentsParent.set(elIndex, firstContentParent);

        
    // }

    // findFirstParent (element: HTMLElement | undefined, target: string): HTMLElement | null {
    //     if (element) {
    //         while (element.parentElement) {
    //             if (element.parentElement.hasAttribute(target)) {
    //                 return element.parentElement;
    //             }
    //             element = element.parentElement;
    //         }
    //     }

    //     return null
    // }
    
    // removeFirstParent(contentParents: HTMLElement[], content: HTMLElement) {
    //     const index = contentParents.indexOf(content);
    //     if (index > -1) {
    //         contentParents.splice(index, 1);
    //     }
    // }

    // toggleAccordium(elIndex: number, mode: string | string[]): void {
    //     switch (mode) {
    //         case 'nested':
    //             this.runNested(elIndex);
    //             break;

    //         case 'single':
    //             this.runSingle(elIndex);
    //             break;
                
    //         default:
    //             this.runMultiple(elIndex);
    //             break;
    //     }
    // }
}

new Accordium();