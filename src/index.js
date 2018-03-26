var vdom = {
  create: require('./create-element'),
  vnode: require('./vnode'),
  vtext: require('./vtext'),
  render: require('./vrender'),
  h: require('./h'),
  vhandler: require('./vhandler')
};

if (typeof window !== 'undefined') {
  window.vdom = vdom;
};

module.exports = vdom;

// // Árvore
// // Node
// // Text
// // create -> Create DOM Element
// // Apply Differences


// /**
//  * Creates real DOM Element from options.
//  * @param {*} type 
//  * @param {*} options 
//  * @param {*} children 
//  */
// function createElement(node) {

//   if (isText(node) || isHTML(node)) {
//     return node;
//   }

//   if (!isObject(node) && node.toString) {
//     node = node.toString();
//   } 

//   if (isString(node)) {
//     return document.createTextNode(node);
//   }

//   if (node.type === 'text') {
//     return document.createTextNode(node.text);
//   }
  
//   var el = document.createElement(node.type);

//   if (node.props && isObject(node.props)) {
//     Object.keys(node.props).forEach(function(prop) {
//       el.setAttribute(prop, node.props[prop]);
//     });
//   }

//   if (node.children && isArray(node.children)) {
//     node.children.map(createElement).forEach(el.appendChild.bind(el));
//   }

//   return el;
// }

// /**
//  * Receives HTML Element and return the VDOM tree.
//  * @param {*} h 
//  */
// function parse2Tree(h) {

//   if (!isHTML(h) && !isText(h)) return null;

//   if (h.nodeType === 3) {
//     // return { type: 'text', text: h.nodeValue };
//     return h.nodeValue;
//   } else {
//     var type = h.tagName;
//     var children = from(h.childNodes).map(parse2Tree);
//     return { type: type, children: children };
//   }

// }

// /**
//  * 
//  */
// function render(root, nodeA, nodeB, index = 0) {
//   console.log(root, nodeA, nodeB, index);
//   if (!nodeB) {
//     root.appendChild(createElement(nodeA));
//   } else if (!nodeA) {
//     root.removeChild(root.childNodes[index]);
//   } else if (changed(nodeA, nodeB)) {
//     root.replaceChild(createElement(nodeA), root.childNodes[index]);
//   } else if (changedProps(nodeA, nodeB)) {
//     setProps(root.childNodes[index], objectDiff(nodeA.props, nodeB.props));
//   } else if (nodeA.type) {
//     var lena = nodeA.children.length;
//     var lenb = nodeB.children.length;
//     var len = lena > lenb ? lena : lenb;
//     for (var i=0; i < len; i++) {
//       render(root.childNodes[index], nodeA.children[i], nodeB.children[i], i);
//     }
//   }
// }

// function setProps(el, props) {
//   Object.keys(props).forEach(function(prop) {
//     el.setAttribute(prop, props[prop]);
//   });
//   return el;
// }

// function objectDiff(a, b) {
//   var diff = {};
//   Object.keys(b).forEach(function(key) {
//     if (!equals(b[key], a[key])) {
//       diff[key] = a[key];
//     }
//   });
//   return diff;
// }

// function changed(nodeA, nodeB) {
//   return typeof nodeA !== typeof nodeB || // => type changed
//     typeof nodeA === 'string' && nodeA !== nodeB || // => text string changed
//     nodeA.type !== nodeB.type; // => type changed
// }

// function changedProps(nodeA, nodeB) {
//   if (isObject(nodeA) && nodeA.props) {
//     return !equals(nodeA.props, nodeB.props);
//   }
// }

// function equals(a, b) {
//   return JSON.stringify(a) === JSON.stringify(b);
// }

var users = [];

for (var counter=0; counter<5; counter++) {
  users.push({ name: "User" + counter, data: [1, counter], prop: counter });
}

// function x(users) {
//   return { type: 'ul', children: users.map(function(user) {
//     return { type: 'li', props: { data: user.prop },  children: [
//       user.name,
//       { type: 'ul', children: user.data.map(function(data) {
//         return { type: 'li', children: [
//           data.toString()
//         ]}
//       }) }
//     ]}
//   })};
// }

// var ta = x(users);
// // users[2].name = 5;
// users = users.slice(0, 1);
// var tb = x(users);

function x(users, a) {
  return h('ul', null, users.map(function(user, index) {
    return h('li', { index: user.prop, style: user.style || '' }, [
      h(user.name),
      h('ul', null, user.data.map(function(l) {
        return h('li', null, [
          h(l)
        ])
      }))
    ])
  }))
}

function parse2HTML(h) {
  var w = document.createElement('div');
  w.innerHTML = h;
  return w.childNodes[0];
}

function parse2VTree(e) {

  if (type(e) === 'text') {
    return h('text', e.nodeValue);
  }

  if (typeof e === 'string') {
    e = parse2HTML(e);
  }

  var props = {};
  [].slice.call(e.attributes).forEach(function(attr) {
    props[attr.name] = attr.value;
  });

  var children = [].slice.call(e.childNodes).map(parse2VTree);

  return h(e.tagName, props, children);

}

var h = vdom.h;
var render = vdom.render;

document.addEventListener('DOMContentLoaded', function() {
  var a = x(users);
  // users = users.slice(0, 3);
  // users.splice(2, 2);
  users[2].name = 'X';
  // users[2].data = [];
  users[2].style = 'background-color: red;';
  users.push({ name: 'Hellow', data: [1], prop: 10, style: 'background-color: red;' });
  var b = x(users, true);
  // ===
  var root = document.querySelector('#root');
  render(root, a);
  setTimeout(render.bind(render, root, b, a), 1000);
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