var h = require('./h');

module.exports = function parse2Tree(e) {

  if (type(e) === 'text') {
    return h('text', e.nodeValue);
  }

  if (typeof e === 'string') {
    e = e.replace(/\s{2,}/g, '');
    e = parse2HTML(e);
  }

  var props = {};
  [].slice.call(e.attributes).forEach(function(attr) {
    props[attr.name] = attr.value;
  });

  var children = [].slice.call(e.childNodes).map(parse2Tree);

  return h(e.tagName, props, children);
}

function parse2HTML(h) {
  var w = document.createElement('div');
  w.innerHTML = h;
  return w.childNodes[0];
}

function type(a) {
  return Object.prototype.toString.call(a).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}