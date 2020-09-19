import actions from './actions'
import modules from './modules'
import mutations from './mutations'
import getters from './getters'

const defaultState = {
    cats: {},
    items: []
}

export default {
    state: defaultState,
    actions,
    getters,
    mutations,
    modules,
}