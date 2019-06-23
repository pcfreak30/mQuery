// Attach a callback to the specified events
mq.prototype.one = function (events, cb, cb2) {

  return this.eacharg(events, function (node, event) {
    var callback = function () {
      cb.apply(this, arguments);
      this.removeEventListener(events, cb);
      node._e[event] = node._e[event].filter(function (element) {
        return element !== cb;
      });
    };
    var args = [event];
    if (typeof cb === 'string') {
      args.push(cb);
    }
    args.push(callback);

    this.on.apply(this, args)
  });

};
mq.prototype.one = function (events, cb, cb2) {
  if (typeof cb === 'string') {
    var sel = cb;
    cb = function (e) {
      var args = arguments;
      mq(e.currentTarget).find(sel).each(function (target) {
        if (target === e.target || target.contains(e.target)) {
          try {
            Object.defineProperty(e, 'currentTarget', {
              get: function () {
                return target;
              }
            });
          } catch (err) {
          }
          cb2.apply(target, args);
        }
      });
    };
  }

  // Add the custom data as arguments to the callback
  var callback = function (e) {
    return cb.apply(this, [e].concat(e.detail || []));
  };

  return this.eacharg(events, function (node, event) {
    node.addEventListener(event, callback);

    // Store it so we can dereference it with `.off()` later on
    node._e = node._e || {};
    node._e[event] = node._e[event] || [];
    node._e[event].push(callback);
  });
};
mq.prototype.bind = mq.prototype.on;
