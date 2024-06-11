// @ts-nocheck

import { http, createConfig } from "wagmi";
import { mainnet, polygon, bsc, avalanche } from "wagmi/chains";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [polygon, bsc, avalanche],
  transports: {
    [polygon.id]: http(),
    [bsc.id]: http(),
    [avalanche.id]: http(),
  },
});
