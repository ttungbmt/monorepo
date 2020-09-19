import {registerComponents} from '@ttungbmt/vuex-toolkit'
import VueFormulate from '@braid/vue-formulate'
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import vi from './locales/vi'

import MField from './components/Field.vue'
import MForm from './components/Form.vue'
import MGrid from './components/Grid.vue'
import MAutocomplete from './components/inputs/Autocomplete.vue'
import MText from './components/inputs/Text.vue'
import MSelect from './components/inputs/Select.vue'
import MRadio from './components/inputs/Radio.vue'


class VuexForm {
    /**
     * Install vue formulate, and register it’s components.
     */
    install (Vue, options) {
        registerComponents(Vue, {
            ValidationProvider,
            ValidationObserver,
            'm-field': MField,
            'm-form': MForm,
            'm-grid': MGrid,
            'm-autocomplete': MAutocomplete,
            'm-text': MText,
            'm-select': MSelect,
            'm-radio': MRadio,
        })

        localize('vi', vi)
        Object.keys(rules).forEach(rule => extend(rule, rules[rule]))

        Vue.use(VueFormulate, {
            library: {
                autocomplete: {classification: 'text', component: 'm-autocomplete'},
                'm-text': {classification: 'text', component: 'm-text'},
                'm-select': {classification: 'text', component: 'm-select'},
                'm-radio': {classification: 'text', component: 'm-radio'},
            },
            errorHandler: (err) => err
        })
    }
}


export default new VuexForm()