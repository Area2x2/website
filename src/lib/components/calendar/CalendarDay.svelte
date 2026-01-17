<script lang="ts">
    import CalendarEvent from "./CalendarEvent.svelte";
    import type { Event } from "./calendar.svelte";

    let {
        value: day,
        events,
        onclick,
        state,
    }: {
        value: string;
        events?: Event[];
        onclick?: (e: MouseEvent) => void;
        state?: "selected" | "disabled" | "weekend" | "today" | "header";
    } = $props();
</script>

<button
    {onclick}
    class="calendar-day column {state}"
    disabled={state === "disabled"}
>
    {day}
    {#each events as event}
        <CalendarEvent {event} />
    {/each}
</button>

<style>
    .calendar-day {
        width: 100%;
        min-height: 4rem;
        background-color: var(--background);
        border-radius: 0.5rem;
        padding: 0.5rem;
        gap: 0.5rem;
        color: var(--text-off);
        transition: all 100ms ease-out;

        &:disabled {
            cursor: none;
            pointer-events: none;
            opacity: 0.5;
            padding: calc(0.5rem - 0.125rem);
            background-color: unset;
            border: 0.125rem solid var(--background);
        }

        &.today {
            background-color: var(--accent);
            color: var(--backdrop);
        }

        &.weekend {
            background-color: oklch(
                from var(--background) l 0.05 var(--accent-h)
            );
        }

        &.selected {
            background-color: var(--text);
            color: var(--backdrop);
        }

        &.header {
            cursor: none;
            pointer-events: none;
            background-color: unset;
            min-height: 2rem;
            color: var(--neutral);
        }

        :global(& .tag-wrapper),
        :global(& .tag) {
            width: 100%;
        }
    }
</style>
