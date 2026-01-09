<script lang="ts">
    import { quadOut } from "svelte/easing";
    import { slide } from "svelte/transition";
    import Input from "./Input.svelte";
    import Icon from "./icon/Icon.svelte";
    import { IconType } from "./icon/icon";

    let {
        name,
        label,
        required,
        value = $bindable(),
        placeholder,
        type = "text",
        pattern = undefined,
        error,
    }: {
        name?: string;
        label?: string;
        required?: boolean;
        value?: string;
        placeholder?: string;
        type?: string;
        error?: string;
        pattern?: string;
    } = $props();
</script>

<div class="input column">
    <div class="wrapper column">
        {#if label}
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="tag" class:has-value={value && value !== ""}>
                {label}
            </label>
        {/if}

        <div class="icon">
            <Icon icon={IconType.Search} />
        </div>

        <input
            {required}
            {name}
            class:has-value={value && value !== ""}
            class:has-error={error && error !== ""}
            bind:value
            {type}
            {placeholder}
            {pattern}
        />
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
    .input {
        position: relative;
        min-width: 18.75rem;
        gap: 0;
    }

    label {
        width: fit-content;
        color: var(--neutral);
    }

    .wrapper {
        gap: 0.25rem;
    }

    input {
        width: 100%;
        border-radius: 0.25rem;
        height: 2.5rem;
        font-weight: 500;
        cursor: text;
        padding: calc(0.25rem - 0.125rem) calc(2.25rem - 0.125rem);
        border: 0.125rem solid var(--background-off);
        background-color: var(--background);
        color: var(--neutral);
        transition: all 100ms ease-out;

        &::placeholder {
            color: var(--neutral);
            transition: all 200ms ease-out;
        }

        &:hover {
            color: var(--text-off);
            background-color: oklch(from var(--background-off) l c h / 0.5);

            &::placeholder {
                color: var(--text-off);
            }
        }

        &.has-value {
            color: var(--text);
            background-color: var(--background-off);
        }

        &.has-error {
            border-radius: 0.25rem 0.25rem 0 0;
        }

        &:focus {
            outline: none;
            border: 0.125rem solid var(--accent);
        }
    }

    .icon {
        width: 1.25rem;
        height: 1.25rem;
        position: absolute;
        --icon-color: var(--neutral);
        top: 50%;
        left: 0.5rem;
        transform: translateY(-50%);
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
