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

export const actions = {
    insertGuest: async ({ request }) => {
        const formData = await request.formData();

        const email = formData.get("email");
        const name = formData.get("name");
        const age = formData.get("age");
        const nickname = formData.get("nickname");
        const amount = formData.get("amount");
        const paymentMethod = formData.get("paymentMethod");
        const eventId = formData.get("eventId");
        const workerId = formData.get("workerId");

        if (!validateEmail(email)) {
            return fail(400, {
                message: "Invalid email",
            });
        }

        if (!validateName(name)) {
            return fail(400, {
                message:
                    "Invalid name (min 3, max 31 characters, alphanumeric only)",
            });
        }

        if (!validateAge(age)) {
            return fail(400, {
                message: "Invalid age (underage or over 100 years old)",
            });
        }

        if (!validateNickname(nickname)) {
            return fail(400, {
                message:
                    "Invalid nickname (min 3, max 31 characters, alphanumeric only)",
            });
        }

        if (!validateMonetaryValue(amount)) {
            return fail(400, {
                message: "Invalid monetary value",
            });
        }

        if (!validatePaymentMethod(paymentMethod)) {
            return fail(400, {
                message: "Invalid payment method",
            });
        }

        if (!validateId(eventId)) {
            return fail(400, {
                message: "Invalid event id",
            });
        }

        if (!validateId(workerId)) {
            return fail(400, {
                message: "Invalid worker id",
            });
        }

        try {
            await makeDeposit(
                name,
                email,
                age,
                nickname,
                amount,
                paymentMethod,
                eventId,
                workerId,
            );
        } catch (e: any) {
            return fail(500, { message: e.message });
        }

        return { success: true };
    },
} satisfies Actions;
