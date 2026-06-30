const envApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, '');

// Use same-origin API by default so Vite dev proxy can forward requests reliably.
export const apiBaseUrl = envApiBaseUrl || '/api';

export function buildApiUrl(resourcePath) {
  const normalizedPath = String(resourcePath || '').replace(/^\/+/, '');
  return `${apiBaseUrl}/${normalizedPath}/`;
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, pagination: null };
  }

  if (!payload || typeof payload !== 'object') {
    return { items: [], pagination: null };
  }

  const items = Array.isArray(payload.items)
    ? payload.items
    : Array.isArray(payload.results)
      ? payload.results
      : Array.isArray(payload.data)
        ? payload.data
        : [];

  const pagination =
    payload.pagination ||
    payload.meta?.pagination ||
    (payload.count !== undefined || payload.page !== undefined
      ? {
          count: payload.count,
          page: payload.page,
          totalPages: payload.totalPages,
          next: payload.next,
          previous: payload.previous,
        }
      : null);

  return { items, pagination };
}

export function getCodespaceNotice() {
  return null;
}
