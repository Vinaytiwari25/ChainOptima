import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Cpu, BarChart2, Zap } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI Prediction Engine",
    description:
      "Optimize gas fees and resource allocation with our advanced AI model trained on historical blockchain data.",
  },
  {
    icon: Zap,
    title: "Layer 2 Integration",
    description:
      "Seamless integration with popular L2 solutions like Arbitrum, Optimism, and Polygon for enhanced scalability.",
  },
  {
    icon: BarChart2,
    title: "Real-time Analytics",
    description:
      "Monitor and analyze blockchain metrics in real-time with advanced visualization tools and predictive insights.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-black/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground">
            Optimize your blockchain operations with cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border border-accent hover:border-primary/50 transition-colors">
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
