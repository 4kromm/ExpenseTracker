import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Login({ auth }: { auth: ReturnType<typeof useAuth> }) {
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!auth.hasPin) {
      if (pin.length < 4) {
        setError('PIN minimal 4 digit')
        return
      }
      if (pin !== confirmPin) {
        setError('Konfirmasi PIN tidak cocok')
        return
      }
      auth.setPin(pin)
      return
    }

    if (!auth.tryUnlock(pin)) {
      setError('PIN salah')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
      >
        <div>
          <h1 className="text-xl font-semibold">Expense Tracker</h1>
          <p className="text-sm text-slate-400 mt-1">
            {auth.hasPin ? 'Masukkan PIN untuk membuka' : 'Buat PIN untuk mengamankan data lokal kamu'}
          </p>
        </div>

        <input
          type="password"
          inputMode="numeric"
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
          autoFocus
        />

        {!auth.hasPin && (
          <input
            type="password"
            inputMode="numeric"
            placeholder="Konfirmasi PIN"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 outline-none focus:border-indigo-500"
          />
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition rounded-lg py-2 font-medium"
        >
          {auth.hasPin ? 'Buka' : 'Simpan & Lanjut'}
        </button>

        <p className="text-xs text-slate-500">
          PIN disimpan di localStorage browser ini saja — ini kunci lokal, bukan autentikasi server.
        </p>
      </form>
    </div>
  )
}
