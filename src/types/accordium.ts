export namespace Ref {
    export enum Query {
        Main = '[data-accordium]',
        Header = '[data-accordium-header]',
        Content = '[data-accordium-content]',
    } 

    export enum Attr {
        Main = 'data-accordium',
        Header = 'data-accordium-header',
        Content = 'data-accordium-content',
    }
}

export enum Modes {
    Multiple = 'multiple',
    Single = 'single',
    Nested = 'nested',
}

export type Options = {
    mode?: Modes | Modes[];
    customClass?: string;
    enableAria?: boolean
}