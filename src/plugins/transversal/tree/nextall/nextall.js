mq.prototype.nextAll = function (selector) {
  return this.map(function (node) {
    var items = [];
    do {
      if (mq(node).is(selector)) {
        items.push(node);
      }
    } while ((node = node.nextElementSibling));

    return items;
  });
};
