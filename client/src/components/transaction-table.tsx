import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";
import { mockTransactions } from "@/lib/mockData";

export default function TransactionTable() {
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
          {mockTransactions.map((tx) => (
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
