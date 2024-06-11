import * as React from "react";
import settingsIcon from "../assets/images/settings.svg";
import SwapOptionsModal from "../components/SwapOptionsModal";
import Token from "../components/Token";
import SwitchTokensIcon from "../assets/images/switchTokens.svg";
import SelectToken from "../components/SelectToken";

import { TOP_TOKENS } from "../constants";
import { useAccount, useChainId, useGasPrice } from "wagmi";
import { formatUnits } from "viem";
import useTokenBalance from "../hooks/useTokenBalance";
import { getQuote, getTokenList } from "../api/swap";
import { SwapQuoteData, TokenType } from "../types";
import ConfirmSwapModal from "../components/ConfirmSwapModal";

import { useWeb3Modal } from "@web3modal/wagmi/react";

interface ImageWrapperProps {
  src: string;
  alt: string;
}

const ImageWrapper: React.FC<ImageWrapperProps> = ({ src, alt }) => {
  return (
    <div className="cursor-pointer flex justify-center items-center px-4 w-14  h-14 rounded-3xl border-customBlack border-solid bg-customGray border-[6px]">
      <img
        loading="lazy"
        src={src}
        className="w-full aspect-square"
        alt={alt}
      />
    </div>
  );
};

const SwitchTokens: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <main
      className="absolute inset-0 m-auto flex justify-center items-center w-[60px] h-[30px] "
      onClick={onClick}
    >
      <ImageWrapper src={SwitchTokensIcon} alt="Description of the image" />
    </main>
  );
};

interface SwapState {
  ethInput: string;
  ethOption: string;
  eosInput: string;
  eosOption: string;
}

