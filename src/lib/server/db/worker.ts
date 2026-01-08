import * as table from "$lib/server/db/schema";
import { db, generateId } from "$lib/server/db";
import { eq, or } from "drizzle-orm";
import { getUser, getUserFromEmail } from "./user";
import { hash } from "@node-rs/argon2";
import { ARGON2_OPTIONS } from "../auth";

export async function getWorkerFromEmail(
    email: string,
): Promise<table.Worker | undefined> {
    const existingUser = await getUserFromEmail(email);
    if (!existingUser) {
        return undefined;
    }

    return getWorker(existingUser.id);
}

export async function getWorker(id: string): Promise<table.Worker | undefined> {
    const existingUser = await getUser(id);
    if (!existingUser) {
        return undefined;
    }

    const workerResults = await db
        .select()
        .from(table.worker)
        .where(eq(table.worker.userId, existingUser.id));
    const existingWorker = workerResults.at(0);
    if (existingWorker) {
        return existingWorker;
    }

    return undefined;
}

export async function registerWorker(
    name: string,
    email: string,
    role: table.WorkerRole,
    nickname: string | null,
    code: string,
) {
    const results = await db
        .select()
        .from(table.user)
        .where(or(eq(table.user.name, name), eq(table.user.email, email)));

    const existingUser = results.at(0);
    if (existingUser) {
        throw new Error("User already exists");
    }

    try {
        const userId = generateId();

        await db
            .insert(table.user)
            .values({ id: userId, name, email, nickname });

        const codeHash = await hash(code, ARGON2_OPTIONS);

        await db
            .insert(table.worker)
            .values({ userId: userId, role, wallet: "0.0", code: codeHash });
    } catch {
        throw new Error("An error has occurred");
    }
}

export async function getWorkers() {
    const results = await db
        .select()
        .from(table.worker)
        .innerJoin(table.user, eq(table.worker.userId, table.user.id));

    return results;
}
