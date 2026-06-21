import EditIcon from '../assets/Icon.svg';

export default function TransactionsItem({ transaction, onEdit, onDelete }) {
  
  const { id, date, type, category, comment, sum } = transaction;

  const isIncome = type === 'income' || type === '+';

  return (
    <tr className="transaction-row">
      <td className="date">{date}</td>
      
      <td className="type">
        <span className={isIncome ? "type-badge income" : "type-badge expense"}>
          {isIncome ? '+' : '-'}
        </span>
      </td>

      <td className="category">{category}</td>
      <td className="comment">{comment}</td>

      <td className={isIncome ? "sum positive" : "sum negative"}>
        {isIncome ? '+' : ''}₴ {sum.toLocaleString('uk-UA')}
      </td>

      <td className="actions">
        <button 
          className="edit-btn"
          onClick={() => onEdit(transaction)}
        >
          <img src={EditIcon} alt="Edit" />
        </button>

        <button 
          className="delete-btn"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}