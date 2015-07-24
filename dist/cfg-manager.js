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
    key: '_isNumeric',
    value: function _isNumeric(number) {
      return !isNaN(parseFloat(number)) && isFinite(number);
    }

    /**
     * Import and merge config from a JSON file
     *
     * @param {String} file - Path to a config JSON file
     * @return {Object} return a merged config
     */
  }, {
    key: 'file',
    value: function file(_file) {
      var content = _fs2['default'].readFileSync(_file, { encoding: 'utf-8' });
      var config = JSON.parse(content);
      Object.assign(this._config, config);
      return this._config;
    }

    /**
     * Import and merge config from given config object
     *
     * @param {Object} config - Config object
     * @return {Object} return a merged config
     */
  }, {
    key: 'config',
    value: function config(_config) {
      Object.assign(this._config, _config);
      return this._config;
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
      var config = this._config;
      var env = process.env;

      for (var key in env) {
        if (config[key] !== undefined) {
          var value = env[key];
          // Convert string into number if it's a number
          config[key] = this._isNumeric(value) ? parseFloat(value) : value;
        }
      }

      return config[name];
    }
  }]);

  return CfgManager;
})();

exports['default'] = CfgManager;
module.exports = exports['default'];