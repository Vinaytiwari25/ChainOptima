import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express): Server {
  // Mock API endpoint for transactions
  app.get("/api/transactions", (_req, res) => {
    res.json({
      transactions: [
        {
          id: 1,
          txHash: "0x1234...5678",
          sender: "0xabcd...efgh",
          receiver: "0xijkl...mnop",
          gasUsed: "21000",
          aiPredicted: "20500",
          status: "success",
          timestamp: new Date().toISOString()
        },
        // Add more mock transactions...
      ]
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
