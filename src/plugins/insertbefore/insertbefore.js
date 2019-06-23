mq.prototype.insertBefore = function (element) {
  element = mq(element);

  if (1 < element.length) {
    return mq(element).adjacent(this, undefined, function (node, fragment) {
      node.parentNode.insertBefore(fragment, node);
    });
  }
  return this.each(function (node) {
    element.parent().get(0).insertBefore(node, element.get(0));
  });

};
