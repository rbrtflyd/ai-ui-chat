import { Connection } from '../../types';
import { Card } from '../ui/card';

interface ConnectionCardProps {
  connection: Connection;
}

const statusColors = {
  running: 'bg-green-100 text-green-800 border-green-200',
  paused: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  broken: 'bg-red-100 text-red-800 border-red-200',
  setup_incomplete: 'bg-gray-100 text-gray-800 border-gray-200',
};

const statusLabels = {
  running: 'Running',
  paused: 'Paused',
  broken: 'Failed',
  setup_incomplete: 'Setup Incomplete',
};

export function ConnectionCard({ connection }: ConnectionCardProps) {
  const timeSinceSync = Math.floor(
    (Date.now() - connection.lastSyncTime.getTime()) / (1000 * 60)
  );
  const lastSyncText =
    timeSinceSync < 60
      ? `${timeSinceSync}m ago`
      : `${Math.floor(timeSinceSync / 60)}h ago`;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{connection.name}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${
            statusColors[connection.status]
          }`}>
          {statusLabels[connection.status]}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Source:</span>
          <span className="font-medium">{connection.source.name}</span>
        </div>

        <div className="flex justify-between">
          <span>Destination:</span>
          <span className="font-medium">{connection.destination}</span>
        </div>

        <div className="flex justify-between">
          <span>Last Sync:</span>
          <span className="font-medium">{lastSyncText}</span>
        </div>

        <div className="flex justify-between">
          <span>Frequency:</span>
          <span className="font-medium">{connection.syncFrequency}</span>
        </div>

        <div className="flex justify-between">
          <span>Rows:</span>
          <span className="font-medium">
            {connection.rowCount.toLocaleString()}
          </span>
        </div>
      </div>

      {connection.status === 'broken' && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
          Connection requires attention
        </div>
      )}
    </Card>
  );
}
