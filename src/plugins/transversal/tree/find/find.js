// Find all the nodes children of the current ones matched by a selector
mq.prototype.find = function (selector) {
  return this.map(function (node) {
    return mq(selector || '*', node);
  });
};
