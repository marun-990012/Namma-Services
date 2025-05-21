import { Coins } from "lucide-react";
import Wallet from "./Wallet";
import Transactions from "./Transactions";
function Payment() {

  return (
    <div className="flex justify-center items-center border-3 border-white shodow-xl rounded-[8px] p-10 mb-4">
      <div className="flex w-full justify-between">
         <Wallet/>
        <Transactions/>
      </div>
    </div>
  );
}
export default Payment;
