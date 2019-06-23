// Delete all of the nodes that equals the filter
mq.prototype.not = function (filter) {
  return this.filter(function (node) {
    return !mq(node).is(filter || true);
  });
};
