var vnode = require('./vnode');
var vtext = require('./vtext');
// var create = require('./create-element');

function xtend(a,b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

module.exports = function h(type, props, children) {

  var alen = arguments.length;

  if ((typeof type !== 'string' || type instanceof Object) && type.toString) {
    type = type.toString();
  }

  // Check if number !!!!

  var rtp = ((alen === 1 && typeof type === 'string') || (type === 'text'))
    ? 'VTEXT' : 'VNODE';

  switch (rtp) {
    case 'VTEXT':
      return xtend(vtext(props || type), { VTREE: 1 });
      break;
    case 'VNODE':
      return xtend(vnode(type, props, children), { VTREE: 1 });
      break;
  };


  // if (!type) {
  //   throw new Error('Undefined node type.');
  // }

  // if (((arguments.length === 1) && (typeof type === 'string')) || (type === 'text')) {
  //   return document.createTextNode(props || type);
  // }

  // var el = document.createElement(type);

  // if (props && props instanceof Object) {
  //   Object.keys(props).forEach(function(prop) {
  //     el.setAttribute(prop, props[prop]);
  //   });
  // }

  // if (Array.isArray(children)) {
  //   children.map(function(child) {
  //     console.log(child);
  //     // return h.apply(null, child);
  //   })
  //   // .forEach(function(child) {
  //   //   console.log(child);
  //   // });
  // }

  // return el;
}