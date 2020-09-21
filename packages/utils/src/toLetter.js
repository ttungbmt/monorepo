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

import {lowerCase} from 'lodash-es'

function toLetter(int, isLowercase = false) {
    let letter = String.fromCharCode((int-1) + 65)
    return isLowercase ? lowerCase(letter) : letter
}

export default toLetter