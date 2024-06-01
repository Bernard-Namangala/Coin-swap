import React, { useState } from "react";
import { TokenType } from "../types";

interface SelectTokenProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: TokenType[];
  popularTokens: TokenType[];
  setToken: (token: TokenType) => void;
  disabledToken: TokenType | undefined;
}

const SelectToken: React.FC<SelectTokenProps> = ({
  isOpen,
  onClose,
  tokens,
  popularTokens,
  setToken,
  disabledToken,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) &&
        token.symbol !== disabledToken?.symbol)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-bodyBackground p-6 rounded-lg w-full max-w-md text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select a token</h2>
          <button onClick={onClose} className="text-white">
            &times;
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search name or paste address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded bg-customGray text-white"
          />
        </div>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {popularTokens.map((token) => (
              <button
                key={token.symbol}
                disabled={disabledToken?.symbol === token.symbol}
                onClick={() => {
                  setToken(token);
                  onClose();
                }}
                className={`flex items-center p-2 bg-customGray rounded  ${
                  disabledToken?.symbol === token.symbol
                    ? "opacity-50"
                    : "cursor-pointer"
                }`}
              >
                <img
                  src={token.icon}
                  alt={token.name}
                  className="w-6 h-6 mr-2"
                />
                {token.symbol}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2">All tokens</h3>
          <ul className="h-64 overflow-y-auto">
            {filteredTokens.map((token) => (
              <li
                key={token.symbol}
                className="flex items-center p-2 bg-customGray rounded mb-2 cursor-pointer"
                onClick={() => {
                  setToken(token);
                  onClose();
                }}
              >
                <img
                  src={token.icon}
                  alt={token.name}
                  className="w-6 h-6 mr-2"
                />
                <div>
                  <p>{token.name}</p>
                  <p className="text-gray-400">{token.symbol}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectToken;
