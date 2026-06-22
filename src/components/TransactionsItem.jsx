import EditIcon from "../assets/Icon.svg"

export default function TransactionsItem({ transaction, onDelete }) {
  const { id, date, type, category, comment, sum } = transaction

  return (
    <tr>
      <td>{date}</td>
      <td>{type}</td>
      <td>{category}</td>
      <td>{comment}</td>
      <td>{sum}</td>
      <td>
        <button>
          <img src={EditIcon} alt="edit" />
        </button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </td>
    </tr>
  )
}