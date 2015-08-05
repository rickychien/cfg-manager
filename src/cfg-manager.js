import 'babel/polyfill';
import fs from 'fs';

export default class CfgManager {

  constructor() {
    this._config = {};
  }

  _checkingConfig(config) {
    for (let key in config) {
      if (typeof config[key] !== 'string') {
        throw new Error('Configuration value must be a string type.');
      }
    }
  }

  /**
   * Import and merge config from a JSON file
   *
   * @param {String} file - Path to a config JSON file
   * @return {Object} return CfgManager itself for chaining 
   */
  file(file) {
    let content = fs.readFileSync(file, { encoding: 'utf-8' });
    let config = JSON.parse(content);
    this._checkingConfig(config);
    Object.assign(this._config, config);
    return this;
  }

  /**
   * Import and merge config from given config object
   *
   * @param {Object} config - Config object
   * @return {Object} return CfgManager itself for chaining 
   */
  config(config) {
    this._checkingConfig(config);
    Object.assign(this._config, config);
    return this;
  }

  /**
   * Import and merged config from envrionment variables
   *
   * @param {Array} [whitelist] - An array of whitelist environment varialbes
   * @return {Object} return CfgManager itself for chaining 
   */
  env(whitelist) {
    let env = process.env;

    if (whitelist && Array.isArray(whitelist)) {
      for (let key in env) {
        if (whitelist.indexOf(key) === -1) {
          delete env[key];
        }
      }
    }

    Object.assign(this._config, env);
    return this;
  }

  /**
   * Get value from a given name 
   *
   * @param {String} name - Name in config object
   * @return {Object|String} return value of given name
   */
  get(name) {
    return this._config[name];
  }

}
