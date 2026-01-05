<script lang="ts">
    import type { Snippet } from "svelte";

    let { color = "accent", children }: { color: string; children: Snippet } =
        $props();
</script>

<span class="tag wrapper" style="--color: var(--{color});">
    <span class="tag">
        {@render children()}
    </span>
</span>

<style>
    .wrapper {
        background-color: var(--color);
        padding: 0.125rem 0.25rem;
        border-radius: 0.25rem;

        & > span {
            mix-blend-mode: luminosity;
            color: var(--background-off);
        }
    }
</style>
