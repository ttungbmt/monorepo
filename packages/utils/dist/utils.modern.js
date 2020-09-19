import { isString } from 'lodash-es';
import dotenv from 'dotenv';
import { toLower } from 'lodash';
import collect from 'collect.js';

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
  if (isString(val)) {
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

function env(key, _default = null) {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  return collect(result.parsed).map(v => {
    switch (toLower(v)) {
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

export { env, toBool };
//# sourceMappingURL=utils.modern.js.map
