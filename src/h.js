var vtree = require('./vtree');

module.exports = function h(type, props, children) {
  return vtree.apply(vtree, arguments);
}