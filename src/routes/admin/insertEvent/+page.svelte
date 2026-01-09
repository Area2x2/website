<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import Input from "$lib/components/Input.svelte";
    import type { EventData } from "$lib/components/options/EventOption.svelte";
    import type { WorkerData } from "$lib/components/options/WorkerOption.svelte";
    import type { ActionData } from "./$types";

    let {
        data,
        form,
    }: {
        data: { workers: WorkerData[]; events: EventData[] };
        form: ActionData;
    } = $props();

    const AMOUNT_PATTERN = "^[0-9]+(\.[0-9]{2})?$";

    let formElement: HTMLFormElement;

    function onsubmit(e: MouseEvent) {
        formElement.submit();
    }
</script>

<h1>Insert Event</h1>
<form
    bind:this={formElement}
    class="column"
    method="POST"
    action="?/insertEvent"
    use:enhance
>
    <Input
        type="text"
        name="name"
        label="Nombre"
        placeholder="Nombre"
        required={true}
    />
    <Input
        type="date"
        name="date"
        label="Día"
        placeholder="Día"
        pattern={AMOUNT_PATTERN}
        required={true}
    />
    <Input
        type="text"
        name="location"
        label="Localización"
        placeholder="Localización"
    />
    <Input type="text" name="time" label="Hora" placeholder="Hora" />

    <Button onclick={onsubmit}>Enviar</Button>
</form>
<p style="color: red">{form?.message ?? ""}</p>
