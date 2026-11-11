import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

export default function Navbar() {
  const { isAuthenticated, signOut, user } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="7" fill="none" stroke="#F2EFE9" strokeWidth="2" />
            <circle cx="16" cy="16" r="2.5" fill="#B5ABA0" />
          </svg>
          ContribMap
        </NavLink>
        <nav className="nav-links">
          {isAuthenticated ? (
            <>
              <NavLink to="/discover">Discover</NavLink>
              <NavLink to="/saved">Saved</NavLink>
              <NavLink to="/profile">{user?.name || 'Profile'}</NavLink>
              <button className="btn btn-accent" type="button" onClick={signOut}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Sign in</NavLink>
              <NavLink to="/register" className="btn btn-accent">
                Create account
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
