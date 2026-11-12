export default function SkillSelector({ skills, selected, onChange }) {
  function toggle(name) {
    if (selected.includes(name)) {
      onChange(selected.filter((skill) => skill !== name));
    } else {
      onChange([...selected, name]);
    }
  }

  return (
    <div>
      <label>Skills</label>
      <div className="chip-group">
        {skills.map((skill) => {
          const name = skill.name || skill;
          return (
            <button
              key={name}
              type="button"
              className={`chip ${selected.includes(name) ? 'selected' : ''}`}
              onClick={() => toggle(name)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
