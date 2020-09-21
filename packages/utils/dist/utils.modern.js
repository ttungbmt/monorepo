import { isString, lowerCase } from 'lodash-es';
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

/**
 * @render utils
 * @name toRoman
 * @param num
 * @returns {string}
 * @description Convert number to roman.
 * https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-roman-numeral-converter/16044
 * @example
 * toRoman(1); // -> I
 * toRoman(2); // -> II
 */

function toRoman(num, isLowercase) {
  if (typeof num !== 'number') return false;
  let digits = String(+num).split(""),
      key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
      roman_num = "",
      i = 3;

  while (i--) roman_num = (key[+digits.pop() + i * 10] || "") + roman_num;

  let romanStr = Array(+digits.join("") + 1).join("M") + roman_num;
  return isLowercase ? lowerCase(romanStr) : romanStr;
}

/**
 * @render utils
 * @name toLetter
 * @param int
 * @param uppercase
 * @returns {string}
 * @example
 * toLetter(1); // -> a
 * toLetter(1, true); // -> A
 */

function toLetter(int, isLowercase = false) {
  let letter = String.fromCharCode(int - 1 + 65);
  return isLowercase ? lowerCase(letter) : letter;
}

export { env, toBool, toLetter, toRoman };
//# sourceMappingURL=utils.modern.js.map
