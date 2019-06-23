mq.prototype.ready = function (fn) {
  this.on('DOMContentLoaded', fn)
};
