<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { IconType } from "$lib/components/icon/icon.js";
    import Icon from "$lib/components/icon/Icon.svelte";
    import Searchbox from "$lib/components/Searchbox.svelte";
    import { WORKERS_TABLE_HEADERS } from "$lib/components/table/definitions.svelte.js";
    import Table from "$lib/components/table/Table.svelte";
    import { TableState } from "$lib/components/table/table.svelte.js";
    import Tag from "$lib/components/tag/Tag.svelte";

    let { data } = $props();

    // svelte-ignore state_referenced_locally
    let tableState = new TableState(data.workers, WORKERS_TABLE_HEADERS);
</script>

<div class="row">
    <h3>Workers</h3>

    <Tag>{data.workers.length}</Tag>
</div>

<div class="actions row">
    <Searchbox bind:value={tableState.search} placeholder="Search" />
    <Button iconLeft>
        <Icon icon={IconType.Plus} />
        Add Worker
    </Button>
</div>

<Table state={tableState} />

<style>
    .actions {
        justify-content: space-between;
        align-items: end;
    }
</style>
