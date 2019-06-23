mq.prototype.next = function (selector) {
  return this.map(function (node) {
    do {
      if (mq(node).is(selector)) {
        return node;
      }
    } while ((node = node.nextElementSibling));
  });
};
