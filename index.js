const { ApolloServer, gql } = require('apollo-server');
const { v4 } = require('uuid');

let data = require('./data');

const quoteById = (id, quotes = data) => quotes.find(qt => qt.id === id);

const addQuote = (quote, quotes = data) => {
  const newQuote = { id: v4(), ...quote };

  data = [...quotes, newQuote];

  return newQuote;
};

const editQuote = (id, quote, quotes = data) => {
  data = quotes.map(qt => {
    if (qt.id === id) return { ...qt, ...quote };
    return qt;
  });

  return quoteById(id);
};

const deletQuote = (id, quotes = data) => {
  const lengthBeforeOperation = quotes.length;

  data = quotes.filter(qt => qt.id !== id);

  return { ok: data.length < lengthBeforeOperation };
};

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
    quotes: () => data,
    quoteById: (_, { id }) => quoteById(id),
  },
  Mutation: {
    addQuote: (_, quote) => addQuote(quote),
    editQuote: (_, quote) => {
      const { id, phrase, quotee } = quote;
      return editQuote(id, { phrase, quotee });
    },
    deletQuote: (_, { id }) => deletQuote(id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server ready at ${url}`)); // eslint-disable-line no-console
