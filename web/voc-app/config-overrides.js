const { override } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')
/*
* https://github.com/osdevisnot/react-app-rewire-contrib/blob/master/packages/react-app-rewire-emotion/index.js
* https://github.com/withspectrum/react-app-rewire-styled-components
* https://github.com/stk-dmitry/react-app-rewire-date-fns
* https://github.com/lwd-technology/react-app-rewire-provide-plugin
* https://github.com/byzyk/react-app-rewire-webpack-bundle-analyzer
* https://github.com/hsz/react-app-rewire-yaml
* https://github.com/osdevisnot/react-app-rewire-contrib/tree/master/packages/react-app-rewire-react-library
* https://github.com/andriijas/react-app-rewire-vendor-splitting
* https://github.com/cdharris/react-app-rewire-hot-loader
* https://github.com/oklas/react-app-rewire-alias
* */

module.exports = function override(config, env) {
    addReactRefresh()(config)

    return config
}