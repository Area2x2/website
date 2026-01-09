import { TagCategory } from "../tag/tag.svelte";
import type { TableHeader } from "./table.svelte";

export const WORKERS_TABLE_HEADERS: TableHeader[] = [
    {
        slug: "id",
        name: "id",
        type: "string",
        width: "fill",
    },
    {
        slug: "name",
        name: "Nombre",
        type: "string",
        width: "small",
    },
    {
        slug: "nickname",
        name: "Apodo",
        type: "string",
        width: "small",
    },
    {
        slug: "email",
        name: "Email",
        type: "string",
        width: "medium",
    },
    {
        slug: "role",
        name: "Rol",
        type: "tag",
        width: "small",
        tagCategory: TagCategory.Role,
    },
    {
        slug: "wallet",
        name: "Cartera",
        type: "number",
        width: "small",
    },
];
