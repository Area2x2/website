<script lang="ts" generics="T extends Object">
    import { IconType } from "../icon/icon";
    import Icon from "../icon/Icon.svelte";
    import Tag from "../tag/Tag.svelte";
    import { getTagColor } from "../tag/tag.svelte";
    import {
        COLUMN_WIDTHS,
        type TableHeader,
        type TableState,
    } from "./table.svelte";

    let {
        state,
    }: {
        state: TableState<T>;
    } = $props();
</script>

<div class="table-wrapper">
    <table>
        {@render tableColgroups()}
        {@render tableHeader()}

        <tbody>
            {#each state.sortedData as item}
                <tr>
                    {@render tableRowChildren(item)}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

{#snippet tableColgroups()}
    <colgroup>
        {#each state.headers as header}
            <col />
        {/each}
    </colgroup>
{/snippet}

{#snippet tableHeader()}
    <thead>
        <tr>
            {#each state.headers as header}
                <th onclick={() => state.onclicktablehead(header.slug)}>
                    <span class="tag">
                        {header.name}
                    </span>
                    {#if state.columnSorting !== undefined && state.columnSorting.column === header.slug}
                        <div class="overlay">
                            {#if state.columnSorting.sorting === "ascending"}
                                <Icon icon={IconType.ChevronDown} />
                            {:else if state.columnSorting.sorting === "descending"}
                                <Icon icon={IconType.ChevronUp} />
                            {/if}
                        </div>
                    {/if}
                </th>
            {/each}
        </tr>
    </thead>
{/snippet}

{#snippet tableRowChildren(item: T)}
    {#each state.headers as header}
        {@const entries = Object.entries(item)}
        {@const dataEntry = entries.find(([k, v]) => k === header.slug)}
        {#if dataEntry}
            {@const data = dataEntry[1]}
            <td
                class={header.width}
                style:min-width={COLUMN_WIDTHS[header.width]}
            >
                <div class="row">
                    {@render tableCell(data, header)}
                </div>
            </td>
        {/if}
    {/each}
{/snippet}

{#snippet tableCell(data: string, tableHeader: TableHeader)}
    {#if data}
        {#if tableHeader.type === "tag" && tableHeader.tagCategory !== undefined}
            <Tag color={getTagColor(tableHeader.tagCategory, data)}>
                {data}
            </Tag>
        {:else}
            {data}
        {/if}
    {/if}
{/snippet}

<style>
    .table-wrapper {
        border-radius: 0.5rem;
        overflow: hidden;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    tr {
        width: 100%;
        height: 2.5rem;
        padding: 0.75rem 1rem;
        background-color: var(--background);
    }

    th {
        background-color: var(--background);
    }

    thead,
    tr,
    th,
    td {
        height: 2.5rem;
        transition: all 200ms ease-out;
    }

    thead,
    tr {
        width: 100%;
    }

    th {
        position: relative;
        overflow: hidden;
        z-index: 1;
        padding: 0.5rem 1rem;
        text-align: start;
        cursor: pointer;
        user-select: none;
        font-weight: bold;
        color: var(--neutral);

        &:hover {
            color: var(--text);

            .overlay {
                --icon-color: var(--text);
            }
        }

        .overlay {
            position: absolute;
            left: calc(100% - 0.5rem);
            top: 50%;
            transform: translate(-100%, -50%);
            width: 1.25rem;
            height: 1.25rem;

            --icon-color: var(--neutral);
        }
    }

    thead {
        border-bottom: 0.125rem solid var(--backdrop);
    }

    tr:not(:last-child) {
        td {
            border-bottom: 0.125rem solid var(--backdrop);
        }
    }

    td {
        padding: 0.5rem 1rem;
        height: 2.5rem;

        &.fill {
            width: 100%;
            min-width: 12rem !important;
            overflow: hidden;
        }

        & > .row {
            gap: 0.125rem;
        }

        & * {
            white-space: nowrap;
            text-wrap: wrap;
        }
    }
</style>
