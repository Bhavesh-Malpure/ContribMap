import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { validateRegisterForm } from '../utils/validators.js';

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateRegisterForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitting(true);
    setServerError('');
    try {
      await signUp(form);
      navigate('/profile/setup');
    } catch (error) {
      setServerError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Create account</h1>
        <ErrorMessage message={serverError} />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        {errors.name ? <p className="alert error">{errors.name}</p> : null}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        {errors.email ? <p className="alert error">{errors.email}</p> : null}
        <label htmlFor="password">Password</label>
        <div style={{ position: 'relative' }}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            style={{ marginBottom: 0, paddingRight: '5.5rem' }}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-slate)',
              fontSize: '0.82rem',
              fontWeight: 600,
              padding: '0.2rem 0.4rem',
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password ? <p className="alert error" style={{ marginTop: '0.5rem' }}>{errors.password}</p> : null}
        <button className="btn btn-primary" type="submit" disabled={submitting} style={{ marginTop: '1rem' }}>
          {submitting ? 'Creating…' : 'Register'}
        </button>
        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}