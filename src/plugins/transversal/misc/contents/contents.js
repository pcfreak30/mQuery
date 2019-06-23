// noinspection JSPotentiallyInvalidConstructorUsage
mq.prototype.contents = function () {
  return this.map(function (elem) {
    if (elem.contentDocument != null &&

        // Support: IE 11+
        // <object> elements with no `data` attribute has an object
        // `contentDocument` with a `null` prototype.
        Object.getPrototypeOf(elem.contentDocument)) {

      return elem.contentDocument;
    }

    // Support: IE 9 - 11+
    // Treat the template element as a regular one in browsers that
    // don't support it.
    if (nodeName(elem, "template")) {
      elem = elem.content || elem;
    }

    return mq.merge([], elem.childNodes);
  });
};
