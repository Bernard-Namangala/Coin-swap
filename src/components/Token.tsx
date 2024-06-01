import * as React from "react";
import { TokenType } from "../types";
import DownArrow from "../assets/images/downArrow.svg";
import { useAccount, useBalance } from "wagmi";
import { etherUnits, formatUnits } from "viem";
import LoadingShimmer from "./LoadingShimmer";

interface CurrencyBadgeProps {
  currency: string;
  altText: string;
  imageSrc: string;
  onClick: () => void;
}

const CurrencyBadge: React.FC<CurrencyBadgeProps> = ({
  currency,
  altText,
  imageSrc,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex gap-2 justify-center py-2 pl-2.5 text-white whitespace-nowrap bg-bodyBackground rounded-lg leading-[143%]"
    >
      <img
        loading="lazy"
        src={imageSrc}
        alt={altText}
        className="shrink-0 aspect-square w-[23px]"
      />
      <div className="flex gap-2.5 self-start pr-3 cursor-pointer">
        <div className="cursor-pointer">{currency}</div>
        <img
          loading="lazy"
          src={DownArrow}
          alt="Select"
          className="shrink-0 my-auto aspect-[1.79] fill-gray-400 w-[9px]"
        />
      </div>
    </div>
  );
};

interface TokenProps {
  token: TokenType | undefined;
  openModal: () => void;
  tokenBalance: string;
  amount: number;
  setAmount: (amount: number) => void;
  tokenUSDValue: string;
  loading: boolean;
  type: "fromToken" | "toToken";
}

const Token: React.FC<TokenProps> = ({
  token,
  openModal,
  tokenBalance,
  amount,
  setAmount,
  tokenUSDValue,
  loading,
  type,
}) => {
  return (
    <main className="flex justify-center w-full py-4 px-4 tracking-tight rounded-xl bg-customGray w-full">
      <section className="flex w-full flex-col">
        <div className="flex justify-between w-full items-center">
          <CurrencyBadge
            currency={token?.symbol || ""}
            altText={token?.symbol || ""}
            imageSrc={token?.icon || ""}
            onClick={openModal}
          />
          {type === "toToken" && loading ? (
            <LoadingShimmer width={60} height={20} />
          ) : (
            <input
              className="text-xl leading-4 w-[50px] bg-customGray text-fadedText"
              value={amount}
              onChange={(e: any) => setAmount(e.target.value)}
            />
          )}
        </div>

        <div className="flex justify-between w-full items-center">
          <div className="flex gap-2 mt-3.5 leading-[143%] text-slate-500">
            <div className="flex gap-2 text-xs">
              <div>Balance:</div>
              <div>
                {tokenBalance} {token?.symbol}
              </div>
            </div>
          </div>
          <div className="mt-6 text-xs leading-4 text-fadedText">
            {loading ? (
              <LoadingShimmer width={60} height={15} />
            ) : (
              <span>≈$ {Number(tokenUSDValue) * amount}</span>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Token;