const Swap: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [slippage, setSlippage] = React.useState("Auto");
  const [customSlippage, setCustomSlippage] = React.useState(0.5);
  const [expiryTime, setExpiryTime] = React.useState(10);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tokens, setTokens] = React.useState([]);
  const [topTokens, setTopTokens] = React.useState([]);
  const [fromToken, setFromToken] = React.useState<TokenType | undefined>(
    undefined
  );
  const [toToken, setToToken] = React.useState<TokenType | undefined>(
    undefined
  );
  const [token1Modal, setToken1Modal] = React.useState<boolean>(false);
  const [token2Modal, setToken2Modal] = React.useState<boolean>(false);
  const [confirmModalOpen, setConfirmModalOpen] =
    React.useState<boolean>(false);
  const [fromAmount, setFromAmount] = React.useState(0);
  const [toAmount, setToAmount] = React.useState(0);
  const [swapQuote, setSwapQuote] = React.useState<SwapQuoteData | undefined>(
    undefined
  );
  const account = useAccount();
  const fromTokenBalance = useTokenBalance(fromToken, account.address);
  const toTokenBalance = useTokenBalance(toToken, account.address);
  const chainId = useChainId();
  const gasPrice = useGasPrice();
  const { open, close } = useWeb3Modal();

  React.useEffect(() => {
    // load tokens from openocean
    const loadTokens = async () => {
      const tokens = await getTokenList(chainId);
      setTokens(tokens);
    };
    loadTokens();
  }, [chainId]);

  React.useEffect(() => {
    // Filter tokens based on symbols in the TOP_TOKENS array
    const filteredTokens = tokens.filter((token: any) =>
      TOP_TOKENS.includes(token.symbol)
    );

    if (filteredTokens.length > 0) {
      setFromToken(filteredTokens[0]);
      setToToken(filteredTokens[1]);
    }

    // Set top tokens
    setTopTokens(filteredTokens);
  }, [tokens]);

  React.useEffect(() => {
    const getSwapQuote = async () => {
      setLoading(true);
      const quoteData = {
        chain: chainId,
        inTokenAddress: fromToken?.address,
        outTokenAddress: toToken?.address,
        amount: fromAmount,
        slippage: 1,
        gasPrice: gasPrice.data?.toString(),
      };

      const swapQuote = await getQuote(chainId, quoteData);

      setSwapQuote(swapQuote);
      setLoading(false);
    };

    if (fromAmount > 0 && fromToken && toToken) getSwapQuote();
  }, [fromAmount, fromToken, toToken]);

  //
  React.useEffect(() => {
    if (swapQuote?.outAmount && toToken?.decimals)
      setToAmount(
        Number(formatUnits(BigInt(swapQuote?.outAmount), toToken?.decimals))
      );
  }, [swapQuote]);

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
  };

  const userHasEnoughBalance = () => {
    return Number(fromTokenBalance) > fromAmount;
  };

  return (
    <section className="flex flex-col  px-2 pt-4 pb-2.5 bg-customBlack rounded-xl w-full max-w-[472px] max-h-[600px]">
      <header className="flex justify-between self-center px-5 leading-4 whitespace-nowrap w-full text-slate-500">
        <div>Swap</div>
        <img
          loading="lazy"
          src={settingsIcon}
          onClick={() => setIsModalOpen(!isModalOpen)}
          alt=""
          className="shrink-0 aspect-[0.94] w-[18px] cursor-pointer"
        />
      </header>
      <div className="my-4 gap-3 flex flex-col relative">
        <Token
          token={fromToken}
          openModal={() => setToken1Modal(true)}
          tokenBalance={fromTokenBalance}
          amount={fromAmount}
          setAmount={setFromAmount}
          tokenUSDValue={swapQuote ? swapQuote.inToken.usd : "0"}
          loading={loading}
          type="fromToken"
        />
        <Token
          token={toToken}
          openModal={() => setToken2Modal(true)}
          tokenBalance={toTokenBalance}
          amount={toAmount}
          setAmount={setToAmount}
          tokenUSDValue={swapQuote ? swapQuote.outToken.usd : "0"}
          loading={loading}
          type="toToken"
        />
        <SwitchTokens onClick={handleSwapTokens} />
      </div>

      {!account.isConnected || !account.connector ? (
        <button
          onClick={() => open()}
          className={`justify-center items-center px-16 py-5 mt-3 text-base text-center text-white whitespace-nowrap bg-yellow rounded-xl ${
            account.isConnected || account.connector
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          type="submit"
          disabled={
            loading ||
            !account.isConnected ||
            !account.connector ||
            !userHasEnoughBalance()
          }
          className={`justify-center items-center px-16 py-5 mt-3 text-base text-center text-white whitespace-nowrap bg-yellow rounded-xl ${
            loading ||
            !account.isConnected ||
            !account.connector ||
            !swapQuote ||
            !userHasEnoughBalance()
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
          onClick={() => swapQuote && setConfirmModalOpen(true)}
        >
          {userHasEnoughBalance() ? "Swap" : "Insufficient Balance"}
        </button>
      )}

      <SwapOptionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slippage={slippage}
        customSlippage={customSlippage}
        expiryTime={expiryTime}
        setSlippage={setSlippage}
        setExpiryTime={setExpiryTime}
        setCustomSlippage={setCustomSlippage}
      />

      <SelectToken
        isOpen={token1Modal}
        onClose={() => setToken1Modal(false)}
        tokens={tokens}
        popularTokens={topTokens}
        setToken={setFromToken}
        disabledToken={toToken}
      />

      <SelectToken
        isOpen={token2Modal}
        onClose={() => setToken2Modal(false)}
        tokens={tokens}
        popularTokens={topTokens}
        setToken={setToToken}
        disabledToken={fromToken}
      />
      {swapQuote && (
        <ConfirmSwapModal
          isOpen={confirmModalOpen}
          swapQuote={swapQuote}
          onClose={() => setConfirmModalOpen(false)}
          fromToken={fromToken}
          toToken={toToken}
          customSlippage={customSlippage}
        />
      )}
    </section>
  );
};

export default Swap;
