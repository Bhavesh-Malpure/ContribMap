export default function Loader({ label = 'Loading' }) {
  return (
    <div role="status" aria-live="polite">
      <div className="loader" />
      <p className="empty">{label}…</p>
    </div>
  );
}
