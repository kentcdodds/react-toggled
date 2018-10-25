const jestConfig = require('kcd-scripts/jest')

jestConfig.setupTestFrameworkScriptFile = '<rootDir>/other/setup-tests.js'

module.exports = jestConfig
