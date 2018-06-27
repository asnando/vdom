module.exports = function includes(a, v) {
  for (var index = 0; index < a.length; index++) {
    if (a[index] === v) return true;
  }
  return false;
}