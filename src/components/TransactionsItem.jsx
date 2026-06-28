import styles from '../styles/transactions.module.scss';

export default function TransactionsItem({ transaction, onEdit, onDelete }) {
  const { id, date, type, category, comment, sum } = transaction;
  const isIncome = type === 'income' || type === '+';

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{date}</td>

      <td className={styles.cell}>
        <span className={`${styles.typeBadge} ${isIncome ? styles.income : styles.expense}`}>
          {isIncome ? '+' : '-'}
        </span>
      </td>

      <td className={styles.cell}>{category}</td>

      <td className={styles.cell}>{comment}</td>

      <td className={`${styles.cell} ${styles.cellSum}`}>
        <span className={isIncome ? styles.sumPositive : styles.sumNegative}>
          {sum.toLocaleString('uk-UA')}
        </span>
      </td>

      <td className={`${styles.cell} ${styles.cellActions}`}>
        <button
          className={styles.editBtn}
          onClick={() => onEdit(transaction)}
          type="button"
          aria-label="Edit"
        >
          ✏️
        </button>

        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(id)}
          type="button"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}