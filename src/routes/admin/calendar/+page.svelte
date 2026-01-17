<script lang="ts">
    import {
        isSameDay,
        type Event,
    } from "$lib/components/calendar/calendar.svelte";
    import Calendar from "$lib/components/calendar/Calendar.svelte";

    let {
        data,
    }: {
        data: {
            events: Event[];
        };
    } = $props();

    let selectedDate: Date | undefined = $state();
    let selectedEvents = $derived(
        data.events.filter((v) =>
            selectedDate ? isSameDay(v.date, selectedDate) : false,
        ),
    );
</script>

<div class="calendar">
    <Calendar events={data.events} bind:selectedDate />
    {#if selectedDate}
        <aside class="day-overview">
            <h4>{selectedDate.toDateString()}</h4>

            {#if selectedEvents.length === 0}
                <p>No events this day</p>
            {:else}
                {#each selectedEvents as event}
                    <p>{event.id} {event.name}</p>
                {/each}
            {/if}
        </aside>
    {/if}
</div>

<style>
    .calendar {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1rem;
    }
    aside {
        width: 100%;
        height: 100%;
        background-color: var(--background);
        border-radius: 0.5rem;
        padding: 2rem;
    }
</style>
