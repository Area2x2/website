<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import Combobox from "$lib/components/combobox/Combobox.svelte";
    import { ComboboxState } from "$lib/components/combobox/combobox.svelte";
    import Input from "$lib/components/Input.svelte";
    import type { EventData } from "$lib/components/options/EventOption.svelte";
    import EventOption from "$lib/components/options/EventOption.svelte";
    import WorkerOption, {
        type WorkerData,
    } from "$lib/components/options/WorkerOption.svelte";
    import type { ActionData } from "./$types";

    let {
        data,
        form,
    }: {
        data: { workers: WorkerData[]; events: EventData[] };
        form: ActionData;
    } = $props();

    type PaymentMethodData = {
        id: string;
        name: string;
    };

    let paymentMethodState = new ComboboxState<PaymentMethodData>(
        [
            {
                id: "bizum",
                name: "Bizum",
            },
            {
                id: "cash",
                name: "Efectivo",
            },
        ],
        {
            id: "id",
            index: "name",
            store: ["id"],
        },
        formValue("paymentMethod"),
    );

    let eventsComboboxState = new ComboboxState<EventData>(
        // svelte-ignore state_referenced_locally
        data.events,
        {
            id: "id",
            index: ["name", "date"],
            store: ["id"],
        },
        formValue("eventId"),
    );

    let workersComboboxState = new ComboboxState<WorkerData>(
        // svelte-ignore state_referenced_locally
        data.workers,
        {
            id: "id",
            index: ["name", "nickname", "email"],
            store: ["id"],
        },
        formValue("workerId"),
    );

    let formElement: HTMLFormElement;

    function onsubmit(e: MouseEvent) {
        formElement.submit();
    }

    function errorMessage(name: string): string | undefined {
        if (form && form.errorMessages && form.errorMessages.get(name)) {
            return form.errorMessages.get(name);
        }
        return undefined;
    }

    function formValue(name: string): string | undefined {
        if (form && form.formData && form.formData[name]) {
            return form.formData[name];
        }
        return undefined;
    }
</script>

{#snippet input(
    name: string,
    label: string,
    required: boolean,
    type: string = "text",
)}
    {@const error =
        form && form.errorMessages ? form.errorMessages.get(name) : ""}
    {@const value = (form && form.formData && form.formData[name]) ?? ""}
    <Input
        {type}
        {name}
        {label}
        placeholder={label}
        {required}
        {error}
        {value}
    />
{/snippet}

<h1>Insert Guest</h1>
<form
    bind:this={formElement}
    class="column"
    method="POST"
    action="?/insertGuest"
    use:enhance
>
    {@render input("email", "Correo electrónico", true, "email")}
    {@render input("name", "Nombre", true)}
    {@render input("age", "Edad", true, "number")}
    {@render input("nickname", "Apodo", false)}
    {@render input("amount", "Cantidad", true, "number")}
    <Combobox
        name="paymentMethod"
        label="Método de Pago"
        placeholder="Método de Pago"
        state={paymentMethodState}
        error={form && form.errorMessages
            ? form.errorMessages.get("paymentMethod")
            : ""}
    >
        {#snippet display(paymentMethod)}
            <span>{paymentMethod.name}</span>
        {/snippet}
    </Combobox>
    <Combobox
        name="eventId"
        label="ID del Evento"
        placeholder="ID del Evento"
        state={eventsComboboxState}
        error={errorMessage("eventId")}
    >
        {#snippet display(event: EventData)}
            <EventOption {event} />
        {/snippet}
    </Combobox>
    <Combobox
        name="workerId"
        label="ID del Trabajador"
        placeholder="ID del Trabajador"
        state={workersComboboxState}
        error={errorMessage("workerId")}
    >
        {#snippet display(worker: WorkerData)}
            <WorkerOption {worker} />
        {/snippet}
    </Combobox>
    <Button onclick={onsubmit}>Enviar</Button>
</form>
<p style="color: red">{form?.message ?? ""}</p>
