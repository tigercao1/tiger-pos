import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { StoreDataSource } from './datasources.js';
import resolvers from './resolvers/index.js';
import { initializeDB } from './connection.js';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = readFileSync('../schema.graphql', { encoding: 'utf-8' });

export interface StoreContext {
  dataSources: {
    storeAPI: StoreDataSource;
  };
}

const server = new ApolloServer<StoreContext>({
  typeDefs,
  resolvers,
});

initializeDB();

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      // We are using a static data set for this example, but normally
      // this would be where you'd add your data source connections
      // or your REST API classes.
      dataSources: {
        storeAPI: new StoreDataSource(),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
