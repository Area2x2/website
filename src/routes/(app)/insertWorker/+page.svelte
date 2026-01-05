<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import Input from "$lib/components/Input.svelte";
    import type { ActionData } from "./$types";

    let { form }: { form: ActionData } = $props();
</script>

<h1>Insert Worker</h1>
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
        type="text"
        name="nickname"
        label="Apodo"
        placeholder="Apodo"
        width="100%"
    />
    <Input type="text" name="role" label="Rol" placeholder="Rol" width="100%" />
    <Input
        type="password"
        name="code"
        label="Código"
        placeholder="Código"
        width="100%"
    />
    <Button>Insertar</Button>
</form>
<p style="color: red">{form?.message ?? ""}</p>
