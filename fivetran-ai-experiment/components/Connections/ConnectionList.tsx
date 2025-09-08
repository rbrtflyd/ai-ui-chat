import { Connection, DisplayOptions } from '../../types';
import { ConnectionCard } from './ConnectionCard';
import { ConnectionTable } from './ConnectionTable';

interface ConnectionListProps {
  connections: Connection[];
  displayOptions: DisplayOptions;
  summary?: {
    running: number;
    paused: number;
    broken: number;
    setupIncomplete: number;
  };
}

export function ConnectionList({
  connections,
  displayOptions,
  summary,
}: ConnectionListProps) {
  if (connections.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No connections found matching your criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {summary && (
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {summary.running}
            </div>
            <div className="text-sm text-gray-600">Running</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {summary.paused}
            </div>
            <div className="text-sm text-gray-600">Paused</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {summary.broken}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {summary.setupIncomplete}
            </div>
            <div className="text-sm text-gray-600">Setup Incomplete</div>
          </div>
        </div>
      )}

      {displayOptions.viewType === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connections.map((connection) => (
            <ConnectionCard
              key={connection.id}
              connection={connection}
            />
          ))}
        </div>
      ) : (
        <ConnectionTable connections={connections} />
      )}
    </div>
  );
}
