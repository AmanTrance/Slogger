import { Card2 } from "@/components/dashboard/Card2";
import { Card3 } from "@/components/dashboard/Card3";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import { Header } from "@/components/Header";


export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="container mx-auto flex justify-between mt-8">
        <div className="flex-1 pr-4">
          
          <Card3 />
          <Card3 />
        </div>

        
        <div className="w-full sm:w-64 lg:w-72">
          <TransactionHistory />
          <Card2 />
        </div>
      </div>
    </div>
  );
}
