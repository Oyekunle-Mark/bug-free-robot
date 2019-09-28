const { v4 } = require('uuid');
let data = require('./store');

const getQuotes = () => data;

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

const deleteQuote = (id, quotes = data) => {
  const lengthBeforeOperation = quotes.length;

  data = quotes.filter(qt => qt.id !== id);

  return { ok: data.length < lengthBeforeOperation };
};

module.exports = {
  getQuotes,
  quoteById,
  addQuote,
  editQuote,
  deleteQuote,
};
