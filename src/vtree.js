var vnode = require('./vnode');
var vtext = require('./vtext');

module.exports = function vtree(type, props, children) {

  var alen = arguments.length;

  // When someone tries to create an Virtual Text Node using this function
  // only passing the text value as parameter and the type of the text
  // is different from String, then try to parse it to String.
  if ((typeof type !== 'string' || type instanceof Object) && type.toString) {
    type = type.toString();
  }

  var rtp = ((alen === 1 && typeof type === 'string') || (type === 'text')) ? 'VTEXT' : 'VNODE';

  switch (rtp) {
    case 'VTEXT':
      return xtend(vtext(props || type), { VTREE: 1 });
    case 'VNODE':
      return xtend(vnode(type, props, children), { VTREE: 1 });
  };
}

function xtend(a,b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}