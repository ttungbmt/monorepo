const componentGenerator = require('./component/index.js')

module.exports = (plop, config) => {
    plop.setGenerator('component', componentGenerator)
};