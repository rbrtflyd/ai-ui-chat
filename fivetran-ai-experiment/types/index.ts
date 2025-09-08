// Update this file to include all the types from the PRD
export interface SyncEvent {
  timestamp: Date;
  status: 'success' | 'failed' | 'warning';
  rowsProcessed: number;
  duration: number;
  errorMessage?: string;
}

export interface SchemaInfo {
  tables: number;
  columns: number;
}

export interface ConnectionConfig {
  [key: string]: any;
}

export interface Connection {
  id: string;
  name: string;
  source: SourceType;
  destination: string;
  status: 'running' | 'paused' | 'broken' | 'setup_incomplete';
  lastSyncTime: Date;
  syncFrequency: string;
  rowCount: number;
  syncHistory: SyncEvent[];
  schema: SchemaInfo;
  config: ConnectionConfig;
}

export interface SourceType {
  id: string;
  name: string;
  type: string;
  status: string;
}

export interface ConnectionFilters {
  status?: Connection['status'][];
  sources?: string[];
  timeRange?: string;
  searchTerm?: string;
}

export interface DisplayOptions {
  viewType?: 'table' | 'cards' | 'summary' | 'chart';
  sortBy?: string;
  limit?: number;
  groupBy?: string;
}

// Tool parameter types
export interface ShowConnectionStatusParams {
  filters?: ConnectionFilters;
  customCriteria?: string;
  displayOptions?: DisplayOptions;
}
