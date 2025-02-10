import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Brain } from "lucide-react";
import { useWebSocket } from "@/lib/websocket";
import { useToast } from "@/hooks/use-toast";

export default function TransactionTable() {
  const { connect, disconnect } = useWebSocket();
  const { toast } = useToast();

  // Connect to WebSocket when component mounts
  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  const { data, isLoading } = useQuery({
    queryKey: ['/api/transactions'],
    select: (data: any) => ({
      transactions: data.transactions,
      analysis: data.analysis
    }),
  });

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  const { transactions = [], analysis = "" } = data || {};

  return (
    <div className="space-y-6">
      {analysis && (
        <Card className="p-4 bg-card/50 backdrop-blur-sm border border-accent">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">AI Analysis</h3>
          </div>
          <p className="text-muted-foreground">{analysis}</p>
        </Card>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tx Hash</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Gas Used</TableHead>
              <TableHead>AI Predicted</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx: any) => {
              const accuracy = tx.gasUsed && tx.aiPredicted
                ? (100 - Math.abs((Number(tx.gasUsed) - Number(tx.aiPredicted)) / Number(tx.gasUsed) * 100)).toFixed(1)
                : null;

              return (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono">{tx.txHash}</TableCell>
                  <TableCell className="font-mono">{tx.sender}</TableCell>
                  <TableCell className="font-mono">{tx.receiver}</TableCell>
                  <TableCell>{tx.gasUsed.toString()}</TableCell>
                  <TableCell>{tx.aiPredicted.toString()}</TableCell>
                  <TableCell>
                    {accuracy && (
                      <span className={accuracy >= 90 ? "text-green-500" : accuracy >= 70 ? "text-yellow-500" : "text-red-500"}>
                        {accuracy}%
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {tx.status === "success" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}