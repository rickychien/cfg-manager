import assert from 'assert';
import CfgManager from '../index';

suite('Config Manager', () => {
  var cfg;

  setup(() => {
    cfg = new CfgManager();
    process.env = {
      DEBUG: '0',
      PRODUCTION: '0',
      DIR_PATH: 'path/to/dir'
    };
  });

  test('#file()', () => {
    cfg.file(`${__dirname}/config.json`);

    assert.strictEqual(cfg.get('FILE_PATH'), 'path/to/file');
    assert.strictEqual(cfg.get('LOCALE'), 'en-US');
    assert.strictEqual(cfg.get('ENABLE'), '1');
    assert.strictEqual(cfg.get('VALUE'), '100');
  });

  test('#config()', () => {
    cfg.config({ DEBUG: '0', DIR_PATH: 'path/to/config_1' })
       .config({ PRODUCTION: '0', DIR_PATH: 'path/to/config_2' });

    assert.strictEqual(cfg.get('DEBUG'), '0');
    assert.strictEqual(cfg.get('PRODUCTION'), '0');
    assert.strictEqual(cfg.get('DIR_PATH'), 'path/to/config_2');
  });

  test('#env()', () => {
    cfg.env();

    assert.strictEqual(cfg.get('DEBUG'), '0');
    assert.strictEqual(cfg.get('PRODUCTION'), '0');
    assert.strictEqual(cfg.get('DIR_PATH'), 'path/to/dir');
  });

  test('#env(whitelist)', () => {
    cfg.env(['DEBUG', 'DIR_PATH']);

    assert.strictEqual(cfg.get('DEBUG'), '0');
    assert.strictEqual(cfg.get('DIR_PATH'), 'path/to/dir');
  });

  test('#get(name)', () => {
    cfg.config({ DEBUG: '1', DIR_PATH: 'path/to/config' })
       .env();

    assert.strictEqual(cfg.get('DEBUG'), '0');
    assert.strictEqual(cfg.get('PRODUCTION'), '0');
    assert.strictEqual(cfg.get('DIR_PATH'), 'path/to/dir');
    assert.strictEqual(cfg.get('INEXISTENT'), undefined);
  });
});
