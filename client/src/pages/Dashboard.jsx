import { useState,useEffect } from "react";
import SummaryCard from "../components/SummaryCard";
import TransactionItem from "../components/TransactionItem";
import AddTransactionForm from "../components/AddTransactionForm";
import PieChart from"../charts/PieChart";

function Dashboard() {
 const[transactions,setTransactions]=useState([]);
 const[loading,setLoading]=useState(true);
const[search,setSearch]=useState("");
const[filter,setFilter]=useState("All");
const[editingTransaction,setEditingTransaction]=useState(null);
const income = transactions
  .filter((transaction) => transaction.type === "Income")
  .reduce((total, transaction) => total + transaction.amount, 0);

const expense = transactions
  .filter((transaction) => transaction.type === "Expense")
  .reduce((total, transaction) => total + transaction.amount, 0);

const balance = income - expense;
const filteredTransactions = transactions.filter((transaction) => {
  const matchesSearch = transaction.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesFilter =
    filter === "All" || transaction.type === filter;

  return matchesSearch && matchesFilter;
});

useEffect(() => {
  fetch("http://localhost:5000/api/transactions")
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        setTransactions(data);
        setLoading(false);
      }, 1000);
    })
    .catch((error) => {
      console.error("Error loading transactions:", error);
      setLoading(false);
    });
}, []);
  const addTransaction = async (newTransaction) => {
  try {
    const response = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    });

    const data = await response.json();

    setTransactions([...transactions, data]);
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
};
const deleteTransaction = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/transactions/${id}`, {
      method: "DELETE",
    });

    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};
const updateTransaction = async (updatedTransaction) => {
  try {
    await fetch(
      `http://localhost:5000/api/transactions/${updatedTransaction.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTransaction),
      }
    );

    setTransactions(
      transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingTransaction(null);
  } catch (error) {
    console.error("Error updating transaction:", error);
  }
};
const editTransaction = (transaction) => {
  setEditingTransaction(transaction);
};

if (loading){
  return<h2>Loading...</h2>;
}

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="cards">
       <SummaryCard title="💰 Balance" amount={`₹${balance}`} />
      <SummaryCard title="🟢 Income" amount={`₹${income}`} />
      <SummaryCard title="🔴 Expense" amount={`₹${expense}`} />
      </div>
      <h2>Expense Analysis</h2>

<PieChart
  income={income}
  expense={expense}
/>
      <h2>Recent Transactions</h2>
      <input
  type="text"
  placeholder="🔍 Search transaction..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
<select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <option value="All">All</option>
  <option value="Income">Income</option>
  <option value="Expense">Expense</option>
</select>

    <div className="transactions">
  {filteredTransactions.length === 0 ? (
    <div className="empty-state">
      <h2>📭 No Transactions Yet</h2>
      <p>Add your first transaction to get started.</p>
    </div>
  ) : (
    filteredTransactions.map((transaction) => (
      <TransactionItem
        key={transaction.id}
        id={transaction.id}
        title={transaction.title}
        amount={transaction.amount}
        type={transaction.type}
        transaction={transaction}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
    ))
  )}
</div>

      <AddTransactionForm  
         addTransaction={addTransaction}
         updateTransaction={updateTransaction}
         editingTransaction={editingTransaction}
         />

    </div>
  );
}

export default Dashboard;