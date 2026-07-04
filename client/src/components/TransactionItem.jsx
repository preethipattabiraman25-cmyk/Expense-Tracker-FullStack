function TransactionItem({
  id,
  title,
  amount,
  type,
  transaction,
  editTransaction,
  deleteTransaction,
}) {
  return (
    <div className="transaction-item">
      <div>
        <h4>{title}</h4>
        <p>{type}</p>
      </div>

      <strong>₹{amount}</strong>

      <div>
        <button onClick={() => editTransaction(transaction)}>
          ✏️ Edit
        </button>

        <button onClick={() => deleteTransaction(id)}>
          ❌ Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionItem;