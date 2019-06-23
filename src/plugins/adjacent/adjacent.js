// [INTERNAL USE ONLY]
// Add text in the specified position. It is used by other functions
mq.prototype.adjacent = function (html, data, callback) {
  if (typeof data === 'number') {
    if (data === 0) {
      data = [];
    } else {
      data = new Array(data).join().split(',').map(Number.call, Number);
    }
  }

  // Loop through all the nodes. It cannot reuse the eacharg() since the data
  // we want to do it once even if there's no "data" and we accept a selector
  return this.each(function (node, j) {
    var fragment = document.createDocumentFragment();
    var _this = this;
    // Allow for data to be falsy and still loop once
    mq(data || {}).map(function (el, i) {
      // Allow for callbacks that accept some data
      var part = (typeof html === 'function') ? html.call(this, el, i, node, j) : html;

      if (typeof part === 'string') {
        return this.generate(part);
      }

      return mq(part);
    }).each(function (n) {
      1 < _this.length && (n instanceof mq ? n : mq(n)).isInPage(n)
      ? fragment.appendChild(mq(n).clone().first())
      : fragment.appendChild(n);
    });

    callback.call(this, node, fragment);
  });
};
