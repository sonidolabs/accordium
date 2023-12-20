import { Ref, Modes, Options } from '../types/accordium.js';

class AccordiumElements {
  options: Options;
  defaultOptions: Options;
  accordiums: NodeListOf<HTMLElement>;
  
  constructor(options?: Options) {
    this.defaultOptions = {
      mode: [Modes.Multiple, Modes.Single, Modes.Nested],
      customClass: 'active',
      enableAria: true
    };

    this.options = {
      ...this.defaultOptions,
      ...options
    };

    this.accordiums = document.querySelectorAll(Ref.Query.Main);
  }

  getAccordiumChildren(parentIndex: number) {
    const accordium = this.accordiums[parentIndex];

    if (!accordium) 
      console.error(`The position ${parentIndex} not exists in accordiums`);

    return {
      header: accordium.querySelectorAll<HTMLElement>(Ref.Query.Header)!,
      content: accordium.querySelectorAll<HTMLElement>(Ref.Query.Content)!,
    };
  }

  toggleARIA(headerElement: HTMLElement, shouldClose: boolean) {
    headerElement.setAttribute('aria-expanded', shouldClose.toString());
  }

  defineElementAttr(element: HTMLElement, attribute: string, value: string | boolean) {
    const attributeValue: string = typeof value === 'boolean' ? value.toString() : value;

    element.setAttribute(attribute, attributeValue);
  }

  defineElementStyle(element: HTMLElement) {
    element.style.maxHeight = '0px';
    element.style.overflow = 'hidden';
  }

  parseElementId(element: HTMLElement, id: string): number {
    return parseInt(element.id.replace(`${id}`, ''));
  }

  parseObjectKey(element: HTMLElement, id: string): number {
    return parseInt(element.id.replace(`${id}`, ''));
  }

  findFirstParent(
    element: HTMLElement | undefined,
    targetAttribute: string
  ): HTMLElement | null {
    const parent = element?.parentElement;
    if (parent)
      return parent.hasAttribute(targetAttribute)
        ? parent
        : this.findFirstParent(parent, targetAttribute);
    return null;
  }

  setContentHeight(element: HTMLElement, shouldClose: boolean): void {
    const { customClass } = this.options;

    if (shouldClose) {
      element.classList.add(customClass!);
      element.style.maxHeight = `${element.scrollHeight}px`;
      return;
    }

    element.classList.remove(customClass!);
    element.style.maxHeight = '0px';
  }

  isClose(element: HTMLElement): boolean {
    return element.style.maxHeight === '0px';
  }
}

export class Accordium extends AccordiumElements {
  accordiumMap: Record<number, Record<string, Record<string, HTMLElement>>> = {};

  constructor(options?: Options) {
    super(options);

    const { 
      mode,
      enableAria
     } = this.options;
    
    for (let i = 0; i < this.accordiums.length; i++) {
      const parentIndex: number = i;
      const {
        header: headerElements,
        content: contentElements
      } = this.getAccordiumChildren(parentIndex);

      if (enableAria && mode) {
        const isSingle: boolean = mode[i] === 'single';

        this.defineElementAttr(this.accordiums[i], 'aria-multiselectable', !isSingle);
      }

      this.defineElementAttr(this.accordiums[i], 'id', `accordium-${i}`);
      
      this.accordiumMap[i] = {};
      this.accordiumMap[i].headers = {};
      this.accordiumMap[i].contents = {};
      
      for (let j = 0; j < contentElements.length; j++) {
        this.accordiumMap[i].headers[j] = headerElements[j];
        this.accordiumMap[i].contents[j] = contentElements[j];

        if (enableAria) {
          this.defineElementAttr(headerElements[j], 'aria-expanded', 'false');
          this.defineElementAttr(headerElements[j], 'aria-controls', `content-${i}-${j}`);

          this.defineElementAttr(contentElements[j], 'role', 'region');
          this.defineElementAttr(contentElements[j], 'aria-labelledby', `accordium-${i}-${j}`);
        }
        
        this.defineElementAttr(headerElements[j], 'id', `header-${i}-${j}`);
        this.defineElementAttr(contentElements[j], 'id', `content-${i}-${j}`);
        this.defineElementStyle(contentElements[j]);
      }

      this.accordiums[i].addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        if (!target.hasAttribute(Ref.Attr.Header)) return;

        const modeState = Array.isArray(mode) ? mode[i] : mode;
        const headerElementTarget = e.target as HTMLElement;
        const headerIndex: number = this.parseElementId(headerElementTarget, `header-${i}-`);

        this.toggleAccordium(parentIndex, headerIndex, modeState!);
      });
    }
  }

  runMultiple(parentIndex: number, elIndex: number): void {
    const { enableAria } = this.options;
    const headerElement = this.accordiumMap[parentIndex].headers[elIndex] as HTMLElement;
    const contentElement = this.accordiumMap[parentIndex].contents[elIndex] as HTMLElement;

    const shouldClose = this.isClose(contentElement);

    if (enableAria) this.toggleARIA(headerElement, shouldClose);
    this.setContentHeight(contentElement, shouldClose);
  }

  runSingle(parentIndex: number, elIndex: number): void {
    const { enableAria } = this.options;
    const headerElement = this.accordiumMap[parentIndex].headers[elIndex] as HTMLElement;
    const contentElement = this.accordiumMap[parentIndex].contents[elIndex] as HTMLElement;
    const shouldClose = this.isClose(contentElement);

    if (enableAria) this.toggleARIA(headerElement, shouldClose);
    this.setContentHeight(contentElement, shouldClose);

    Object.entries(this.accordiumMap[parentIndex].contents).forEach(([key, value]) => {
      if (parseInt(key) !== elIndex) {
        this.setContentHeight(value, false);
      }
    });

    Object.entries(this.accordiumMap[parentIndex].headers).forEach(([key, value]) => {
      if (parseInt(key) !== elIndex && enableAria) {
        this.toggleARIA(value, false);
      }
    });
  }

  runNested(parentIndex: number, elIndex: number): void {
    const { enableAria } = this.options;
    const headerElement = this.accordiumMap[parentIndex].headers[elIndex] as HTMLElement;
    const contentElement = this.accordiumMap[parentIndex].contents[elIndex] as HTMLElement;
    const shouldClose = this.isClose(contentElement);
    const currentElementHeight = contentElement.scrollHeight;

    if (enableAria) this.toggleARIA(headerElement, shouldClose);
    this.setContentHeight(contentElement, shouldClose);

    let parentElement = this.findFirstParent(contentElement, Ref.Attr.Content);

    while (parentElement) {
      const parentElementHeight = parentElement?.scrollHeight;

      parentElement.style.maxHeight = `${parentElementHeight + currentElementHeight}px`;

      parentElement = this.findFirstParent(parentElement, Ref.Attr.Content);
    }
  }

  toggleAccordium(parentIndex: number, elIndex: number, mode: Modes): void {
    switch (mode) {
      case Modes.Nested:
        this.runNested(parentIndex, elIndex);
        break;

      case Modes.Single:
        this.runSingle(parentIndex, elIndex);
        break;

      default:
        this.runMultiple(parentIndex, elIndex);
        break;
    }
  }
}