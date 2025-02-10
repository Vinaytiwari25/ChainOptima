import OpenAI from "openai";
import { type Transaction } from "@shared/schema";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface PredictionResult {
  predictedGas: number;
  confidence: number;
}

export async function predictGasUsage(transaction: Partial<Transaction>): Promise<PredictionResult> {
  try {
    const prompt = `
      Based on the following transaction details, predict the optimal gas usage:
      - Sender: ${transaction.sender}
      - Receiver: ${transaction.receiver}
      
      Consider current network conditions and historical patterns.
      Respond with a JSON object containing:
      {
        "predictedGas": number (estimated gas units),
        "confidence": number (between 0 and 1)
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an AI expert in blockchain gas optimization. Analyze transaction patterns and predict optimal gas usage.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);

    return {
      predictedGas: Math.max(21000, Math.round(result.predictedGas)), // Minimum gas is 21000 for basic transfers
      confidence: Math.max(0, Math.min(1, result.confidence)),
    };
  } catch (error) {
    console.error("AI prediction error:", error);
    // Fallback to a conservative estimate
    return {
      predictedGas: 21000,
      confidence: 0.5,
    };
  }
}

export async function analyzeTrends(transactions: Transaction[]): Promise<string> {
  try {
    const transactionData = transactions
      .map(tx => `Gas Used: ${tx.gasUsed}, Timestamp: ${tx.timestamp}`)
      .join('\n');

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Analyze blockchain transaction patterns and provide insights on gas usage trends.",
        },
        {
          role: "user",
          content: `Analyze these recent transactions and provide insights on gas usage patterns:\n${transactionData}`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI analysis error:", error);
    return "Unable to analyze trends at this time.";
  }
}
