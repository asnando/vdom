var vdom = {
  vtree: 0,
  vnode: 1,
  vtext: 2,
  diff: 3
};

if (typeof window !== 'undefined') {
  window.vdom = vdom;
};

module.exports = vdom;

// Árvore
// Node
// Text
// create -> Create DOM Element
// Apply Differences


/**
 * Creates real DOM Element from options.
 * @param {*} type 
 * @param {*} options 
 * @param {*} children 
 */
function createElement(node) {

  if (isText(node) || isHTML(node)) {
    return node;
  }

  if (!isObject(node) && node.toString) {
    node = node.toString();
  } 

  if (isString(node)) {
    return document.createTextNode(node);
  }

  if (node.type === 'text') {
    return document.createTextNode(node.text);
  }
  
  var el = document.createElement(node.type);

  if (node.props && isObject(node.props)) {
    Object.keys(node.props).forEach(function(prop) {
      el.setAttribute(prop, node.props[prop]);
    });
  }

  if (node.children && isArray(node.children)) {
    node.children.map(createElement).forEach(el.appendChild.bind(el));
  }

  return el;
}

/**
 * Receives HTML Element and return the VDOM tree.
 * @param {*} h 
 */
function parse2Tree(h) {

  if (!isHTML(h) && !isText(h)) return null;

  if (h.nodeType === 3) {
    // return { type: 'text', text: h.nodeValue };
    return h.nodeValue;
  } else {
    var type = h.tagName;
    var children = from(h.childNodes).map(parse2Tree);
    return { type: type, children: children };
  }

}

/**
 * 
 */
function render(root, nodeA, nodeB, index = 0) {
  if (!nodeB) {
    root.appendChild(createElement(nodeA));
  } else if (!nodeA) {
    if (!root.childNodes[index]) return;
    root.removeChild(root.childNodes[index]);
  } else if (changed(nodeA, nodeB)) {
    root.replaceChild(createElement(nodeA), root.childNodes[index]);
  } else if (changedProps(nodeA, nodeB)) {
    setProps(root.childNodes[index], objectDiff(nodeA.props, nodeB.props));
  } else if (nodeA.type) {
    var lena = nodeA.children.length;
    var lenb = nodeB.children.length;
    for (var i=0; i < lena || i < lenb; i++) {
      render(root.childNodes[index], nodeA.children[i], nodeB.children[i], i);
    }
  }
}

function setProps(el, props) {
  Object.keys(props).forEach(function(prop) {
    el.setAttribute(prop, props[prop]);
  });
  return el;
}

function objectDiff(a, b) {
  var diff = {};
  Object.keys(b).forEach(function(key) {
    if (!equals(b[key], a[key])) {
      diff[key] = a[key];
    }
  });
  return diff;
}

function changed(nodeA, nodeB) {
  return typeof nodeA !== typeof nodeB || // => type changed
    typeof nodeA === 'string' && nodeA !== nodeB || // => text string changed
    nodeA.type !== nodeB.type; // => type changed
}

function changedProps(nodeA, nodeB) {
  if (isObject(nodeA) && nodeA.props) {
    return !equals(nodeA.props, nodeB.props);
  }
}

function equals(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

var users = [];

for (var counter=0; counter<5; counter++) {
  users.push({ name: "User" + counter, data: [1,2,3], prop: counter });
}

function x(users) {
  return { type: 'ul', children: users.map(function(user) {
    return { type: 'li', props: { data: user.prop },  children: [
      user.name,
      { type: 'ul', children: user.data.map(function(data) {
        return { type: 'li', children: [
          data.toString()
        ]}
      }) }
    ]}
  })};
}

var ta = x(users);
// users[2].name = 5;
users = users.slice(0, 1);
var tb = x(users);

// !!!!!!!!!! NAO PODE SER DOCUMENT.BODY O PONTO DE MONTAGEM !!!!!!!!!!!!!!!

document.addEventListener('DOMContentLoaded', function() {
  // document.body.appendChild(ea);
  var root = document.getElementById('root');
  render(root, ta);
  console.log('====');
  setTimeout(function() {
    render(root, tb, ta);
  }, 3000);
});

function parse2HTML(h) {
  var w = document.createElement('div');
  w.innerHTML = h;
  return w.childNodes[0];
}

// *******
function type(a) {
  return Object.prototype.toString.call(a).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}
function isArray(a) {
  return type(a) === 'array';
}
function isString(s) {
  return type(s) === 'string';
}
function isObject(o) {
  return type(o) === 'object';
}
function isHTML(h) {
  return /html/.test(type(h));
}
function isText(t) {
  return type(t) === 'text';
}
function from(a) {
  return [].slice.call(a);
}