# vdom

Virtual DOM Tree to render and patch changes between state changes into the real DOM.

## Motivation

The need to update only the actual changes between two states of an element within the real DOM. Something like reactive libraries.

Some libraries offer the same or similar service, but do not always have a small file size to distribute your code. With this in mind, a small code <i>(~8Kb)</i> has been developed capable of performing the necessary work.

<!----------------------------------------------------->

## h
Use hyperscript style to create Virtual DOM Trees.

### `type {string}`
Tag name of the element that will be represented. If type equals to <b>text</b> then the text value will be obtained from the <i><u>props</u></i> parameter.

### `props {object}`
Object of properties that will be applied as attributes of the html element at the render time.

### `children {array}`
Array of children nodes of the element (will be the same object type).

```javascript
var h = vdom.h;

var tree = h('ul', null, [
  h('li', {
    data: 'abc'
  }, [ h('Some random text.') ])
]);
```

<!----------------------------------------------------->

## toHTML

Receives a virtual tree and returns the DOM element representing it.

### `vtree {VTree}`

```javascript
var tree = vdom.h(/*...*/);
var el = vdom.toHTML(tree);
target.appendChild(el);
```

<!----------------------------------------------------->

## toTree

Returns a virtual tree which represents the value passed, which may be a html element or html template string.

### `e {HTMLElement, String}`
When html element it will return an virtual node, otherwise when string it will return a virtual text node.

```javascript
var tree = vdom.toTree(document.querySelector('.my-selector'));
```

<!----------------------------------------------------->

## render

### `root {HTMLElement}`
The element where the tree will be mounted.

 <center>
 <b>
 ⚠️️️️️️️️<br/> Avoid mounting inside the document.body element as it may make your DOM inconsistent in some cases.
 </b>
 </center>


### `nTree {VTree}`
The virtual tree that will be generated and mounted inside the <i>root</i> element.

### `oTree {VTree}`
The old virtual tree that will be compared with the new one (used on state changes).

You should always cache the last virtual tree used to compare them later.

### `delegator {object}`
Object containing the <b>add</b> and <b>remove</b> methods which may be capable to receive a html element and attach/detach the desired event listeners.


```javascript
var h = vdom.h;
var render = vdom.render;

var root = document.querySelector('#root');

var treeA = h('ul', null, [
  vdoh('li', { data: 'A' }, [ h('A') ])
]);

var treeB = h('ul', null, [
  h('li', { data: 'B' }, [ h('B') ])
]);

/* with initial state object */
render(root, treeA);

/* with two state objects (will find the differences) */
render(root, treeB, treeA);
```
