import { Coins } from "lucide-react";
import { useLocation } from "react-router-dom";
import Wallet from "./Wallet";
import Revenue from "./Revenue";
import Transactions from "./Transactions";

function Payment() {
    
  return (
    <div className=" bg-gray-100 flex justify-center items-center border-3 border-white shodow-xl rounded-[8px] p-3 mb-4">
      <div className="flex w-full justify-between">
         <div className="w-[32%] flex flex-col gap-3">
           <Wallet/>
           <Revenue/>
         </div>
        <Transactions/>
      </div>
    </div>
  );
}
export default Payment;
