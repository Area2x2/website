<script lang="ts">
    import type { Middleware, Placement } from "@floating-ui/dom";
    import Button from "../Button.svelte";
    import Floating from "../Floating.svelte";
    import type { DropdownState } from "./dropdown.svelte";
    import type { Snippet } from "svelte";

    let {
        state,
        trigger,
        children,
        placement,
        middleware,
    }: {
        state: DropdownState;
        trigger: Snippet<
            [onclick: (e: MouseEvent) => void, state: DropdownState]
        >;
        placement?: Placement;
        children: Snippet;
        middleware?: Middleware[];
    } = $props();
</script>

<svelte:window on:click={(e) => state.onblur(e)} />

<div class="dropdown column">
    {@render trigger((e) => state.onclick(e), state)}

    {#if state.showDropdown && state.anchor}
        <Floating
            anchor={state.anchor}
            bind:element={state.floating}
            {placement}
            {middleware}
        >
            <div class="content">
                {@render children()}
            </div>
        </Floating>
    {/if}
</div>

<style>
    .dropdown {
        position: relative;
    }
    .column {
        gap: 0.25rem;
    }

    .content {
        margin: 0;
        border: 0;
        background-color: var(--background);
        color: var(--neutral);
    }
</style>
