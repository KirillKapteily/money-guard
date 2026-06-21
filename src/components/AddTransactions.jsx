import { useState } from 'react';

export default function AddTransaction({ onAdd, onClose }) {

  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [comment, setComment] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAdd({
      id: Date.now(),
      date: date,
      type: type,
      category: category,
      comment: comment || 'No comment',
      sum: Number(amount)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Transaction</h2>

        <form onSubmit={handleSubmit}>
          <div className="type-toggle">
            <button 
              type="button"
              className={type === 'income' ? 'active' : ''}
              onClick={() => setType('income')}
            >
              Income
            </button>
            <button 
              type="button"
              className={type === 'expense' ? 'active' : ''}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
          </div>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Salary">Salary</option>
            <option value="Car">Car</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}