import { Connection, ConnectionFilters } from '../types';
import { allConnections } from './dummyData';

export interface ConnectionQueryOptions {
  filters?: ConnectionFilters;
  sortBy?: keyof Connection;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  search?: string;
}

export function queryConnections(
  options: ConnectionQueryOptions = {}
): Connection[] {
  let results = [...allConnections];

  // Apply filters
  if (options.filters) {
    const { status, sources, timeRange, searchTerm } = options.filters;

    if (status && status.length > 0) {
      results = results.filter((conn) => status.includes(conn.status));
    }

    if (sources && sources.length > 0) {
      results = results.filter((conn) => sources.includes(conn.source.id));
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (conn) =>
          conn.name.toLowerCase().includes(term) ||
          conn.source.name.toLowerCase().includes(term) ||
          conn.destination.toLowerCase().includes(term)
      );
    }

    if (timeRange) {
      const now = new Date();
      const hours = parseTimeRange(timeRange);
      const cutoff = new Date(now.getTime() - hours * 60 * 60 * 1000);

      results = results.filter((conn) => conn.lastSyncTime >= cutoff);
    }
  }

  // Apply search
  if (options.search) {
    const term = options.search.toLowerCase();
    results = results.filter(
      (conn) =>
        conn.name.toLowerCase().includes(term) ||
        conn.source.name.toLowerCase().includes(term)
    );
  }

  // Apply sorting
  if (options.sortBy) {
    results.sort((a, b) => {
      const aVal = a[options.sortBy!];
      const bVal = b[options.sortBy!];

      if (aVal < bVal) return options.sortOrder === 'desc' ? 1 : -1;
      if (aVal > bVal) return options.sortOrder === 'desc' ? -1 : 1;
      return 0;
    });
  }

  // Apply limit
  if (options.limit) {
    results = results.slice(0, options.limit);
  }

  return results;
}

function parseTimeRange(timeRange: string): number {
  const match = timeRange.match(/^(\d+)([hdw])$/);
  if (!match) return 24; // Default to 24 hours

  const [, num, unit] = match;
  const value = parseInt(num);

  switch (unit) {
    case 'h':
      return value;
    case 'd':
      return value * 24;
    case 'w':
      return value * 24 * 7;
    default:
      return 24;
  }
}

// Helper functions for common queries
export const getFailingConnections = () =>
  queryConnections({ filters: { status: ['broken'] } });

export const getRecentlySyncedConnections = (hours: number = 1) =>
  queryConnections({ filters: { timeRange: `${hours}h` } });

export const getConnectionsBySource = (sourceType: string) =>
  queryConnections({ filters: { sources: [sourceType] } });
