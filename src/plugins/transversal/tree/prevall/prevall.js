mq.prototype.prevAll = function (selector) {
  return this.map(function (node) {
    var items = [];
    do {
      if (mq(node).is(selector)) {
        items.push(node);
      }
    } while ((node = node.previousElementSibling));

    return items;
  });
};
