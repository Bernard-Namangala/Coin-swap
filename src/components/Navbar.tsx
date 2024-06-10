import React, { useState } from "react";
import Logo from "../assets/images/logo.png";
import ConnectButton from "./ConnectBtn";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">
        <img
          loading="lazy"
          src={Logo}
          alt="Coin Swap"
          className="shrink-0 w-[60px] cursor-pointer"
        />
      </div>
      <div className="flex space-x-4 items-center">
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
