import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import BudgetForm from "./components/BudgetForm";
import EntryForm from "./components/EntryForm";
import Transactions from "./components/Transactions";

import SpendingBreakdown from "./components/SpendingBreakdown";

function getCurrentMonth() {
  const date = new Date();

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;
}

function App() {
  const [selectedMonth, setSelectedMonth] = useState(
    getCurrentMonth()
  );

  const [budgets, setBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem("expense-budgets");

    if (savedBudgets) {
      return JSON.parse(savedBudgets);
    }

    // Convert the old single budget into the current month
    const oldBudget =
      Number(localStorage.getItem("expense-budget")) || 0;

    return oldBudget
      ? {
          [getCurrentMonth()]: oldBudget,
        }
      : {};
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(
      "expense-transactions"
    );

    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [editingId, setEditingId] = useState(null);

  const budget = budgets[selectedMonth] || 0;

  const [showBudgetForm, setShowBudgetForm] = useState(() => {
    return budget === 0;
  });

  useEffect(() => {
    localStorage.setItem(
      "expense-budgets",
      JSON.stringify(budgets)
    );
  }, [budgets]);

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
      setBudgets((currentBudgets) => ({
        ...currentBudgets,
        [selectedMonth]: amount,
      }));

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
        paymentMethod: row.paymentMethod,
        amount: Number(row.amount),
        date: new Date().toLocaleDateString(),
        month: selectedMonth,
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

  const monthlyTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) =>
        transaction.month === selectedMonth
    );
  }, [transactions, selectedMonth]);

  const totalIncome = useMemo(() => {
    return monthlyTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
  }, [monthlyTransactions]);

  const totalExpense = useMemo(() => {
    return monthlyTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
  }, [monthlyTransactions]);

  const currentBalance =
    budget + totalIncome - totalExpense;

  const budgetLeft = budget - totalExpense;

  function changeMonth(amount) {
    const [year, month] = selectedMonth
      .split("-")
      .map(Number);

    const date = new Date(year, month - 1 + amount, 1);

    const newMonth = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    setSelectedMonth(newMonth);

    setEditingId(null);

    const newBudget = budgets[newMonth] || 0;
    setShowBudgetForm(newBudget === 0);
  }

  function formatMonth(monthString) {
    const [year, month] = monthString
      .split("-")
      .map(Number);

    return new Date(year, month - 1, 1).toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">

        <Header />

        {/* Month Selector */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-lg transition hover:bg-gray-100"
            aria-label="Previous month"
          >
            ←
          </button>

          <h2 className="min-w-44 text-center text-lg font-bold text-zinc-900">
            {formatMonth(selectedMonth)}
          </h2>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-lg transition hover:bg-gray-100"
            aria-label="Next month"
          >
            →
          </button>
        </div>

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
          transactions={monthlyTransactions}
          editingId={editingId}
          onDelete={handleDeleteTransaction}
          onEdit={handleEditTransaction}
          onUpdate={handleUpdateTransaction}
        />

        <SpendingBreakdown
          transactions={monthlyTransactions}
        />

      </main>
    </div>
  );
}

export default App;