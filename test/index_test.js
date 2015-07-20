var configManager = require('../index');
var assert = require('assert');

suite('Config Manager', function() {
  test('#config', function() {
    let env = process.env;
    let defaultConfig = {
      DEBUG: '0',
      PRODUCTION: '0',
      OPTIMIZE: '0'
    };
    env.DEBUG = '1';
    env.NON_EXIST_FLAG = 'path/to/somewhere';
    let config = configManager.config(defaultConfig);
    let expect = {
      DEBUG: '1',
      PRODUCTION: '0',
      OPTIMIZE: '0'
    };
    assert.deepEqual(config, expect);
  });
});
