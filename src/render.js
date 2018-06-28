var _ = require('./utils/index');
var createElement = require('./create-element');

/**
 * 
 * @param {HTMLElement} root 
 * The element where the tree will be mounted.
 * 
 * @param {VTree} nTree 
 * The new Virtual DOM Tree representation.
 * 
 * @param {VTree} oTree 
 * The old Virtual DOM Tree representation (optional).
 * 
 * @param {Object} delegator
 * Object containing the add and remove methods which manages
 * the event listeners for the created elements.
 * 
 * @param {Integer} index 
 * Index used for traversing root children elements.
 * 
 */
module.exports = function render(root, nTree, oTree, delegator, index) {

  index = !_.isDef(index) ? 0 : index;

  // The mount point can't be the body of the html, cuz
  // the body contains multiple elementary elements that stop
  // the this function to work.
  if (document && document.body && (root === document.body)) {
    throw new Error('Root element for render should not be the body element.');
  }

  // // Checks if root element is HTML Element.
  if (!root || !/html/.test(_.type(root))) {
    throw new Error('Root element must be an html element.');
  }

  // This function can receive an array of trees instead of a full tree for the
  // objects a and b. In this case, it will iterate throught the array like
  // the loop of the children of virtual node.
  var isArrayTree = (_.isDef(nTree) && _.type(nTree) === 'array' && nTree[0].VTREE)
    || (_.isDef(oTree) && _.type(oTree) === 'array' && oTree[0].VTREE);

  // Check if the new and one Nodes are of VTREE type, otherwise causes error.
  if (!isArrayTree && ((_.isDef(nTree) && !nTree.VTREE) || (_.isDef(oTree) && !oTree.VTREE))) {
    throw new Error('Render function only works with virtual dom trees.');
  }

  function addListener(e) {
    if (delegator && delegator.add && _.type(delegator.add) === 'function') {
      delegator.add(e);
    }
    return e;
  }

  function removeListener(e) {
    if (delegator && delegator.remove && _.type(delegator.remove) === 'function') {
      delegator.remove(e);
    }
    return e;
  }

  // Generally when node "b" is empty, means that we are rendering
  // the element for the first time, and in this case we simply
  // append the elements created by the tree.
  
  // Otherwise, means that we need to analyse the changes from the old
  // and the new state of the tree.

  if (!oTree && !isArrayTree) {

    root.appendChild(addListener(createElement(nTree)));

  } else if (!nTree && !isArrayTree) {
    
    // Means that the element rendered before no longer exists.
    root.removeChild(removeListener(root.childNodes[index]));

  } else if (nTree && oTree && compareNodes(nTree, oTree)) {

    // If any change is detected between the node types, replace the last
    // node element with a new one.
    root.replaceChild(addListener(createElement(nTree)), removeListener(root.childNodes[index]));

  } else if (isArrayTree) {

    var lena = nTree ? nTree.length : 0;
    var lenb = oTree ? oTree.length : 0;

    if (lenb > lena) {
      for (var i = lenb - 1; i >= lena; i--) {
        render(root, nTree[i], oTree[i], delegator, i);
      }
    }

    for (var i = 0; i < lena; i++) {
      render(root, nTree[i], oTree ? oTree[i] : null, delegator, i);
    }

  } else if (compareChildren(nTree, oTree)) {

    // Otherwise, we walk throught the actual element children's and
    // check for new tree changes.

    if (!nTree.children) return;

    if (_.includes(nTree.children, undefined) || _.includes(oTree.children, undefined)) {
      throw new Error('Children array with empty nodes inside it will not be rendered, please check your node tree.');
    }

    var lena = nTree.children.length;
    var lenb = oTree.children.length;

    // When old children length is greater than the new one, 
    // means that some children were removed. In this case we iterate the
    // index from the last length of the difference to the beginning.
    if (lenb > lena) {
      for (var i = lenb - 1; i >= lena; i--) {
        render(root.childNodes[index], nTree.children[i], oTree.children[i], delegator, i);
      }
      lenb = lena;
    }

    // When normal cases we just iterate from 0 to the length index.
    for (var i = 0; i < lena || i < lenb; i++) {
      render(root.childNodes[index], nTree.children[i], oTree.children[i], delegator, i);
    }
  }

  // If the two node trees exists, check for props (e.g attributes)
  // changes, and updates it inside the real DOM element.
  // This process occurs outside the above statements cuz it dont't change
  // the tree of the elements.
  if (nTree && oTree && compareProps(nTree, oTree)) {
    applyProps(root.childNodes[index], nTree.props, oTree.props);
    addListener(root.childNodes[index]);
  }

};

function compareNodes(a, b) {
  return typeof a !== typeof b
    || (!a.hasOwnProperty('type') && a.hasOwnProperty('text') && a.text !== b.text)
    || a.type !== b.type;
}

function compareChildren(a, b) {

  var ca = a ? a.children : null;
  var cb = b ? b.children : null;

  if (!ca && !cb) {
    return false;
  } else if ((ca && !cb) || (cb && !ca)) {
    return true;
  } else if (ca.length !== cb.length) {
    return true;
  } else {
    return _.arrayDiff(a.children, b.children);
  }
  
}

function compareProps(a, b) {
  // Props (attributes) only exists in normal Node elements, not in Text Nodes.
  return a.VTEXT ? false : !_.equals(a.props, b.props);
}

function applyProps(el, a, b) {
  var props = b ? _.objectDiff(b, a) : a;
  _.keys(props).forEach(function(prop) {
    el.setAttribute(prop, props[prop]);
  });
}
