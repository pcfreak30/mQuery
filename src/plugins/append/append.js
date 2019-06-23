// Add some html as a child at the end of each of the matched elements.
mq.prototype.append = function (html, data) {
  if (typeof html !== 'function') {
    html = [].slice.call(arguments);
  }
  return this.adjacent(html, data, function (node, fragment) {
    node.appendChild(fragment);
  });
};
