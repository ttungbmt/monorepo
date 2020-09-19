import {get} from 'lodash-es'
import { vueSet } from 'vue-deepset'
/**
 * @param {Object} store  The store object
 */
function plugin (store) {

    /**
     * Set a property on the store, automatically using actions or mutations
     *
     * @param   {string}        path    The path to the store member
     * @param   {*}             value   The value to set
     * @returns {Promise|*}             Any return value from the action / commit
     */
    store.setIn = function (path, value) {
        vueSet(path, value)
    }

    /**
     * Get a property from the store, automatically using getters or state
     *
     * @param   {string}        path    The path to the store member
     * @param   {null}             defaultValue    Optional getter function parameters
     * @returns {*|undefined}           The state value / getter value / getter function / or undefined
     */
    store.getIn = function (path, defaultValue = null) {
        return get(path, defaultValue)
    }

}