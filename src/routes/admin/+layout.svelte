<script lang="ts">
    import AdminNavbar from "$lib/components/AdminNavbar.svelte";

    let { data, children } = $props();
</script>

<div class="row">
    <AdminNavbar user={data.user} />

    <div class="app column">
        {@render children()}
    </div>
</div>

<style>
    .row {
        height: 100%;
        gap: 0;
    }
    .app {
        height: 100%;
        width: 100%;
        padding: 2rem;
        padding-top: 4rem;
        gap: 1rem;
    }
</style>
