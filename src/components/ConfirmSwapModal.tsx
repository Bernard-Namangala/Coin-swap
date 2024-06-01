import React, { useState } from "react";
import { SwapOptions, SwapQuoteData, TokenType } from "../types";
import { formatUnits, erc20Abi } from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { OPEN_OCEAN_CONTRACTS } from "../constants";
import { readContract, writeContract } from "@wagmi/core";
import { config } from "../config";

const SwapAmount = ({ amount, amountUSD, action, symbol, icon }: any) => {
  return (
    <>
      <div className="flex justify-even w-full items-center my-5">
        <div className="flex flex-1 w-full flex-col">
          <span className="text-sm py-1 text-fadedText">{action}</span>
          <h2 className="text-4xl">
            {amount} {symbol}
          </h2>
          <span className="text-sm py-1 text-fadedText">
            ~${Number(amountUSD) * Number(amount)}
          </span>
        </div>
        <div>
          <img width={50} height={50} src={icon} />
        </div>
      </div>
    </>
  );
};
interface ConfirmSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  swapQuote: SwapQuoteData;
  fromToken: TokenType | undefined;
  toToken: TokenType | undefined;
  customSlippage: number;
}
const ConfirmSwapModal: React.FC<ConfirmSwapModalProps> = ({
  fromToken,
  toToken,
  swapQuote,
  isOpen,
  onClose,
  customSlippage,
}) => {
  const chainId = useChainId();
  const account = useAccount();

  if (!isOpen) return null;

  const swap = async () => {
    const open_ocean_contract_address: any = OPEN_OCEAN_CONTRACTS[chainId];

    if (fromToken?.address) {
      const args: any = [account.address, open_ocean_contract_address];

      // @ts-ignore
      // const result = await readContract(config, {
      //   abi: erc20Abi,
      //   address: fromToken.address,
      //   functionName: "allowance",
      //   args,
      // });

      // if (result < BigInt(swapQuote.outAmount)) {
      //   // @ts-ignore
      //   await writeContract(config, {
      //     abi: erc20Abi,
      //     address: fromToken.address,
      //     functionName: "approve",
      //     args: [open_ocean_contract_address, BigInt(swapQuote.outAmount)],
      //   });
      // }
    }
    // const quoteData = {
    //   chain: chain_id,
    //   inTokenAddress: fromToken?.address,
    //   outTokenAddress: toToken?.address,
    //   amount: fromAmount,
    //   slippage: 1,
    //   gasPrice: gasPrice.data?.toString(),
    // };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="flex flex-col bg-customGray p-4 rounded-lg w-80 text-white sm:min-w-[450px] min-h-[450px]">
        <header className="flex justify-between items-center">
          <div>
            <span className="leading">Review Swap</span>
          </div>

          <button
            className="w-10 h-10 flex items-center justify-center text-gray-600"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>
        <SwapAmount
          action="Sell"
          amount={formatUnits(
            BigInt(swapQuote.inAmount),
            swapQuote.inToken.decimals
          )}
          amountUSD={swapQuote.inToken.usd}
          symbol={swapQuote.inToken.symbol}
          icon={fromToken?.icon}
        />
        <SwapAmount
          action="Sell"
          amount={formatUnits(
            BigInt(swapQuote.outAmount),
            swapQuote.outToken.decimals
          )}
          amountUSD={swapQuote.outToken.usd}
          symbol={swapQuote.outToken.symbol}
          icon={toToken?.icon}
        />
        <hr className="border-fadedText  my-2" style={{ color: "red" }} />
        <div className="flex flex-col">
          {swapQuote.price_impact && (
            <div className="flex justify-between py-2 items-center">
              <span className="text-sm text-fadedText">Price impact</span>
              <span className="text-sm">{swapQuote.price_impact}</span>
            </div>
          )}
          <div className="flex justify-between py-2 items-center">
            <span className="text-sm text-fadedText">Estimated gas</span>
            <span className="text-sm">
              {formatUnits(BigInt(swapQuote.estimatedGas), 18)}{" "}
              {chainId === 1 ? "ETH" : chainId === 56 ? "BNB" : ""}
            </span>
          </div>
          <div className="flex justify-between py-2 items-center">
            <span className="text-sm text-fadedText">Max slippage</span>
            <span className="text-sm">{customSlippage}%</span>
          </div>
          {swapQuote.save && (
            <div className="flex justify-between py-2 items-center">
              <span className="text-sm text-fadedText">Save</span>
              <span className="text-sm">${swapQuote.save}</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          onClick={() => swap()}
          className={`justify-self-end justify-center items-center px-16 py-5 mt-3 text-base text-center text-white whitespace-nowrap bg-yellow rounded-xl w-full`}
        >
          Approve and Swap
        </button>
      </div>
    </div>
  );
};

export default ConfirmSwapModal;
