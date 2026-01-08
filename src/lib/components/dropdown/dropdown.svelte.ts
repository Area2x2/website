export class DropdownState {
    showDropdown = $state(false);
    anchor: HTMLElement | undefined = $state();
    floating: HTMLElement | undefined = $state();

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
}
