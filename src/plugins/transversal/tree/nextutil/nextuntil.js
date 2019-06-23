mq.prototype.nextUntil = function (selector, filter) {
  return this.map(function (node) {
    var items = [];
    do {
      if (mq(node).is(filter)) {
        if (mq(node).is(selector)) {
          break;
        }
        items.push(items);
      }
    } while ((node = node.nextElementSibling));

    return items;
  });
};
