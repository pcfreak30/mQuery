// Find the size of the first matched element
mq.prototype.size = function () {
  return this.first().getBoundingClientRect();
};
