export default function IssueFilters({ filters, onChange, skills = [] }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className="panel" style={{ marginBottom: '1rem' }}>
      <h2>Search controls</h2>
      <div className="filters">
        <label>
          Skill
          <select value={filters.skill || ''} onChange={(event) => update('skill', event.target.value)}>
            <option value="">All selected skills</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </label>
        <label>
          Language
          <input
            value={filters.language}
            onChange={(event) => update('language', event.target.value)}
            placeholder="javascript"
          />
        </label>
        <label>
          Sort
          <select value={filters.sort} onChange={(event) => update('sort', event.target.value)}>
            <option value="best">Best match</option>
            <option value="newest">Newest</option>
          </select>
        </label>
        <label>
          Beginner-friendly
          <select
            value={String(filters.beginnerOnly)}
            onChange={(event) => update('beginnerOnly', event.target.value === 'true')}
          >
            <option value="false">Any open issue</option>
            <option value="true">good first issue</option>
          </select>
        </label>
      </div>
    </div>
  );
}
