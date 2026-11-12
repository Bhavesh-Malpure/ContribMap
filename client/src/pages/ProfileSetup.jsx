
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import ExperienceSelector from '../components/profile/ExperienceSelector.jsx';
import SkillSelector from '../components/profile/SkillSelector.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { getSkills, updateProfile } from '../services/profileService.js';

export default function ProfileSetup() {
  const { token, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [selected, setSelected] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSkills(token)
      .then((result) => setSkills(result.items || []))
      .catch((err) => setError(err.message));
  }, [token]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selected.length) {
      setError('Select at least one skill.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await updateProfile(token, { experienceLevel, skills: selected });
      await refreshProfile();
      navigate('/discover');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Profile setup</h1>
        <p className="muted">Tell ContribMap which skills to match against real GitHub issues.</p>
        <ErrorMessage message={error} />
        <ExperienceSelector value={experienceLevel} onChange={setExperienceLevel} />
        <SkillSelector skills={skills} selected={selected} onChange={setSelected} />
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save and discover issues'}
        </button>
      </form>
    </div>
  );
}
