import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { mockChartData, mockStats } from "@/lib/mockData";
import StatsCard from "@/components/stats-card";
import TransactionTable from "@/components/transaction-table";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard title="TPS" value={mockStats.tps} />
        <StatsCard title="Gas Consumption" value={mockStats.gasConsumption} />
        <StatsCard title="AI Accuracy" value={mockStats.aiAccuracy} />
        <StatsCard title="Active Nodes" value={mockStats.activeNodes} />
      </motion.div>

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
