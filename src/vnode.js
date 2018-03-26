module.exports = function vnode(type, props, children) {

  return {
    type: type,
    props: props,
    children: children,
    VNODE: 1,
    VTEXT: 0
  };
  
};