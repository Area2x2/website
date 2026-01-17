<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import { IconType } from "$lib/components/icon/icon.js";
    import Icon from "$lib/components/icon/Icon.svelte";
    import Input from "$lib/components/Input.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import { ModalState } from "$lib/components/modal/modal.svelte.js";
    import Searchbox from "$lib/components/Searchbox.svelte";
    import { WORKERS_TABLE_HEADERS } from "$lib/components/table/definitions.svelte.js";
    import Table from "$lib/components/table/Table.svelte";
    import { TableState } from "$lib/components/table/table.svelte.js";
    import Tag from "$lib/components/tag/Tag.svelte";

    let { form, data } = $props();

    // svelte-ignore state_referenced_locally
    let tableState = new TableState(data.workers, WORKERS_TABLE_HEADERS);

    let addWorkersModalState = new ModalState();
</script>

<div class="actions row">
    <div class="row">
        <Searchbox bind:value={tableState.search} placeholder="Search" />
        <p>Workers: {data.workers.length}</p>
    </div>
    <Button onclick={(e) => addWorkersModalState.ontrigger(e)} iconLeft>
        <Icon icon={IconType.Plus} />
        Add Worker
    </Button>
</div>

<Modal state={addWorkersModalState}>
    <div class="column">
        <div class="row" style="justify-content: space-between;">
            <h5>Add Worker</h5>
            <Button
                iconLeft
                iconRight
                cta="ghost"
                onclick={(e) => addWorkersModalState.onblur(e)}
            >
                <Icon icon={IconType.Cross} />
            </Button>
        </div>
        <form class="column" method="POST" action="?/insertWorker" use:enhance>
            <div class="column">
                <Input
                    type="email"
                    name="email"
                    label="Correo electrónico"
                    placeholder="Correo electrónico"
                />
                <Input
                    type="text"
                    name="name"
                    label="Nombre"
                    placeholder="Nombre"
                />
                <Input
                    type="text"
                    name="nickname"
                    label="Apodo"
                    placeholder="Apodo"
                />
                <Input type="text" name="role" label="Rol" placeholder="Rol" />
                <Input
                    type="password"
                    name="code"
                    label="Código"
                    placeholder="Código"
                />
            </div>
            {#if form && form.message && form.message !== ""}
                <p style="color: red">{form.message ?? ""}</p>
            {/if}
            <Button align="center">
                <Icon icon={IconType.Plus} />
                Insertar
            </Button>
        </form>
    </div>
</Modal>

<Table state={tableState} />

<style>
    .actions {
        justify-content: space-between;
        align-items: end;
    }
</style>
