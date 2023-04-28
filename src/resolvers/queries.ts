import { QueryResolvers } from '../generated/graphql';

const queries: QueryResolvers = {
  Query: {
    items: async (_, __, { dataSources }) => {
      return dataSources.storeAPI.getItems();
    },
  },
};

export default queries;
