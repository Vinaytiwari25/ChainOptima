import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/wallet-connect";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            ChainOptima
          </span>
        </Link>
        
        <div className="flex-1 ml-8 space-x-4">
          <Link href="/dashboard">
            <Button variant={location === "/dashboard" ? "default" : "ghost"}>
              Dashboard
            </Button>
          </Link>
          <Link href="/transactions">
            <Button variant={location === "/transactions" ? "default" : "ghost"}>
              Transactions
            </Button>
          </Link>
          <Link href="/ai-training">
            <Button variant={location === "/ai-training" ? "default" : "ghost"}>
              AI Training
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant={location === "/settings" ? "default" : "ghost"}>
              Settings
            </Button>
          </Link>
        </div>

        <WalletConnect />
      </div>
    </nav>
  );
}
