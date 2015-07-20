var cfgManager = require('../index');
var assert = require('assert');

suite('Config Manager', function() {

  var defaultConfig;
  var expect;
  var env = process.env;

  suiteSetup(function() {
    defaultConfig = {
      DEBUG: 0,
      PRODUCTION: 0,
      OPTIMIZE: 0,
      DIR_PATH: 'path/to/dir'
    };

    expect = {
      DEBUG: 1,
      PRODUCTION: 0,
      OPTIMIZE: 0,
      DIR_PATH: 'path/to/test'
    };
  });

  test('#init()', function() {
    env.APP_DEBUG = '1';
    env.APP_DIR_PATH = 'path/to/test';
    env.APP_NON_EXIST_FLAG = 'path/to/somewhere';
    let config = cfgManager.init(defaultConfig);

    assert.deepEqual(config, expect);
    assert.strictEqual(typeof(config.DEBUG), 'number');
    assert.strictEqual(typeof(config.DIR_PATH), 'string');
  });

  test('#init() with a specific prefix', function() {
    env.TEST_DEBUG = '1';
    env.TEST_DIR_PATH = 'path/to/test';
    env.TEST_NON_EXIST_FLAG = 'path/to/somewhere';
    let config = cfgManager.init(defaultConfig, { prefix: 'TEST_' });

    assert.deepEqual(config, expect);
    assert.strictEqual(typeof(config.DEBUG), 'number');
    assert.strictEqual(typeof(config.DIR_PATH), 'string');
  });

  test('#getConfig()', function() {
    cfgManager.init(defaultConfig);

    assert.deepEqual(cfgManager.getConfig(), expect);
  });
});
