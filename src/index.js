(function() {

  var vdom = {
    create: require('./create-element'),
    vnode: require('./vnode'),
    vtext: require('./vtext'),
    render: require('./render'),
    h: require('./h'),
    parse2Tree: require('./parse2Tree'),
    vtree: require('./vtree')
  };

  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(function() {
      return vdom;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = vdom;
  } else {
    window.vdom = vdom;
  }
  
})();