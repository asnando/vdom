var _ = require('./utils/index');

module.exports = function vtext(text) {

  if (!_.isDef(text) || _.type(text) !== 'string') {
    throw new Error('Text is undefined or not a string.');
  }

  return {
    text: text,
    VTEXT: 1,
    VNODE: 0
  };
  
};