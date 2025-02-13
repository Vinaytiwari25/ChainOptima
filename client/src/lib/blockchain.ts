import { ethers } from "ethers";
import { create } from "zustand";

interface BlockchainState {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  account: string | null;
  chainId: number | null;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useBlockchain = create<BlockchainState>((set) => ({
  provider: null,
  signer: null,
  account: null,
  chainId: null,
  isConnecting: false,

  connect: async () => {
    try {
      set({ isConnecting: true });

      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      set({
        provider,
        signer,
        account,
        chainId,
        isConnecting: false,
      });
    } catch (error) {
      console.error("Failed to connect:", error);
      set({ isConnecting: false });
      throw error;
    }
  },

  disconnect: () => {
    set({
      provider: null,
      signer: null,
      account: null,
      chainId: null,
    });
  },
}));

// Utility functions for blockchain interactions
export async function getTransactionReceipt(txHash: string) {
  const { provider } = useBlockchain.getState();
  if (!provider) throw new Error("Not connected to blockchain");
  
  return await provider.getTransactionReceipt(txHash);
}

export async function getGasPrice() {
  const { provider } = useBlockchain.getState();
  if (!provider) throw new Error("Not connected to blockchain");
  
  return await provider.getFeeData();
}

export async function estimateGas(transaction: ethers.TransactionRequest) {
  const { provider } = useBlockchain.getState();
  if (!provider) throw new Error("Not connected to blockchain");
  
  return await provider.estimateGas(transaction);
}

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}
