// Shared test data. Tests reference products by key, never by hard-coded strings.
const products = {
  iphone: { searchTerm: 'iPhone', name: 'iPhone' },
  htc: { searchTerm: 'HTC', name: 'HTC Touch HD' },
  unknown: { searchTerm: 'zzz-no-such-product' },
};

module.exports = { products };
