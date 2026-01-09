<script lang="ts">
    import type { UserSessionData } from "$lib/server/auth";
    import Button from "./Button.svelte";
    import Icon from "./icon/Icon.svelte";
    import { IconType } from "./icon/icon";
    import Logo from "./Logo.svelte";
    import Tag from "./tag/Tag.svelte";
    import Dropdown from "./dropdown/Dropdown.svelte";
    import { DropdownState } from "./dropdown/dropdown.svelte";

    let {
        user,
    }: {
        user: UserSessionData | null;
    } = $props();
</script>

<nav class="column">
    <Logo width="1.5rem" color="var(--accent)" />

    <div class="nav-group column">
        <Button href="/dashboard" cta="ghost" iconLeft iconRight>
            <Icon icon={IconType.Home} />
        </Button>
        <Button href="/inventory" cta="ghost" iconLeft iconRight>
            <Icon icon={IconType.Database} />
        </Button>
        <Button href="/wallet" cta="ghost" iconLeft iconRight>
            <Icon icon={IconType.Wallet} />
        </Button>
        <Button href="/calendar" cta="ghost" iconLeft iconRight>
            <Icon icon={IconType.Calendar} />
        </Button>
        <Button href="/workers" cta="ghost" iconLeft iconRight>
            <Icon icon={IconType.Users} />
        </Button>
        <Button href="/map" cta="ghost" iconLeft iconRight>
            <Icon icon={IconType.Map} />
        </Button>
    </div>
</nav>

<style>
    nav {
        position: relative;
        width: 2.5rem;
        height: 100%;
        padding: 1rem;
        align-items: center;
        gap: 2rem;

        border-right: 0.125rem solid var(--background);
    }

    .nav-group {
        gap: 0.25rem;
    }
</style>
