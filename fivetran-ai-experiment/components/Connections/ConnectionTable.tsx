import { Connection } from '../../types';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>Connection</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Sync</TableHead>
            <TableHead>Rows</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
              <TableRow
                key={connection.id}
                className="hover:bg-gray-50">
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {connection.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {connection.destination}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {connection.source.name}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`text-sm font-medium ${
                      statusColors[connection.status]
                    }`}>
                    {connection.status.replace('_', ' ')}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lastSyncText}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {connection.rowCount.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
