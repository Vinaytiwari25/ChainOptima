import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      // Mock wallet connection
      setConnected(true);
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to MetaMask",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please install MetaMask",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleConnect}
      variant="outline"
      className="ml-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
    >
      {connected ? "0x1234...5678" : "Connect Wallet"}
    </Button>
  );
}
