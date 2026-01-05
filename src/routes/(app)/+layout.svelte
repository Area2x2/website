<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type { Snippet } from "svelte";
    import type { PageData } from "./$types";

    let { data, children }: { data: PageData; children: Snippet } = $props();
</script>

<!-- <svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head> -->

<Navbar user={data.user} />

{@render children()}
