import Sidebar from "./Sidebar";
import TransactionsList from "./TransactionsList";
import StatisticsList from "./StatisticsList"


export default function Home({ }) {
  return (
    <>
      <Sidebar />
      <TransactionsList />
      <StatisticsList />
    </>
  )
}