import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function Signup() {
  const { signUp } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    neighbourhood: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required.'
    if (!form.neighbourhood.trim()) next.neighbourhood = 'Neighbourhood is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Password is required.'
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      await signUp(form)
      showToast('Account created — welcome to Neighbourhood!')
      navigate('/home', { replace: true })
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
          <h1 className="mt-6 text-2xl font-bold text-ink-900">Create your account</h1>
          <p className="mt-1 text-sm text-ink-500">Find and save the best places near you.</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6" noValidate>
          {formError && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {formError}
            </div>
          )}

          <div>
            <label className="label" htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              className={`input ${errors.fullName ? 'input-error' : ''}`}
              placeholder="Priya Shah"
            />
            {errors.fullName && <p className="field-error">{errors.fullName}</p>}
          </div>

          <div>
            <label className="label" htmlFor="neighbourhood">Neighbourhood</label>
            <input
              id="neighbourhood"
              type="text"
              value={form.neighbourhood}
              onChange={(e) => update('neighbourhood', e.target.value)}
              className={`input ${errors.neighbourhood ? 'input-error' : ''}`}
              placeholder="Andheri West, Mumbai"
            />
            {errors.neighbourhood && <p className="field-error">{errors.neighbourhood}</p>}
          </div>

          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
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
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              className={`input ${errors.password ? 'input-error' : ''}`}
              placeholder="At least 6 characters"
            />
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
