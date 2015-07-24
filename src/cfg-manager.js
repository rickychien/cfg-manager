'use strict';

import fs from 'fs';

export default class CfgManager {

  constructor() {
    this._config = {};
  }

  _isNumeric(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }

  /**
   * Import and merge config from a JSON file
   *
   * @param {String} file - Path to a config JSON file
   * @return {Object} return a merged config
   */
  file(file) {
    let content = fs.readFileSync(file, { encoding: 'utf-8' });
    let config = JSON.parse(content);
    Object.assign(this._config, config);
    return this._config;
  }

  /**
   * Import and merge config from given config object
   *
   * @param {Object} config - Config object
   * @return {Object} return a merged config
   */
  config(config) {
    Object.assign(this._config, config);
    return this._config;
  }

  /**
   * Get value from a given name 
   *
   * @param {String} name - Name in config object
   * @return {Object|String} return value of given name
   */
  get(name) {
    let config = this._config;
    let env = process.env;

    for (let key in env) {
      if (config[key] !== undefined) {
        let value = env[key];
        // Convert string into number if it's a number
        config[key] = this._isNumeric(value) ? parseFloat(value) : value;
      }
    }

    return config[name];
  }

}
