import { Transactionform } from "@/components/transaction/Transactionform";
import { Header } from "@/components/Header"; 

export default function TransactionPage() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-1 flex justify-center bg-white p-0">
                <div className="w-3/4">
                    <Transactionform />
                </div>
            </div>
        </div>
    );
}
