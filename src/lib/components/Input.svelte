<script lang="ts">
    import { quadOut } from "svelte/easing";
    import { slide } from "svelte/transition";

    let {
        name,
        label,
        value = $bindable(),
        placeholder,
        type = "text",
        width = "auto",
        pattern = undefined,
        error,
    }: {
        name?: string;
        label?: string;
        value?: string;
        placeholder?: string;
        type?: string;
        width?: string;
        error?: string;
        pattern?: string;
    } = $props();
</script>

<div class="input column" style:width>
    {#if label}
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="tag" class:has-content={value && value !== ""}>
            {label}
        </label>
    {/if}

    <input
        {name}
        class:has-content={value && value !== ""}
        bind:value
        {type}
        {placeholder}
        {pattern}
    />

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
    .input {
        min-width: 18.75rem;
    }
    .column {
        gap: 0.25rem;
    }

    input {
        background: unset;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        color: var(--text);
        font-family: "Barlow", sans-serif;
        align-items: center;

        width: 100%;
        border: 2px solid var(--background-off);
        border-radius: 0.5rem;
        height: 2.5rem;
        padding: 0.25rem 1rem;
        font-weight: 500;
        cursor: text;

        &.has-content {
            font-weight: semibold;
        }
    }

    label {
        width: fit-content;
        color: var(--neutral);
    }

    .error {
        height: 1.5rem;
        display: grid;
        place-items: center;
        color: var(--background);
        background-color: var(--danger);
    }
</style>
