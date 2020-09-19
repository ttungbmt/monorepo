import lodash from 'lodash-es';
import Vue2Filters from 'vue2-filters';
import VueLodash from 'vue-lodash';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';

class VuexToolkit {
  install(Vue, config = {}) {
    Vue.use(VueLodash, {
      lodash
    });
    Vue.use(Vue2Filters);
  }

}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function getDefaultPlugin() {
  return [pathify.plugin];
}

function createStore(options) {
  return new Vuex.Store(_extends({
    plugins: getDefaultPlugin()
  }, options));
}

/**
 * Utilities to get information about the current environment
 */
// --- Constants ---
const hasWindowSupport = typeof window !== 'undefined';
const hasDocumentSupport = typeof document !== 'undefined';
const hasNavigatorSupport = typeof navigator !== 'undefined';
const isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport; // Browser type sniffing

const userAgent = isBrowser ? window.navigator.userAgent.toLowerCase() : '';
const isJSDOM = userAgent.indexOf('jsdom') > 0;
const isIE = /msie|trident/.test(userAgent); // Determine if the browser supports the option passive for events

const hasPassiveEventSupport = (() => {
  let passiveEventSupported = false;

  if (isBrowser) {
    try {
      const options = {
        get passive() {
          // This function will be called when the browser
          // attempts to access the passive property.

          /* istanbul ignore next: will never be called in JSDOM */
          passiveEventSupported = true;
        }

      };
      window.addEventListener('test', options, options);
      window.removeEventListener('test', options, options);
    } catch (err) {
      /* istanbul ignore next: will never be called in JSDOM */
      passiveEventSupported = false;
    }
  }

  return passiveEventSupported;
})();

/**
 * Load a group of plugins.
 * @param {object} Vue
 * @param {object} Plugin definitions
 */

const registerPlugins = (Vue, plugins = {}) => {
  for (const plugin in plugins) {
    if (plugin && plugins[plugin]) {
      Vue.use(plugins[plugin]);
    }
  }
};
/**
 * Load a component.
 * @param {object} Vue
 * @param {string} Component name
 * @param {object} Component definition
 */

const registerComponent = (Vue, name, def) => {
  if (Vue && name && def) {
    Vue.component(name, def);
  }
};
/**
 * Load a group of components.
 * @param {object} Vue
 * @param {object} Object of component definitions
 */

const registerComponents = (Vue, components = {}) => {
  for (const component in components) {
    registerComponent(Vue, component, components[component]);
  }
};
/**
 * Load a directive.
 * @param {object} Vue
 * @param {string} Directive name
 * @param {object} Directive definition
 */

const registerDirective = (Vue, name, def) => {
  if (Vue && name && def) {
    // Ensure that any leading V is removed from the
    // name, as Vue adds it automatically
    Vue.directive(name.replace(/^VB/, 'B'), def);
  }
};
/**
 * Load a group of directives.
 * @param {object} Vue
 * @param {object} Object of directive definitions
 */

const registerDirectives = (Vue, directives = {}) => {
  for (const directive in directives) {
    registerDirective(Vue, directive, directives[directive]);
  }
};
/**
 * Install plugin if window.Vue available
 * @param {object} Plugin definition
 */

const vueUse = VuePlugin => {
  /* istanbul ignore next */
  if (hasWindowSupport && window.Vue) {
    window.Vue.use(VuePlugin);
  }
  /* istanbul ignore next */


  if (hasWindowSupport && VuePlugin.NAME) {
    window[VuePlugin.NAME] = VuePlugin;
  }
};

var index = new VuexToolkit();

export default index;
export { createStore, getDefaultPlugin, registerComponent, registerComponents, registerDirective, registerDirectives, registerPlugins, vueUse };
//# sourceMappingURL=vuex-toolkit.modern.js.map
