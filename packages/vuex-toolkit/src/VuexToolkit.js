import lodash from 'lodash-es'
import Vue2Filters from 'vue2-filters'
import VueLodash from 'vue-lodash'

export default class VuexToolkit {
    install(Vue, config = {}){
        Vue.use(VueLodash, { lodash })
        Vue.use(Vue2Filters)
    }
}

