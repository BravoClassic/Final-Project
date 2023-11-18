module.exports = {
    // standard relay config options
    src: './src',
    language: 'javascript',
    schema: './data/schema.graphql',
    exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
    // pg_graphql specific options
    schemaConfig: {
      nodeInterfaceIdField: 'nodeId',
      nodeInterfaceIdVariableName: 'nodeId',
    },
    customScalars: {
      UUID: 'string',
      Datetime: 'string',
      JSON: 'string',
      BigInt: 'string',
      BigFloat: 'string',
      Opaque: 'any',
    },
  }
  