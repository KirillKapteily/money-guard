import { useState } from 'react';
import styles from '../styles/editTransactions.module.scss';

const CATEGORIES = [
  'Main expenses',
  'Products',
  'Car',
  'Self care',
  'Child care',
  'Household products',
  'Education',
  'Leisure',
  'Other expenses',
  'Entertainment',
];

export default function EditTransactions({ transaction, onSave, onClose }) {
  const [type, setType] = useState(transaction?.type === '+' ? 'income' : 'expense');
  const [amount, setAmount] = useState(transaction?.sum ?? '');
  const [date, setDate] = useState(transaction?.date ?? '');
  const [comment, setComment] = useState(transaction?.comment ?? '');

  const isIncome = type === 'income';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;

    onSave({
      ...transaction,
      type: isIncome ? '+' : '-',
      sum: Number(amount),
      date,
      comment,
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className={styles.title}>Edit transaction</h2>

        <div className={styles.typeToggle}>
          <span className={`${styles.typeLabel} ${isIncome ? styles.activeIncome : ''}`}>
            Income
          </span>

          <label className={styles.toggleWrapper}>
            <input
              type="checkbox"
              className={styles.toggleInput}
              checked={!isIncome}
              onChange={() => setType(isIncome ? 'expense' : 'income')}
            />
            <span className={`${styles.toggleSlider} ${!isIncome ? styles.expense : styles.income}`} />
          </label>

          <span className={`${styles.typeLabel} ${!isIncome ? styles.activeExpense : ''}`}>
            Expense
          </span>
        </div>

        {!isIncome && (
          <div className={styles.categoryDisplay}>
            {transaction?.category}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <input
              type="number"
              className={styles.input}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
            <div className={styles.dateWrapper}>
              <input
                type="date"
                className={styles.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <input
            type="text"
            className={`${styles.input} ${styles.commentInput}`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment"
          />

          <button type="submit" className={styles.saveBtn}>
            SAVE
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
          >
            CANCEL
          </button>
        </form>
      </div>
    </div>
  );
}