const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/transactions.json");

// GET all transactions
const getTransactions = (req, res) => {
  const transactions = JSON.parse(fs.readFileSync(filePath));

  res.json(transactions);
};

// POST new transaction
const addTransaction = (req, res) => {
  const transactions = JSON.parse(fs.readFileSync(filePath));

  const newTransaction = {
    id: Date.now(),
    title: req.body.title,
    amount: req.body.amount,
    type: req.body.type,
  };

  transactions.push(newTransaction);

  fs.writeFileSync(
    filePath,
    JSON.stringify(transactions, null, 2)
  );

  res.status(201).json(newTransaction);
};
const updateTransaction = (req, res) => {
  const transactions = JSON.parse(fs.readFileSync(filePath));

  const id = Number(req.params.id);

  const updatedTransactions = transactions.map((transaction) => {
    if (transaction.id === id) {
      return {
        ...transaction,
        title: req.body.title,
        amount: req.body.amount,
        type: req.body.type,
      };
    }
    return transaction;
  });

  fs.writeFileSync(filePath, JSON.stringify(updatedTransactions, null, 2));

  res.json({
    message: "Transaction updated successfully",
  });
};
const deleteTransaction = (req, res) => {
  const transactions = JSON.parse(fs.readFileSync(filePath));

  const id = Number(req.params.id);

  const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(updatedTransactions, null, 2));

  res.json({
    message: "Transaction deleted successfully",
  });
};
module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};