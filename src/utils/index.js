module.exports = {
  from:       req('from'),
  toHTML:     req('toHTML'),
  type:       req('type'),
  xtend:      req('xtend'),
  isDef:      req('isDef'),
  isNumber:   req('isNumber'),
  objectDiff: req('object-diff'),
  arrayDiff:  req('array-diff'),
  equals:     req('equals'),
  includes:   req('includes')
};

function req(mod) {
  return require('./' + mod + '.js');
}