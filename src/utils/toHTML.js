module.exports = function toHTML(str) {
  
  var root = document.createElement('div');
  
  root.innerHTML = str;

  if (root.childNodes.length > 1) {
    console.warn('More thant one child returned when parsing template string to DOM element.');
  }

  return root.childNodes[0];
}