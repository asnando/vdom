module.exports = function objectDiff(a, b) {
  var diff = {};
  keys(b).forEach(function(key) {
    if (!a.hasOwnProperty(key) || a[key] !== b[key]) {
      diff[key] = b[key];
    }
  });
  return diff;
}

function keys(object) {
  return Object.keys(object);
}
