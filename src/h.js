var vtree = require('./vtree');

// Creates an virtual tree using the hyperscript style (recursive).
module.exports = function h(type, props, children) {
  return vtree.apply(vtree, arguments);
}