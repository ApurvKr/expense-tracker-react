import { useState } from "react";

function TransactionRow({
  transaction,
  isEditing,
  onDelete,
  onEdit,
  onUpdate,
}) {
  const [editData, setEditData] = useState(transaction);

  function handleChange(event) {
    const { name, value } = event.target;

    setEditData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handleSave() {
    if (
      editData.description.trim() === "" ||
      editData.category === "" ||
      editData.paymentMethod === "" ||
      Number(editData.amount) <= 0
    ) {
      alert("Please enter valid transaction details.");
      return;
    }

    onUpdate({
      ...editData,
      description: editData.description.trim(),
      amount: Number(editData.amount),
    });
  }

  if (isEditing) {
    return (
      <tr className="border-b bg-stone-50">

        {/* Description */}
        <td className="px-5 py-3">
          <input
            name="description"
            value={editData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </td>

        {/* Category */}
        <td className="px-5 py-3">
          <select
            name="category"
            value={editData.category}
            onChange={handleChange}
            className="rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="food">Food</option>
            <option value="bills">Bills</option>
            <option value="shopping">Shopping</option>
            <option value="salary">Salary</option>
            <option value="bonus">Bonus</option>
            <option value="other">Other</option>
          </select>
        </td>

        {/* Payment */}
        <td className="px-5 py-3">
          <select
            name="paymentMethod"
            value={editData.paymentMethod || ""}
            onChange={handleChange}
            className="whitespace-nowrap rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Select</option>
            <option value="upi">UPI</option>
            <option value="cash">Cash</option>
            <option value="debit-card">Debit Card</option>
            <option value="credit-card">Credit Card</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
        </td>

        {/* Type */}
        <td className="whitespace-nowrap px-5 py-3">
          <select
            name="type"
            value={editData.type}
            onChange={handleChange}
            className="w-full whitespace-nowrap rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </td>

        {/* Amount */}
        <td className="px-5 py-3">
          <input
            name="amount"
            type="number"
            min="0"
            step="0.01"
            value={editData.amount}
            onChange={handleChange}
            className="w-28 rounded-lg border border-gray-300 px-3 py-2"
          />
        </td>

        {/* Date */}
        <td className="whitespace-nowrap px-5 py-3">
          {transaction.date}
        </td>

        {/* Actions */}
        <td className="whitespace-nowrap px-5 py-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="font-semibold text-green-700 hover:text-green-900"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => onUpdate(transaction)}
              className="text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          </div>
        </td>

      </tr>
    );
  }

  return (
    <tr className="border-b border-gray-100 transition hover:bg-gray-50">

      {/* Description */}
      <td className="px-5 py-4 font-medium text-zinc-900">
        {transaction.description}
      </td>

      {/* Category */}
      <td className="whitespace-nowrap px-5 py-4 capitalize text-gray-600">
        {transaction.category}
      </td>

      {/* Payment */}
      <td className="whitespace-nowrap px-5 py-4 capitalize text-gray-600">
        {transaction.paymentMethod
          ? transaction.paymentMethod.replace("-", " ")
          : "—"}
      </td>

      {/* Type */}
      <td className="whitespace-nowrap px-5 py-4 text-center">
        <span
          className={
            transaction.type === "income"
              ? "inline-flex whitespace-nowrap rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700"
              : "inline-flex whitespace-nowrap rounded-full bg-red-50 px-3 py-1 text-xs font-semibold capitalize text-red-700"
          }
        >
          {transaction.type}
        </span>
      </td>

      {/* Amount */}
      <td
        className={`whitespace-nowrap px-5 py-4 font-semibold ${
          transaction.type === "income"
            ? "text-green-700"
            : "text-red-700"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}₹
        {transaction.amount.toLocaleString("en-IN")}
      </td>

      {/* Date */}
      <td className="whitespace-nowrap px-5 py-4 text-gray-500">
        {transaction.date}
      </td>

      {/* Actions */}
      <td className="whitespace-nowrap px-5 py-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onEdit(transaction)}
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm("Delete this transaction?")) {
                onDelete(transaction.id);
              }
            }}
            className="text-sm font-medium text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </td>

    </tr>
  );
}

export default TransactionRow;