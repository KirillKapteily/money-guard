import TransactionsItem from "./TransactionsItem"

export default function TransactionsList({ transactions, setTransactions }) {
  const handleDelete = (id) => {
    const updated = transactions.filter(t => t.id !== id)
    setTransactions(updated)
    localStorage.setItem('transactions', JSON.stringify(updated))
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Comment</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(t => (
          <TransactionsItem
            key={t.id}
            transaction={t}
            onDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  )
}