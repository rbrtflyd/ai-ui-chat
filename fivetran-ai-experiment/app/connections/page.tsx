import { allConnections } from '../../data/dummyData';
import { ConnectionList } from '../../components/Connections/ConnectionList';
import { ConnectionTable } from '@/components/Connections/ConnectionTable';

export default function ConnectionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Connections</h1>
      <ConnectionTable connections={allConnections} />
    </div>
  );
}
