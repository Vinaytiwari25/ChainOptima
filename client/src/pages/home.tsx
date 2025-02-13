import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 relative overflow-hidden">
        {/* Hero Background Animation */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto text-center"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-orbitron">
            AI-Powered Blockchain Resource Optimization
          </h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Predict, Analyze, and Scale blockchain transactions using Layer 2 solutions and AI-driven insights.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-accent"
            >
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "AI Prediction Engine",
    description: "Optimize gas fees and resource allocation with our advanced AI model."
  },
  {
    title: "Layer 2 Integration",
    description: "Seamless integration with popular L2 solutions for scalability."
  },
  {
    title: "Real-time Analytics",
    description: "Monitor and analyze blockchain metrics in real-time."
  }
];
