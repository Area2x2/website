<script lang="ts">
    let {
        color = "normal",
    }: {
        color?: "normal" | "off" | "off-2" | "neutral";
    } = $props();

    let backgroundColor = $derived.by(() => {
        switch (color) {
            case "normal":
                return "background";
            case "off":
                return "background-off";
            case "off-2":
                return "background-off2";
            case "neutral":
                return "neutral";
        }
    });
</script>

<div style="background-color: var(--{backgroundColor});"></div>

<style>
    div {
        width: 100%;
        height: 0.125rem;
    }
</style>
