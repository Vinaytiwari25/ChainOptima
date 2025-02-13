
import * as tf from '@tensorflow/tfjs-node';
import { WebSocket } from 'ws';

interface ResourceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  transactionsPerSecond: number;
}

export class ResourceOptimizer {
  private model: tf.Sequential;
  private trainingData: ResourceMetrics[] = [];
  
  constructor() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [4], units: 8, activation: 'relu' }),
        tf.layers.dense({ units: 8, activation: 'relu' }),
        tf.layers.dense({ units: 4, activation: 'sigmoid' })
      ]
    });
    
    this.model.compile({
      optimizer: tf.train.adam(0.01),
      loss: 'meanSquaredError'
    });
  }

  async train(metrics: ResourceMetrics) {
    this.trainingData.push(metrics);
    
    if (this.trainingData.length >= 10) {
      const inputData = this.trainingData.map(m => [
        m.cpuUsage / 100,
        m.memoryUsage / 16384,
        m.networkLatency / 1000,
        m.transactionsPerSecond / 100
      ]);
      
      const xs = tf.tensor2d(inputData);
      const ys = xs.clone(); // For autoencoder-style optimization
      
      await this.model.fit(xs, ys, {
        epochs: 5,
        batchSize: 10
      });
      
      this.trainingData = [];
      xs.dispose();
      ys.dispose();
    }
  }

  async getOptimizedResources(current: ResourceMetrics) {
    const input = tf.tensor2d([[
      current.cpuUsage / 100,
      current.memoryUsage / 16384,
      current.networkLatency / 1000,
      current.transactionsPerSecond / 100
    ]]);
    
    const prediction = this.model.predict(input) as tf.Tensor;
    const optimized = await prediction.array();
    input.dispose();
    prediction.dispose();
    
    return {
      cpuUsage: optimized[0][0] * 100,
      memoryUsage: optimized[0][1] * 16384,
      networkLatency: optimized[0][2] * 1000,
      transactionsPerSecond: optimized[0][3] * 100
    };
  }
}

let optimizer: ResourceOptimizer | null = null;

export function startResourceOptimizer(wss: WebSocket.Server) {
  optimizer = new ResourceOptimizer();
  
  setInterval(async () => {
    const currentMetrics: ResourceMetrics = {
      cpuUsage: Math.random() * 100,
      memoryUsage: Math.random() * 16384,
      networkLatency: Math.random() * 1000,
      transactionsPerSecond: Math.random() * 100
    };
    
    await optimizer.train(currentMetrics);
    const optimizedMetrics = await optimizer.getOptimizedResources(currentMetrics);
    
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'resourceOptimization',
          current: currentMetrics,
          optimized: optimizedMetrics
        }));
      }
    });
  }, 5000);
}
