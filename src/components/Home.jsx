import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TransactionsList from './TransactionsList';
import AddTransaction from './AddTransactions';
import EditTransaction from './EditTransactions';

export default function Home({ transactions, setTransactions }) {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const balance = transactions.reduce((acc, t) => {
    return (t.type === 'income' || t.type === '+') 
      ? acc + t.sum 
      : acc - t.sum;
  }, 0);

  const handleAdd = (newTransaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (updatedTransaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
    setEditingTransaction(null);
  };

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="home-container">
      <Sidebar balance={balance} />

      <div className="main-content">
        <div className="balance-section">
          <h2>Your Balance</h2>
          <h1 className="balance-amount">₴ {balance.toLocaleString('uk-UA')}</h1>
        </div>

        <button 
          className="add-transaction-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Transaction
        </button>

        <TransactionsList 
          transactions={transactions}
          onEdit={setEditingTransaction}
          onDelete={handleDelete}
        />
      </div>

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