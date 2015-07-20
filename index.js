'use strict';

module.exports = {

  /**
   * Merging default configuration with user provided ENV paramenters
   * @param {object} defaultConfig The config object
   * @return {object} Merged config object
   */
  config: function(defaultConfig) {
    var config = Object.assign({}, defaultConfig || {});
    var env = process.env;

    for (var key in env) {
      if (config[key]) {
        config[key] = env[key];
      }
    }

    return config;
  }

};
