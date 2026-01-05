<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        cta = "primary",
        disabled = false,
        children,
        width = "auto",
        href,
        color = "accent",
    }: {
        cta?: "primary" | "secondary";
        disabled?: boolean;
        children: Snippet;
        width?: string | number;
        href?: string;
        color?: string;
    } = $props();
</script>

{#if href}
    <a
        {href}
        class={cta}
        style="--color: var(--{color});"
        class:disabled
        style:width
    >
        {@render children()}
    </a>
{:else}
    <button
        class={cta}
        style="--color: var(--{color});"
        class:disabled
        style:width
    >
        {@render children()}
    </button>
{/if}

<style>
    a,
    button {
        background: unset;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        color: var(--text);
        font-family: "Barlow", sans-serif;
        align-items: center;

        justify-content: center;
        min-width: 2.5rem;
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        padding: 0.5rem 1rem;
        font-weight: bold;
        border-radius: 0.5rem;
        text-decoration: none;

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
            user-select: none;
            cursor: not-allowed;
        }

        &.primary {
            background-color: var(--color);
            color: var(--background);
            --icon-color: var(--background);
        }

        &.secondary {
            background-color: var(--background-off);
            --icon-color: var(--text-off);

            &:hover {
                --icon-color: var(--text);
            }
        }

        &.icon {
            padding: 0.5rem;
        }
    }
</style>
