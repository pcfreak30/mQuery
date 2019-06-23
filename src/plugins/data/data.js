// Handle data-* attributes for the matched elements
mq.prototype.data = function (name, value) {
  return this.attr(name, value, true);
};
