import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollectionResponse } from '../lib/api.js';

const resourceColumns = {
  users: [
    {
      key: 'name',
      label: 'Name',
      render: (item) => item.name || '-',
    },
    {
      key: 'email',
      label: 'Email',
      render: (item) => item.email || '-',
    },
    {
      key: 'age',
      label: 'Age',
      render: (item) => item.age ?? '-',
    },
    {
      key: 'fitnessLevel',
      label: 'Fitness Level',
      render: (item) => item.fitnessLevel || '-',
    },
    {
      key: 'team',
      label: 'Team',
      render: (item) => item.team?.name || 'Unassigned',
    },
  ],
  teams: [
    {
      key: 'name',
      label: 'Team',
      render: (item) => item.name || '-',
    },
    {
      key: 'city',
      label: 'City',
      render: (item) => item.city || '-',
    },
    {
      key: 'members',
      label: 'Members',
      render: (item) => {
        if (!Array.isArray(item.members) || item.members.length === 0) {
          return 'No members';
        }

        return item.members.map((member) => member.name).join(', ');
      },
    },
    {
      key: 'points',
      label: 'Points',
      render: (item) => item.points ?? 0,
    },
  ],
  activities: [
    {
      key: 'user',
      label: 'User',
      render: (item) => item.user?.name || '-',
    },
    {
      key: 'type',
      label: 'Type',
      render: (item) => item.type || '-',
    },
    {
      key: 'durationMin',
      label: 'Duration',
      render: (item) => `${item.durationMin ?? '-'} min`,
    },
    {
      key: 'calories',
      label: 'Calories',
      render: (item) => item.calories ?? '-',
    },
    {
      key: 'date',
      label: 'Date',
      render: (item) => formatDate(item.date),
    },
  ],
  leaderboard: [
    {
      key: 'rank',
      label: 'Rank',
      render: (item) => `#${item.rank ?? '-'}`,
    },
    {
      key: 'user',
      label: 'User',
      render: (item) => item.user?.name || '-',
    },
    {
      key: 'score',
      label: 'Score',
      render: (item) => item.score ?? '-',
    },
    {
      key: 'period',
      label: 'Period',
      render: (item) => item.period || '-',
    },
  ],
  workouts: [
    {
      key: 'title',
      label: 'Workout',
      render: (item) => item.title || '-',
    },
    {
      key: 'level',
      label: 'Level',
      render: (item) => item.level || '-',
    },
    {
      key: 'durationMin',
      label: 'Duration',
      render: (item) => `${item.durationMin ?? '-'} min`,
    },
    {
      key: 'focusAreas',
      label: 'Focus Areas',
      render: (item) =>
        Array.isArray(item.focusAreas) && item.focusAreas.length > 0
          ? item.focusAreas.join(', ')
          : '-',
    },
    {
      key: 'prescribedFor',
      label: 'Prescribed For',
      render: (item) => item.prescribedFor?.name || 'General plan',
    },
  ],
};

function formatDate(value) {
  if (!value) {
    return '-';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '-';
  }

  return parsed.toLocaleDateString();
}

function ResourceSection({ title, resourcePath }) {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const columns = resourceColumns[resourcePath] || [];

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(buildApiUrl(resourcePath));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const normalized = normalizeCollectionResponse(payload);

        if (isMounted) {
          setItems(normalized.items);
          setPagination(normalized.pagination);
        }
      } catch (requestError) {
        if (isMounted) {
          setItems([]);
          setPagination(null);
          setError(requestError instanceof Error ? requestError.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [resourcePath]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="h4 mb-3">{title}</h2>
        {isLoading && <p className="mb-0">Loading {title.toLowerCase()}...</p>}
        {!isLoading && error && <p className="text-danger mb-0">{error}</p>}
        {!isLoading && !error && (
          <>
            <p className="text-secondary mb-3">{items.length} record(s) loaded.</p>
            {pagination && (
              <div className="alert alert-light border small mb-3" role="status">
                <strong>Page</strong> {pagination.page} of {pagination.totalPages} |{' '}
                <strong>Limit</strong> {pagination.limit} | <strong>Total</strong> {pagination.totalCount}
              </div>
            )}
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '72px' }}>#</th>
                    {columns.map((column) => (
                      <th key={column.key} scope="col">{column.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item._id || `${resourcePath}-${index}`}>
                      <td>{index + 1}</td>
                      {columns.map((column) => (
                        <td key={`${item._id || index}-${column.key}`}>{column.render(item)}</td>
                      ))}
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={columns.length + 1}>No records available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ResourceSection;
