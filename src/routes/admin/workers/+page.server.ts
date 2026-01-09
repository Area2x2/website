import type { PageServerLoad } from "./$types";
import { getWorkers } from "$lib/server/db/worker";
import type { WorkerData } from "$lib/components/options/WorkerOption.svelte";

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

    return {
        workers,
    };
};
