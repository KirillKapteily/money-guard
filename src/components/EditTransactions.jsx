import { animator } from "chart.js";
import { useState } from "react";

import cont from "../styles/body.module.scss";
import styles from "../styles/addtrasactions.module.scss";

export default function EditTransactions({ transaction, onClose, onSave }) {
  console.log(transaction);

  const [id, setId] = useState(transaction.id);
  const [amount, setAmount] = useState(transaction.sum);
  const [type, setType] = useState(transaction.type);
  const [category, setCategory] = useState(transaction.category);
  const [comment, setComment] = useState(transaction.comment);
  const [date, setDate] = useState(transaction.date);
  console.log("amount", amount);
  console.log("type", type);
  console.log("category", category);
  console.log("comment", comment);
  console.log("date", date);

  const updatedTransaction = {
    id: id,
    date: date,
    type: type,
    category: category,
    comment: comment || "No comment",
    sum: Number(amount),
  };

  const handleSubmit = (e) => {
    onSave(updatedTransaction);
  };

  return (
    <>
      <div className={styles.addtrans__background}>
        <div className={cont.container}>
          <div className={styles.addtrans__backdrop}>
            <h2 className={styles.title}>Edit transaction</h2>
            <div className={styles.change__wrapper}>
              <button
                className={styles.decelected}
                onClick={() => {
                  setType("income");
                }}
              >
                Income
              </button>
              <hr className={styles.slash} />
              <button
                className={styles.decelected}
                onClick={() => {
                  setType("Expense");
                }}
              >
                {" "}
                Expense
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {type === "Expense" && (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={styles.input}
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
              )}

              <div className={styles.input__wrapper}>
                <input
                  type="number"
                  placeholder={amount}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={styles.input}
                  required
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.input}
                />
              </div>

              <input
                type="text"
                placeholder={transaction.comment}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={styles.input}
              />

              <div className={styles.btn__wrapper}>
                <button
                  onClick={() => onSave(updatedTransaction)}
                  className={styles.active__btn}
                >
                  Save
                </button>
                <button
                  onClick={() => onClose()}
                  className={styles.not__active__btn}
                >
                  CAncel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
