mq.prototype.parents = function (selector) {
  return this.map(function (node) {
    var items = [];
    do {
      items.push(node);
    } while ((node = node.previousElementSibling));
    return items;
  }).filter(selector);
};
