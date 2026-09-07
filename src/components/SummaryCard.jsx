function SummaryCard({
  balance,
  income,
  expense,
  budget,
  budgetLeft,
  onBudgetClick,
}) {
  const spentPercentage =
    budget > 0 ? Math.min((expense / budget) * 100, 100) : 0;

  const isOverBudget = budget > 0 && expense > budget;

  return (
    <section className="mb-8 rounded-3xl bg-zinc-900 p-6 text-white shadow-sm sm:p-8">

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-gray-400">
            Current Balance
          </p>

          <h2 className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl">
            ₹{balance.toLocaleString("en-IN")}
          </h2>
        </div>

        <button
          type="button"
          onClick={onBudgetClick}
          className="rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          {budget > 0 ? "Budget ⚙" : "Set Budget"}
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 sm:max-w-2xl sm:grid-cols-3 sm:gap-12">

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-400">
            Budget Left
          </p>

          <h3
            className={`mt-1 text-2xl font-bold sm:text-3xl ${
              isOverBudget ? "text-red-400" : "text-white"
            }`}
          >
            {isOverBudget ? "-" : ""}₹
            {Math.abs(budgetLeft).toLocaleString("en-IN")}
          </h3>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-green-400">
            Income
          </p>

          <h3 className="mt-1 text-2xl font-bold sm:text-3xl">
            ₹{income.toLocaleString("en-IN")}
          </h3>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-red-400">
            Expenses
          </p>

          <h3 className="mt-1 text-2xl font-bold sm:text-3xl">
            ₹{expense.toLocaleString("en-IN")}
          </h3>
        </div>

      </div>

      {budget > 0 && (
        <div className="mt-8">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-400">
              Budget usage
            </span>

            <span
              className={
                isOverBudget
                  ? "font-medium text-red-400"
                  : "text-gray-300"
              }
            >
              {isOverBudget
                ? "Over budget"
                : `${Math.round(spentPercentage)}% used`}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all ${
                isOverBudget ? "bg-red-500" : "bg-white"
              }`}
              style={{ width: `${spentPercentage}%` }}
            />
          </div>
        </div>
      )}

    </section>
  );
}

export default SummaryCard;