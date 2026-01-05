import * as table from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { and, eq } from "drizzle-orm";
import { encodeBase32LowerCase } from "@oslojs/encoding";

export async function getEventIdFromUserId(
    userId: string,
): Promise<table.EventGuestItem | undefined> {
    const eventsResult = await db
        .select()
        .from(table.eventGuestItem)
        .where(eq(table.eventGuestItem.guestId, userId));
    const existingEventGuestItem = eventsResult.at(0);
    if (existingEventGuestItem) {
        return existingEventGuestItem;
    }

    return undefined;
}

export async function getEvent(
    eventId: string,
): Promise<table.Event | undefined> {
    const eventsResult = await db
        .select()
        .from(table.event)
        .where(eq(table.event.id, eventId));
    const exitingEvent = eventsResult.at(0);
    if (exitingEvent) {
        return exitingEvent;
    }

    return undefined;
}

export function generateEventGuestCode() {
    const bytes = crypto.getRandomValues(new Uint8Array(12));
    const id = encodeBase32LowerCase(bytes);
    return id;
}
