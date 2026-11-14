export default function IssueSearch({ onSubmit, loading }) {
  return (
    <div className="btn-row" style={{ marginBottom: '1rem' }}>
      <button className="btn btn-primary" type="button" onClick={onSubmit} disabled={loading}>
        {loading ? 'Searching…' : 'Search GitHub issues'}
      </button>
    </div>
  );
}

