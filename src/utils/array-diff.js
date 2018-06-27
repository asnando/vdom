var type = require('./type');
var equals = require('./equals');

module.exports = function arrayDiff(a,b) {

  if (a.length !== b.length) {
    return true;
  }

  for (var counter=0; counter<a.length; a++) {
    if (type(a[counter]) === 'object' && !equals(a[counter], b[counter])) {
      return true;
    } else if (a[counter] !== b[counter]) {
      return true;
    }
  }

  return false;
}