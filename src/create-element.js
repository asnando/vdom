var _ = require('./utils/index');

// Receives an {VirtualTree} and returns an html element.
module.exports = function createElement(vtree) {

  if (_.type(vtree) !== 'object' || !vtree.VTREE) {
    throw new Error('Argument must be virtual tree.');
  }

  if (vtree.VTEXT) {
    return document.createTextNode(vtree.text);
  }

  var el = document.createElement(vtree.type);

  if (_.isDef(vtree.props) && _.type(vtree.props) === 'object') {
    _.keys(vtree.props).forEach(function(prop) {
      el.setAttribute(prop, vtree.props[prop]);
    });
  }

  if (_.isDef(vtree.children) && _.type(vtree.children) === 'array') {
    vtree.children.map(createElement).forEach(el.appendChild.bind(el));
  }

  return el;
};