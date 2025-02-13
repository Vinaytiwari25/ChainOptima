import { useBlockchain } from "@/lib/blockchain";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function WalletConnect() {
  const { account, isConnecting, connect, disconnect, switchNetwork, network } = useBlockchain();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await connect();
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to MetaMask",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from MetaMask",
    });
  };

  if (isConnecting) {
    return (
      <Button disabled className="ml-4">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting
      </Button>
    );
  }

  if (account) {
    return (
      <Button
        onClick={handleDisconnect}
        variant="outline"
        className="ml-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
      >
        {`${account.slice(0, 6)}...${account.slice(-4)}`}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      variant="outline"
      className="ml-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
    >
      Connect Wallet
    </Button>
  );
}