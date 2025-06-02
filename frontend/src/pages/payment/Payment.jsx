import { Coins } from "lucide-react";
import Wallet from "./Wallet";
import { useLocation } from "react-router-dom";
import Transactions from "./Transactions";
function Payment() {
    
  return (
    <div className=" bg-gray-100 flex justify-center items-center border-3 border-white shodow-xl rounded-[8px] p-5 mb-4">
      <div className="flex w-full justify-between">
         <Wallet/>
        <Transactions/>
      </div>
    </div>
  );
}
export default Payment;
