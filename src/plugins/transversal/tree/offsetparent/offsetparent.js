mq.prototype.offsetParent = function () {
  return this.map(function (node) {
    // Keep going up and up on the tree. First element is also checked
    do {
      if (mq.inArray(mq(node).css('position'), ['relative', 'absolute', 'fixed'])) {
        return node;
      }
    } while ((node = node.parentNode) && node !== document);
  });
};
