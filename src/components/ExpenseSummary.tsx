import { Expense } from '../types'

const formatRupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function ExpenseSummary({ expenses }: { expenses: Expense[] }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount
    return acc
  }, {})

  const sorted = Object.entries(byCategory).sort((a, b) => b[1] - a[1])

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
      <div>
        <p className="text-sm text-slate-400">Total Pengeluaran</p>
        <p className="text-2xl font-bold">{formatRupiah(total)}</p>
      </div>

      {sorted.length > 0 && (
        <div className="space-y-2">
          {sorted.map(([cat, amount]) => {
            const pct = total > 0 ? Math.round((amount / total) * 100) : 0
            return (
              <div key={cat}>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>{cat}</span>
                  <span>{formatRupiah(amount)} ({pct}%)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
