import type { TagCategory } from "../tag/tag.svelte";

export const COLUMN_WIDTHS = {
    fill: "100%",
    small: "6rem",
    medium: "12rem",
    large: "24rem",
    auto: "auto",
};

export interface TableHeader {
    slug: string;
    name: string;
    width: keyof typeof COLUMN_WIDTHS;
    type: "tag" | "string" | "number";
    tagCategory?: TagCategory;
    sorting?: ColumnSortingType;
}

export type ColumnSortingType = "ascending" | "descending";

export interface ColumnSorting {
    column: string;
    sorting: ColumnSortingType | null;
}

export class TableState<T> {
    data: T[];
    headers: TableHeader[];
    search: string = $state("");

    columnSorting: ColumnSorting = $state({
        column: "name",
        sorting: "ascending",
    });

    constructor(data: T[], headers: TableHeader[]) {
        this.data = $state(data);
        this.headers = $state(headers);
    }

    public sortedData = $derived.by(() => {
        let data = Array.from(this.data);
        data.sort((a, b) => {
            let aDataColumn = a[this.columnSorting.column as keyof T];
            let bDataColumn = b[this.columnSorting.column as keyof T];

            if (this.columnSorting.sorting === "descending") {
                let temp = aDataColumn;
                aDataColumn = bDataColumn;
                bDataColumn = temp;
            }

            let columnDefinition = this.headers.find(
                (v) => v.slug === this.columnSorting.column,
            );
            if (!columnDefinition) return 0;

            switch (columnDefinition.type) {
                case "number":
                    return (
                        Number.parseInt(aDataColumn as string) -
                        Number.parseInt(bDataColumn as string)
                    );
                default:
                    return (aDataColumn as string).localeCompare(
                        bDataColumn as string,
                    );
            }
        });
        return data;
    });

    onclicktablehead(slug: string) {
        if (this.columnSorting.column === slug) {
            if (this.columnSorting.sorting === "descending") {
                this.columnSorting.sorting = "ascending";
            } else {
                this.columnSorting.sorting = "descending";
            }
        } else {
            this.columnSorting.sorting = "ascending";
            this.columnSorting.column = slug;
        }
    }
}
