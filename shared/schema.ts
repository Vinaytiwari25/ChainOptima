import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  txHash: text("tx_hash").notNull(),
  sender: text("sender").notNull(),
  receiver: text("receiver").notNull(),
  gasUsed: numeric("gas_used").notNull(),
  aiPredicted: numeric("ai_predicted").notNull(),
  status: text("status").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true });

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
