import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import Loader from '../components/common/Loader.jsx';
import IssueCard from '../components/issues/IssueCard.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { getGitHubIssue } from '../services/issueService.js';
import { createBookmark } from '../services/bookmarkService.js';

export default function IssueDetails() {
  const { owner, repo, number } = useParams();
  const { token } = useAuth();
  const [issue, setIssue] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getGitHubIssue(token, owner, repo, number)
      .then(setIssue)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token, owner, repo, number]);

  async function handleBookmark(current) {
    try {
      await createBookmark(token, current);
      setNotice('Bookmarked. Open Saved Issues to update status.');
    } catch (err) {
      setNotice(err.message);
    }
  }

  return (
    <div className="page">
      <h1>Issue details</h1>
      <ErrorMessage message={error} />
      {notice ? <div className="alert">{notice}</div> : null}
      {loading ? <Loader label="Loading issue" /> : issue ? <IssueCard issue={issue} onBookmark={handleBookmark} /> : null}
    </div>
  );
}
