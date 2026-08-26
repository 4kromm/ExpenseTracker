import { Expense } from '../types'

export function exportToCsv(expenses: Expense[]) {
  const header = ['Judul', 'Jumlah', 'Kategori', 'Tanggal', 'Catatan']
  const rows = expenses.map((e) => [
    e.title,
    e.amount.toString(),
    e.category,
    e.date,
    e.note ?? '',
  ])

  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`
  const csv = [header, ...rows].map((row) => row.map(escape).join(',')).join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
