import { fail, type Actions } from "@sveltejs/kit";
import {
    validateDate,
    validateLocation,
    validateName,
    validateTime,
} from "$lib/server/db/validation";
import { createEvent, getEventFromName } from "$lib/server/db/event";

export const actions = {
    insertEvent: async ({ request }) => {
        const formData = await request.formData();

        const name = formData.get("name");
        const location = formData.get("location");
        const time = formData.get("time");
        const date = formData.get("date");

        if (!validateName(name)) {
            return fail(400, {
                message:
                    "Invalid name (min 3, max 31 characters, alphanumeric only)",
            });
        }

        if (!validateDate(date)) {
            return fail(400, {
                message: "Invalid date",
            });
        }

        if (location !== "" && !validateLocation(location)) {
            return fail(400, {
                message:
                    "Invalid location (min 10, max 128, alphanumeric only)",
            });
        }

        if (time !== "" && !validateTime(time)) {
            return fail(400, {
                message: "Invalid time (format HH:MM)",
            });
        }

        if (await getEventFromName(name)) {
            return fail(400, {
                message: "Event already exists",
            });
        }

        try {
            await createEvent(
                name,
                date,
                location === "" ? undefined : location,
                time === "" ? undefined : time,
            );
        } catch (e: any) {
            return fail(500, { message: e.message });
        }

        return { success: true };
    },
} satisfies Actions;
