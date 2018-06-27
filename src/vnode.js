var _ = require('./utils/index');

module.exports = function vnode(type, props, children) {

  if (!_.isDef(type) || _.type(type) !== 'string') {
    throw new Error('Undefined or incorrect element type for virtual node.');
  }

  if (_.type(props) !== 'object') {
    props = {};
  }

  if (_.type(children) !== 'array') {
    children = [];
  }

  return {
    type: type,
    props: props,
    children: children,
    VNODE: 1,
    VTEXT: 0
  };
  
};