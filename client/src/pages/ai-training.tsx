import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AITraining() {
  const [trainingProgress, setTrainingProgress] = useState(0);

  const mockPerformanceData = [
    { epoch: 1, accuracy: 0.75, loss: 0.45 },
    { epoch: 2, accuracy: 0.82, loss: 0.35 },
    { epoch: 3, accuracy: 0.88, loss: 0.28 },
    { epoch: 4, accuracy: 0.92, loss: 0.22 },
    { epoch: 5, accuracy: 0.95, loss: 0.18 },
  ];

  const startTraining = () => {
    setTrainingProgress(0);
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Upload Training Data</h3>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Drag and drop your CSV dataset here, or click to select files
          </p>
          <Button onClick={() => {}}>Select Files</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Training Progress</h3>
        <Progress value={trainingProgress} className="mb-4" />
        <Button onClick={startTraining} disabled={trainingProgress > 0 && trainingProgress < 100}>
          {trainingProgress === 0 ? "Start Training" : trainingProgress === 100 ? "Training Complete" : "Training..."}
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Model Performance</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="epoch" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))"
                }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                name="Accuracy"
                stroke="#4ade80"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="loss"
                name="Loss"
                stroke="#f43f5e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
