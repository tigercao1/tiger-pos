import { MutationResolvers } from '../generated/graphql';

const mutations: MutationResolvers = {
  Mutation: {
    // Below, we mock adding a new book. Our data set is static for this
    // example, so we won't actually modify our data.
    addItem: async (_, { name, price, quantity }, { dataSources }) => {
      return await dataSources.storeAPI.addItem({ name, price, quantity });
    },
  },
};

export default mutations;
