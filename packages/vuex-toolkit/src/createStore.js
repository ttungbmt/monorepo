import Vuex from 'vuex'
import getDefaultPlugin from './getDefaultPlugin'

function createStore(options) {
    return new Vuex.Store({
        plugins: getDefaultPlugin(),
        ...options
    })
}


export default createStore