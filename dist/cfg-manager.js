'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var CfgManager = (function () {
  function CfgManager() {
    _classCallCheck(this, CfgManager);

    this._config = {};
  }

  _createClass(CfgManager, [{
    key: '_checkingConfig',
    value: function _checkingConfig(config) {
      for (var key in config) {
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
  }, {
    key: 'file',
    value: function file(_file) {
      var content = _fs2['default'].readFileSync(_file, { encoding: 'utf-8' });
      var config = JSON.parse(content);
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
  }, {
    key: 'config',
    value: function config(_config) {
      this._checkingConfig(_config);
      Object.assign(this._config, _config);
      return this;
    }

    /**
     * Import and merged config from envrionment variables
     *
     * @param {Array} [whitelist] - An array of whitelist environment varialbes
     * @return {Object} return CfgManager itself for chaining 
     */
  }, {
    key: 'env',
    value: function env(whitelist) {
      var env = process.env;

      if (whitelist && Array.isArray(whitelist)) {
        for (var key in env) {
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
  }, {
    key: 'get',
    value: function get(name) {
      return this._config[name];
    }
  }]);

  return CfgManager;
})();

exports['default'] = CfgManager;
module.exports = exports['default'];