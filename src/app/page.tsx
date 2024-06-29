import { Me } from "@/components/tma/me";
import { WalletConnectButton } from "@/components/wallet/wallet-connect-button";
import Image from "next/image";

export default function Home() {
  return (
    <>
   <Me/>
   <WalletConnectButton/>
   </>
  );
}
