namespace Ref {
  export enum Query {
    Main = "[data-accordium]",
    Header = "[data-accordium-header]",
    Content = "[data-accordium-content]",
  }

  export enum Attr {
    Main = "data-accordium",
    Header = "data-accordium-header",
    Content = "data-accordium-content",
  }
}

enum Modes {
  Multiple = "multiple",
  Single = "single",
  Nested = "nested",
}

type Options = {
  mode?: Modes | Modes[];
  customClass?: string;
  enableAria?: boolean
}

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

  defineElementAttr(element: HTMLElement, attribute: string, value: string | boolean) {
    element.setAttribute(attribute, value);
  }

  defineElementStyle(element: HTMLElement) {
    element.style.maxHeight = "0px";
    element.style.overflow = "hidden";
  }

  parseElementId(element: HTMLElement, id: string): number {
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

  setElementHeight(content: HTMLElement, shouldClose: boolean): void {
    const { customClass } = this.options;

    if (shouldClose) {
      content.classList.add(customClass!);
      content.style.maxHeight = `${content.scrollHeight}px`;
      return;
    }

    content.classList.remove(customClass!);
    content.style.maxHeight = "0px";
  }

  isClose(element: HTMLElement): boolean {
    return element.style.maxHeight === "0px";
  }
}

class Accordium extends AccordiumElements {
  accordiumMap: Record<number, Record<number, HTMLElement>> = {};

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

      if (enableAria) {
        const isSingle: boolean = mode[i] === 'single';

        this.defineElementAttr(this.accordiums[i], 'aria-multiselectable', !isSingle);
      }

      this.defineElementAttr(this.accordiums[i], 'id', `accordium-${i}`);
      
      this.accordiumMap[i] = {};
      
      for (let j = 0; j < contentElements.length; j++) {
        if (enableAria) {
          this.defineElementAttr(headerElements[j], 'aria-expanded', 'false');
          this.defineElementAttr(headerElements[j], 'aria-controls', `content-${i}-${j}`);

          this.defineElementAttr(contentElements[j], 'role', 'region');
          this.defineElementAttr(contentElements[j], 'aria-labelledby', `accordium-${i}-${j}`);
        }
        
        this.defineElementAttr(headerElements[j], 'id', `header-${i}-${j}`);
        this.defineElementAttr(contentElements[j], 'id', `content-${i}-${j}`);
        this.defineElementStyle(contentElements[j]);
        this.accordiumMap[i][j] = contentElements[j];
      }

      this.accordiums[i].addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        if (!target.hasAttribute(Ref.Attr.Header)) return;

        const modeState = Array.isArray(mode) ? mode[i] : mode;
        const headerElement = e.target as HTMLElement;
        const headerIndex: number = this.parseElementId(headerElement, `header-${i}-`);

        this.toggleAccordium(parentIndex, headerIndex, modeState!);
      });
    }
  }

  runMultiple(parentIndex: number, elIndex: number): void {
    const contentElement = this.accordiumMap[parentIndex][elIndex] as HTMLElement;
    const shouldClose = this.isClose(contentElement);

    this.setElementHeight(contentElement, shouldClose);
  }

  runSingle(parentIndex: number, elIndex: number): void {
    const contentElement = this.accordiumMap[parentIndex][elIndex] as HTMLElement;
    const shouldClose = this.isClose(contentElement);

    this.setElementHeight(contentElement, shouldClose);

    Object.entries(this.accordiumMap[parentIndex]).forEach(([key, value]) => {
      if (parseInt(key) !== elIndex) {
        this.setElementHeight(value, false);
      }
    });
  }

  runNested(parentIndex: number, elIndex: number): void {
    const contentElement = this.accordiumMap[parentIndex][elIndex] as HTMLElement;
    const shouldClose = this.isClose(contentElement);
    const currentElementHeight = contentElement.scrollHeight;

    this.setElementHeight(contentElement, shouldClose);

    let parentElement = this.findFirstParent(contentElement, Ref.Attr.Content);

    while (parentElement) {
      const parentElementHeight = parentElement?.scrollHeight;

      parentElement.style.maxHeight = `${parentElementHeight + currentElementHeight
        }px`;

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

new Accordium({ enableAria: true });
