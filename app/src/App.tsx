import { useState } from 'react'

const API_URL = 'http://127.0.0.1:8000/login'

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; message: string }
  | { kind: 'denied'; message: string }
  | { kind: 'error'; message: string }

function App() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus({ kind: 'loading' })

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, contraseña: password }),
      })
      const data = await res.json()

      if (data.mensaje === 'Login Exitoso') {
        setStatus({ kind: 'success', message: data.mensaje })
      } else {
        setStatus({ kind: 'denied', message: data.mensaje ?? 'Acceso denegado' })
      }
    } catch {
      setStatus({
        kind: 'error',
        message: 'No se pudo conectar con la API. ¿Está corriendo en http://127.0.0.1:8000?',
      })
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fff8f5] px-6 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#f55c7a] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#f6bc66] opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-10 h-56 w-56 rounded-full bg-[#f68c70] opacity-20 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="rounded-[28px] border border-white bg-white/80 p-8 shadow-xl shadow-[#f68c70]/20 backdrop-blur-sm">
          <header className="mb-8 text-center">
            <h1
              className="bg-clip-text text-3xl font-bold tracking-tight text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #f55c7a, #f68c70, #f6bc66)',
              }}
            >
              FastAPI.login
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Ingresá tus credenciales para probar el endpoint <code className="font-mono text-slate-600">/login</code>.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">Usuario</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                placeholder="Katty"
                className="w-full rounded-2xl border-2 border-transparent bg-[#fff1ec] px-4 py-2.5 text-slate-800 outline-none transition focus:border-[#f68c70] focus:bg-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••"
                className="w-full rounded-2xl border-2 border-transparent bg-[#fff1ec] px-4 py-2.5 text-slate-800 outline-none transition focus:border-[#f68c70] focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={status.kind === 'loading'}
              className="w-full rounded-full py-2.5 font-semibold text-white shadow-lg shadow-[#f68c70]/40 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundImage: 'linear-gradient(90deg, #f55c7a, #f68c70, #f6ac69)',
              }}
            >
              {status.kind === 'loading' ? 'Entrando…' : 'Iniciar sesión'}
            </button>
          </form>

          {status.kind === 'success' && (
            <div className="mt-5 rounded-2xl border border-[#f6bc66]/50 bg-[#f6bc66]/15 px-4 py-3 text-center text-sm font-medium text-[#b5791f]">
              {status.message}
            </div>
          )}
          {status.kind === 'denied' && (
            <div className="mt-5 rounded-2xl border border-[#f55c7a]/40 bg-[#f55c7a]/10 px-4 py-3 text-center text-sm font-medium text-[#d1355a]">
              {status.message}
            </div>
          )}
          {status.kind === 'error' && (
            <div className="mt-5 rounded-2xl border border-slate-300 bg-slate-100 px-4 py-3 text-center text-sm font-medium text-slate-600">
              {status.message}
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Backend original en <code className="font-mono text-slate-500">../main.py</code>.
        </p>
      </div>
    </div>
  )
}

export default App
