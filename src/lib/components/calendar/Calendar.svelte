<script lang="ts">
    import {
        HEADER,
        isSameDay,
        MONTHS,
        type Event,
    } from "$lib/components/calendar/calendar.svelte";
    import Button from "$lib/components/Button.svelte";
    import { IconType } from "$lib/components//icon/icon";
    import Icon from "$lib/components//icon/Icon.svelte";
    import CalendarDay from "./CalendarDay.svelte";

    let {
        events,
        selectedDate = $bindable(),
    }: {
        events: Event[];
        selectedDate?: Date;
    } = $props();

    let today = $state(new Date(Date.now()));

    let day = $state(today.getDate());
    let month = $state(today.getMonth());
    let monthStr = $derived(MONTHS[month]);
    let year = $state(today.getFullYear());

    let firstDayOfMonth = $derived(new Date(year, month, 1).getDay());
    let daysThisMonth = $derived(new Date(year, month + 1, 0).getDate());
    let daysLastMonth = $derived(new Date(year, month, 0).getDate());

    let tailPaddingDays = $derived(7 * 6 - (firstDayOfMonth + daysThisMonth));

    function incrementMonth() {
        month++;
        if (month == 12) {
            month -= 12;
            year++;
        }
    }

    function decrementMonth() {
        month--;
        if (month < 0) {
            month += 12;
            year--;
        }
    }

    function onclickdate(date: Date) {
        selectedDate = date;
    }
</script>

<div class="calendar-wrapper column">
    <div class="calendar-header row">
        <Button onclick={decrementMonth} cta="secondary" iconLeft iconRight>
            <Icon icon={IconType.ChevronLeft} />
        </Button>
        <h6 class="calendar-header-title">{monthStr} {year}</h6>
        <Button onclick={incrementMonth} cta="secondary" iconLeft iconRight>
            <Icon icon={IconType.ChevronRight} />
        </Button>
    </div>

    <div class="calendar">
        <!-- Header days -->
        {#each Array(7) as _, i}
            <CalendarDay value={HEADER[i]} state="header" />
        {/each}

        <!-- Padding days -->
        {#each Array(firstDayOfMonth) as _, i}
            <CalendarDay
                value={(daysLastMonth - (firstDayOfMonth - i) + 1).toString()}
                state="disabled"
            />
        {/each}

        {#each Array(daysThisMonth) as _, day}
            {@const date = new Date(year, month, day + 1)}
            {@const dayEvents: Event[] = events.filter(v => isSameDay(v.date, new Date(year, month, day + 1)))}
            {@const isToday =
                day + 1 === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()}
            {@const isWeekend = date.getDay() + 1 > 5}
            {@const isSelected = selectedDate === date}
            <CalendarDay
                state={isSelected
                    ? "selected"
                    : isToday
                      ? "today"
                      : isWeekend
                        ? "weekend"
                        : undefined}
                value={(day + 1).toString()}
                events={dayEvents}
                onclick={() => onclickdate(date)}
            />
        {/each}

        {#each Array(tailPaddingDays) as _, day}
            <CalendarDay value={(day + 1).toString()} state="disabled" />
        {/each}
    </div>
</div>

<style>
    .calendar-wrapper {
        width: fit-content;
        gap: 0.5rem;
    }

    .calendar-header {
        width: 100%;
        justify-content: center;
    }

    .calendar-header-title {
        width: 16rem;
        text-align: center;
    }

    .calendar {
        display: grid;
        row-gap: 0.5rem;
        column-gap: 0.5rem;
        grid-template-columns: repeat(7, minmax(0, 8rem));
        grid-template-rows: 2rem repeat(6, 1fr);
    }
</style>
