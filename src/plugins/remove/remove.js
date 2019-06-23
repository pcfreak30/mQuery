// Delete the matched nodes from the DOM
mq.prototype.remove = function () {
  // Loop through all the nodes
  return this.each(function (node) {
    // Perform the removal only if the node has a parent
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
};
