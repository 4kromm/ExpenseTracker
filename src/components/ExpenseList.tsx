import { Expense } from '../types'

interface Props {
  expenses: Expense[]
  onDelete: (id: string) => void
}

const formatRupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return <p className="text-slate-500 text-sm text-center py-8">Belum ada pengeluaran.</p>
  }

  return (
    <ul className="divide-y divide-slate-800">
      {expenses.map((exp) => (
        <li key={exp.id} className="py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-medium truncate">{exp.title}</p>
            <p className="text-xs text-slate-500">
              {exp.category} · {new Date(exp.date).toLocaleDateString('id-ID')}
              {exp.note ? ` · ${exp.note}` : ''}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-semibold text-red-400">{formatRupiah(exp.amount)}</span>
            <button
              onClick={() => onDelete(exp.id)}
              className="text-slate-500 hover:text-red-400 transition text-sm"
              aria-label="Hapus"
            >
              Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
