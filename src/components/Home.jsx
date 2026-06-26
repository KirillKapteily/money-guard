import { useState } from 'react';
import Sidebar from './Sidebar';
import TransactionsList from './TransactionsList';
import AddTransaction from './AddTransactions';
import EditTransaction from './EditTransactions';
import '../styles/home.css';

export default function Home({ transactions, setTransactions }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const balance = transactions.reduce((acc, t) => {
    return (t.type === 'income' || t.type === '+') ? acc + t.sum : acc - t.sum;
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
      <Sidebar
        balance={balance}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="main-content">
        <TransactionsList
          transactions={transactions}
          onEdit={setEditingTransaction}
          onDelete={handleDelete}
        />

        <button
          className="add-transaction-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          +
        </button>
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