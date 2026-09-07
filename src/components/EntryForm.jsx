import { useState } from "react";
import EntryRow from "./EntryRow";

function createEmptyRow(id) {
  return {
    id,
    type: "expense",
    description: "",
    category: "",
    amount: "",
  };
}

function EntryForm({ onAddTransactions }) {
  const [entryRows, setEntryRows] = useState([
    createEmptyRow(crypto.randomUUID()),
  ]);

  function handleEntryChange(id, field, value) {
    setEntryRows((currentRows) =>
      currentRows.map((row) =>
        row.id === id
          ? { ...row, [field]: value }
          : row
      )
    );
  }

  function handleAddRow() {
    setEntryRows((currentRows) => [
      ...currentRows,
      createEmptyRow(crypto.randomUUID()),
    ]);
  }

  function handleRemoveRow(id) {
    setEntryRows((currentRows) => {
      if (currentRows.length === 1) {
        return currentRows;
      }

      return currentRows.filter((row) => row.id !== id);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const hasInvalidRow = entryRows.some(
      (row) =>
        row.description.trim() === "" ||
        row.category === "" ||
        Number(row.amount) <= 0
    );

    if (hasInvalidRow) {
      alert("Please complete every entry before adding them.");
      return;
    }

    onAddTransactions(entryRows);

    setEntryRows([
      createEmptyRow(crypto.randomUUID()),
    ]);
  }

  return (
    <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Add Entries
          </p>

          <h2 className="mt-1 text-xl font-bold text-zinc-900">
            Record your income and expenses
          </h2>
        </div>

        <span className="w-fit rounded-full bg-stone-100 px-3 py-1 text-sm text-gray-500">
          {entryRows.length}{" "}
          {entryRows.length === 1 ? "row" : "rows"}
        </span>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="space-y-4">
          {entryRows.map((row) => (
            <EntryRow
              key={row.id}
              row={{
                ...row,
                isOnlyRow: entryRows.length === 1,
              }}
              onChange={handleEntryChange}
              onRemove={handleRemoveRow}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <button
            type="button"
            onClick={handleAddRow}
            className="rounded-xl border border-dashed border-gray-400 px-6 py-3 text-sm font-medium transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
          >
            + Add another row
          </button>

          <button
            type="submit"
            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Add all entries
          </button>

        </div>

      </form>

    </section>
  );
}

export default EntryForm;