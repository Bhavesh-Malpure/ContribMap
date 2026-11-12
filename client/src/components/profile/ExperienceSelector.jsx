const LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export default function ExperienceSelector({ value, onChange }) {
  return (
    <div>
      <label htmlFor="experience">Experience level</label>
      <select id="experience" value={value} onChange={(event) => onChange(event.target.value)}>
        {LEVELS.map((level) => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
    </div>
  );
}
