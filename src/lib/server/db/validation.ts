import * as table from "$lib/server/db/schema";

export function validateEmail(email: unknown): email is string {
    return (
        typeof email === "string" &&
        email.length >= 3 &&
        email.length <= 320 &&
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    );
}

export function validateName(name: unknown): name is string {
    return (
        typeof name === "string" &&
        name.length >= 3 &&
        name.length <= 31 &&
        /^[a-zA-Z0-9_-]+$/.test(name)
    );
}

export function validateAge(age: unknown): age is number {
    return typeof age === "number" && age >= 18 && age < 100;
}

export function validateMonetaryValue(money: unknown): money is string {
    return (
        typeof money === "string" &&
        money.length >= 4 &&
        money.length <= 31 &&
        /^[0-9]+(\.[0-9]{2})?$/.test(money)
    );
}

export function validatePaymentMethod(
    paymentMethod: unknown,
): paymentMethod is table.PaymentMethod {
    return (
        typeof paymentMethod === "string" &&
        (paymentMethod === "bizum" || paymentMethod === "cash")
    );
}

export function validateId(id: unknown): id is string {
    return (
        typeof id === "string" &&
        id.length === 15 &&
        /^[a-zA-Z0-9_-]+$/.test(id)
    );
}

export function validateCode(code: unknown): code is string {
    return (
        typeof code === "string" &&
        code.length === 12 &&
        /^[a-zA-Z0-9_-]+$/.test(code)
    );
}

export function validateNickname(nickname: unknown): nickname is string | null {
    return (
        typeof nickname === null ||
        (typeof nickname === "string" &&
            nickname.length >= 3 &&
            nickname.length <= 31 &&
            /^[a-zA-Z0-9_-]+$/.test(nickname))
    );
}

export function validateRole(role: unknown): role is table.WorkerRole {
    return (
        typeof role === "string" &&
        (role === "camarero" || role === "dj" || role === "jefe")
    );
}
