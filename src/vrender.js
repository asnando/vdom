var create = require('./create-element');
var handler = require('./vhandler');

module.exports = function render(root, a, b, index = 0) {

  if (document && document.body && (root === document.body)) {
    throw new Error('Root element for render can\'t be the body element.');
  }

  if (!root || !(root instanceof HTMLElement)) {
    throw new Error('Root element must be used as html element.');
  }

  if ((a && !a.VTREE) || (b && !b.VTREE)) {
    throw new Error('Render function only works with virtual dom nodes.');
  }

  if (!b) {
    // If no old node, then just append the new node to the root element.
    root.appendChild(create(a));
  } else if (!a) {
    // Empty new node.
    root.removeChild(root.childNodes[index]);
  } else if (compareNodes(a, b)) {
    // Compare node differences type differences.
    root.replaceChild(create(a), root.childNodes[index]);
  } else {

    // Compare each child of the root element, if exists.
    if (!a.children) return;

    if (includes(a.children, undefined) || includes(b.children, undefined)) {
      throw new Error('Children array with empty nodes inside it will not be rendered, please check your node tree.');
    }

    var lena = a.children.length;
    var lenb = b.children.length;

    // When old children length is greater than the new one, 
    // means that some children were removed. In this case we iterate the
    // index from the last length of the difference to the beginning.
    // # Resolves a bug.
    if (lenb > lena) {
      for (var i = lenb - 1; i >= lena; i--) {
        render(root.childNodes[index], a.children[i], b.children[i], i);
      }
      lenb = lena;
    }

    // Otherwise in normal cases we just iterate from 0 to the index.
    for (var i = 0; i < lena || i < lenb; i++) {
      render(root.childNodes[index], a.children[i], b.children[i], i);
    }
  }

  if (a && b && compareProps(a, b)) {
    // Props changed.
    applyProps(root.childNodes[index], a.props, b.props);
  }

};

function compareNodes(a, b) {
  return typeof a !== typeof b
    || (!a.hasOwnProperty('type') && a.hasOwnProperty('text') && a.text !== b.text)
    || a.type !== b.type;
}

function compareProps(a, b) {
  // Do not compare text nodes.
  if (a.VTEXT) return false;
  return !equals(a.props, b.props);
}

function applyProps(el, a, b) {
  // a = new
  // b = old
  var props = b ? objectDiff(b, a) : a;
  Object.keys(props).forEach(function(prop) {
    el.setAttribute(prop, props[prop]);
  });
}


// ********
function objectDiff(a, b) {
  var diff = {};
  Object.keys(b).forEach(function(key) {
    if (!a.hasOwnProperty(key) || a[key] !== b[key]) {
      diff[key] = b[key];
    }
  });
  return diff;
}

function equals(a, b) {
  return jpretty(a) === jpretty(b);
}

function jpretty(j, t) {
  return JSON.stringify(j, null, t || 0);
}

function includes(a, v) {
  for (var index = 0; index < a.length; index++) {
    if (a[index] === v) return true;
  }
  return false;
}