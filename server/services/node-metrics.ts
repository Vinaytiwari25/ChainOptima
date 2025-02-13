
import { WebSocket } from "ws";

interface NodeMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  peersConnected: number;
  blockHeight: number;
  syncStatus: number;
}

export function startMetricsService(wss: WebSocket.Server) {
  setInterval(() => {
    // Simulate real node metrics
    const metrics: NodeMetrics = {
      cpuUsage: Math.random() * 100,
      memoryUsage: Math.random() * 16384, // MB
      diskUsage: Math.random() * 1000, // GB
      peersConnected: Math.floor(Math.random() * 100),
      blockHeight: Date.now() - Math.floor(Math.random() * 1000),
      syncStatus: Math.min(100, Math.random() * 100),
    };

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'nodeMetrics', data: metrics }));
      }
    });
  }, 1000);
}
