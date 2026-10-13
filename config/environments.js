// Target environments. Pick one with TEST_ENV=staging|production (default: production).
const environments = {
  production: { baseURL: 'https://ecommerce-playground.lambdatest.io/index.php', currency: '$' },
  staging: { baseURL: 'https://ecommerce-playground.lambdatest.io/index.php', currency: '$' },
};

const name = process.env.TEST_ENV || 'production';
if (!environments[name]) throw new Error(`Unknown TEST_ENV "${name}". Use: ${Object.keys(environments).join(', ')}`);

module.exports = { env: { name, ...environments[name] } };
