import dotenv from 'dotenv'
import { toLower } from 'lodash'
import collect from 'collect.js'

/**
 * @static
 * @description Gets the value of an environment variable.
 * @param {string} key
 * @param {mixed} _default
 * @return {mixed}
 */

function env(key, _default = null) {
    const result = dotenv.config()

    if (result.error) {
        throw result.error
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
    }).get(key, _default)
}

export default env