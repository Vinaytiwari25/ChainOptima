import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/navbar";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Transactions from "@/pages/transactions";
import AITraining from "@/pages/ai-training";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";
import { useTheme } from "@/lib/theme";
import { useEffect } from "react";

function Router() {
  const { theme } = useTheme();

  // Sync theme with HTML class on mount and theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/ai-training" component={AITraining} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;