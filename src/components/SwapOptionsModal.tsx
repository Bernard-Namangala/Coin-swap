import React, { useState } from "react";
import { SwapOptions } from "../types";

const SwapOptionsModal = ({
  isOpen,
  onClose,
  slippage,
  customSlippage,
  expiryTime,
  setSlippage,
  setExpiryTime,
  setCustomSlippage,
}: SwapOptions) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-custombBlack p-6 rounded-lg w-80 text-white">
        <h2 className="text-xl font-bold mb-4">Swap Options</h2>

        <div className="mb-4">
          <label className="block mb-1">Max. Slippage</label>
          <div className="flex space-x-2">
            <button
              className={`py-2 px-4 rounded ${
                slippage === "Auto" ? "bg-gray-700" : "bg-gray-600"
              }`}
              onClick={() => setSlippage("Auto")}
            >
              Auto
            </button>
            <button
              className={`py-2 px-4 rounded ${
                slippage === "Custom" ? "bg-gray-700" : "bg-gray-600"
              }`}
              onClick={() => setSlippage("Custom")}
            >
              Custom
            </button>
            {slippage === "Custom" && (
              <input
                type="number"
                value={customSlippage}
                onChange={(e: any) => setCustomSlippage(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded w-20"
                min="0"
                max="100"
              />
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Transaction Deadline</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={expiryTime}
              onChange={(e: any) => setExpiryTime(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded w-20"
              min="1"
            />
            <span>minutes</span>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button className="bg-gray-600 py-2 px-4 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-yellow py-2 px-4 rounded" onClick={onClose}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapOptionsModal;
