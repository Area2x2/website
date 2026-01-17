export enum TagCategory {
    Role,
    Event,
}

export type TagColor = "yellow" | "red" | "green" | "accent" | "neutral";

export const TAG_ROLE_COLORS: Record<string, TagColor> = {
    camarero: "yellow",
    dj: "red",
    jefe: "accent",
};

export function getTagColor(
    category: TagCategory,
    slug: string,
): TagColor | undefined {
    switch (category) {
        case TagCategory.Role:
            return TAG_ROLE_COLORS[slug];
        case TagCategory.Event:
            return "red";
    }
}
