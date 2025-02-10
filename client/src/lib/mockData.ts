export const mockTransactions = [
  {
    id: 1,
    txHash: "0x1234...5678",
    sender: "0xabcd...efgh",
    receiver: "0xijkl...mnop",
    gasUsed: "21000",
    aiPredicted: "20500",
    status: "success",
    timestamp: new Date().toISOString()
  },
  // Add more mock transactions...
];

export const mockChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Gas Usage',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

export const mockStats = {
  tps: "2,500",
  gasConsumption: "1.2M",
  aiAccuracy: "98.5%",
  activeNodes: "1,250"
};
