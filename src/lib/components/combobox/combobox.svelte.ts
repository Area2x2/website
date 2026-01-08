import {
    type DocumentData,
    type DocumentDescriptor,
    Document,
} from "flexsearch";
import type { Snippet } from "svelte";

export type Data = DocumentData & { id: string };
export interface ComboboxProps<T extends Data> {
    name?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    state: ComboboxState<T>;
    display?: Snippet<[T]>;
}

export interface ComboboxStateConfig {}

export class ComboboxState<T extends Data> {
    value: T | undefined = $state();
    showDropdown = $state(false);
    anchor: HTMLElement | undefined = $state();
    floating: HTMLElement | undefined = $state();
    search: string = $state("");
    options: T[];
    flexsearchIndex: Document<T, false, false>;

    filtered = $derived.by(() => {
        if (!this.options) {
            return [];
        }

        if (!this.flexsearchIndex || this.search == "") {
            return this.options;
        }

        const query = this.flexsearchIndex.search(this.search);
        const ids = [...new Set(query.flatMap((v) => v.result as string[]))];
        const data = ids.map((id) => this.options.find((v) => v.id === id)!);
        return data;
    });

    constructor(
        options: T[],
        documentDescriptor?: DocumentDescriptor<T, false, false> | undefined,
        initialValue?: string,
    ) {
        this.options = options;
        this.value = options.find((v) => v.id === initialValue);
        this.flexsearchIndex = new Document<T>({
            document: documentDescriptor,
            tokenize: "full",
            preset: "match",
        });
        for (const option of options) {
            this.flexsearchIndex.add(option);
        }
    }

    onclick(e: MouseEvent) {
        e.preventDefault();
        this.showDropdown = !this.showDropdown;
    }

    onblur(e: MouseEvent) {
        e.preventDefault();
        if (
            this.anchor &&
            this.floating &&
            this.showDropdown &&
            !this.anchor.contains(e.target as Node) &&
            !this.floating.contains(e.target as Node)
        ) {
            this.showDropdown = false;
        }
    }

    onselect(e: MouseEvent, value: T) {
        e.preventDefault();
        this.showDropdown = false;
        this.value = value;
    }
}
