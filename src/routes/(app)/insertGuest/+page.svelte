<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import Input from "$lib/components/Input.svelte";
    import type { ActionData } from "./$types";

    let { form }: { form: ActionData } = $props();

    const AMOUNT_PATTERN = "^[0-9]+(\.[0-9]\{1, 2\})?$";

    // email
    // name
    // age
    // nickname
    // amount
    // paymentMethod
    // eventId
    // workerId
</script>

<h1>Insert Guest</h1>
<form class="column" method="POST" action="?/insertWorker" use:enhance>
    <Input
        type="email"
        name="email"
        label="Correo electrónico"
        placeholder="Correo electrónico"
        width="100%"
    />
    <Input
        type="text"
        name="name"
        label="Nombre"
        placeholder="Nombre"
        width="100%"
    />
    <Input
        type="number"
        name="age"
        label="Edad"
        placeholder="Edad"
        width="100%"
    />
    <Input
        type="text"
        name="nickname"
        label="Apodo"
        placeholder="Apodo"
        width="100%"
    />
    <Input
        type="text"
        name="amount"
        label="Cantidad"
        placeholder="Cantidad"
        pattern={AMOUNT_PATTERN}
        width="100%"
    />
    <Input
        type="text"
        name="paymentMethod"
        label="Método de Pago"
        placeholder="Método de Pago"
        width="100%"
    />
    <Input
        type="text"
        name="eventId"
        label="Código de Evento"
        placeholder="Código de Evento"
        width="100%"
    />
    <Input
        type="text"
        name="eventId"
        label="Código de Trabajador"
        placeholder="Código de Trabajador"
        width="100%"
    />
    <Button>Insertar</Button>
</form>
<p style="color: red">{form?.message ?? ""}</p>
