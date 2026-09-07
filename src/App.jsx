import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import BudgetForm from "./components/BudgetForm";
import EntryForm from "./components/EntryForm";
import Transactions from "./components/Transactions";

function App() {
  const [budget, setBudget] = useState(() => {
    return Number(localStorage.getItem("expense-budget")) || 0;
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("expense-transactions");

    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [editingId, setEditingId] = useState(null);

  const [showBudgetForm, setShowBudgetForm] = useState(() => {
    return budget === 0;
  });

  useEffect(() => {
    localStorage.setItem("expense-budget", budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem(
      "expense-transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  function handleBudgetSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const amount = Number(formData.get("budget"));

    if (amount > 0) {
      setBudget(amount);
      setShowBudgetForm(false);
      event.target.reset();
    }
  }

  function handleAddTransactions(entryRows) {
    const newTransactions = entryRows
      .filter(
        (row) =>
          row.description.trim() !== "" &&
          row.category !== "" &&
          Number(row.amount) > 0
      )
      .map((row) => ({
        id: crypto.randomUUID(),
        type: row.type,
        description: row.description.trim(),
        category: row.category,
        amount: Number(row.amount),
        date: new Date().toLocaleDateString(),
      }));

    if (newTransactions.length === 0) {
      return;
    }

    setTransactions((currentTransactions) => [
      ...currentTransactions,
      ...newTransactions,
    ]);
  }

  function handleDeleteTransaction(id) {
    setTransactions((currentTransactions) =>
      currentTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  }

  function handleEditTransaction(transaction) {
    setEditingId(transaction.id);
  }

  function handleUpdateTransaction(updatedTransaction) {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingId(null);
  }

  const totalIncome = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [transactions]);

  const currentBalance = budget + totalIncome - totalExpense;

  const budgetLeft = budget - totalExpense;

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

        <Header />

        <SummaryCard
          balance={currentBalance}
          income={totalIncome}
          expense={totalExpense}
          budget={budget}
          budgetLeft={budgetLeft}
          onBudgetClick={() =>
            setShowBudgetForm((current) => !current)
          }
        />

        {showBudgetForm && (
          <BudgetForm
            budget={budget}
            onSubmit={handleBudgetSubmit}
          />
        )}

        <EntryForm
          onAddTransactions={handleAddTransactions}
        />

        <Transactions
          transactions={transactions}
          editingId={editingId}
          onDelete={handleDeleteTransaction}
          onEdit={handleEditTransaction}
          onUpdate={handleUpdateTransaction}
        />

      </main>
    </div>
  );
}

export default App;