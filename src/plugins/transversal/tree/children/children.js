// Get the direct children of all of the nodes with an optional filter
mq.prototype.children = function (selector) {
  return this.map(function (node) {
    return this.slice(node.children);
  }).filter(selector);
};
