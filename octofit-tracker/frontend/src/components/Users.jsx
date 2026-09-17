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

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(getApiUrl('users'), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeRecords(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load users.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => controller.abort();
  }, []);

  return (
    <div className="container py-4">
      <div className="content-panel p-4">
        <h2 className="mb-3">Users</h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}
        {loading ? <div className="text-muted">Loading users…</div> : null}

        {!loading && !error && users.length === 0 ? (
          <p className="text-muted mb-0">No user data available.</p>
        ) : null}

        {users.length > 0 ? (
          <ul className="list-group">
            {users.map((user, index) => {
              const summary = Object.entries(user || {})
                .filter(([key]) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key))
                .slice(0, 4)
                .map(([key, value]) => `${key}: ${formatValue(value)}`)
                .join(' • ');

              return (
                <li key={user._id || user.id || `${user.name}-${index}`} className="list-group-item">
                  <strong>{user.name || user.username || 'User'}</strong>
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

export default Users;
