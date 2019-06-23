// Loops through every node from the current call
mq.prototype.each = function (callback) {
  // By doing callback.call we allow "this" to be the context for
  // the callback (see http://stackoverflow.com/q/4065353 precisely)
  this.nodes.forEach(function (node, index) {
    callback.apply(node, arguments)
  });

  return this;
};
