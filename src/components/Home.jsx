import Sidebar from "./Sidebar";
import TransactionsList from "./TransactionsList";

export default function Home({ transactions, setTransactions }) {
  return (
    <>
      <Sidebar />
      <TransactionsList 
        transactions={transactions} 
        setTransactions={setTransactions} 
      />
    </>
  )
}