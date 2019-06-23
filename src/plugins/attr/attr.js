// [INTERNAL USE ONLY]

// Handle attributes for the matched elements
mq.prototype.attr = function (name, value, data) {
  name = data ? dasherize(name) : name;
  data = data ? 'data-' : '';

  // This will handle those elements that can accept a pair with these footprints:
  // .attr('a'), .attr('a', 'b'), .attr({ a: 'b' })
  var val = this.pairs(name, value, function (node, name) {
    return node.getAttribute(data + name);
  }, function (node, name, value) {
    node.setAttribute(data + name, value);
  });

  if (!value) {
    return val;
  }
  return this
};

mq.prototype.removeAttr = function (name) {
  return this.each(function (node) {
    // Set the inner html to the node
    node.removeAttribute(name);
  });
}
