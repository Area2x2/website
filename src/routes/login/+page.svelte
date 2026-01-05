<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/Button.svelte";
    import Input from "$lib/components/Input.svelte";
    import Logo from "$lib/components/Logo.svelte";
    import type { ActionData } from "./$types";

    let { form }: { form: ActionData } = $props();
</script>

<div class="floating">
    <Logo />
</div>

<div class="wrapper">
    <form class="column" method="POST" action="?/login" use:enhance>
        <h2>Bienvenido</h2>
        <div class="input-group column">
            <Input
                type="email"
                name="email"
                label="Correo electrónico"
                placeholder="Correo electrónico"
                width="100%"
            />
            <Input
                type="password"
                name="code"
                label="Código"
                placeholder="Código"
                width="100%"
            />
            {#if form}
                <p style="color: red">{form.message}</p>
            {/if}
        </div>
        <Button width="100%">Entrar</Button>
    </form>
</div>

<style>
    .floating {
        position: absolute;
        top: 8rem;
        left: 50%;
        transform: translateX(-50%);
    }
    .wrapper {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
    }

    .input-group {
        gap: 1rem;
        width: 100%;
    }

    form {
        padding: 2rem;
        width: 31.375rem;
        gap: 4rem;
        align-items: center;
    }
</style>
