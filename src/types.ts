export interface SwapOptions {
  slippage: string;
  isOpen: boolean;
  customSlippage: number;
  expiryTime: number;
  setExpiryTime(value: number): void;
  setCustomSlippage: (value: number) => void;
  setSlippage: (value: string) => void;
  onClose: () => void;
}

export interface TokenType {
  id: number;
  code: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
  symbol: string;
  icon: string;
  chain: string;
  createtime: string;
  hot: string;
  sort: string;
  chainId: number | null;
  customSymbol: string | null;
  customAddress: string | null;
  usd: string;
}

interface Token {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  usd: string;
  volume: number;
}

interface Dex {
  dexIndex: number;
  dexCode: string;
  swapAmount: string;
}

interface SubRoute {
  from: string;
  to: string;
  parts: number;
  dexes: Array<{
    dex: string;
    id: string;
    parts: number;
    percentage: number;
  }>;
}

interface Route {
  parts: number;
  percentage: number;
  subRoutes: SubRoute[];
}

interface Path {
  from: string;
  to: string;
  parts: number;
  routes: Route[];
}

export interface SwapQuoteData {
  chainId: number;
  inToken: Token;
  outToken: Token;
  inAmount: string;
  outAmount: string;
  estimatedGas: string;
  dexes: Dex[];
  path: Path;
  save: number;
  price_impact: string;
}

export interface TransactionData {
  inToken: TokenType;
  outToken: TokenType;
  inAmount: string;
  outAmount: string;
  estimatedGas: number;
  minOutAmount: string;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  data: string;
  chainId: number;
  rfqDeadline: number;
  price_impact: string;
}
