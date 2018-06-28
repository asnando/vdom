var _ = require('./utils/index');
var h = require('./h');

module.exports = function parser(e) {
  
  if (/text/.test(_.type(e))) {
    return h('text', e.nodeValue);
  }

  if (_.type(e) === 'string') {
    e = _.toHTML(e);
  }

  if (!/html/.test(_.type(e))) {
    throw new Error('Value is not a valid html element.');
  }

  var tagName = e.tagName.toLowerCase();

  var props = describeProps(e);

  var children = _.from(e.childNodes).map(parser);

  return h(tagName, props, children);

}

function describeProps(el) {

  var props = {};

  if (!/html/.test(_.type(el))) {
    return props;
  }

  _.from(el.attributes).forEach(function(attr) {
    props[attr.name] = attr.value;
  });

  return props;

}