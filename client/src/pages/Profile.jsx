import { useEffect, useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import ExperienceSelector from '../components/profile/ExperienceSelector.jsx';
import SkillSelector from '../components/profile/SkillSelector.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { getProfile, getSkills, updateProfile } from '../services/profileService.js';

export default function Profile() {
  const { token, user, refreshProfile } = useAuth();
  const [skills, setSkills] = useState([]);
  const [selected, setSelected] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('beginner');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([getSkills(token), getProfile(token)])
      .then(([skillResult, profile]) => {
        setSkills(skillResult.items || []);
        setSelected(profile.skills || []);
        setExperienceLevel(profile.experienceLevel || 'beginner');
      })
      .catch((err) => setError(err.message));
  }, [token]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');
    try {
      await updateProfile(token, { name: user?.name, experienceLevel, skills: selected });
      await refreshProfile();
      setNotice('Profile saved.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Profile</h1>
        <p className="muted">{user?.email}</p>
        <ErrorMessage message={error} />
        {notice ? <div className="alert">{notice}</div> : null}
        <ExperienceSelector value={experienceLevel} onChange={setExperienceLevel} />
        <SkillSelector skills={skills} selected={selected} onChange={setSelected} />
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Update profile'}
        </button>
      </form>
    </div>
  );
}
