interface ConnectionSchema {
  id: string;
  name: string;
  type: string;
  status: string;
}

interface ConnectionSchemaTable {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default ConnectionSchema;
