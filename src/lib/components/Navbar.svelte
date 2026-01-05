<script lang="ts">
    import type { UserSessionData } from "$lib/server/auth";
    import Button from "./Button.svelte";
    import Logo from "./Logo.svelte";
    import Tag from "./Tag.svelte";

    let {
        user,
    }: {
        user: UserSessionData | null;
    } = $props();
</script>

<nav class="row">
    <a href="/">
        <Logo width="2.5rem" color="var(--text)" />
    </a>
    <div class="middle row">
        <a href="/eventos">Eventos</a>
        <a href="/faq">FAQ</a>
    </div>
    {#if user}
        <div class="right row">
            {#if user}
                <div class="row" style:gap="0.5rem">
                    <span>{user.name}</span>
                    {#if !user.role}
                        <Tag color="background-off">{user.role}</Tag>
                    {:else}
                        <Tag color="warning">{user.role}</Tag>
                    {/if}
                </div>
            {/if}
            <div class="row" style:gap="0.5rem">
                {#if user}
                    {#if user.role}
                        {#if !user.role}
                            <Button href="/event">Mi Evento</Button>
                        {:else}
                            <Button href="/admin">Panel Admin</Button>
                        {/if}
                    {/if}
                {/if}
                <Button href="/logout" color="danger">Cerrar Sesión</Button>
            </div>
        </div>
    {:else}
        <Button href="/login">Entrar</Button>
    {/if}
</nav>

<style>
    nav {
        position: relative;
        width: 100%;
        height: 4rem;
        padding: 1rem;
        justify-content: space-between;
        border-radius: 1rem;
        align-items: center;

        background-color: var(--background);
    }

    .row {
        width: auto;
    }

    .middle {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: auto;

        a {
            text-decoration: none;
            font-weight: 500;
            color: var(--text-off);
        }
    }

    .right {
        align-items: center;
        gap: 1rem;
    }
</style>
