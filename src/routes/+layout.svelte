<script lang="ts">
    let { children } = $props();

    let darkMode: boolean = $state(true);
    let theme = $derived(darkMode ? "dark" : "light");

    $effect(() => {
        darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
</script>

<svelte:head>
    <link
        id="favicon"
        rel="icon"
        href="/favicon-{darkMode ? 'dark' : 'light'}.svg"
        type="image/svg+xml"
    />
    <link
        id="favicon"
        rel="alternative icon"
        href="/favicon-{darkMode ? 'dark' : 'light'}.png"
        type="image/svg+xml"
    />
</svelte:head>

{@render children()}
