export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

export function validateRegisterForm({ name, email, password }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Enter your name.';
  if (!validateEmail(email)) errors.email = 'Enter a valid email.';
  if (!password || password.length < 8) errors.password = 'Use at least 8 characters.';
  return errors;
}

export function validateLoginForm({ email, password }) {
  const errors = {};
  if (!validateEmail(email)) errors.email = 'Enter a valid email.';
  if (!password) errors.password = 'Password is required.';
  return errors;
}
