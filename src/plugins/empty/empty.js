// Remove all children of the matched nodes from the DOM.
mq.prototype.empty = function () {
  return this.each(function (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  });
};
