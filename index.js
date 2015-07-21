'use strict';

var objectAssign = require('object-assign');

module.exports = {

  /**
   * Parameter prefix of environment variables
   * We only parse environment variables starting with this prefix
   *
   * @default {String} APP_DEBUG=1, APP_DIR_PATH=path/to/somewhere
   */
  prefix: 'APP_',

  _isNumeric: function(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  },

  /**
   * Merging default configuration with user provided environment variables
   *
   * @param {Object} defaultConfig The config object
   * @param {Object} options for setting arguments
   * @param {String} options.prefix Set prefix of environment variable
   * @return {Object} return a config object
   */
  init: function(defaultConfig, options) {
    options = options || {};
    var prefix = options.prefix || this.prefix;
    var config = objectAssign({}, defaultConfig || {});
    var env = process.env;

    for (var key in env) {
      var realKey = key.substr(prefix.length);
      if (key.indexOf(prefix) === 0 && config[realKey] !== undefined) {
        var value = env[key];
        // Convert string into number if it's a number
        config[realKey] = this._isNumeric(value) ? parseFloat(value) : value;
      }
    }

    // Keep config object as an environment variable
    env.CONFIG_MANAGER_ENVS = JSON.stringify(config);

    return config;
  },

  /**
   * Get config from CONFIG_MANAGER_ENVS environment variable
   *
   * @return {Object} config object
   */
  getConfig: function() {
    var envs = process.env.CONFIG_MANAGER_ENVS;

    if (envs) {
      return JSON.parse(envs);
    } else {
      throw new Error('Cannot get settings from environment variables, ' +
            'please try to invoke init() before getConfig()');
    }
  }

};
