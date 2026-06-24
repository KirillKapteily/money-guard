import HomeSidebar from "./HomeSidebar";
import Sidebar from "./Sidebar";
import TransactionsList from "./TransactionsList";

export default function Home({ transactions, setTransactions }) {
  return (
    <>
      <HomeSidebar transactions={transactions}/>
      <Sidebar />
      <TransactionsList 
        transactions={transactions} 
        setTransactions={setTransactions} 
      />
    </>
  )
}