// Merge all of the nodes that the callback returns
mq.prototype.map = function (callback) {
  return callback ? mq(this.array(callback)).unique() : this;
};
