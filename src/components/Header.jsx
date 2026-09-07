function Header() {
  return (
    <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Personal Finance
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Expense Tracker
        </h1>
      </div>

      <p className="text-sm text-gray-500">
        Track your money with clarity.
      </p>
    </header>
  );
}

export default Header;