import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const icons = pgTable("icons", {
  id: text("id").notNull().primaryKey(),
  prompt: text("prompt"),
  userId: text("userId").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow(),
});
// Schema for CRUD - used to validate API requests
export const insertIconSchema = createInsertSchema(icons);
export const selectIconSchema = createSelectSchema(icons);
export const iconIdSchema = selectIconSchema.pick({ id: true });
export const updateIconSchema = selectIconSchema;

export type Icon = z.infer<typeof selectIconSchema>;
export type NewIcon = z.infer<typeof insertIconSchema>;
export type IconId = z.infer<typeof iconIdSchema>["id"];
