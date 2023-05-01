import { MutationResolvers } from '../generated/graphql';

const mutations: MutationResolvers = {
  Mutation: {
    // Below, we mock adding a new book. Our data set is static for this
    // example, so we won't actually modify our data.
    addItem: async (_, { barcode, name, price, quantity }, { dataSources }) => {
      return await dataSources.storeAPI.addItem({ barcode, name, price, quantity });
    },
    deleteItemByBarcode: async (_, { barcode }, { dataSources }) => {
      return await dataSources.storeAPI.deleteItemByBarcode(barcode);
    },
  },
};

export default mutations;
