import { useState } from 'react';
import HomeSidebar from './HomeSidebar';
import TransactionsList from './TransactionsList';
import AddTransaction from './AddTransactions';
import EditTransaction from './EditTransactions';

import homeStyles from '../styles/home.module.scss';
import transStyles from '../styles/transactions.module.scss';

export default function Home({ transactions, setTransactions }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleAdd = newTransaction => {
    setTransactions(prev => [newTransaction, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleEdit = updatedTransaction => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingTransaction(null);
  };

  const handleDelete = id => {
    setTransactions(prev =>
      prev.filter(transaction => transaction.id !== id)
    );
  };

  return (
    <div className={homeStyles.homeContainer}>
      <HomeSidebar transactions={transactions} />

      <main className={homeStyles.mainContent}>
        <TransactionsList
          transactions={transactions}
          onEdit={setEditingTransaction}
          onDelete={handleDelete}
        />

        <button
          type="button"
          className={transStyles.addBtn}
          aria-label="Add transaction"
          onClick={() => setIsAddModalOpen(true)}
        />
      </main>

      {isAddModalOpen && (
        <AddTransaction
          onAdd={handleAdd}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {editingTransaction && (
        <EditTransaction
          transaction={editingTransaction}
          onSave={handleEdit}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
}