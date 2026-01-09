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
        align = "center",
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
        align?: "start" | "center" | "end";
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
        style:justify-items={align}
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
        style:justify-items={align}
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
        align-items: base;

        letter-spacing: 1%;
        line-height: 160%;

        min-width: 2rem;
        height: 2rem;
        display: flex;
        flex-direction: row;
        padding: 0.375rem 0.75rem;
        border-radius: 0.25rem;
        text-decoration: none;
        transition: all 200ms ease-out;
        gap: 0.375rem;

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
            background-color: unset;
            --icon-color: var(--neutral);

            &:hover {
                background-color: var(--background-off);
                --icon-color: var(--text);
            }
        }

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
            padding-left: 0.375rem;
        }

        &.icon-right {
            padding-right: 0.375rem;
        }

        &.icon {
            padding: 0.5rem;
        }
    }
</style>
