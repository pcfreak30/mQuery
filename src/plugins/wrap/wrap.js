mq.prototype.wrap = function (selector) {
  function findDeepestNode(node) {
    while (node.firstElementChild) {
      node = node.firstElementChild;
    }

    return node;
  }

  // 1) Construct dom node e.g. mq('<a>'),
  // 2) clone the currently matched node
  // 3) append cloned dom node to constructed node based on selector
  return this.map(function (node) {
    return mq(selector).each(function (n) {
      var target = findDeepestNode(n);
      node
        .parentNode.insertBefore(n, node)
      target.appendChild(node)
    });
  });
};
