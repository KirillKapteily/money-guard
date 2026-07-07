import TransactionsItem from './TransactionsItem';
import styles from '../styles/transactions.module.scss';

export default function TransactionsList({ transactions, onEdit, onDelete }) {
  return (
    <div className={styles.section}>
      {transactions.length === 0 ? (
        <p className={styles.empty}>No transactions yet. Add your first one!</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.theadRow}>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Category</th>
              <th className={styles.th}>Comment</th>
              <th className={`${styles.th} ${styles.thRight}`}>Sum</th>
              <th className={styles.th}></th>
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