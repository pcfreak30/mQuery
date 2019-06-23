// Add some html before each of the matched elements.
mq.prototype.before = function (html, data) {
  return this.adjacent(html, data, function (node, fragment) {
    node.parentNode.insertBefore(fragment, node);
  });
};
