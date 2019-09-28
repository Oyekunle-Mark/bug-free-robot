const { ApolloServer, gql } = require('apollo-server');
const { v4 } = require('uuid');

const data = require('./data');

const typeDefs = gql`
  type Quote {
    id: ID!
    phrase: String!
    quotee: String!
  }

  type Query {
    quotes: [Quote]
  }
`;

const resolvers = {
  Query: {
    quotes: () => data,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server ready at ${url}`)); // eslint-disable-line no-console
