var CfgManager = require('../index');
var assert = require('assert');

suite('Config Manager', function() {
  var cfg;

  setup(function() {
    cfg = new CfgManager();
    process.env = {
      DEBUG: '0',
      PRODUCTION: '0',
      DIR_PATH: 'path/to/dir'
    };
  });

  test('#file()', function() {
    cfg.file(__dirname + '/config.json');

    assert.strictEqual(cfg.get('FILE_PATH'), 'path/to/file');
    assert.strictEqual(cfg.get('LOCALE'), 'en-US');
    assert.strictEqual(cfg.get('ENABLE'), '1');
    assert.strictEqual(cfg.get('VALUE'), '100');
  });

  test('#config()', function() {
    cfg.config({ DEBUG: '0', DIR_PATH: 'path/to/config_1' })
       .config({ PRODUCTION: '0', DIR_PATH: 'path/to/config_2' });

    assert.strictEqual(cfg.get('DEBUG'), '0');
    assert.strictEqual(cfg.get('PRODUCTION'), '0');
    assert.strictEqual(cfg.get('DIR_PATH'), 'path/to/config_2');
  });

  test('#env()', function() {
    cfg.env();

    assert.strictEqual(cfg.get('DEBUG'), '0');
    assert.strictEqual(cfg.get('PRODUCTION'), '0');
    assert.strictEqual(cfg.get('DIR_PATH'), 'path/to/dir');
  });

  test('#env(whitelist)', function() {
    cfg.env(['DEBUG', 'DIR_PATH']);

    assert.strictEqual(cfg.get('DEBUG'), '0');
    assert.strictEqual(cfg.get('DIR_PATH'), 'path/to/dir');
  });

  test('#get(name)', function() {
    cfg.config({ DEBUG: '1', DIR_PATH: 'path/to/config' })
       .env();

    assert.strictEqual(cfg.get('DEBUG'), '0');
    assert.strictEqual(cfg.get('PRODUCTION'), '0');
    assert.strictEqual(cfg.get('DIR_PATH'), 'path/to/dir');
    assert.strictEqual(cfg.get('INEXISTENT'), undefined);
  });
});
