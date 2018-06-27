var h = require('./h');
var _ = require('./utils/index');

module.exports = function parse2Tree(e) {

  if (/text/.test(_.type(e))) {
    return h('text', e.nodeValue);
  }

  if (_.type(e) === 'string') {
    e = e.replace(/\s{2,}/g, '');
    e = _.toHTML(e);
  }

  var props    = elementAttrs(e);
  var children = _.from(e.childNodes).map(parse2Tree);

  return h(e.tagName, props, children);
}

function elementAttrs(el) {

  var attrs = {};
  
  _.from(el.attributes).forEach(function(attr) {
    attrs[attr.name] = attr.value;
  });

  return attrs;

}