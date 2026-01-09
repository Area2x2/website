<script lang="ts">
    import type { Snippet } from "svelte";
    import type { TagColor } from "./tag.svelte";

    let {
        color = "neutral",
        children,
    }: {
        color?: TagColor;
        children: Snippet;
    } = $props();
</script>

<span class="tag-wrapper {color}">
    <span class="tag">
        {@render children()}
    </span>
</span>

<style>
    .tag-wrapper {
        background-color: var(--color);
        border-radius: 0.25rem;
        display: flex;
        padding: 0.25rem 0.375rem;

        .tag {
            mix-blend-mode: luminosity;
            color: inherit;
        }

        &.neutral {
            background-color: var(--background-off);
            color: var(--text-off);
        }

        &.accent {
            background-color: var(--accent);
            color: var(--backdrop);
        }

        &.red {
            background-color: var(--red);
            color: var(--backdrop);
        }

        &.yellow {
            background-color: var(--yellow);
            color: var(--backdrop);
        }

        &.green {
            background-color: var(--green);
            color: var(--backdrop);
        }
    }
</style>
