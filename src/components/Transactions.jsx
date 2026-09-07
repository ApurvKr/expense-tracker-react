import { useMemo, useState } from "react";
import TransactionRow from "./TransactionRow";

function Transactions({
  transactions,
  editingId,
  onDelete,
  onEdit,
  onUpdate,
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" ||
        transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        transaction.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, search, typeFilter, categoryFilter]);

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-100 p-6 sm:p-8">

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              History
            </p>

            <h2 className="mt-1 text-xl font-bold text-zinc-900">
              Transactions
            </h2>
          </div>

          <span className="w-fit rounded-full bg-stone-100 px-3 py-1 text-sm text-gray-500">
            {transactions.length}{" "}
            {transactions.length === 1
              ? "entry"
              : "entries"}
          </span>

        </div>

        {transactions.length > 0 && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search transactions..."
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
            />

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
            >
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
            >
              <option value="all">All categories</option>
              <option value="food">Food</option>
              <option value="bills">Bills</option>
              <option value="shopping">Shopping</option>
              <option value="salary">Salary</option>
              <option value="bonus">Bonus</option>
              <option value="other">Other</option>
            </select>

          </div>
        )}

      </div>

      {transactions.length === 0 ? (
        <div className="px-6 py-16 text-center sm:px-8">
          <p className="text-lg font-semibold text-zinc-900">
            No transactions yet
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Add your first income or expense above.
          </p>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="px-6 py-12 text-center sm:px-8">
          <p className="font-semibold text-zinc-900">
            No matching transactions
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-stone-100 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  isEditing={editingId === transaction.id}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onUpdate={onUpdate}
                />
              ))}
            </tbody>

          </table>

        </div>
      )}

    </section>
  );
}

export default Transactions;