export type Event = {
    name: string;
    time: string | null;
    id: string;
    location: string | null;
    date: Date;
};

export const HEADER = ["M", "T", "W", "T", "F", "S", "S"];

export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}
