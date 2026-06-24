import TransactionsItem from './TransactionsItem';

export default function TransactionsList({ transactions, onEdit, onDelete }) {
  return (
    <div className="transactions-section">
      <h2>Recent Transactions</h2>
      
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions yet. Add your first one!</p>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Comment</th>
              <th>Sum</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TransactionsItem
                key={transaction.id}
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}