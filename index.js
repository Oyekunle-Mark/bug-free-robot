const { ApolloServer, gql } = require('apollo-server');

const {
  getQuotes,
  quoteById,
  addQuote,
  editQuote,
  deleteQuote,
} = require('./data/storeHelpers');

const typeDefs = gql`
  type Quote {
    id: ID!
    phrase: String!
    quotee: String!
  }

  type DeleteQuoteResponse {
    ok: Boolean!
  }

  type Query {
    quotes: [Quote]!
    quoteById(id: ID!): Quote!
  }

  type Mutation {
    addQuote(phrase: String!, quotee: String!): Quote!
    editQuote(id: ID!, phrase: String, quotee: String): Quote!
    deletQuote(id: ID!): DeleteQuoteResponse!
  }
`;

const resolvers = {
  Query: {
    quotes: () => getQuotes(),
    quoteById: (_, { id }) => quoteById(id),
  },
  Mutation: {
    addQuote: (_, quote) => addQuote(quote),
    editQuote: (_, quote) => {
      const { id, phrase, quotee } = quote;
      return editQuote(id, { phrase, quotee });
    },
    deletQuote: (_, { id }) => deleteQuote(id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server ready at ${url}`)); // eslint-disable-line no-console
