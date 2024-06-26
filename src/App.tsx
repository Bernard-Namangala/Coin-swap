import React from "react";
import "./App.css";
import SwapComponent from "./pages/Home";
import Navbar from "./components/Navbar";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import Logo from "./assets/images/logo.png";

const queryClient = new QueryClient();

const projectId = "ea46303446285f8f36158079bdc13777";

const metadata = {
  name: "Coin Swap",
  description: "Coin Swap",
  url: "https://web3modal.com",
  icons: [Logo],
};

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  metadata,
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="flex justify-center items-center w-screen h-screen bg-bodyBackground p-4">
          <SwapComponent />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
