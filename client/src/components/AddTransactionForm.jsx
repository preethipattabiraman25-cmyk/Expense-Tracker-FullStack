import { useState , useEffect } from "react";

function AddTransactionForm({ 
  addTransaction,
  updateTransaction,
  editingTransaction,
 }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  useEffect(() => {
  if (editingTransaction) {
    setTitle(editingTransaction.title);
    setAmount(editingTransaction.amount);
  }
}, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

   ;

    if (title.trim() === "" || amount.trim() === "") {
      alert("Please fill all fields");
      return;
    }
if (editingTransaction) {
    updateTransaction({
      ...editingTransaction,
      title,
      amount: Number(amount),
    });
  } else {
    addTransaction({
      id: Date.now(),
      title,
      amount: Number(amount),
      type: "Expense", // Change if you already have a type dropdown
    });
  }
   
    setTitle("");
    setAmount("");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    <button type="submit">
      {editingTransaction
      ? "Update Transaction"
       : "Add Transaction"}
    </button>
      
    </form>
  );
}

export default AddTransactionForm;