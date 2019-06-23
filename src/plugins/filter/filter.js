// .filter(selector)
// Delete all of the nodes that don't pass the selector
mq.prototype.filter = function (selector) {
  // The default function if it's a CSS selector
  // Cannot change name to 'selector' since it'd mess with it inside this fn
  var callback = function (node) {
    // Make it compatible with some other browsers
    node.matches = node.matches || node.msMatchesSelector || node.webkitMatchesSelector;

    // Check if it's the same element (or any element if no selector was passed)
    return node.matches(selector || '*');
  };

  // filter() receives a function as in .filter(e => mq(e).children().length)
  if (typeof selector === 'function') callback = selector;

  // filter() receives an instance of Umbrella as in .filter(mq('a'))
  if (selector instanceof mq) {
    callback = function (node) {
      return (selector.nodes).indexOf(node) !== -1;
    };
  }

  // Just a native filtering function for ultra-speed
  return mq(this.nodes.filter(callback));
};
