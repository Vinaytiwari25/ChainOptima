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

export default function Settings() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label>Accent Color</Label>
            <Select defaultValue="blue">
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