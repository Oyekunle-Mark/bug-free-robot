const { ApolloServer, gql } = require('apollo-server');
const { v4 } = require('uuid');

let data = require('./data');

const addQuote = (quote, quotes = data) => {
  const newQuote = { id: v4(), ...quote };

  data = [...quotes, newQuote];

  return newQuote;
};

const typeDefs = gql`
  type Quote {
    id: ID!
    phrase: String!
    quotee: String!
  }

  type Query {
    quotes: [Quote]
  }

  type Mutation {
    addQuote(phrase: String!, quotee: String!): Quote!
  }
`;

const resolvers = {
  Query: {
    quotes: () => data,
  },
  Mutation: {
    addQuote: (_, quote) => addQuote(quote),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server ready at ${url}`)); // eslint-disable-line no-console
