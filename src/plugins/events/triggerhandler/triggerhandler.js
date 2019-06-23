mq.prototype.triggerHandler = function (event) {
  return mq(this.first()).trigger(event)
};
