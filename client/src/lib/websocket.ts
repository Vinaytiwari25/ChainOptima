import { create } from "zustand";
import type { Transaction } from "@shared/schema";
import { queryClient } from "./queryClient";

interface WebSocketState {
  socket: WebSocket | null;
  connected: boolean;
  connect: () => void;
  disconnect: () => void;
}

export const useWebSocket = create<WebSocketState>((set, get) => ({
  socket: null,
  connected: false,

  connect: () => {
    const { socket } = get();
    if (socket?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const newSocket = new WebSocket(wsUrl);

    newSocket.onopen = () => {
      console.log("WebSocket connected");
      set({ connected: true });
    };

    newSocket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === 'NEW_TRANSACTION') {
          // Invalidate transactions query to trigger a refetch
          queryClient.invalidateQueries({ queryKey: ['/api/transactions'] });
          
          // Show notification or update UI
          // This will be handled by the components
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
      set({ connected: false });
      // Attempt to reconnect after 5 seconds
      setTimeout(() => get().connect(), 5000);
    };

    set({ socket: newSocket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null, connected: false });
    }
  }
}));
