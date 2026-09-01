import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function Login() {
  const { signIn } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      await signIn({ email, password })
      showToast('Welcome back!')
      const redirectTo = location.state?.from || '/home'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-lg font-extrabold text-ink-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              N
            </span>
            Neighbourhood
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-ink-900">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-500">Log in to keep exploring your neighbourhood.</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6" noValidate>
          {formError && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {formError}
            </div>
          )}

          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input ${errors.email ? 'input-error' : ''}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div>
            <label className="label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input ${errors.password ? 'input-error' : ''}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-primary-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
