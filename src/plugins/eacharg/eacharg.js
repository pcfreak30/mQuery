// [INTERNAL USE ONLY]
// Loop through the combination of every node and every argument passed
mq.prototype.eacharg = function (args, callback) {
  var that = this;
  return this.each(function (node, i) {
    var them = this;
    if (!(them instanceof mq)) {
      them = that;
    }
    them.args(args, node, i).forEach(function (arg) {
      // Perform the callback for this node
      // By doing callback.call we allow "this" to be the context for
      // the callback (see http://stackoverflow.com/q/4065353 precisely)
      callback.call(this, node, arg);
    }, this);
  });
};
