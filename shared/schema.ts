import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// AI Cases Schema
export const aiCases = pgTable("ai_cases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull(),
  description: text("description"),
  industry: text("industry"),
  technology: text("technology"),
  impact: text("impact"),
  dateImplemented: text("date_implemented"),
  organization: text("organization"),
  keyMetrics: text("key_metrics"),
  challenges: text("challenges"),
  solutions: text("solutions"),
  primaryMode: text("primary_mode"),
  secondaryModes: text("secondary_modes"),
  maturity: text("maturity"),
  humanAiModel: text("human_ai_model"),
  dataRequirement: text("data_requirement"),
  riskProfile: text("risk_profile"),
  originalUrl: text("original_url"),
});

export const insertAICaseSchema = createInsertSchema(aiCases).omit({
  id: true,
});

export type InsertAICase = z.infer<typeof insertAICaseSchema>;
export type AICase = typeof aiCases.$inferSelect;
