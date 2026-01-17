<script lang="ts">
    import type { Snippet } from "svelte";
    import type { TagColor } from "./tag.svelte";

    let {
        color = "neutral",
        invertColors,
        children,
    }: {
        color?: TagColor;
        invertColors?: boolean;
        children: Snippet;
    } = $props();
</script>

<span class="tag-wrapper {color}" class:invert={invertColors}>
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
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &.neutral {
            background-color: var(--background-off);
            color: var(--text-off);

            &.invert {
                background-color: var(--text-off);
                color: var(--background-off);
            }
        }

        &.accent {
            background-color: var(--accent);
            color: var(--backdrop);

            &.invert {
                background-color: oklch(
                    from var(--accent) var(--color-l) var(--color-c) h
                );
                color: var(--backdrop);
            }
        }

        &.red {
            background-color: var(--red);
            color: var(--backdrop);

            &.invert {
                background-color: oklch(
                    from var(--red) var(--color-invert-l) var(--color-c) h
                );
                color: var(--text-off);
            }
        }

        &.yellow {
            background-color: var(--yellow);
            color: var(--backdrop);

            &.invert {
                background-color: oklch(
                    from var(--yellow) var(--color-l) var(--color-c) h
                );
                color: var(--yellow);
            }
        }

        &.green {
            background-color: var(--green);
            color: var(--backdrop);

            &.invert {
                background-color: oklch(
                    from var(--green) var(--color-l) var(--color-c) h
                );
                color: var(--green);
            }
        }
    }
</style>
