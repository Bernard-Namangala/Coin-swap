import React from "react";
import "./App.css";
import SwapComponent from "./pages/Home";
import Navbar from "./components/Navbar";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi";

const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "ea46303446285f8f36158079bdc13777";

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="flex justify-center items-center w-screen h-screen bg-bodyBackground">
          <SwapComponent />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
