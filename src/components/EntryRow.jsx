function EntryRow({ row, onChange, onRemove }) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-100 bg-stone-50 p-4 md:grid-cols-12 md:items-end md:border-0 md:bg-transparent md:p-0">

      {/* Type */}
      <div className="flex flex-col md:col-span-2">
        <label className="mb-2 text-xs font-semibold tracking-wide text-gray-400">
          TYPE
        </label>

        <select
          value={row.type}
          onChange={(event) =>
            onChange(row.id, "type", event.target.value)
          }
          className="rounded-xl border border-gray-300 bg-white px-3 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      {/* Description */}
      <div className="flex flex-col md:col-span-3">
        <label className="mb-2 text-xs font-semibold tracking-wide text-gray-400">
          DESCRIPTION
        </label>

        <input
          type="text"
          value={row.description}
          onChange={(event) =>
            onChange(row.id, "description", event.target.value)
          }
          placeholder="What was this for?"
          className="rounded-xl border border-gray-300 bg-white px-3 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* Category */}
      <div className="flex min-w-0 flex-col md:col-span-2">
        <label className="mb-2 text-xs font-semibold tracking-wide text-gray-400">
          CATEGORY
        </label>

        <select
          value={row.type}
          onChange={(event) =>
            onChange(row.id, "type", event.target.value)
          }
          className="rounded-xl border border-gray-300 bg-white px-3 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
        >
          <option value="">Select</option>
          <option value="food">Food</option>
          <option value="bills">Bills</option>
          <option value="shopping">Shopping</option>
          <option value="salary">Salary</option>
          <option value="bonus">Bonus</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Payment Method */}
      <div className="flex flex-col md:col-span-2">
        <label className="mb-2 text-xs font-semibold tracking-wide text-gray-400">
          PAYMENT
        </label>

        <select
          value={row.paymentMethod}
          onChange={(event) =>
            onChange(
              row.id,
              "paymentMethod",
              event.target.value
            )
          }
          className="rounded-xl border border-gray-300 bg-white px-3 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
        >
          <option value="">Select</option>
          <option value="upi">UPI</option>
          <option value="cash">Cash</option>
          <option value="debit-card">Debit Card</option>
          <option value="credit-card">Credit Card</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>

      {/* Amount */}
      <div className="flex flex-col md:col-span-2">
        <label className="mb-2 text-xs font-semibold tracking-wide text-gray-400">
          AMOUNT
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={row.amount}
          onChange={(event) =>
            onChange(row.id, "amount", event.target.value)
          }
          placeholder="0.00"
          className="rounded-xl border border-gray-300 bg-white px-3 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* Remove */}
      <div className="flex items-end justify-start md:col-span-1 md:justify-center">
        <button
          type="button"
          onClick={() => onRemove(row.id)}
          disabled={row.isOnlyRow}
          aria-label="Remove entry"
          className="rounded-lg px-3 py-2 text-xl text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ×
        </button>
      </div>

    </div>
  );
}

export default EntryRow;