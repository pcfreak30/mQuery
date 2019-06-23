// Travel the matched elements at the same level
mq.prototype.siblings = function (selector) {
  return this.parent().children(selector).not(this);
};
