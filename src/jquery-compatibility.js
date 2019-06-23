// noinspection JSPotentiallyInvalidConstructorUsage
mq.fn = mq.prototype;

if (typeof Symbol === "function") {
  mq.fn[Symbol.iterator] = [][Symbol.iterator]
}

// Populate the class2type map
mq.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function (_i, name) {
          class2type["[object " + name + "]"] = name.toLowerCase();
        });

mq.noConflict = function (deep) {
  if (window.$ === mq) {
    window.$ = _$;
  }

  if (deep && window.mq === mq) {
    window.u = _mq;
  }

  return mq;
};

window.jQuery = mq;
