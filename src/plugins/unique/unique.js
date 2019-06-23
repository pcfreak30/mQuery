// [INTERNAL USE ONLY]

// Removed duplicated nodes, used for some specific methods
mq.prototype.unique = function () {
  return mq(this.nodes.reduce(function (clean, node) {
    var istruthy = node !== null && node !== undefined && node !== false;
    return (istruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
  }, []));
};
