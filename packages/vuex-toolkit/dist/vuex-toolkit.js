function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var lodash = _interopDefault(require('lodash-es'));
var Vue2Filters = _interopDefault(require('vue2-filters'));
var VueLodash = _interopDefault(require('vue-lodash'));
var Vuex = _interopDefault(require('vuex'));
var pathify = _interopDefault(require('vuex-pathify'));

var VuexToolkit = /*#__PURE__*/function () {
  function VuexToolkit() {}

  var _proto = VuexToolkit.prototype;

  _proto.install = function install(Vue, config) {

    Vue.use(VueLodash, {
      lodash: lodash
    });
    Vue.use(Vue2Filters);
  };

  return VuexToolkit;
}();

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
var hasWindowSupport = typeof window !== 'undefined';
var hasDocumentSupport = typeof document !== 'undefined';
var hasNavigatorSupport = typeof navigator !== 'undefined';
var isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport; // Browser type sniffing

var userAgent = isBrowser ? window.navigator.userAgent.toLowerCase() : '';
var isJSDOM = userAgent.indexOf('jsdom') > 0;
var isIE = /msie|trident/.test(userAgent); // Determine if the browser supports the option passive for events

var hasPassiveEventSupport = function () {
  var passiveEventSupported = false;

  if (isBrowser) {
    try {
      var options = {
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
}();

/**
 * Load a group of plugins.
 * @param {object} Vue
 * @param {object} Plugin definitions
 */

var registerPlugins = function registerPlugins(Vue, plugins) {
  if (plugins === void 0) {
    plugins = {};
  }

  for (var plugin in plugins) {
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

var registerComponent = function registerComponent(Vue, name, def) {
  if (Vue && name && def) {
    Vue.component(name, def);
  }
};
/**
 * Load a group of components.
 * @param {object} Vue
 * @param {object} Object of component definitions
 */

var registerComponents = function registerComponents(Vue, components) {
  if (components === void 0) {
    components = {};
  }

  for (var component in components) {
    registerComponent(Vue, component, components[component]);
  }
};
/**
 * Load a directive.
 * @param {object} Vue
 * @param {string} Directive name
 * @param {object} Directive definition
 */

var registerDirective = function registerDirective(Vue, name, def) {
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

var registerDirectives = function registerDirectives(Vue, directives) {
  if (directives === void 0) {
    directives = {};
  }

  for (var directive in directives) {
    registerDirective(Vue, directive, directives[directive]);
  }
};
/**
 * Install plugin if window.Vue available
 * @param {object} Plugin definition
 */

var vueUse = function vueUse(VuePlugin) {
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

exports.createStore = createStore;
exports.default = index;
exports.getDefaultPlugin = getDefaultPlugin;
exports.registerComponent = registerComponent;
exports.registerComponents = registerComponents;
exports.registerDirective = registerDirective;
exports.registerDirectives = registerDirectives;
exports.registerPlugins = registerPlugins;
exports.vueUse = vueUse;
//# sourceMappingURL=vuex-toolkit.js.map
