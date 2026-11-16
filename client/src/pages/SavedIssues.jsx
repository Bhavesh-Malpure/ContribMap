import { useEffect, useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage.jsx';
import Loader from '../components/common/Loader.jsx';
import IssueCard from '../components/issues/IssueCard.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { deleteBookmark, listBookmarks, updateBookmark } from '../services/bookmarkService.js';

export default function SavedIssues() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const result = await listBookmarks(token);
      setItems(result.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [token]);

  async function changeStatus(id, status) {
    await updateBookmark(token, id, status);
    setItems((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  async function remove(id) {
    await deleteBookmark(token, id);
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="page">
      <h1>Saved issues</h1>
      <p>Personal tracking only. Bookmarking is not an official GitHub application.</p>
      <ErrorMessage message={error} />
      {loading ? (
        <Loader label="Loading bookmarks" />
      ) : items.length === 0 ? (
        <p className="empty">No bookmarks yet. Discover issues and save the ones you want to try.</p>
      ) : (
        <div className="issue-list">
          {items.map((item) => (
            <IssueCard
              key={item.id}
              issue={{ ...item.issue, score: undefined, matchExplanation: [] }}
              statusSlot={
                <span className="btn-row">
                  <select value={item.status} onChange={(event) => changeStatus(item.id, event.target.value)}>
                    <option value="interested">Interested</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button className="btn btn-ghost" type="button" onClick={() => remove(item.id)}>
                    Remove
                  </button>
                </span>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
