<script lang="ts" generics="T extends Data">
    import Floating from "../Floating.svelte";
    import { type ComboboxProps, type Data } from "./combobox.svelte.ts";
    import Input from "../Input.svelte";
    import HDivider from "../HDivider.svelte";
    import { slide } from "svelte/transition";
    import { quadOut } from "svelte/easing";

    let { name, label, placeholder, state, display, error }: ComboboxProps<T> =
        $props();
</script>

<svelte:window on:click={(e) => state.onblur(e)} />

<div class="combobox column">
    <div class="wrapper column">
        {#if label}
            <span class="tag"
                >{label}
                <input
                    type="text"
                    {name}
                    value={state.value ? state.value?.id : ""}
                />
            </span>
        {/if}

        <div class="combobox-wrapper">
            <button
                bind:this={state.anchor}
                class:open={state.showDropdown}
                class:has-value={state.value !== undefined}
                class:has-error={error && error !== ""}
                class="combobox-trigger"
                onclickcapture={(e) => state.onclick(e)}
            >
                {#if !state.value && placeholder}
                    {placeholder}
                {:else if state.value}
                    {#if display}
                        {@render display(state.value)}
                    {:else}
                        {state.value}
                    {/if}
                {/if}
            </button>
            {#if state.showDropdown}
                <Floating
                    anchor={state.anchor}
                    bind:element={state.floating}
                    fitWidth
                >
                    <div class="content">
                        <div class="input-wrapper">
                            <Input bind:value={state.search} />
                        </div>
                        <HDivider color="off" />
                        <div class="options column">
                            {#if state.filtered.length > 0}
                                {#each state.filtered as option}
                                    <button
                                        class="option"
                                        class:selected={state.value &&
                                            option.id == state.value.id}
                                        onclickcapture={(e) =>
                                            state.onselect(e, option)}
                                    >
                                        {#if display}
                                            {@render display(option)}
                                        {:else}
                                            {option}
                                        {/if}
                                    </button>
                                {/each}
                            {:else}
                                <span class="option">No results found</span>
                            {/if}
                        </div>
                    </div>
                </Floating>
            {/if}
        </div>
    </div>

    {#if error}
        <p
            class="error"
            transition:slide={{ axis: "y", duration: 200, easing: quadOut }}
        >
            {error}
        </p>
    {/if}
</div>

<style>
    .combobox {
        position: relative;
        gap: 0;
    }

    input {
        display: none;
    }

    .tag {
        width: fit-content;
        color: var(--neutral);
    }

    .wrapper {
        gap: 0.25rem;
    }

    .combobox-trigger {
        position: relative;
        min-width: 16rem;
        width: 100%;
        color: var(--neutral);
        border-radius: 0.25rem;
        transition: all 100ms ease-out;
        align-content: center;
        text-align: start;
        font-weight: inherit;
        border: 0.125rem solid var(--background-off);
        padding: calc(0.5rem - 0.125rem) calc(1rem - 0.125rem);
        height: 2.5rem;
        background-color: var(--background);

        &:hover {
            color: var(--text-off);
            background-color: oklch(from var(--background-off) l c h / 0.5);
        }

        &.has-value {
            color: var(--text);
            background-color: var(--background-off);
        }

        &.has-error {
            border-radius: 0.25rem 0.25rem 0 0;
        }

        &.open {
            color: var(--text-off);
            background-color: var(--background-off);
        }

        &:focus {
            outline: none;
            border: 0.125rem solid var(--accent);
        }
    }

    .input-wrapper {
        padding: 0.5rem;
    }

    .content {
        margin: 0;
        border: 0;
        background-color: var(--background);
        color: var(--neutral);
        height: auto;
    }

    .options {
        gap: 0;
    }

    .option {
        text-align: start;
        color: var(--text-off);
        padding: 0.5rem 1rem;
        width: 100%;
        transition: all 100ms ease-out;
        height: 2.5rem;
    }

    button.option {
        cursor: pointer;

        &:hover {
            color: var(--text);
            background-color: var(--background-off);
        }

        &.selected {
            background-color: oklch(
                from var(--background-off) l var(--accent-c) var(--accent-h) /
                    0.5
            );
        }

        &.selected:hover {
            background-color: oklch(
                from var(--background-off-2) l var(--accent-c) var(--accent-h) /
                    0.5
            );
        }
    }

    .error {
        width: 100%;
        color: var(--background);
        background-color: var(--danger);
        justify-content: start;
        padding: 0.25rem 1rem;
        border-radius: 0 0 0.25rem 0.25rem;
    }
</style>
