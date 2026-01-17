import type { PageServerLoad } from "./$types";
import { getEvents } from "$lib/server/db/event";
import type { Event } from "$lib/components/calendar/calendar.svelte";

export const load: PageServerLoad = async () => {
    const events = (await getEvents()).map((v) => {
        return v satisfies Event;
    });

    return {
        events,
    };
};
