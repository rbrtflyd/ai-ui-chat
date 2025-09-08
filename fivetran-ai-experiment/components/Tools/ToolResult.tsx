import { ConnectionList } from '../Connections/ConnectionList';

interface ToolResultProps {
  result: {
    type: string;
    [key: string]: any;
  };
}

export function ToolResult({ result }: ToolResultProps) {
  switch (result.type) {
    case 'connection_status':
      return (
        <div className="my-4">
          <h3 className="text-lg font-semibold mb-3">Connection Status</h3>
          <ConnectionList
            connections={result.connections}
            displayOptions={result.displayOptions}
            summary={result.summary}
          />
        </div>
      );

    default:
      return (
        <div className="my-4 p-4 bg-gray-100 rounded">
          <p>Unknown tool result type: {result.type}</p>
        </div>
      );
  }
}
