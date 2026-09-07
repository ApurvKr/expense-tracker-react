function BudgetForm({ onSubmit, budget }) {
  return (
    <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Monthly Budget
        </p>

        <h2 className="mt-1 text-xl font-bold text-zinc-900">
          {budget > 0 ? "Update your spending limit" : "Set your spending limit"}
        </h2>
      </div>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="number"
          name="budget"
          min="1"
          step="0.01"
          defaultValue={budget || ""}
          placeholder="Enter your budget"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
        />

        <button
          type="submit"
          className="rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          {budget > 0 ? "Update Budget" : "Set Budget"}
        </button>
      </form>

    </section>
  );
}

export default BudgetForm;