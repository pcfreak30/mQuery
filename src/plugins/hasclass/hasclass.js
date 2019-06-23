// Find out whether the matched elements have a class or not
mq.prototype.hasClass = function () {
  // Check if any of them has all of the classes
  return this.is('.' + this.args(arguments).join('.'));
};
