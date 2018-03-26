/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/create-element.js":
/*!*******************************!*\
  !*** ./src/create-element.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function createElement(tree) {\n\n  if (!(tree instanceof Object) || !tree.VTREE) {\n    throw new Error('Argument must be virtual dom tree.');\n  }\n\n  if (tree.VTEXT) {\n    return document.createTextNode(tree.text);\n  }\n\n  var el = document.createElement(tree.type);\n\n  if (tree.props && (tree.props instanceof Object)) {\n    Object.keys(tree.props).forEach(function(prop) {\n      el.setAttribute(prop, tree.props[prop]);\n    });\n  }\n\n  if (tree.children && Array.isArray(tree.children)) {\n    tree.children.map(createElement).forEach(el.appendChild.bind(el));\n  }\n\n  return el;\n};\n\n//# sourceURL=webpack:///./src/create-element.js?");

/***/ }),

/***/ "./src/h.js":
/*!******************!*\
  !*** ./src/h.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var vnode = __webpack_require__(/*! ./vnode */ \"./src/vnode.js\");\nvar vtext = __webpack_require__(/*! ./vtext */ \"./src/vtext.js\");\n// var create = require('./create-element');\n\nfunction xtend(a,b) {\n  for (var key in b) {\n    if (b.hasOwnProperty(key)) {\n      a[key] = b[key];\n    }\n  }\n  return a;\n}\n\nmodule.exports = function h(type, props, children) {\n\n  var alen = arguments.length;\n\n  if ((typeof type !== 'string' || type instanceof Object) && type.toString) {\n    type = type.toString();\n  }\n\n  // Check if number !!!!\n\n  var rtp = ((alen === 1 && typeof type === 'string') || (type === 'text'))\n    ? 'VTEXT' : 'VNODE';\n\n  switch (rtp) {\n    case 'VTEXT':\n      return xtend(vtext(props || type), { VTREE: 1 });\n      break;\n    case 'VNODE':\n      return xtend(vnode(type, props, children), { VTREE: 1 });\n      break;\n  };\n\n\n  // if (!type) {\n  //   throw new Error('Undefined node type.');\n  // }\n\n  // if (((arguments.length === 1) && (typeof type === 'string')) || (type === 'text')) {\n  //   return document.createTextNode(props || type);\n  // }\n\n  // var el = document.createElement(type);\n\n  // if (props && props instanceof Object) {\n  //   Object.keys(props).forEach(function(prop) {\n  //     el.setAttribute(prop, props[prop]);\n  //   });\n  // }\n\n  // if (Array.isArray(children)) {\n  //   children.map(function(child) {\n  //     console.log(child);\n  //     // return h.apply(null, child);\n  //   })\n  //   // .forEach(function(child) {\n  //   //   console.log(child);\n  //   // });\n  // }\n\n  // return el;\n}\n\n//# sourceURL=webpack:///./src/h.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var vdom = {\n  create: __webpack_require__(/*! ./create-element */ \"./src/create-element.js\"),\n  vnode: __webpack_require__(/*! ./vnode */ \"./src/vnode.js\"),\n  vtext: __webpack_require__(/*! ./vtext */ \"./src/vtext.js\"),\n  render: __webpack_require__(/*! ./vrender */ \"./src/vrender.js\"),\n  h: __webpack_require__(/*! ./h */ \"./src/h.js\"),\n  vhandler: __webpack_require__(/*! ./vhandler */ \"./src/vhandler.js\")\n};\n\nif (typeof window !== 'undefined') {\n  window.vdom = vdom;\n};\n\nmodule.exports = vdom;\n\n// // Árvore\n// // Node\n// // Text\n// // create -> Create DOM Element\n// // Apply Differences\n\n\n// /**\n//  * Creates real DOM Element from options.\n//  * @param {*} type \n//  * @param {*} options \n//  * @param {*} children \n//  */\n// function createElement(node) {\n\n//   if (isText(node) || isHTML(node)) {\n//     return node;\n//   }\n\n//   if (!isObject(node) && node.toString) {\n//     node = node.toString();\n//   } \n\n//   if (isString(node)) {\n//     return document.createTextNode(node);\n//   }\n\n//   if (node.type === 'text') {\n//     return document.createTextNode(node.text);\n//   }\n  \n//   var el = document.createElement(node.type);\n\n//   if (node.props && isObject(node.props)) {\n//     Object.keys(node.props).forEach(function(prop) {\n//       el.setAttribute(prop, node.props[prop]);\n//     });\n//   }\n\n//   if (node.children && isArray(node.children)) {\n//     node.children.map(createElement).forEach(el.appendChild.bind(el));\n//   }\n\n//   return el;\n// }\n\n// /**\n//  * Receives HTML Element and return the VDOM tree.\n//  * @param {*} h \n//  */\n// function parse2Tree(h) {\n\n//   if (!isHTML(h) && !isText(h)) return null;\n\n//   if (h.nodeType === 3) {\n//     // return { type: 'text', text: h.nodeValue };\n//     return h.nodeValue;\n//   } else {\n//     var type = h.tagName;\n//     var children = from(h.childNodes).map(parse2Tree);\n//     return { type: type, children: children };\n//   }\n\n// }\n\n// /**\n//  * \n//  */\n// function render(root, nodeA, nodeB, index = 0) {\n//   console.log(root, nodeA, nodeB, index);\n//   if (!nodeB) {\n//     root.appendChild(createElement(nodeA));\n//   } else if (!nodeA) {\n//     root.removeChild(root.childNodes[index]);\n//   } else if (changed(nodeA, nodeB)) {\n//     root.replaceChild(createElement(nodeA), root.childNodes[index]);\n//   } else if (changedProps(nodeA, nodeB)) {\n//     setProps(root.childNodes[index], objectDiff(nodeA.props, nodeB.props));\n//   } else if (nodeA.type) {\n//     var lena = nodeA.children.length;\n//     var lenb = nodeB.children.length;\n//     var len = lena > lenb ? lena : lenb;\n//     for (var i=0; i < len; i++) {\n//       render(root.childNodes[index], nodeA.children[i], nodeB.children[i], i);\n//     }\n//   }\n// }\n\n// function setProps(el, props) {\n//   Object.keys(props).forEach(function(prop) {\n//     el.setAttribute(prop, props[prop]);\n//   });\n//   return el;\n// }\n\n// function objectDiff(a, b) {\n//   var diff = {};\n//   Object.keys(b).forEach(function(key) {\n//     if (!equals(b[key], a[key])) {\n//       diff[key] = a[key];\n//     }\n//   });\n//   return diff;\n// }\n\n// function changed(nodeA, nodeB) {\n//   return typeof nodeA !== typeof nodeB || // => type changed\n//     typeof nodeA === 'string' && nodeA !== nodeB || // => text string changed\n//     nodeA.type !== nodeB.type; // => type changed\n// }\n\n// function changedProps(nodeA, nodeB) {\n//   if (isObject(nodeA) && nodeA.props) {\n//     return !equals(nodeA.props, nodeB.props);\n//   }\n// }\n\n// function equals(a, b) {\n//   return JSON.stringify(a) === JSON.stringify(b);\n// }\n\nvar users = [];\n\nfor (var counter=0; counter<5; counter++) {\n  users.push({ name: \"User\" + counter, data: [1, counter], prop: counter });\n}\n\n// function x(users) {\n//   return { type: 'ul', children: users.map(function(user) {\n//     return { type: 'li', props: { data: user.prop },  children: [\n//       user.name,\n//       { type: 'ul', children: user.data.map(function(data) {\n//         return { type: 'li', children: [\n//           data.toString()\n//         ]}\n//       }) }\n//     ]}\n//   })};\n// }\n\n// var ta = x(users);\n// // users[2].name = 5;\n// users = users.slice(0, 1);\n// var tb = x(users);\n\nfunction x(users, a) {\n  return h('ul', null, users.map(function(user, index) {\n    return h('li', { index: user.prop, style: user.style || '' }, [\n      h(user.name),\n      h('ul', null, user.data.map(function(l) {\n        return h('li', null, [\n          h(l)\n        ])\n      }))\n    ])\n  }))\n}\n\nfunction parse2HTML(h) {\n  var w = document.createElement('div');\n  w.innerHTML = h;\n  return w.childNodes[0];\n}\n\nfunction parse2VTree(e) {\n\n  if (type(e) === 'text') {\n    return h('text', e.nodeValue);\n  }\n\n  if (typeof e === 'string') {\n    e = parse2HTML(e);\n  }\n\n  var props = {};\n  [].slice.call(e.attributes).forEach(function(attr) {\n    props[attr.name] = attr.value;\n  });\n\n  var children = [].slice.call(e.childNodes).map(parse2VTree);\n\n  return h(e.tagName, props, children);\n\n}\n\nvar h = vdom.h;\nvar render = vdom.render;\n\ndocument.addEventListener('DOMContentLoaded', function() {\n  var a = x(users);\n  // users = users.slice(0, 3);\n  // users.splice(2, 2);\n  users[2].name = 'X';\n  // users[2].data = [];\n  users[2].style = 'background-color: red;';\n  users.push({ name: 'Hellow', data: [1], prop: 10, style: 'background-color: red;' });\n  var b = x(users, true);\n  // ===\n  var root = document.querySelector('#root');\n  render(root, a);\n  setTimeout(render.bind(render, root, b, a), 1000);\n});\n\nfunction parse2HTML(h) {\n  var w = document.createElement('div');\n  w.innerHTML = h;\n  return w.childNodes[0];\n}\n\n// *******\nfunction type(a) {\n  return Object.prototype.toString.call(a).replace(/^\\[object (.+)\\]$/, '$1').toLowerCase();\n}\nfunction isArray(a) {\n  return type(a) === 'array';\n}\nfunction isString(s) {\n  return type(s) === 'string';\n}\nfunction isObject(o) {\n  return type(o) === 'object';\n}\nfunction isHTML(h) {\n  return /html/.test(type(h));\n}\nfunction isText(t) {\n  return type(t) === 'text';\n}\nfunction from(a) {\n  return [].slice.call(a);\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/vhandler.js":
