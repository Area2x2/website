<script lang="ts">
    import {
        computePosition,
        flip,
        offset,
        shift,
        size,
        type Middleware,
        type Placement,
    } from "@floating-ui/dom";
    import { onMount, type Snippet } from "svelte";
    import { cubicOut } from "svelte/easing";
    import { fly } from "svelte/transition";

    let {
        anchor,
        placement = "bottom",
        middleware: initialMiddleware = [flip(), shift(), offset(8)],
        onclick,
        onblur,
        children,
        fitWidth,
        element = $bindable(),
    }: {
        anchor: HTMLElement;
        placement?: Placement;
        middleware?: Middleware[];
        onclick?: () => void;
        onblur?: () => void;
        children: Snippet;
        fitWidth?: boolean;
        element?: HTMLElement;
    } = $props();

    let middleware = $derived.by(() => {
        const array = initialMiddleware;
        if (fitWidth)
            array.push(
                size({
                    apply({ elements }) {
                        const referenceBoundingBox =
                            elements.reference.getBoundingClientRect();
                        Object.assign(elements.floating.style, {
                            maxWidth: `${Math.max(0, referenceBoundingBox.width)}px`,
                            width: `100%`,
                        });
                    },
                }),
            );

        return array;
    });

    onMount(() => {
        if (element) {
            computePosition(anchor, element, {
                placement,
                middleware,
            }).then(({ x, y }) => {
                if (element)
                    Object.assign(element.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                    });
            });

            element.focus({
                preventScroll: true,
            });
        }
    });
</script>

<div
    {onblur}
    transition:fly={{ y: -8, easing: cubicOut, duration: 200 }}
    bind:this={element}
    class="floating"
>
    {@render children()}
</div>

<style>
    .floating {
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;
        overflow: scroll;
        box-sizing: border-box;
        box-shadow: var(--shadow);
        border-radius: 0.25rem;
        z-index: 999;

        &:focus {
            border: 0.125rem solid var(--accent);
        }
    }
</style>
