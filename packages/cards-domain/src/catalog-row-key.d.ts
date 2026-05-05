export declare function catalogRowKey(title: string, year?: string): string;
export declare function assignCatalogRowKeys(items: {
    id: number;
    title: string;
    year?: string;
}[]): Map<number, string>;
