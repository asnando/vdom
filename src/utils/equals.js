module.exports = function equals(a, b) {
  return jpretty(a) === jpretty(b);
}

function jpretty(j, t) {
  return JSON.stringify(j, null, t || 0);
}