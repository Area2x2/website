import { error, type Handle } from "@sveltejs/kit";
import * as auth from "$lib/server/auth";

export const handle: Handle = async ({ event, resolve }) => {
    const sessionToken = event.cookies.get(auth.sessionCookieName);

    if (!sessionToken) {
        event.locals.user = null;
        event.locals.session = null;

        if (event.url.pathname.includes("admin")) {
            return error(403, "Forbidden");
        }

        return resolve(event);
    }

    const { session, user } = await auth.validateSessionToken(sessionToken);

    if (session) {
        auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } else {
        auth.deleteSessionTokenCookie(event);
    }

    if (event.url.pathname.includes("admin") && !isAdmin(user)) {
        return error(403, "Forbidden access");
    }

    event.locals.user = user;
    event.locals.session = session;

    return resolve(event);
};

function isAdmin(user: auth.UserSessionData | null) {
    return user !== null && user.role !== undefined;
}
