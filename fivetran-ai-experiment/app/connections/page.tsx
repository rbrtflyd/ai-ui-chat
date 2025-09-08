import { allConnections } from '../../data/dummyData';
import { ConnectionList } from '../../components/Connections/ConnectionList';

export default function ConnectionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Connections</h1>
      <ConnectionList
        connections={allConnections}
        displayOptions={{ viewType: 'cards', limit: 20 }}
        summary={{
          running: allConnections.filter((c) => c.status === 'running').length,
          paused: allConnections.filter((c) => c.status === 'paused').length,
          broken: allConnections.filter((c) => c.status === 'broken').length,
          setupIncomplete: allConnections.filter(
            (c) => c.status === 'setup_incomplete'
          ).length,
        }}
      />
    </div>
  );
}
