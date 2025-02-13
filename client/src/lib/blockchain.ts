import { ethers } from "ethers";
import { create } from "zustand";

interface L2Network {
  name: string;
  chainId: number;
  rpcUrl: string;
}

const L2_NETWORKS: Record<string, L2Network> = {
  arbitrum: {
    name: 'Arbitrum One',
    chainId: 42161,
    rpcUrl: 'https://arb1.arbitrum.io/rpc'
  },
  optimism: {
    name: 'Optimism',
    chainId: 10,
    rpcUrl: 'https://mainnet.optimism.io'
  }
};

interface BlockchainState {
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  account: string | null;
  chainId: number | null;
  network: L2Network | null;
  isConnecting: boolean;
  connect: (networkName?: string) => Promise<void>;
  disconnect: () => void;
  switchNetwork: (networkName: string) => Promise<void>;
}

export const useBlockchain = create<BlockchainState>((set) => ({
  provider: null,
  signer: null,
  account: null,
  chainId: null,
  isConnecting: false,

  connect: async (networkName = 'arbitrum') => {
    try {
      set({ isConnecting: true });

      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      }

      const targetNetwork = L2_NETWORKS[networkName];
      if (!targetNetwork) {
        throw new Error("Invalid network selected");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request network switch
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${targetNetwork.chainId.toString(16)}` }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${targetNetwork.chainId.toString(16)}`,
              chainName: targetNetwork.name,
              rpcUrls: [targetNetwork.rpcUrl],
            }],
          });
        } else {
          throw switchError;
        }
      }

      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      set({
        provider,
        signer,
        account,
        chainId,
        network: targetNetwork,
        isConnecting: false,
      });
    } catch (error) {
      console.error("Failed to connect:", error);
      set({ isConnecting: false });
      throw error;
    }
  },

  switchNetwork: async (networkName: string) => {
    const { connect } = useBlockchain.getState();
    await connect(networkName);
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
