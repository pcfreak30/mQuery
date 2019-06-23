// noinspection JSPotentiallyInvalidConstructorUsage
mq.prototype.submit = function () {
  this.each(function (node) {
    node.submit();
  });
};
