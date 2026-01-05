import * as table from "$lib/server/db/schema";
import { getUser, getUserFromEmail } from "./user";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";

export async function getGuestFromEmail(
    email: string,
): Promise<table.Guest | undefined> {
    const existingUser = await getUserFromEmail(email);
    if (!existingUser) {
        return undefined;
    }

    return getGuest(existingUser.id);
}

export async function getGuest(id: string): Promise<table.Guest | undefined> {
    const existingUser = await getUser(id);
    if (!existingUser) {
        return undefined;
    }

    const guestResults = await db
        .select()
        .from(table.guest)
        .where(eq(table.guest.user_id, existingUser.id));
    const existingGuest = guestResults.at(0);
    if (existingGuest) {
        return existingGuest;
    }

    return undefined;
}

