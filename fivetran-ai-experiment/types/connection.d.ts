interface Connection {
  id: string;
  name: string;
  source_type: string;
  destination: string;
  last_synced_at: string;
  isEnabled: boolean;
  sync_frequency: string;
  average_sync_duration: number;
  schema_changes: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default Connection;
