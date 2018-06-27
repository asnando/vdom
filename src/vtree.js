var vnode = require('./vnode');
var vtext = require('./vtext');
var _ = require('./utils/index');

module.exports = function vtree(type, props, children) {

  console.warn(type, props, children);

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

  if (_.isDef(children)) {
    children = children.map(function (child) {
      return vtree(child);
    });
  }

  var nodeType = (arguments.length === 1 && typeof type === 'string') ? 'vtext' : 'vnode';

  switch (nodeType) {

    case 'vtext':
      return _.xtend(vtext(type), {
        VTREE: 1
      });

    case 'vnode':
      return _.xtend(vnode(type, props, children), {
        VTREE: 1
      });

  };
  
}