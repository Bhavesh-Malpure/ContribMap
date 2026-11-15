import { useCallback, useState } from 'react';
import { searchIssues } from '../services/issueService.js';
import { useAuth } from './useAuth.js';

export function useIssues() {
  const { token } = useAuth();
  const [issues, setIssues] = useState([]);
  const [meta, setMeta] = useState({ total: 0, query: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = useCallback(
    async (filters) => {
      setLoading(true);
      setError('');
      try {
        const result = await searchIssues(token, filters);
        setIssues(result.items || []);
        setMeta({ total: result.total, query: result.query, page: result.page });
      } catch (err) {
        setIssues([]);
        setError(err.message || 'Could not load issues.');
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { issues, meta, loading, error, search };
}
