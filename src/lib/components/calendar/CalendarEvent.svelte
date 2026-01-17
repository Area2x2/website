<script lang="ts">
    import type { Event } from "./calendar.svelte";

    let { event }: { event: Event } = $props();
</script>

<a href="/event/{event.id}" class="calendar-event">
    {event.name}
</a>

<style>
    a {
        padding: 0.25rem 0.5rem;
        background-color: var(--accent);
        text-decoration: none;
        color: var(--backdrop);
        border-radius: 0.5rem;
        font-size: 0.75rem;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 100ms ease-out;

        &:hover {
            background-color: oklch(
                from var(--text-off) l var(--accent-c) var(--accent-h)
            );
        }
    }
</style>
