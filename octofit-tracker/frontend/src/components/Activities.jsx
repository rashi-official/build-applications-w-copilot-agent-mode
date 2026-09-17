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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
      try {
        const response = await fetch(getApiUrl('activities'), { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeRecords(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load activities.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => controller.abort();
  }, []);

  return (
    <div className="container py-4">
      <div className="content-panel p-4">
        <h2 className="mb-3">Activities</h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}
        {loading ? <div className="text-muted">Loading activities…</div> : null}

        {!loading && !error && activities.length === 0 ? (
          <p className="text-muted mb-0">No activity data available.</p>
        ) : null}

        {activities.length > 0 ? (
          <ul className="list-group">
            {activities.map((activity, index) => {
              const summary = Object.entries(activity || {})
                .filter(([key]) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key))
                .slice(0, 4)
                .map(([key, value]) => `${key}: ${formatValue(value)}`)
                .join(' • ');

              return (
                <li key={activity._id || activity.id || `${activity.type}-${index}`} className="list-group-item">
                  <strong>{activity.name || activity.type || 'Activity'}</strong>
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

export default Activities;
