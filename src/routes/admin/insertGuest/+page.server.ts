import { fail, type Actions } from "@sveltejs/kit";
import {
    validateAge,
    validateEmail,
    validateId,
    validateMonetaryValue,
    validateName,
    validateNickname,
    validatePaymentMethod,
} from "$lib/server/db/validation";
import { makeDeposit } from "$lib/server/db/deposit";
import type { PageServerLoad } from "./$types";
import { getWorkers } from "$lib/server/db/worker";
import { getEvents } from "$lib/server/db/event";
import type { WorkerData } from "$lib/components/options/WorkerOption.svelte";
import type { EventData } from "$lib/components/options/EventOption.svelte";

export const load: PageServerLoad = async () => {
    const workers = (await getWorkers()).map((v) => {
        return {
            id: v.user.id,
            name: v.user.name,
            nickname: v.user.nickname ?? undefined,
            email: v.user.email,
            role: v.worker.role,
            wallet: "-",
        } satisfies WorkerData;
    });

    const events = (await getEvents()).map((v) => {
        return {
            id: v.id,
            name: v.name,
            date: v.date.toDateString(),
        } satisfies EventData;
    });

    return {
        workers,
        events,
    };
};

export const actions = {
    insertGuest: async ({ request }) => {
        const formData = await request.formData();
        const formDataObject = Object.fromEntries(
            formData.entries().map(([k, v]) => [k, v.toString()]),
        );

        const email = formData.get("email");
        const name = formData.get("name");
        const age = formData.get("age");
        const nickname = formData.get("nickname");
        const amount = formData.get("amount");
        const paymentMethod = formData.get("paymentMethod");
        const eventId = formData.get("eventId");
        const workerId = formData.get("workerId");

        let errorMessages: Map<string, string> = new Map();

        if (!validateEmail(email)) {
            errorMessages.set("email", "Invalid email");
        }

        if (!validateName(name)) {
            errorMessages.set("name", "Invalid name");
        }

        if (!validateAge(age)) {
            errorMessages.set("age", "Invalid age");
        }

        if (!validateNickname(nickname)) {
            errorMessages.set("nickname", "Invalid nickname");
        }

        if (!validateMonetaryValue(amount)) {
            errorMessages.set("amount", "Invalid amount");
        }

        if (!validatePaymentMethod(paymentMethod)) {
            errorMessages.set("paymentMethod", "Invalid paymentMethod");
        }

        if (!validateId(eventId)) {
            errorMessages.set("eventId", "Invalid eventId");
        }

        if (!validateId(workerId)) {
            errorMessages.set("workerId", "Invalid workerId");
        }

        if (errorMessages.size !== 0) {
            console.log(formDataObject, errorMessages);
            return fail(400, {
                formData: formDataObject,
                errorMessages,
            });
        }

        try {
            const { code, guestId } = await makeDeposit(
                //@ts-ignore
                name,
                //@ts-ignore
                email,
                //@ts-ignore
                age,
                //@ts-ignore
                nickname,
                //@ts-ignore
                amount,
                //@ts-ignore
                paymentMethod,
                //@ts-ignore
                eventId,
                //@ts-ignore
                workerId,
            );
            console.log(guestId, code);
        } catch (e: any) {
            return fail(500, {
                formData: formDataObject,
                message: "Server Error",
            });
        }

        return { success: true };
    },
} satisfies Actions;
