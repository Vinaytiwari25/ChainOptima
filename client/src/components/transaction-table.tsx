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
import { CheckCircle, XCircle } from "lucide-react";
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
    select: (data) => data.transactions,
  });

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  const transactions = data || [];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tx Hash</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Gas Used</TableHead>
            <TableHead>AI Predicted</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell className="font-mono">{tx.txHash}</TableCell>
              <TableCell className="font-mono">{tx.sender}</TableCell>
              <TableCell className="font-mono">{tx.receiver}</TableCell>
              <TableCell>{tx.gasUsed}</TableCell>
              <TableCell>{tx.aiPredicted}</TableCell>
              <TableCell>
                {tx.status === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}