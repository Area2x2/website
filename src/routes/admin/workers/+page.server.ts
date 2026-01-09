import type { PageServerLoad } from "./$types";
import { getWorkers } from "$lib/server/db/worker";
import type { WorkerData } from "$lib/components/options/WorkerOption.svelte";
import { fail, type Actions } from "@sveltejs/kit";
import { registerWorker } from "$lib/server/db/worker";
import {
    validateCode,
    validateEmail,
    validateName,
    validateNickname,
    validateRole,
} from "$lib/server/db/validation";

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

export const actions = {
    insertWorker: async ({ request }) => {
        const formData = await request.formData();

        const email = formData.get("email");
        const name = formData.get("name");
        const nickname = formData.get("nickname");
        const role = formData.get("role");
        const code = formData.get("code");

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

        if (!validateNickname(nickname)) {
            return fail(400, {
                message:
                    "Invalid nickname (min 3, max 31 characters, alphanumeric only)",
            });
        }

        if (!validateRole(role)) {
            return fail(400, {
                message: "Invalid role (must be 'camarero', 'dj' or 'jefe')",
            });
        }

        if (!validateCode(code)) {
            return fail(400, {
                message:
                    "Invalid code (must be 12 characters, alphanumeric only)",
            });
        }

        try {
            await registerWorker(name, email, role, nickname, code);
        } catch (e: any) {
            return fail(500, { message: e.message });
        }

        return { success: true };
    },
} satisfies Actions;
