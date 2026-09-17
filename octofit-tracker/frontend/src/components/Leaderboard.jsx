import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (value && typeof value === 'object') {
    return JSON.stringify(value);
  }

  return value ?? '—';
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl('leaderboard'), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setEntries(normalizeRecords(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => controller.abort();
  }, []);

  return (
    <div className="container py-4">
      <div className="content-panel p-4">
        <h2 className="mb-3">Leaderboard</h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}
        {loading ? <div className="text-muted">Loading leaderboard…</div> : null}

        {!loading && !error && entries.length === 0 ? (
          <p className="text-muted mb-0">No leaderboard entries available.</p>
        ) : null}

        {entries.length > 0 ? (
          <ul className="list-group">
            {entries.map((entry, index) => {
              const summary = Object.entries(entry || {})
                .filter(([key]) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key))
                .slice(0, 4)
                .map(([key, value]) => `${key}: ${formatValue(value)}`)
                .join(' • ');

              return (
                <li key={entry._id || entry.id || `${entry.name}-${index}`} className="list-group-item">
                  <strong>#{entry.rank || index + 1} {entry.name || entry.userName || 'Player'}</strong>
                  <div className="small text-muted mt-1">{summary || 'No additional details'}</div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default Leaderboard;
