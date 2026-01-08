<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type { Snippet } from "svelte";
    import type { PageData } from "./$types";

    let { data, children }: { data: PageData; children: Snippet } = $props();
</script>

<Navbar user={data.user} />

<div class="app column">
    {@render children()}
</div>
