const { createSourceEventStream } = require('graphql');
const { User } = require('./mongo/models/user-schema');

module.exports = {
  Query: {},
  Mutation: {
    async createUser(_, { input }) {
      console.log(input);
    },
  },
};
