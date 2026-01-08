<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        onclick,
        cta = "primary",
        disabled = false,
        children,
        width = "auto",
        href,
        color = "accent",
        rounded,
        iconLeft,
        iconRight,
        self = $bindable(),
        ...props
    }: {
        onclick?: (e: MouseEvent) => void;
        cta?: "primary" | "secondary" | "ghost";
        disabled?: boolean;
        children: Snippet;
        width?: string | number;
        href?: string;
        color?: string;
        rounded?: boolean;
        iconLeft?: boolean;
        iconRight?: boolean;
        self?: HTMLElement;
    } = $props();
</script>

{#if href}
    <a
        bind:this={self}
        {href}
        class={cta}
        style="--color: var(--{color});"
        class:disabled
        class:rounded
        class:icon-left={iconLeft}
        class:icon-right={iconRight}
        style:width
        {...props}
    >
        {@render children()}
    </a>
{:else}
    <button
        bind:this={self}
        {onclick}
        class={cta}
        style="--color: var(--{color});"
        class:disabled
        class:rounded
        class:icon-left={iconLeft}
        class:icon-right={iconRight}
        style:width
        {...props}
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

        letter-spacing: 1%;
        line-height: 160%;

        justify-content: center;
        min-width: 2.5rem;
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        padding: 0.5rem 1rem;
        font-weight: bold;
        border-radius: 0.25rem;
        text-decoration: none;
        transition: all 200ms ease-out;

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
            user-select: none;
            cursor: not-allowed;
        }

        &.rounded {
            border-radius: 2.25rem;
        }

        &.icon-left {
            padding: 0.5rem;
        }

        &.icon-right {
            padding: 0.5rem;
        }

        &.primary {
            background-color: var(--color);
            color: var(--background);
            --icon-color: var(--background);

            &:hover {
                background-color: oklch(from var(--color) calc(l + 0.1) c h);
            }
        }

        &.secondary {
            background-color: var(--background-off);
            --icon-color: var(--text-off);

            &:hover {
                --icon-color: var(--text);
                background-color: oklch(
                    from var(--background-off) calc(l + 0.1) c h
                );
            }
        }

        &.ghost {
            --icon-color: var(--background);
            border: 0.125rem solid var(--background-off);

            &:hover {
                background-color: var(--background-off);
                --icon-color: var(--text);
            }
        }

        &.icon {
            padding: 0.5rem;
        }
    }
</style>
