namespace Ref {
  export enum Query {
    Main = "[data-accordion]",
    Header = "[data-accordion-header]",
    Content = "[data-accordion-content]",
  }

  export enum Attr {
    Main = "data-accordion",
    Header = "data-accordion-header",
    Content = "data-accordion-content",
  }
}

enum Modes {
  Multiple = "multiple",
  Single = "single",
  Nested = "nested",
}
interface Options {
  mode: Modes | Modes[];
  customClass: string;
}

class AccordiumElement {
  static defaultOptions: Options = {
    mode: [Modes.Multiple, Modes.Single, Modes.Nested],
    customClass: "active",
  };
  options: Options;
  accordions: NodeListOf<HTMLElement>;

  constructor(options?: Options) {
    this.options = { ...AccordiumElement.defaultOptions, ...options };
    this.accordions = document.querySelectorAll(Ref.Query.Main);
  }

  getAccordiumChildren(index: number) {
    const accordium = this.accordions[index];
    if (!accordium)
      throw Error(`The position ${index} not exists in accordions`);
    return {
      header: accordium.querySelectorAll<HTMLElement>(Ref.Query.Header)!,
      content: accordium.querySelectorAll<HTMLElement>(Ref.Query.Content)!,
    };
  }

  defineHeaderAttr(element: HTMLElement, id: number) {
    element.innerText = `${id} - src`;
    element.setAttribute("id", `accordium-${id}`);
  }

  defineContentStyle(element: HTMLElement) {
    element.style.maxHeight = "0px";
    element.style.overflow = "hidden";
  }

  parseElementId(element: HTMLElement): number {
    return parseInt(element.id.replace("accordium-", ""));
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

  setContentHeight(content: HTMLElement, shouldClose: boolean): void {
    const { customClass } = this.options;

    if (shouldClose) {
      content.classList.add(customClass);
      content.style.maxHeight = `${content.scrollHeight}px`;
      return;
    }

    content.classList.remove(customClass);
    content.style.maxHeight = "0px";
  }

  isClose(element: HTMLElement): boolean {
    return element.style.maxHeight === "0px";
  }
}

class Accordium extends AccordiumElement {
  accordiumMap: Record<number, Record<number, HTMLElement>> = {};
  constructor(options?: Options) {
    super(options);

    for (let i = 0; i < this.accordions.length; i++) {
      const parentIndex: number = i;
      const { header: headerElements, content: contentElements } =
        this.getAccordiumChildren(i);

      this.accordiumMap[i] = {};

      for (let j = 0; j < contentElements.length; j++) {
        this.defineHeaderAttr(headerElements[j], j);
        this.defineContentStyle(contentElements[j]);
        this.accordiumMap[i][j] = contentElements[j];
      }

      this.accordions[i].addEventListener("click", (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (!target.hasAttribute(Ref.Attr.Header)) return;

        const { mode } = this.options;
        const modeState = Array.isArray(mode) ? mode[i] : mode;
        const headerElement = e.target as HTMLElement;
        const headerIndex: number = this.parseElementId(headerElement);

        this.toggleAccordium(parentIndex, headerIndex, modeState);
      });
    }
  }

  runMultiple(parentIndex: number, elIndex: number): void {
    const contentElement = this.accordiumMap[parentIndex][
      elIndex
    ] as HTMLElement;
    const shouldClose = this.isClose(contentElement);

    this.setContentHeight(contentElement, shouldClose);
  }

  runSingle(parentIndex: number, elIndex: number): void {
    const contentElement = this.accordiumMap[parentIndex][
      elIndex
    ] as HTMLElement;
    const shouldClose = this.isClose(contentElement);

    this.setContentHeight(contentElement, shouldClose);

    Object.entries(this.accordiumMap[parentIndex]).forEach(([key, value]) => {
      if (parseInt(key) !== elIndex) {
        this.setContentHeight(value, false);
      }
    });
  }

  runNested(parentIndex: number, elIndex: number): void {
    const contentElement = this.accordiumMap[parentIndex][
      elIndex
    ] as HTMLElement;
    const shouldClose = this.isClose(contentElement);
    const currentElementHeight = contentElement.scrollHeight;

    this.setContentHeight(contentElement, shouldClose);

    let parentElement = this.findFirstParent(contentElement, Ref.Attr.Content);

    while (parentElement) {
      const parentElementHeight = parentElement?.scrollHeight;

      parentElement.style.maxHeight = `${
        parentElementHeight + currentElementHeight
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

new Accordium();
