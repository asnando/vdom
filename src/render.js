var create = require('./create-element');

/**
 * 
 * @param {HTMLElement} root 
 * The mounting point for the render function.
 * 
 * @param {VTree} a 
 * The new Virtual DOM Tree representation.
 * 
 * @param {VTree} b 
 * The old Virtual DOM Tree representation.
 * 
 * @param {Integer} index 
 * Index used for traversing root children elements.
 * 
 */
module.exports = function render(root, a, b, index = 0, delegator = null) {

  index = !isNaN(index) ? index : 0;
  delegator = delegator ? deletator : (arguments[4] && (arguments[4] instanceof Object)) ? arguments[4] : null;

  // The mount point can't be the body of the html, cuz
  // the body contains multiple elementary elements that stop
  // the this function to work.
  if (document && document.body && (root === document.body)) {
    throw new Error('Root element for render can\'t be the body element.');
  }

  // Checks if root element is HTML Element.
  if (!root || !(root instanceof HTMLElement)) {
    throw new Error('Root element must be used as html element.');
  }

  // Check if the new and one Nodes are of VTREE type, otherwise causes error.
  if ((a && !a.VTREE) || (b && !b.VTREE)) {
    throw new Error('Render function only works with virtual dom trees.');
  }

  function addListener(e) {
    if (delegator && delegator.add && delegator.add instanceof Function) {
      delegator.add(e);
    }
    return e;
  }

  function removeListener(e) {
    if (delegator && delegator.remove && delegator.remove instanceof Function) {
      delegator.remove(e);
    }
    return e;
  }

  // Generally when node "b" is empty, means that we are rendering
  // the element for the first time, and in this case we simply
  // append the elements created by the tree.
  
  // Otherwise, means that we need to analyse the changes from the old
  // and the new state of the tree.

  if (!b) {
    root.appendChild(addListener(create(a)));
  } else if (!a) {
    // Means that the element rendered before no longer exists.
    root.removeChild(root.childNodes[index]);
  } else if (compareNodes(a, b)) {
    // If any change is detected between the node types, replace the last
    // node element with a new one.
    root.replaceChild(addListener(create(a)), removeListener(root.childNodes[index]));
  } else {
    // Otherwise, we walk throught the actual element children's and
    // check for new tree changes.

    if (!a.children) return;

    if (includes(a.children, undefined) || includes(b.children, undefined)) {
      throw new Error('Children array with empty nodes inside it will not be rendered, please check your node tree.');
    }

    var lena = a.children.length;
    var lenb = b.children.length;

    // When old children length is greater than the new one, 
    // means that some children were removed. In this case we iterate the
    // index from the last length of the difference to the beginning.
    if (lenb > lena) {
      for (var i = lenb - 1; i >= lena; i--) {
        render(root.childNodes[index], a.children[i], b.children[i], i, delegator);
      }
      lenb = lena;
    }

    // When normal cases we just iterate from 0 to the length index.
    for (var i = 0; i < lena || i < lenb; i++) {
      render(root.childNodes[index], a.children[i], b.children[i], i, delegator);
    }
  }

  // If the two node trees exists, check for props (e.g attributes)
  // changes, and updates it inside the real DOM element.
  // This process occurs outside the above statements cuz it dont't change
  // the tree of the elements.
  if (a && b && compareProps(a, b)) {
    applyProps(root.childNodes[index], a.props, b.props);
    addListener(root.childNodes[index]);
  }
};

function compareNodes(a, b) {
  return typeof a !== typeof b
    || (!a.hasOwnProperty('type') && a.hasOwnProperty('text') && a.text !== b.text)
    || a.type !== b.type;
}

function compareProps(a, b) {
  // Props (attributes) only exists in normal Node elements,
  // not in Text Nodes.
  if (a.VTEXT) {
    return false;
  }
  return !equals(a.props, b.props);
}

function applyProps(el, a, b) {
  var props = b ? objectDiff(b, a) : a;
  Object.keys(props).forEach(function(prop) {
    el.setAttribute(prop, props[prop]);
  });
}


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