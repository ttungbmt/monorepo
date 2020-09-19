function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var lodashEs = require('lodash-es');
var dotenv = _interopDefault(require('dotenv'));
var lodash = require('lodash');
var collect = _interopDefault(require('collect.js'));

/**
 * @render utils
 * @name toBool
 * @param val
 * @returns {boolean}
 * @description Convert value to a boolean.
 * @example
 * toBool(true); // -> true
 * toBool(null); // -> false
 * toBool(1); // -> true
 * toBool(0); // -> false
 * toBool('0'); // -> false
 * toBool('1'); // -> true
 * toBool('false'); // -> false
 */

function toBool(val) {
  if (lodashEs.isString(val)) {
    val = val.toLowerCase();
    return val !== '0' && val !== '' && val !== 'false';
  }

  return !!val;
}

/**
 * @static
 * @description Gets the value of an environment variable.
 * @param {string} key
 * @param {mixed} _default
 * @return {mixed}
 */

function env(key, _default) {
  if (_default === void 0) {
    _default = null;
  }

  var result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  return collect(result.parsed).map(function (v) {
    switch (lodash.toLower(v)) {
      case 'true':
      case '(true)':
        return true;

      case 'false':
      case '(false)':
        return false;

      case 'empty':
      case '(empty)':
        return '';

      case 'null':
      case '(null)':
        return;
    }

    return v;
  }).get(key, _default);
}

exports.env = env;
exports.toBool = toBool;
//# sourceMappingURL=utils.js.map
