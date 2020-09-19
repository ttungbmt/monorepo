import VuexToolkit from './VuexToolkit'

export createStore from './createStore'
export getDefaultPlugin from './getDefaultPlugin'

export {
    registerComponent,
    registerComponents,
    registerDirective,
    registerDirectives,
    registerPlugins,
    vueUse
} from './utils/plugins'

export default new VuexToolkit
