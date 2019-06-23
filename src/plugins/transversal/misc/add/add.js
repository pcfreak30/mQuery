mq.prototype.add = function (element) {
  return mq(mq(element).nodes.concat(this.nodes))
};
