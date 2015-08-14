var fs = require('fs');

function CfgManager() {
  this._config = {};
}

CfgManager.prototype = {

  _checkingConfig: function(config) {
    for (var key in config) {
      if (typeof config[key] !== 'string') {
        throw new Error('Configuration value must be a string type.');
      }
    }
  },

  /**
   * Import and merge config from a JSON file
   *
   * @param {String} file - Path to a config JSON file
   * @return {Object} return CfgManager itself for chaining 
   */
  file: function(file) {
    var content = fs.readFileSync(file, { encoding: 'utf-8' });
    var config = JSON.parse(content);
    this._checkingConfig(config);
    Object.assign(this._config, config);
    return this;
  },

  /**
   * Import and merge config from given config object
   *
   * @param {Object} config - Config object
   * @return {Object} return CfgManager itself for chaining 
   */
  config: function(config) {
    this._checkingConfig(config);
    Object.assign(this._config, config);
    return this;
  },

  /**
   * Import and merged config from envrionment variables
   *
   * @param {Array} [whitelist] - An array of whitelist environment varialbes
   * @return {Object} return CfgManager itself for chaining 
   */
  env: function(whitelist) {
    var env = Object.assign({}, process.env);

    if (whitelist && Array.isArray(whitelist)) {
      for (var key in env) {
        if (whitelist.indexOf(key) === -1) {
          delete env[key];
        }
      }
    }

    for (var key in env) {
      if (key.indexOf('npm_') === 0) {
        delete env[key];
      }
    }

    Object.assign(this._config, env);
    return this;
  },

  /**
   * Get value from a given name 
   *
   * @param {String} name - Name in config object
   * @return {Object|String} return value of given name
   */
  get: function(name) {
    return this._config[name];
  }

};

module.exports = new CfgManager();
