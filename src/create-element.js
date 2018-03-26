module.exports = function createElement(tree) {

  if (!(tree instanceof Object) || !tree.VTREE) {
    throw new Error('Argument must be virtual dom tree.');
  }

  if (tree.VTEXT) {
    return document.createTextNode(tree.text);
  }

  var el = document.createElement(tree.type);

  if (tree.props && (tree.props instanceof Object)) {
    Object.keys(tree.props).forEach(function(prop) {
      el.setAttribute(prop, tree.props[prop]);
    });
  }

  if (tree.children && Array.isArray(tree.children)) {
    tree.children.map(createElement).forEach(el.appendChild.bind(el));
  }

  return el;
};