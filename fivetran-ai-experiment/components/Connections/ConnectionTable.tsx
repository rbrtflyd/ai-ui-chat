import { Badge } from '@radix-ui/themes';
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
import { cn } from '@/lib/utils';

interface ConnectionTableProps {
  connections: Connection[];
}

const statusColors = {
  running: 'bg-green-600',
  paused: 'bg-yellow-600',
  broken: 'bg-red-600',
  setup_incomplete: 'bg-gray-600',
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
                className="hover:bg-transparent">
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
                <TableCell className="px-6 py-4">
                  <Badge className="border border-gray-20 flex flex-row items-center rounded-full px-3 leading-none py-1 w-fit capitalize text-sm">
                    <div
                      style={{
                        backgroundColor: statusColors[connection.status],
                      }}
                      className={cn(
                        statusColors[connection.status],
                        'size-2 rounded-full mr-2'
                      )}
                    />
                    {connection.status.replace('_', ' ')}
                  </Badge>
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
