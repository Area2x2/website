export class ModalState {
    open = $state(false);

    ontrigger(e: MouseEvent) {
        console.log("trigger");
        this.open = true;
    }

    onblur(e: MouseEvent) {
        if (this.open) {
            console.log("blur");
            this.open = false;
        }
    }
}
