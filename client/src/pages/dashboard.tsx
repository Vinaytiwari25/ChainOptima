import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatsCard from "@/components/stats-card";
import TransactionTable from "@/components/transaction-table";
import { useWebSocket } from "@/lib/websocket";
import { useEffect, useState } from "react";

interface NodeMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  peersConnected: number;
  blockHeight: number;
  syncStatus: number;
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<NodeMetrics | null>(null);
  const { connect, disconnect } = useWebSocket();

  useEffect(() => {
    connect();
    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === 'nodeMetrics') {
        setMetrics(data.data);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      disconnect();
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard title="CPU Usage" value={`${metrics?.cpuUsage.toFixed(1)}%`} />
        <StatsCard title="Memory" value={`${(metrics?.memoryUsage || 0).toFixed(1)} MB`} />
        <StatsCard title="Connected Peers" value={metrics?.peersConnected.toString()} />
        <StatsCard title="Block Height" value={metrics?.blockHeight.toString()} />
      </motion.div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Node Resource Usage</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>CPU Usage</span>
              <span>{metrics?.cpuUsage.toFixed(1)}%</span>
            </div>
            <Progress value={metrics?.cpuUsage} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span>Memory Usage</span>
              <span>{(metrics?.memoryUsage || 0).toFixed(1)} MB</span>
            </div>
            <Progress value={(metrics?.memoryUsage || 0) / 164.84} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span>Sync Status</span>
              <span>{metrics?.syncStatus.toFixed(1)}%</span>
            </div>
            <Progress value={metrics?.syncStatus} />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Network Activity</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData.datasets[0].data.map((value, index) => ({
              name: mockChartData.labels[index],
              value
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))"
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <TransactionTable />
      </Card>
    </div>
  );
}
