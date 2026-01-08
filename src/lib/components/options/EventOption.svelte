<script lang="ts" module>
    export type EventData = {
        id: string;
        name: string;
        date: string;
    };
</script>

<script lang="ts">
    let { event }: { event: EventData } = $props();
</script>

<div class="worker-card row">
    <span class="name">
        {event.name}
    </span>
    <span class="date">
        ({event.date})
    </span>
</div>

<style>
    .worker-card {
        transition: all 200ms ease-out;
        gap: 0.5rem;

        .name {
            color: var(--text);
            transition: all 200ms ease-out;
        }

        .date {
            color: var(--neutral);
            transition: all 200ms ease-out;
        }
    }
</style>
