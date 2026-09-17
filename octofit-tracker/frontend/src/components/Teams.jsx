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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeams() {
      try {
        const response = await fetch(getApiUrl('teams'), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeRecords(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load teams.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => controller.abort();
  }, []);

  return (
    <div className="container py-4">
      <div className="content-panel p-4">
        <h2 className="mb-3">Teams</h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}
        {loading ? <div className="text-muted">Loading teams…</div> : null}

        {!loading && !error && teams.length === 0 ? (
          <p className="text-muted mb-0">No team data available.</p>
        ) : null}

        {teams.length > 0 ? (
          <ul className="list-group">
            {teams.map((team, index) => {
              const summary = Object.entries(team || {})
                .filter(([key]) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key))
                .slice(0, 4)
                .map(([key, value]) => `${key}: ${formatValue(value)}`)
                .join(' • ');

              return (
                <li key={team._id || team.id || `${team.name}-${index}`} className="list-group-item">
                  <strong>{team.name || 'Team'}</strong>
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

export default Teams;
