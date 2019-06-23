// Add nodes at the beginning of each node
mq.prototype.prepend = function (html, data) {
  if (typeof html !== 'function') {
    html = [].slice.call(arguments);
  }
  return this.adjacent(html, data, function (node, fragment) {
    node.insertBefore(fragment, node.firstChild);
  });
};
