// Replace the matched elements with the passed argument.
mq.prototype.replace = function (html, data) {
  var nodes = [];
  this.adjacent(html, data, function (node, fragment) {
    nodes = nodes.concat(this.slice(fragment.children));
    node.parentNode.replaceChild(fragment, node);
  });
  return mq(nodes);
};
