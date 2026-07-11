import styles from '../styles/transactions.module.scss';
import editIcon from '../assets/Icon.svg';

function formatTransactionDate(dateString) {
  if (!dateString) return '';

  const normalized = dateString.includes('.')
    ? dateString.split('.').reverse().join('-')
    : dateString;

  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function TransactionsItem({ transaction, onEdit, onDelete }) {
  const { id, date, type, category, comment, sum } = transaction;
  const formattedDate = formatTransactionDate(date);
  const isIncome = type === 'income' || type === '+';

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{formattedDate}</td>

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
          <img src={editIcon} alt="Edit" />
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