const { ApolloServer, gql } = require('apollo-server');
const { v4 } = require('uuid');

const typeDefs = gql`
  type Quote {
    id: ID!
    phrase: String!
    speaker: String!
  }

  type Query {
    quotes: [Quote]
  }
`;

const resolvers = {
  Query: {
    quotes: () => [{ id: v4(), phrase: 'hello there', speaker: 'devs' }],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server ready at ${url}`)); // eslint-disable-line no-console
