<script lang="ts">
    import {
        DEFAULT_ICON_CLIP_RULE,
        DEFAULT_ICON_FILL_RULE,
        ICON_VALUES,
        type IconType,
    } from "./icon";

    let {
        icon,
        fill,
    }: {
        icon: IconType;
        fill?: string;
    } = $props();

    // svelte-ignore state_referenced_locally
    const iconDefinition = ICON_VALUES.get(icon);
</script>

<svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={!iconDefinition?.isStroke
        ? fill
            ? "--icon-color: " + fill
            : ""
        : ""}
>
    {#each iconDefinition?.d ?? [] as iconDef}
        {#if iconDefinition?.isStroke}
            <path
                fill-rule={DEFAULT_ICON_FILL_RULE}
                clip-rule={DEFAULT_ICON_CLIP_RULE}
                d={iconDef}
                fill="none"
                stroke="var(--icon-color)"
            />
        {:else}
            <path
                fill-rule={DEFAULT_ICON_FILL_RULE}
                clip-rule={DEFAULT_ICON_CLIP_RULE}
                d={iconDef}
                fill="var(--icon-color)"
            />
        {/if}
    {/each}
</svg>

<style>
    svg {
        width: 1.25rem;
        height: 1.25rem;
    }
    path {
        transition: all 200ms ease-out;
        stroke-width: 0.125rem;
    }
</style>
