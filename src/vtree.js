var vnode = require('./vnode');
var vtext = require('./vtext');
var _ = require('./utils/index');

module.exports = function vtree(type, props, children) {

  if (type === 'text' && _.type(props) === 'string') {
    return createTextNode(props);
  }

  if (arguments.length < 1) {
    throw new Error('Undefined tag name or text content.');
  }

  if ((!_.isDef(type)) || _.type(type) !== 'string') {
    throw new Error('Type must be an real html tag name or an text value.');
  }

  if (_.isDef(props) && _.type(props) !== 'object') {
    throw new Error('Props must be an object representation.');
  }

  if (_.isDef(children) && _.type(children) !== 'array') {
    throw new Error('Children must be an array representation.');
  }

  var nodeType = (arguments.length === 1 && typeof type === 'string') ? 'vtext' : 'vnode';

  switch (nodeType) {

    case 'vtext':
      return createTextNode(type);
      break;

    case 'vnode':
      return createNode(type, props, children);
      break;

  };
  
}

function createTextNode(text) {
  return _.xtend(vtext(text), {
    VTREE: 1
  });
}

function createNode(type, props, children) {
  return _.xtend(vnode(type, props, children), {
    VTREE: 1
  });
}