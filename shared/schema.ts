import { pgTable, text, serial, numeric, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  walletAddress: text("wallet_address").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  txHash: text("tx_hash").notNull(),
  sender: text("sender").notNull(),
  receiver: text("receiver").notNull(),
  gasUsed: numeric("gas_used").notNull(),
  aiPredicted: numeric("ai_predicted").notNull(),
  status: text("status").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userId: serial("user_id").references(() => users.id),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true, timestamp: true });

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;