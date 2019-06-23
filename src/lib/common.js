var class2type = {};

var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
  var i = 0,
    len = elems.length,
    bulk = key == null;

  // Sets many values
  if (toType(key) === "object") {
    chainable = true;
    for (i in key) {
      access(elems, fn, i, key[i], true, emptyGet, raw);
    }

    // Sets one value
  } else if (value !== undefined) {
    chainable = true;

    if (typeof value !== "function") {
      raw = true;
    }

    if (bulk) {

      // Bulk operations run against the entire set
      if (raw) {
        fn.call(elems, value);
        fn = null;

        // ...except when executing function values
      } else {
        bulk = fn;
        fn = function (elem, _key, value) {
          return bulk.call(jQuery(elem), value);
        };
      }
    }

    if (fn) {
      for (; i < len; i++) {
        fn(
          elems[i], key, raw ?
                         value :
                         value.call(elems[i], i, fn(elems[i], key))
        );
      }
    }
  }

  if (chainable) {
    return elems;
  }

  // Gets
  if (bulk) {
    return fn.call(elems);
  }

  return len ? fn(elems[0], key) : emptyGet;
};

function isWindow(obj) {
  return obj != null && obj === obj.window;
}

function isArrayLike(obj) {

  var length = !!obj && obj.length,
    type = toType(obj);

  if (typeof obj === "function" || isWindow(obj)) {
    return false;
  }

  return type === "array" || length === 0 ||
         typeof length === "number" && length > 0 && (length - 1) in obj;
}

function toType(obj) {
  if (obj == null) {
    return obj + "";
  }

  return typeof obj === "object" ?
         class2type[class2type.toString.call(obj)] || "object" :
         typeof obj;
}

function isDOM(item, withMQ) {
  if (!withMQ) {
    withMQ = false;
  }
  return ((withMQ && item instanceof mq) || item instanceof HTMLElement || item
          instanceof HTMLDocument || isWindow(item) || (item.constructor
                                                        && 'HTMLDocument'
                                                        === item.constructor.name));
}

function funcArg(context, arg, idx, payload) {
  return isFunction(arg) ? arg.call(context, idx, payload) : arg
}

function isFunction(value) {
  return toType(value) === "function"
}
