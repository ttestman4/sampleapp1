const baseConfig = require('./jest.lib.config');

module.exports = {
    ...baseConfig,
    roots: ['<rootDir>/projects/non-functional'],
};
