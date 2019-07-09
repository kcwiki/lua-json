interface FormatOptions {
    eol?: string;
    singleQuote?: boolean;
    spaces?: null | number | string;
}
export function format(value: any, options?: FormatOptions): string;
export function parse(value: string): any;