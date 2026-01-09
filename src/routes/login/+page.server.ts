import { verify } from "@node-rs/argon2";
import { fail, redirect } from "@sveltejs/kit";
import * as auth from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";
import { validateCode, validateEmail } from "$lib/server/db/validation";
import { getUserFromEmail, getUserType } from "$lib/server/db/user";
import { getGuestFromEmail } from "$lib/server/db/guest";
import { getEventIdFromUserId } from "$lib/server/db/event";
import { getWorkerFromEmail } from "$lib/server/db/worker";

export const actions: Actions = {
    login: async (event) => {
        const formData = await event.request.formData();
        const email = formData.get("email");
        const code = formData.get("code");

        if (!validateEmail(email)) {
            return fail(400, {
                message: "Invalid email",
            });
        }

        if (!validateCode(code)) {
            return fail(400, {
                message: "Invalid code (must be 12 characters, alphanumeric)",
            });
        }

        const existingUser = await getUserFromEmail(email);
        if (!existingUser) {
            return fail(400, {
                message: "Incorrect username or password",
            });
        }

        const userType = await getUserType(email);
        if (!userType) {
            return fail(400, {
                message: "Invalid user",
            });
        }

        switch (userType) {
            case "guest": {
                const guest = await getGuestFromEmail(email);
                if (!guest) {
                    return fail(400, {
                        message: "Invalid guest",
                    });
                }

                const eventGuestItem = await getEventIdFromUserId(guest.userId);
                if (!eventGuestItem) {
                    return fail(400, {
                        message: "Incorrect guest id or code",
                    });
                }

                const validPassword = eventGuestItem.code === code;
                console.log(
                    eventGuestItem.code,
                    code,
                    eventGuestItem.code === code,
                );
                if (!validPassword) {
                    return fail(400, {
                        message: "Incorrect guest id or code",
                    });
                }
                break;
            }
            case "worker": {
                const worker = await getWorkerFromEmail(email);
                if (!worker) {
                    return fail(400, {
                        message: "Invalid worker",
                    });
                }

                const validPassword = await verify(
                    worker.code,
                    code,
                    auth.ARGON2_OPTIONS,
                );
                if (!validPassword) {
                    return fail(400, {
                        message: "Incorrect worker id or code",
                    });
                }
                break;
            }
        }

        const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, existingUser.id);
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

        return redirect(302, "/");
    },
};
