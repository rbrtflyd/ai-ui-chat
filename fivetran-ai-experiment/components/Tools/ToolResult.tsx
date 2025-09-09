import { ConnectionTable } from '../Connections/ConnectionTable';

interface ToolResultProps {
  result: {
    type: string;
    [key: string]: any;
  };
}

export function ToolResult({ result }: ToolResultProps) {
  // Add safety check
  if (!result || !result.type) {
    return (
      <div className="my-4 p-4 bg-yellow-100 rounded">
        <p>Tool result is missing or invalid</p>
      </div>
    );
  }

  switch (result.type) {
    case 'connection_status':
      return (
        <div className="my-4 overflow-x-auto">
          <ConnectionTable connections={result.connections} />
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
