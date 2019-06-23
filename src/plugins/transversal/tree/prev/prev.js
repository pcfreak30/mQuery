mq.prototype.prev = function (selector) {
  return this.map(function (node) {
    do {
      if (mq(node).is(selector)) {
        return node;
      }
    } while ((node = node.previousElementSibling));
  });
};
