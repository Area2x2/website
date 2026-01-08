import { db, generateId } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUserFromEmail(
    email: string,
): Promise<table.User | undefined> {
    const results = await db
        .select()
        .from(table.user)
        .where(eq(table.user.email, email));

    return results.at(0);
}

export async function getUser(id: string): Promise<table.User | undefined> {
    const results = await db
        .select()
        .from(table.user)
        .where(eq(table.user.id, id));

    return results.at(0);
}

export async function getUserType(
    email: string,
): Promise<table.UserType | undefined> {
    const existingUser = await getUserFromEmail(email);
    if (!existingUser) {
        return undefined;
    }

    const guestResults = await db
        .select()
        .from(table.guest)
        .where(eq(table.guest.userId, existingUser.id));
    if (guestResults.length > 0) {
        return "guest";
    }

    const workerResults = await db
        .select()
        .from(table.worker)
        .where(eq(table.worker.userId, existingUser.id));
    if (workerResults.length > 0) {
        return "worker";
    }

    return undefined;
}
