var CfgManager = require('../index');
var assert = require('assert');

suite('Config Manager', function() {
  var config1;
  var config2;
  var expect;
  var env = process.env;
  var cfg;

  setup(function() {
    cfg = new CfgManager();
  });

  test('#file()', function() {
    let config = cfg.file(__dirname + '/config1.json');
    let expect = {
      "FILE_PATH_1": "path/to/file_1",
      "LOCALE": "en-US",
      "ENABLE": 1,
      "VALUE": 100
    };

    assert.deepEqual(config, expect);
    assert.strictEqual(typeof(config.FILE_PATH_1), 'string');
    assert.strictEqual(typeof(config.VALUE), 'number');
  });

  test('#config()', function() {
    let config1 = {
      DEBUG: 0,
      DIR_PATH: 'path/to/config_1'
    };

    let config2 = {
      PRODUCTION: 0,
      DIR_PATH: 'path/to/config_2'
    };

    cfg.config(config1);
    let config = cfg.config(config2);
    let expect = {
      DEBUG: 0,
      PRODUCTION: 0,
      DIR_PATH: 'path/to/config_2'
    };

    assert.deepEqual(config, expect);
    assert.strictEqual(typeof(config.DIR_PATH), 'string');
    assert.strictEqual(typeof(config.DEBUG), 'number');
  });

  test('#get()', function() {
    cfg.config({
      DEBUG: 1,
      DIR_PATH: 'path/to/config'
    });
    env.DEBUG = 0;
    env.INEXISTENT = 1;

    assert.strictEqual(cfg.get('DEBUG'), 0);
    assert.strictEqual(cfg.get('DIR_PATH'), 'path/to/config');
    assert.strictEqual(cfg.get('INEXISTENT'), undefined);
  });
});
