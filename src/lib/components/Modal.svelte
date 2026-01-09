<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ModalState } from "./modal/modal.svelte";

    let { state, children }: { state: ModalState; children: Snippet } =
        $props();
</script>

{#if state.open}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore event_directive_deprecated -->
    <div class="overlay" on:click={(e) => state.onblur(e)}></div>

    <div class="modal">
        {@render children()}
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background-color: black;
        opacity: 0.5;
        transition: all 1s ease-out;
    }

    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        padding: 2rem;
        transform: translate(-50%, -50%);
        z-index: 1001;
        background-color: var(--background);
        border-radius: 0.5rem;
    }
</style>
