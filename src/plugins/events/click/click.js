mq.prototype.click = function (callback) {
  if (callback) {
    return this.on('click', callback);
  }
  return this.trigger('click');
};
