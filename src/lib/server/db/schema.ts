import {
    pgTable,
    integer,
    text,
    timestamp,
    decimal,
    time,
    numeric,
    primaryKey,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    nickname: text("nickname"),
});
export type User = typeof user.$inferSelect;
export type UserType = "guest" | "worker";

export const guest = pgTable("guest", {
    userId: text("user_id")
        .primaryKey()
        .notNull()
        .references(() => user.id),
    age: integer("age").notNull(),
});
export type Guest = typeof guest.$inferSelect;

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
});
export type Session = typeof session.$inferSelect;

export const product = pgTable("product", {
    id: text("id").primaryKey(),
    nombre: text("name").notNull(),
});
export type Product = typeof product.$inferSelect;

export const subproduct = pgTable("subproduct", {
    id: text("id").primaryKey(),
    parentId: text("parent_id")
        .notNull()
        .references(() => product.id),
    volume: decimal("volume").notNull(),
    cantidad: integer("amount").notNull(),
});
export type Subproduct = typeof subproduct.$inferSelect;

export const productPurchase = pgTable("product_purchase", {
    id: text("id").primaryKey(),
    state: text("state", { enum: ["pending", "completed"] }),
    paymentMethod: text("payment_method", { enum: ["cash", "bizum"] }),
    buyer: text("buyer"),
});
export type ProductPurchase = typeof productPurchase.$inferSelect;
export type PaymentMethod = "cash" | "bizum";

export const servicePurchase = pgTable("service_purchase", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    price: decimal("price").notNull(),
});
export type ServicePurchase = typeof servicePurchase.$inferSelect;

export const shop = pgTable("shop", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
});
export type Shop = typeof shop.$inferSelect;

export const shopItem = pgTable("shop_item", {
    shopId: text("shop_id")
        .primaryKey()
        .references(() => shop.id),
    subproductId: text("subproduct_id")
        .notNull()
        .references(() => subproduct.id),
    price: decimal("price"),
});
export type ShopItem = typeof shopItem.$inferSelect;

export const event = pgTable("event", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    location: text("location"),
    time: time("time", { withTimezone: true }),
    date: timestamp("date").notNull(),
});
export type Event = typeof event.$inferSelect;

export const eventGuestItem = pgTable(
    "event_guest_item",
    {
        guestId: text("guest_id")
            .notNull()
            .references(() => user.id),
        eventId: text("event_id")
            .notNull()
            .references(() => event.id),
        code: text("code").notNull(),
    },
    (table) => [primaryKey({ columns: [table.guestId, table.eventId] })],
);
export type EventGuestItem = typeof eventGuestItem.$inferSelect;

export const worker = pgTable("worker", {
    userId: text("user_id")
        .primaryKey()
        .references(() => user.id),
    role: text("role", { enum: ["camarero", "dj", "jefe"] }).notNull(),
    wallet: decimal("wallet").notNull(),
    code: text("code").notNull(),
});
export type Worker = typeof worker.$inferSelect;
export type WorkerRole = typeof worker.$inferSelect.role;

export const deposit = pgTable(
    "deposit",
    {
        guestId: text("guest_id")
            .notNull()
            .references(() => user.id),
        amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
        paymentMethod: text("payment_method", { enum: ["cash", "bizum"] }),
        eventId: text("event_id")
            .notNull()
            .references(() => event.id),
        workerId: text("worker_id")
            .notNull()
            .references(() => user.id),
    },
    (table) => [primaryKey({ columns: [table.guestId, table.eventId] })],
);
export type Deposit = typeof deposit.$inferSelect;
