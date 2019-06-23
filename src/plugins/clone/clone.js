/**
 * Deep clone a DOM node and its descendants.
 * @return {[Object]}         Returns an Umbrella.js instance.
 */
mq.prototype.clone = function () {
  return this.map(function (node, i) {
    var clone = node.cloneNode(true);
    var dest = this.getAll(clone);

    this.getAll(node).each(function (src, i) {
      for (var key in this.mirror) {
        if (this.mirror[key]) {
          this.mirror[key](src, dest.nodes[i]);
        }
      }
    });

    return clone;
  });
};

/**
 * Return an array of DOM nodes of a source node and its children.
 * @param  {[Object]} context DOM node.
 * @param  {[String]} tag     DOM node tagName.
 * @return {[Array]}          Array containing queried DOM nodes.
 */
mq.prototype.getAll = function getAll(context) {
  return mq([context].concat(mq('*', context).nodes));
};

// Store all of the operations to perform when cloning elements
mq.prototype.mirror = {};

/**
 * Copy all JavaScript events of source node to destination node.
 * @param  {[Object]} source      DOM node
 * @param  {[Object]} destination DOM node
 * @return {[undefined]]}
 */
mq.prototype.mirror.events = function (src, dest) {
  if (!src._e) return;

  for (var type in src._e) {
    src._e[type].forEach(function (event) {
      mq(dest).on(type, event);
    });
  }
};

/**
 * Copy select input value to its clone.
 * @param  {[Object]} src  DOM node
 * @param  {[Object]} dest DOM node
 * @return {[undefined]}
 */
mq.prototype.mirror.select = function (src, dest) {
  if (mq(src).is('select')) {
    dest.value = src.value;
  }
};

/**
 * Copy textarea input value to its clone
 * @param  {[Object]} src  DOM node
 * @param  {[Object]} dest DOM node
 * @return {[undefined]}
 */
mq.prototype.mirror.textarea = function (src, dest) {
  if (mq(src).is('textarea')) {
    dest.value = src.value;
  }
};
