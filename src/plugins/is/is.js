// Check whether any of the nodes matches the selector
mq.prototype.is = function (selector) {
  return this.filter(selector).length > 0;
};
