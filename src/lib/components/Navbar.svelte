<script lang="ts">
    import type { UserSessionData } from "$lib/server/auth";
    import Button from "./Button.svelte";
    import Icon from "./icon/Icon.svelte";
    import { IconType } from "./icon/icon";
    import Logo from "./Logo.svelte";
    import Tag from "./Tag.svelte";
    import Dropdown from "./dropdown/Dropdown.svelte";
    import { DropdownState } from "./dropdown/dropdown.svelte";
    import { flip, shift, offset } from "@floating-ui/dom";

    let {
        user,
    }: {
        user: UserSessionData | null;
    } = $props();

    let profileDropdown = new DropdownState();
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
                {#if user.role}
                    {#if !user.role}
                        <Button href="/event">Mi Evento</Button>
                    {:else}
                        <Button
                            href="/admin"
                            cta="secondary"
                            rounded
                            iconLeft
                            iconRight
                        >
                            <Icon icon={IconType.AdminPanel} />
                        </Button>
                    {/if}
                {/if}
                <Dropdown
                    state={profileDropdown}
                    placement="bottom-end"
                    children={profileDropdownSnippet}
                >
                    {#snippet trigger(onclick, state)}
                        <Button
                            cta="secondary"
                            {onclick}
                            bind:self={state.anchor}
                        >
                            {user.name}
                        </Button>
                    {/snippet}
                </Dropdown>
            {/if}
        </div>
    {:else}
        <Button href="/login">Entrar</Button>
    {/if}
</nav>

{#snippet profileDropdownSnippet()}
    <div class="column profile-dropdown">
        <Button href="/profile" cta="ghost">Profile</Button>
        <Button href="/login" color="danger">Cerrar Sesión</Button>
    </div>
{/snippet}

<style>
    nav {
        position: relative;
        width: 100%;
        height: 3rem;
        padding: 0 1rem;
        justify-content: space-between;
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
        gap: 0.5rem;
    }

    .profile-dropdown {
        padding: 1rem;
        gap: 0.5rem;
    }
</style>
