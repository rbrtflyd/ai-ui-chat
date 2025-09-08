import { tool } from 'ai';
import { z } from 'zod';
import { queryConnections } from '../data/dataQueries';
import { Connection } from '../types';

// Define the schema for the connection status tool
const connectionStatusSchema = z.object({
  filters: z
    .object({
      status: z
        .array(z.enum(['running', 'paused', 'broken', 'setup_incomplete']))
        .optional(),
      sources: z.array(z.string()).optional(),
      timeRange: z
        .string()
        .optional()
        .describe("e.g. '1h', '24h', '7d', '30d'"),
      searchTerm: z.string().optional(),
    })
    .optional(),
  customCriteria: z
    .string()
    .optional()
    .describe('Complex filtering logic in natural language'),
  displayOptions: z
    .object({
      viewType: z.enum(['table', 'cards', 'summary', 'chart']).default('cards'),
      sortBy: z.string().optional(),
      limit: z.number().default(20),
      groupBy: z.string().optional(),
    })
    .optional(),
});

export const showConnectionStatus = tool({
  description:
    'Display connection health, filtering, and status information for Fivetran connections',
  inputSchema: connectionStatusSchema,
  execute: async (params) => {
    const connections = queryConnections({
      filters: params.filters,
      limit: params.displayOptions?.limit,
      sortBy: params.displayOptions?.sortBy as keyof Connection,
    });

    return {
      type: 'connection_status',
      connections,
      displayOptions: params.displayOptions || { viewType: 'cards', limit: 20 },
      totalCount: connections.length,
      summary: {
        running: connections.filter((c) => c.status === 'running').length,
        paused: connections.filter((c) => c.status === 'paused').length,
        broken: connections.filter((c) => c.status === 'broken').length,
        setupIncomplete: connections.filter(
          (c) => c.status === 'setup_incomplete'
        ).length,
      },
    };
  },
});

export const tools = {
  show_connection_status: showConnectionStatus,
};
