import * as table from "$lib/server/db/schema";

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const NAME_REGEX = /^[a-zA-Z0-9 ]+$/;
export const AGE_REGEX = /^[0-9]{1,3}$/;
export const MONETARY_REGEX = /^[0-9]+(\.[0-9]{2})?$/;
export const ID_REGEX = /^[a-zA-Z0-9_-]+$/;
export const CODE_REGEX = /^[a-zA-Z0-9_-]+$/;
export const NICKNAME_REGEX = /^[a-zA-Z0-9 ]+$/;
export const TIME_REGEX = /^[0-9]{1,2}\:[0-9]{2}$/;
export const DATE_REGEX = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

export function validateEmail(email: unknown): email is string {
    return (
        typeof email === "string" &&
        email.length >= 3 &&
        email.length <= 320 &&
        EMAIL_REGEX.test(email)
    );
}

export function validateName(name: unknown): name is string {
    return (
        typeof name === "string" &&
        name.length >= 1 &&
        name.length <= 128 &&
        NAME_REGEX.test(name)
    );
}

export function validateAge(age: unknown): age is number {
    if (typeof age === "string" && AGE_REGEX.test(age)) {
        age = parseInt(age);
        return (age as number) >= 18 && (age as number) <= 100;
    }
    return false;
}

export function validateMonetaryValue(money: unknown): money is string {
    return (
        typeof money === "string" &&
        money.length >= 4 &&
        money.length <= 31 &&
        MONETARY_REGEX.test(money)
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
    return typeof id === "string" && id.length === 24 && ID_REGEX.test(id);
}

export function validateCode(code: unknown): code is string {
    return (
        typeof code === "string" && code.length === 12 && CODE_REGEX.test(code)
    );
}

export function validateNickname(nickname: unknown): nickname is string | null {
    return (
        typeof nickname === null ||
        (typeof nickname === "string" &&
            nickname.length >= 3 &&
            nickname.length <= 31 &&
            NICKNAME_REGEX.test(nickname))
    );
}

export function validateRole(role: unknown): role is table.WorkerRole {
    return (
        typeof role === "string" &&
        (role === "camarero" || role === "dj" || role === "jefe")
    );
}

export function validateLocation(location: unknown): location is string {
    return (
        typeof location === "string" &&
        location.length >= 10 &&
        location.length <= 128 &&
        NICKNAME_REGEX.test(location)
    );
}

export function validateTime(time: unknown): time is string {
    return typeof time === "string" && TIME_REGEX.test(time);
}

export function validateDate(date: unknown): date is string {
    return typeof date === "string" && DATE_REGEX.test(date);
}
