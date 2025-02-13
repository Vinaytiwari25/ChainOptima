import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ACCENT_COLORS = {
  blue: {
    primary: "hsl(221.2 83.2% 53.3%)",
    ring: "hsl(224.3 76.3% 48%)",
  },
  purple: {
    primary: "hsl(262.1 83.3% 57.8%)",
    ring: "hsl(263.4 70% 50.4%)",
  },
  cyan: {
    primary: "hsl(189 94% 43%)",
    ring: "hsl(190 90% 40%)",
  },
};

export default function Settings() {
  // Theme toggling
  const handleThemeToggle = (checked: boolean) => {
    if (checked) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.setProperty('color-scheme', 'dark');
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.setProperty('color-scheme', 'light');
    }
  };

  // Accent color handling
  const handleAccentChange = (color: keyof typeof ACCENT_COLORS) => {
    const colors = ACCENT_COLORS[color];
    document.documentElement.style.setProperty('--primary', colors.primary);
    document.documentElement.style.setProperty('--ring', colors.ring);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch 
              id="dark-mode" 
              defaultChecked={document.documentElement.classList.contains("dark")}
              onCheckedChange={handleThemeToggle}
            />
          </div>
          <div className="space-y-2">
            <Label>Accent Color</Label>
            <Select defaultValue="blue" onValueChange={handleAccentChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select accent color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Neon Blue</SelectItem>
                <SelectItem value="purple">Neon Purple</SelectItem>
                <SelectItem value="cyan">Cyan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">AI Predictions</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Prediction Frequency (seconds)</Label>
            <Slider
              defaultValue={[30]}
              max={120}
              min={5}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-optimize">Auto-optimize Gas Fees</Label>
            <Switch id="auto-optimize" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Network</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Preferred L2 Network</Label>
            <Select defaultValue="arbitrum">
              <SelectTrigger>
                <SelectValue placeholder="Select L2 network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arbitrum">Arbitrum</SelectItem>
                <SelectItem value="optimism">Optimism</SelectItem>
                <SelectItem value="polygon">Polygon</SelectItem>
                <SelectItem value="zk-rollup">ZK-Rollup</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-connect">Auto-connect Wallet</Label>
            <Switch id="auto-connect" />
          </div>
        </div>
      </Card>
    </div>
  );
}