const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { connection } = require('./mongo/mongo');

const server = new ApolloServer({ typeDefs, resolvers });

(async function () {
  try {
    await connection;
    console.log('🚀 DB connected');
    server.listen().then(({ url }) => {
      console.log(`🚀 Server running @ ${url}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
