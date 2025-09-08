import { Connection } from '../../types';

interface ConnectionTableProps {
  connections: Connection[];
}

const statusColors = {
  running: 'text-green-600',
  paused: 'text-yellow-600',
  broken: 'text-red-600',
  setup_incomplete: 'text-gray-600',
};

export function ConnectionTable({ connections }: ConnectionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Connection
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Sync
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rows
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {connections.map((connection) => {
            // Handle both Date objects and date strings from JSON serialization
            const lastSyncTime =
              connection.lastSyncTime instanceof Date
                ? connection.lastSyncTime
                : new Date(connection.lastSyncTime);

            const timeSinceSync = Math.floor(
              (Date.now() - lastSyncTime.getTime()) / (1000 * 60)
            );
            const lastSyncText =
              timeSinceSync < 60
                ? `${timeSinceSync}m ago`
                : `${Math.floor(timeSinceSync / 60)}h ago`;

            return (
              <tr
                key={connection.id}
                className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {connection.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {connection.destination}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {connection.source.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-sm font-medium ${
                      statusColors[connection.status]
                    }`}>
                    {connection.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lastSyncText}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {connection.rowCount.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
