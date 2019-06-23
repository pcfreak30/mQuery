// Scroll to the first matched element
mq.prototype.scroll = function () {
  this.first().scrollIntoView({ behavior: 'smooth' });
  return this;
};
