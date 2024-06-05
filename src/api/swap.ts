import axios from "axios";
import { OPEN_OCEAN_BASE_URL } from "../constants";
import { SwapQuoteData, TransactionData } from "../types";

export const getTokenList = async (chainId: number) => {
  try {
    const data = await axios.get(
      OPEN_OCEAN_BASE_URL + `v3/${chainId}/tokenList`
    );

    return data.data.data;
  } catch (err: any) {
    console.log(err);
    return [];
  }
};

export const getQuote = async (
  chainId: number,
  params: any
): Promise<SwapQuoteData | undefined> => {
  const queryString = new URLSearchParams(params).toString();

  try {
    const data = await axios.get(
      OPEN_OCEAN_BASE_URL + `v3/${chainId}/quote?${queryString}`
    );

    return data.data.data;
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
};

export const getSwapQuote = async (
  chainId: number,
  params: any
): Promise<TransactionData | undefined> => {
  const queryString = new URLSearchParams(params).toString();

  try {
    const data = await axios.get(
      OPEN_OCEAN_BASE_URL + `v3/${chainId}/swap_quote?${queryString}`
    );

    return data.data.data;
  } catch (err: any) {
    console.log(err);
    return undefined;
  }
};
