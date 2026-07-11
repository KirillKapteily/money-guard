import { useState } from "react";
import styles from "../styles/addTransactionModal.module.scss";
import Select from "react-select";

export default function AddTransaction({ onAdd, onClose }) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const categories = [
    { value: "Products", label: "Products" },
    { value: "Car", label: "Car" },
    { value: "Self care", label: "Self care" },
    { value: "Child care", label: "Child care" },
    { value: "Household products", label: "Household products" },
    { value: "Education", label: "Education" },
    { value: "Leisure", label: "Leisure" },
    { value: "Other", label: "Other" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) return;

    onAdd({
      id: Date.now(),
      date,
      type,
      category: type === "income" ? "Income" : category,
      comment: comment || "No comment",
      sum: Number(amount),
    });
  };

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      background: "transparent",
      border: "none",
      borderBottom: "1px solid rgba(255,255,255,.4)",
      borderRadius: 0,
      minHeight: 40,
      boxShadow: "none",
    }),

    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),

    placeholder: (base) => ({
      ...base,
      color: "rgba(255,255,255,.7)",
    }),

    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),

    menu: (base) => ({
      ...base,
      background: "rgba(82,59,126,.98)",
      borderRadius: 8,
      overflow: "hidden",
      zIndex: 9999,
    }),

    option: (base, state) => ({
      ...base,
      background: state.isFocused
        ? "#6E4AA7"
        : "transparent",
      color: "#fff",
      cursor: "pointer",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "#fff",
    }),
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <button
          className={styles.close}
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className={styles.title}>
          Add transaction
        </h2>

        <div className={styles.switchWrapper}>

          <span
            className={
              type === "income"
                ? styles.activeIncome
                : styles.inactive
            }
          >
            Income
          </span>

          <button
            className={styles.switch}
            onClick={() =>
              setType(type === "income" ? "expense" : "income")
            }
            type="button"
          >
            <span
              className={`${styles.circle} ${type === "expense"
                ? styles.expense
                : styles.income
                }`}
            >
              {type === "income" ? "+" : "-"}
            </span>
          </button>

          <span
            className={
              type === "expense"
                ? styles.activeExpense
                : styles.inactive
            }
          >
            Expense
          </span>

        </div>

        <form onSubmit={handleSubmit}>

          {type === "expense" && (
            <Select
              options={categories}
              placeholder="Select category"
              value={categories.find(
                (item) => item.value === category
              )}
              onChange={(selected) =>
                setCategory(selected.value)
              }
              styles={customSelectStyles}
            />
          )}
          <div className={styles.row}>

            <input
              type="number"
              placeholder="0.00"
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
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.input}
          />

          <div className={styles.buttons}>

            <button
              type="submit"
              className={styles.addBtn}
            >
              ADD
            </button>

            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              CANCEL
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}