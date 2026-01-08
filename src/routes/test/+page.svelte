<script lang="ts">
    import Combobox from "$lib/components/combobox/Combobox.svelte";
    import { ComboboxState } from "$lib/components/combobox/combobox.svelte.js";
    import WorkerOption from "$lib/components/options/WorkerOption.svelte";
    import type { WorkerData } from "./+page.server";

    let { data }: { data: { workers: WorkerData[] } } = $props();

    const combobox1Values = [
        { id: "value1", value: "value 1" },
        { id: "value2", value: "value 2" },
        { id: "value3", value: "value 3" },
    ];
    let combobox1State = new ComboboxState(combobox1Values, {
        id: "id",
        index: "value",
        store: ["id"],
    });

    let combobox2State = new ComboboxState<WorkerData>(
        // svelte-ignore state_referenced_locally
        data.workers,
        {
            id: "id",
            index: ["name", "nickname", "email"],
            store: ["id"],
        },
    );
</script>

<Combobox label="Combobox 1" placeholder="Combobox 1" state={combobox1State}>
    {#snippet display(v: { id: string; value: string })}
        {@const value = combobox1Values.find((value) => value.id == v.id)}
        {#if value}
            {value.value}
        {/if}
    {/snippet}
</Combobox>
<Combobox label="Combobox 2" placeholder="Combobox 2" state={combobox2State}>
    {#snippet display(v: WorkerData)}
        {@const worker = data.workers.find((worker) => worker.id == v.id)}
        {#if worker}
            <WorkerOption {worker} />
        {/if}
    {/snippet}
</Combobox>
