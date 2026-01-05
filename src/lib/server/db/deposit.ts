import * as table from "$lib/server/db/schema";
import { db, generateId } from "$lib/server/db";
import { getWorker } from "./worker";
import { generateEventGuestCode, getEvent } from "./event";

export async function makeDeposit(
    name: string,
    email: string,
    age: number,
    nickname: string | null,
    amount: string,
    paymentMethod: table.PaymentMethod,
    eventId: string,
    workerId: string,
): Promise<{ guestId: string; code: string }> {
    const userId = generateId();
    await db.insert(table.user).values({ id: userId, name, email, nickname });
    await db.insert(table.guest).values({ user_id: userId, age });

    const workerData = await getWorker(workerId);
    if (!workerData) {
        throw new Error("Worker doesnt exist");
    }

    const eventData = await getEvent(eventId);
    if (!eventData) {
        throw new Error("Event doesnt exist");
    }

    await db.insert(table.deposit).values({
        guestId: userId,
        amount,
        eventId: eventData.id,
        workerId: workerId,
        paymentMethod,
    });
    const code = generateEventGuestCode();

    return {
        guestId: userId,
        code,
    };
}
