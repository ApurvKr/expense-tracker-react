import { useMemo } from "react";

function SpendingBreakdown({ transactions }) {
  const categoryTotals = useMemo(() => {
    const totals = {};

    transactions
      .filter((transaction) => transaction.type === "expense")
      .forEach((transaction) => {
        if (!totals[transaction.category]) {
          totals[transaction.category] = 0;
        }

        totals[transaction.category] += transaction.amount;
      });

    return Object.entries(totals).sort(
      ([, amountA], [, amountB]) => amountB - amountA
    );
  }, [transactions]);

  const totalExpense = categoryTotals.reduce(
    (total, [, amount]) => total + amount,
    0
  );

  return (
    <section className="mb-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Overview
        </p>

        <h2 className="mt-1 text-xl font-bold text-zinc-900">
          Spending Breakdown
        </h2>
      </div>

      {categoryTotals.length === 0 ? (
        <div className="py-8 text-center">
          <p className="font-semibold text-zinc-900">
            No expenses yet
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Your spending breakdown will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {categoryTotals.map(([category, amount]) => {
            const percentage =
              totalExpense > 0
                ? (amount / totalExpense) * 100
                : 0;

            return (
              <div key={category}>

                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="font-medium capitalize text-zinc-900">
                    {category}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">
                      {Math.round(percentage)}%
                    </span>

                    <span className="font-semibold text-zinc-900">
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                  <div
                    className="h-full rounded-full bg-zinc-900 transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}

export default SpendingBreakdown;