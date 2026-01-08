import { getWorkers } from "$lib/server/db/worker";
import type { PageServerLoad } from "./$types";

export type WorkerData = {
    id: string;
    name: string;
    nickname?: string;
    email: string;
    role: string;
};
export const load: PageServerLoad = async () => {
    const workers = (await getWorkers()).map((v) => {
        return {
            id: v.user.id,
            name: v.user.name,
            nickname: v.user.nickname ?? undefined,
            email: v.user.email,
            role: v.worker.role,
        } satisfies WorkerData;
    });

    return {
        workers,
    };
};
