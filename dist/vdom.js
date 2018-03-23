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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var vdom = {\n  vtree: 0,\n  vnode: 1,\n  vtext: 2,\n  diff: 3\n};\n\nif (typeof window !== 'undefined') {\n  window.vdom = vdom;\n};\n\nmodule.exports = vdom;\n\n// Árvore\n// Node\n// Text\n// create -> Create DOM Element\n// Apply Differences\n\n\n/**\n * Creates real DOM Element from options.\n * @param {*} type \n * @param {*} options \n * @param {*} children \n */\nfunction createElement(node) {\n\n  if (isText(node) || isHTML(node)) {\n    return node;\n  }\n\n  if (!isObject(node) && node.toString) {\n    node = node.toString();\n  } \n\n  if (isString(node)) {\n    return document.createTextNode(node);\n  }\n\n  if (node.type === 'text') {\n    return document.createTextNode(node.text);\n  }\n  \n  var el = document.createElement(node.type);\n\n  if (node.props && isObject(node.props)) {\n    Object.keys(node.props).forEach(function(prop) {\n      el.setAttribute(prop, node.props[prop]);\n    });\n  }\n\n  if (node.children && isArray(node.children)) {\n    node.children.map(createElement).forEach(el.appendChild.bind(el));\n  }\n\n  return el;\n}\n\n/**\n * Receives HTML Element and return the VDOM tree.\n * @param {*} h \n */\nfunction parse2Tree(h) {\n\n  if (!isHTML(h) && !isText(h)) return null;\n\n  if (h.nodeType === 3) {\n    // return { type: 'text', text: h.nodeValue };\n    return h.nodeValue;\n  } else {\n    var type = h.tagName;\n    var children = from(h.childNodes).map(parse2Tree);\n    return { type: type, children: children };\n  }\n\n}\n\n/**\n * \n */\nfunction render(root, nodeA, nodeB, index = 0) {\n  if (!nodeB) {\n    root.appendChild(createElement(nodeA));\n  } else if (!nodeA) {\n    if (!root.childNodes[index]) return;\n    root.removeChild(root.childNodes[index]);\n  } else if (changed(nodeA, nodeB)) {\n    root.replaceChild(createElement(nodeA), root.childNodes[index]);\n  } else if (changedProps(nodeA, nodeB)) {\n    setProps(root.childNodes[index], objectDiff(nodeA.props, nodeB.props));\n  } else if (nodeA.type) {\n    var lena = nodeA.children.length;\n    var lenb = nodeB.children.length;\n    for (var i=0; i < lena || i < lenb; i++) {\n      render(root.childNodes[index], nodeA.children[i], nodeB.children[i], i);\n    }\n  }\n}\n\nfunction setProps(el, props) {\n  Object.keys(props).forEach(function(prop) {\n    el.setAttribute(prop, props[prop]);\n  });\n  return el;\n}\n\nfunction objectDiff(a, b) {\n  var diff = {};\n  Object.keys(b).forEach(function(key) {\n    if (!equals(b[key], a[key])) {\n      diff[key] = a[key];\n    }\n  });\n  return diff;\n}\n\nfunction changed(nodeA, nodeB) {\n  return typeof nodeA !== typeof nodeB || // => type changed\n    typeof nodeA === 'string' && nodeA !== nodeB || // => text string changed\n    nodeA.type !== nodeB.type; // => type changed\n}\n\nfunction changedProps(nodeA, nodeB) {\n  if (isObject(nodeA) && nodeA.props) {\n    return !equals(nodeA.props, nodeB.props);\n  }\n}\n\nfunction equals(a, b) {\n  return JSON.stringify(a) === JSON.stringify(b);\n}\n\nvar users = [];\n\nfor (var counter=0; counter<5; counter++) {\n  users.push({ name: \"User\" + counter, data: [1,2,3], prop: counter });\n}\n\nfunction x(users) {\n  return { type: 'ul', children: users.map(function(user) {\n    return { type: 'li', props: { data: user.prop },  children: [\n      user.name,\n      { type: 'ul', children: user.data.map(function(data) {\n        return { type: 'li', children: [\n          data.toString()\n        ]}\n      }) }\n    ]}\n  })};\n}\n\nvar ta = x(users);\n// users[2].name = 5;\nusers = users.slice(0, 1);\nvar tb = x(users);\n\n// !!!!!!!!!! NAO PODE SER DOCUMENT.BODY O PONTO DE MONTAGEM !!!!!!!!!!!!!!!\n\ndocument.addEventListener('DOMContentLoaded', function() {\n  // document.body.appendChild(ea);\n  var root = document.getElementById('root');\n  render(root, ta);\n  console.log('====');\n  setTimeout(function() {\n    render(root, tb, ta);\n  }, 3000);\n});\n\nfunction parse2HTML(h) {\n  var w = document.createElement('div');\n  w.innerHTML = h;\n  return w.childNodes[0];\n}\n\n// *******\nfunction type(a) {\n  return Object.prototype.toString.call(a).replace(/^\\[object (.+)\\]$/, '$1').toLowerCase();\n}\nfunction isArray(a) {\n  return type(a) === 'array';\n}\nfunction isString(s) {\n  return type(s) === 'string';\n}\nfunction isObject(o) {\n  return type(o) === 'object';\n}\nfunction isHTML(h) {\n  return /html/.test(type(h));\n}\nfunction isText(t) {\n  return type(t) === 'text';\n}\nfunction from(a) {\n  return [].slice.call(a);\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });