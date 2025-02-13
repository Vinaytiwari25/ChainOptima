import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { predictGasUsage, analyzeTrends } from "./services/ai-prediction";
import type { Transaction } from "@shared/schema";

interface WebSocketMessage {
  type: 'subscribe' | 'unsubscribe' | 'requestPrediction';
  channel?: string;
  data?: any;
}

// Placeholder for resource optimization service
function startResourceOptimizer(wss: WebSocketServer) {
  console.log("Resource optimizer started (placeholder).");
  //  In a real implementation, this would involve setting up a TensorFlow.js model,
  //  connecting to resource monitoring metrics, and implementing optimization logic.
}


export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Store active connections
  const clients = new Set<WebSocket>();

  wss.on('connection', (ws) => {
    clients.add(ws);

    ws.on('message', async (data) => {
      try {
        const message: WebSocketMessage = JSON.parse(data.toString());

        if (message.type === 'requestPrediction' && message.data) {
          const prediction = await predictGasUsage(message.data);
          ws.send(JSON.stringify({
            type: 'prediction',
            data: prediction
          }));
        }
      } catch (error) {
        console.error('Failed to process message:', error);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
    });
  });

  // Broadcast function for sending updates to all connected clients
  const broadcast = (data: any) => {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };

  // Fetch transactions with AI analysis
  app.get("/api/transactions", async (_req, res) => {
    try {
      const transactions = await storage.getTransactions();
      const analysis = await analyzeTrends(transactions);

      res.json({ 
        transactions,
        analysis 
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Failed to fetch transactions' });
    }
  });

  // Create new transaction with AI prediction
  app.post("/api/transactions", async (req, res) => {
    try {
      // Get AI prediction before creating transaction
      const prediction = await predictGasUsage(req.body);

      const transaction = await storage.createTransaction({
        ...req.body,
        aiPredicted: prediction.predictedGas,
      });

      broadcast({
        type: 'NEW_TRANSACTION',
        data: {
          transaction,
          prediction
        }
      });

      res.json({ 
        transaction,
        prediction 
      });
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ message: 'Failed to create transaction' });
    }
  });

  //Added startMetricsService and startResourceOptimizer calls
  startMetricsService(wss); //Assuming this function exists in the original codebase, but is not shown.
  startResourceOptimizer(wss);
  return httpServer;
}