/*!*************************!*\
  !*** ./src/vhandler.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./src/vhandler.js?");

/***/ }),

/***/ "./src/vnode.js":
/*!**********************!*\
  !*** ./src/vnode.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function vnode(type, props, children) {\n\n  return {\n    type: type,\n    props: props,\n    children: children,\n    VNODE: 1,\n    VTEXT: 0\n  };\n  \n};\n\n//# sourceURL=webpack:///./src/vnode.js?");

/***/ }),

/***/ "./src/vrender.js":
/*!************************!*\
  !*** ./src/vrender.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var create = __webpack_require__(/*! ./create-element */ \"./src/create-element.js\");\nvar handler = __webpack_require__(/*! ./vhandler */ \"./src/vhandler.js\");\n\nmodule.exports = function render(root, a, b, index = 0) {\n\n  if (document && document.body && (root === document.body)) {\n    throw new Error('Root element for render can\\'t be the body element.');\n  }\n\n  if (!root || !(root instanceof HTMLElement)) {\n    throw new Error('Root element must be used as html element.');\n  }\n\n  if ((a && !a.VTREE) || (b && !b.VTREE)) {\n    throw new Error('Render function only works with virtual dom nodes.');\n  }\n\n  if (!b) {\n    // If no old node, then just append the new node to the root element.\n    root.appendChild(create(a));\n  } else if (!a) {\n    // Empty new node.\n    root.removeChild(root.childNodes[index]);\n  } else if (compareNodes(a, b)) {\n    // Compare node differences type differences.\n    root.replaceChild(create(a), root.childNodes[index]);\n  } else {\n\n    // Compare each child of the root element, if exists.\n    if (!a.children) return;\n\n    if (includes(a.children, undefined) || includes(b.children, undefined)) {\n      throw new Error('Children array with empty nodes inside it will not be rendered, please check your node tree.');\n    }\n\n    var lena = a.children.length;\n    var lenb = b.children.length;\n\n    // When old children length is greater than the new one, \n    // means that some children were removed. In this case we iterate the\n    // index from the last length of the difference to the beginning.\n    // # Resolves a bug.\n    if (lenb > lena) {\n      for (var i = lenb - 1; i >= lena; i--) {\n        render(root.childNodes[index], a.children[i], b.children[i], i);\n      }\n      lenb = lena;\n    }\n\n    // Otherwise in normal cases we just iterate from 0 to the index.\n    for (var i = 0; i < lena || i < lenb; i++) {\n      render(root.childNodes[index], a.children[i], b.children[i], i);\n    }\n  }\n\n  if (a && b && compareProps(a, b)) {\n    // Props changed.\n    applyProps(root.childNodes[index], a.props, b.props);\n  }\n\n};\n\nfunction compareNodes(a, b) {\n  return typeof a !== typeof b\n    || (!a.hasOwnProperty('type') && a.hasOwnProperty('text') && a.text !== b.text)\n    || a.type !== b.type;\n}\n\nfunction compareProps(a, b) {\n  // Do not compare text nodes.\n  if (a.VTEXT) return false;\n  return !equals(a.props, b.props);\n}\n\nfunction applyProps(el, a, b) {\n  // a = new\n  // b = old\n  var props = b ? objectDiff(b, a) : a;\n  Object.keys(props).forEach(function(prop) {\n    el.setAttribute(prop, props[prop]);\n  });\n}\n\n\n// ********\nfunction objectDiff(a, b) {\n  var diff = {};\n  Object.keys(b).forEach(function(key) {\n    if (!a.hasOwnProperty(key) || a[key] !== b[key]) {\n      diff[key] = b[key];\n    }\n  });\n  return diff;\n}\n\nfunction equals(a, b) {\n  return jpretty(a) === jpretty(b);\n}\n\nfunction jpretty(j, t) {\n  return JSON.stringify(j, null, t || 0);\n}\n\nfunction includes(a, v) {\n  for (var index = 0; index < a.length; index++) {\n    if (a[index] === v) return true;\n  }\n  return false;\n}\n\n//# sourceURL=webpack:///./src/vrender.js?");

/***/ }),

/***/ "./src/vtext.js":
/*!**********************!*\
  !*** ./src/vtext.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function vtext(text) {\n\n  return {\n    text: text,\n    VTEXT: 1,\n    VNODE: 0\n  };\n\n};\n\n//# sourceURL=webpack:///./src/vtext.js?");

/***/ })

/******/ });