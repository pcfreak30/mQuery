// Find the first ancestor that matches the selector for each node
mq.prototype.closest = function (selector) {
  return this.map(function (node) {
    // Keep going up and up on the tree. First element is also checked
    do {
      if (mq(node).is(selector)) {
        return node;
      }
    } while ((node = node.parentNode) && node !== document);
  });
};
