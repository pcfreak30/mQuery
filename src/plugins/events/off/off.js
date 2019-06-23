// Removes the callback to the event listener for each node
mq.prototype.off = function (events) {
  return this.eacharg(events, function (node, event) {
    mq(node._e ? node._e[event] : []).each(function (cb) {
      node.removeEventListener(event, cb);
    });
  });
};
