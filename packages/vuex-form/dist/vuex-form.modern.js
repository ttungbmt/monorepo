import { registerComponents } from '@ttungbmt/vuex-toolkit';
import VueFormulate from '@braid/vue-formulate';
import { ValidationProvider, ValidationObserver, localize, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { isUndefined, isString, debounce, isEmpty, isPlainObject, omit, get } from 'lodash-es';
import uniqid from 'uniqid';
import FormulateInputMixin from '@braid/vue-formulate/src/FormulateInputMixin';
import vSelect from 'vue-select';
import 'vue-select/src/scss/vue-select.scss';

var actions = {};

var modules = {};

var mutations = {};

var getters = {};

const defaultState = {
  cats: {},
  items: []
};
var index = {
  state: defaultState,
  actions,
  getters,
  mutations,
  modules
};

var vi = {
  "code": "vi",
  "messages": {
    "alpha": "{_field_} chỉ có thể chứa các kí tự chữ",
    "alpha_dash": "{_field_} có thể chứa các kí tự chữ (A-Z a-z), số (0-9), gạch ngang (-) và gạch dưới (_)",
    "alpha_num": "{_field_} chỉ có thể chứa các kí tự chữ và số",
    "alpha_spaces": "{_field_} chỉ có thế chứa các kí tự và khoảng trắng",
    "between": "{_field_} phải có giá trị nằm trong khoảng giữa {min} và {max}",
    "confirmed": "{_field_} khác với {target}",
    "digits": "Trường {_field_} chỉ có thể chứa các kí tự số và bắt buộc phải có độ dài là {length}",
    "dimensions": "{_field_} phải có chiều rộng {width} pixels và chiều cao {height} pixels",
    "email": "{_field_} phải là một địa chỉ email hợp lệ",
    "excluded": "{_field_} không phải là một giá trị hợp lệ",
    "ext": "{_field_} phải là một tệp",
    "image": "Trường {_field_} phải là một ảnh",
    "oneOf": "{_field_} không phải là một giá trị hợp lệ",
    "max": "{_field_} không thể có nhiều hơn {length} kí tự",
    "max_value": "{_field_} phải nhỏ hơn hoặc bằng {max}",
    "mimes": "{_field_} phải chứa kiểu tệp phù hợp",
    "min": "{_field_} phải chứa ít nhất {length} kí tự",
    "min_value": "{_field_} phải lớn hơn hoặc bằng {min}",
    "numeric": "{_field_} chỉ có thể có các kí tự số",
    "regex": "{_field_} có định dạng không đúng",
    "required": "{_field_} là bắt buộc",
    "required_if": "{_field_} là bắt buộc",
    "size": "{_field_} chỉ có thể chứa tệp nhỏ hơn {size}KB",
    "integer": "{_field_} phải là một số nguyên.",
    "max_field_value": "{_field_} phải nhỏ hơn hoặc bằng {target}",
    "min_field_value": "{_field_} phải lớn hoặc bằng {target}"
  }
};

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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var script = {
  inheritAttrs: false,
  name: 'MField',
  inject: {
    getFormConfig: {
      default: () => () => ({})
    }
  },
  props: {
    name: String,
    model: String,
    rules: [String, Array, Object],
    customRules: Object,
    messages: [Object],
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: undefined
    }
  },

  data() {
    return {
      innerValue: this.value,
      shownError: false
    };
  },

  computed: {
    vid() {
      return this.model ? this.model : this.name;
    },

    computedAttrs() {
      let attrs = Object.assign({}, this.$attrs);

      if (attrs.type === 'm-radio') {
        if (isUndefined(attrs.inline)) attrs.elementClass = ['flex gap-4 pt-2'];
        if (isString(attrs.items)) attrs.items = this.$store.getters['form/getCat'](attrs.items).map(v => _extends({
          id: uniqid()
        }, v));
      }

      return attrs;
    },

    errorBehavior() {
      return 'blur';
    },

    modelValue: {
      get() {
        if (this.model) {
          const {
            index
          } = this.getFormConfig();
          return this.$store.getters['form/getFormValue']({
            index,
            field: this.model
          });
        }

        return this.innerValue;
      }

    }
  },
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal);
      if (this.model) this.debouncedModel();
    },

    modelValue(newVal) {
      if (newVal !== this.innerValue) this.innerValue = newVal;
    }

  },

  created() {
    if (this.model) {
      const {
        index
      } = this.getFormConfig();
      this.$store.commit('form/registerField', {
        index,
        field: this.model
      });
    }
  },

  methods: {
    onValidation(err) {
      this.$refs.provider.setErrors(Object.assign([], err.errors));
    },

    onShownValidation(val) {
      this.shownError = val;
    },

    debouncedModel: debounce(function () {
      const {
        index
      } = this.getFormConfig();
      this.$store.commit('form/updateFormValue', {
        index,
        field: this.model,
        value: this.innerValue
      });
    }, 300)
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  const options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  let hook;

  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      const originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      const existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("ValidationProvider", {
    ref: "provider",
    attrs: { name: _vm.$attrs.label, vid: _vm.vid, tag: "div", slim: "" },
    scopedSlots: _vm._u([
      {
        key: "default",
        fn: function(ref) {
          return [
            _c(
              "FormulateInput",
              _vm._b(
                {
                  attrs: {
                    name: _vm.name,
                    "error-behavior": _vm.errorBehavior,
                    validation: _vm.rules,
                    "validation-rules": _vm.customRules,
                    "validation-messages": _vm.messages
                  },
                  on: {
                    validation: _vm.onValidation,
                    "error-visibility": _vm.onShownValidation
                  },
                  model: {
                    value: _vm.innerValue,
                    callback: function($$v) {
                      _vm.innerValue = $$v;
                    },
                    expression: "innerValue"
                  }
                },
                "FormulateInput",
                _vm.computedAttrs,
                false
              )
            )
          ]
        }
      }
    ])
  })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var script$1 = {
  inheritAttrs: false,
  name: 'MForm',

  provide() {
    return {
      getFormConfig: this.getFormConfig
    };
  },

  props: {
    name: {
      type: [String, Boolean],
      default: false
    },
    initialValues: {
      type: Object
    },
    builder: {
      type: Object,
      default: {
        method: 'POST',
        schema: false
      }
    }
  },
  computed: {
    computedSchema() {
      if (this.builder.schema) return this.builder.schema.filter(v => !isEmpty(v)).map((_ref) => {
        let {
          component = 'm-field'
        } = _ref,
            v = _objectWithoutPropertiesLoose(_ref, ["component"]);

        return _extends({
          component
        }, v);
      });
      return this.builder.schema;
    }

  },

  created() {
    this.$store.commit('form/registerForm', {
      key: this.name,
      initialValues: this.initialValues
    });
  },

  mounted() {},

  methods: {
    getFormConfig() {
      return {
        index: this.$store.getters['form/getFormIndex'](this.name),
        name: this.name
      };
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "ValidationObserver",
    { attrs: { slim: "" } },
    [
      _c(
        "FormulateForm",
        _vm._g(
          _vm._b(
            {
              ref: "form",
              attrs: { name: _vm.name, schema: _vm.computedSchema }
            },
            "FormulateForm",
            _vm.$attrs,
            false
          ),
          _vm.$listeners
        ),
        [
          _c("FormulateErrors"),
          _vm._v(" "),
          _vm._t("default"),
          _vm._v(" "),
          _vm.builder.actions
            ? _c("FormulateSchema", {
                attrs: { schema: _vm.builder.actions.schema }
              })
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
var script$2 = {
  inheritAttrs: false,
  name: 'm-grid',
  props: {
    cols: {
      type: Number,
      default: 4
    },
    gap: {
      type: Number,
      default: 4
    },
    schema: Array
  },
  computed: {
    innerClass() {
      let clx = ['grid'];
      if (this.cols) clx.push(`grid-cols-${this.cols}`);
      if (this.gap) clx.push(`gap-${this.gap}`);
      return clx;
    }

  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.innerClass }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$3 = {
  name: 'MAutocomplete',
  props: {
    context: {
      type: Object,
      required: true
    }
  },

  data() {
    return {};
  }

};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  return _vm._m(0)
};
var __vue_staticRenderFns__$3 = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_c("input")])
  }
];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$4 = {
  name: 'BText',
  mixins: [FormulateInputMixin],
  computed: {
    model: {
      get() {
        return this.context.model;
      },

      set(val) {
        this.context.model = val;
      }

    }
  },

  data() {
    return {};
  }

};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "b-form-input",
    _vm._b(
      {
        model: {
          value: _vm.model,
          callback: function($$v) {
            _vm.model = $$v;
          },
          expression: "model"
        }
      },
      "b-form-input",
      _vm.attributes,
      false
    )
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$5 = {
  name: 'BSelect',
  mixins: [FormulateInputMixin],
  components: {
    vSelect
  },

  data() {
    return {
      selected: null,
      foods: ['Carrots', {
        text: 'ZZZ',
        value: 'ZZZ'
      }]
    };
  },

  methods: {
    reduceHandler(item) {
      if (isPlainObject(item)) return item.value;
      return item;
    }

  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("v-select", {
    attrs: {
      options: _vm.foods,
      label: "text",
      reduce: _vm.reduceHandler,
      placeholder: "Choose..."
    },
    model: {
      value: _vm.selected,
      callback: function($$v) {
        _vm.selected = $$v;
      },
      expression: "selected"
    }
  })
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

var InputMixin = {
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  computed: {
    type() {
      return this.context.type;
    },

    attributes() {
      return omit(this.context.attributes, ['items']) || {};
    },

    hasValue() {
      return this.context.hasValue;
    },

    items() {
      return get(this.context, 'attributes.items', []);
    },

    model: {
      get() {
        return this.context.model;
      },

      set(val) {
        this.context.model = val;
      }

    }
  }
};

//
var script$6 = {
  name: 'BRadio',
  mixins: [InputMixin],
  computed: {
    inline() {
      return isUndefined(this.attributes.inline) ? true : this.attributes.inline;
    }

  },

  data() {
    return {
      selected: null
    };
  }

};

const isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return (id, style) => addStyle(id, style);
}

let HEAD;
const styles = {};

function addStyle(id, css) {
  const group = isOldIE ? css.media || 'default' : id;
  const style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    let code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      const index = style.ids.size - 1;
      const textNode = document.createTextNode(code);
      const nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "b-form-radio-group",
    _vm._b(
      {
        attrs: {
          options: _vm.items,
          stacked: !_vm.inline,
          "value-field": "value",
          "text-field": "label"
        },
        model: {
          value: _vm.model,
          callback: function($$v) {
            _vm.model = $$v;
          },
          expression: "model"
        }
      },
      "b-form-radio-group",
      _vm.attributes,
      false
    )
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-57f2fb00_0", { source: "\ninput[type=\"radio\"].custom-control-input {position: absolute;}\n", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

class VuexForm {
  /**
   * Install vue formulate, and register it’s components.
   */
  install(Vue, options) {
    registerComponents(Vue, {
      ValidationProvider,
      ValidationObserver,
      'm-field': __vue_component__,
      'm-form': __vue_component__$1,
      'm-grid': __vue_component__$2,
      'm-autocomplete': __vue_component__$3,
      'm-text': __vue_component__$4,
      'm-select': __vue_component__$5,
      'm-radio': __vue_component__$6
    });
    localize('vi', vi);
    Object.keys(rules).forEach(rule => extend(rule, rules[rule]));
    Vue.use(VueFormulate, {
      library: {
        autocomplete: {
          classification: 'text',
          component: 'm-autocomplete'
        },
        'm-text': {
          classification: 'text',
          component: 'm-text'
        },
        'm-select': {
          classification: 'text',
          component: 'm-select'
        },
        'm-radio': {
          classification: 'text',
          component: 'm-radio'
        }
      },
      errorHandler: err => err
    });
  }

}

var VuexForm$1 = new VuexForm();

export { VuexForm$1 as VuexForm, index as storeModule };
//# sourceMappingURL=vuex-form.modern.js.map
