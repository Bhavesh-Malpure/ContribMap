import { useEffect, useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import Loader from '../components/common/Loader.jsx';
import IssueFilters from '../components/issues/IssueFilters.jsx';
import IssueList from '../components/issues/IssueList.jsx';
import IssueSearch from '../components/issues/IssueSearch.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useIssues } from '../hooks/useIssues.js';
import { createBookmark, listBookmarks } from '../services/bookmarkService.js';
import { getProfile } from '../services/profileService.js';

export default function DiscoverIssues() {
  const { token, user } = useAuth();
  const { issues, meta, loading, error, search } = useIssues();
  const [filters, setFilters] = useState({
    skill: '',
    language: '',
    sort: 'best',
    beginnerOnly: true,
  });
  const [profileSkills, setProfileSkills] = useState(user?.skills || []);
  const [bookmarkedUrls, setBookmarkedUrls] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    getProfile(token)
      .then((profile) => setProfileSkills(profile.skills || []))
      .catch(() => {});
    listBookmarks(token)
      .then((result) => setBookmarkedUrls((result.items || []).map((item) => item.issue.htmlUrl)))
      .catch(() => {});
  }, [token]);

  function runSearch() {
    search({
      skills: filters.skill ? [filters.skill] : profileSkills,
      language: filters.language,
      sort: filters.sort,
      beginnerOnly: filters.beginnerOnly,
      page: 1,
    });
  }

  useEffect(() => {
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleBookmark(issue) {
    setNotice('');
    try {
      await createBookmark(token, issue);
      setBookmarkedUrls((current) => [...current, issue.htmlUrl]);
      setNotice('Issue bookmarked. Track it from Saved Issues.');
    } catch (err) {
      setNotice(err.message);
    }
  }

  return (
    <div className="page">
      <h1>Discover issues</h1>
      <p>Ranked open GitHub issues based on your skills and a transparent match score.</p>
      <IssueFilters filters={filters} onChange={setFilters} skills={profileSkills} />
      <IssueSearch onSubmit={runSearch} loading={loading} />
      {notice ? <div className="alert">{notice}</div> : null}
      <ErrorMessage message={error} />
     {meta.total > 0 ? (
  <div className="results-badge">
    <span className="results-count">{meta.total}</span>
    <span className="results-label">GitHub matches found</span>
  </div>
) : null}
      {loading ? <Loader label="Searching GitHub" /> : <IssueList issues={issues} onBookmark={handleBookmark} bookmarkedUrls={bookmarkedUrls} />}
    </div>
  );
}
