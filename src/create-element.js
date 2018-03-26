module.exports = function createElement(vtree) {

  if (!(vtree instanceof Object) || !vtree.VTREE) {
    throw new Error('Argument must be virtual dom vtree.');
  }

  if (vtree.VTEXT) {
    return document.createTextNode(vtree.text);
  }

  var el = document.createElement(vtree.type);

  if (vtree.props && (vtree.props instanceof Object)) {
    Object.keys(vtree.props).forEach(function(prop) {
      el.setAttribute(prop, vtree.props[prop]);
    });
  }

  if (vtree.children && Array.isArray(vtree.children)) {
    vtree.children.map(createElement).forEach(el.appendChild.bind(el));
  }

  return el;
};