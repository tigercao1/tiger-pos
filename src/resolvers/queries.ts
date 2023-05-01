import { QueryResolvers } from '../generated/graphql';

const queries: QueryResolvers = {
  Query: {
    items: async (_, __, { dataSources }) => {
      return dataSources.storeAPI.getItems();
    },
    item: async (_, { barcode }, { dataSources }) => {
      return dataSources.storeAPI.getItemByBarcode(barcode);
    },
  },
};

export default queries;
