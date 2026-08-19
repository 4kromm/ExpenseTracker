export type Category =
  | 'Makanan'
  | 'Transportasi'
  | 'Tagihan'
  | 'Hiburan'
  | 'Kesehatan'
  | 'Belanja'
  | 'Lainnya'

export interface Expense {
  id: string
  title: string
  amount: number
  category: Category
  date: string 
  note?: string
}

export const CATEGORIES: Category[] = [
  'Makanan',
  'Transportasi',
  'Tagihan',
  'Hiburan',
  'Kesehatan',
  'Belanja',
  'Lainnya',
]
