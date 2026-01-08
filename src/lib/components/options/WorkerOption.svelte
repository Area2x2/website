<script lang="ts" module>
    export type WorkerData = {
        id: string;
        name: string;
        nickname?: string;
        email: string;
        role: string;
    };
</script>

<script lang="ts">
    import Tag from "../Tag.svelte";

    let { worker }: { worker: WorkerData } = $props();
</script>

<div class="worker-card row">
    <span class="name">
        {worker.name}
    </span>
    <span class="nickname">
        ({worker.nickname})
    </span>
    <Tag color="accent">{worker.role}</Tag>
    <span class="email">
        {worker.email}
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

        .email {
            color: var(--text-off);
            transition: all 200ms ease-out;
        }

        .nickname {
            color: var(--neutral);
            transition: all 200ms ease-out;
        }
    }
</style>
