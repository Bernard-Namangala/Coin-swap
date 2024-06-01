import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useBalance } from "wagmi";

const NATIVE_TOKEN_ADDRESS =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase();

const useTokenBalance = (
  token: any,
  accountAddress: `0x${string}` | undefined
) => {
  const [balance, setBalance] = useState("0");

  const balanceData: any = {
    address: accountAddress,
    unit: token?.decimals,
  };

  if (String(token?.address).toLowerCase() !== NATIVE_TOKEN_ADDRESS) {
    balanceData["token"] = token?.address;
  }

  const balanceResult = useBalance(balanceData);

  useEffect(() => {
    if (balanceResult.isFetched && balanceResult.data) {
      const formattedBalance = formatUnits(
        balanceResult.data.value,
        balanceResult.data.decimals
      );
      setBalance(formattedBalance);
    }
  }, [balanceResult]);

  return balance;
};

export default useTokenBalance;
