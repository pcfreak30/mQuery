// mQuery JS
// -----------
// Small, lightweight jQuery alternative
// @author Francisco Presencia Fandos https://francisco.io/
// @inspiration http://youmightnotneedjquery.com/

// Initialize the library
var mq = function (parameter, context) {
  // Make it an instance of mq() to avoid needing 'new' as in 'new u()' and just
  // use 'mq().bla();'.
  // @reference http://stackoverflow.com/q/24019863
  // @reference http://stackoverflow.com/q/8875878
  if (!(this instanceof mq)) {
    return new mq(parameter, context);
  }

  // No need to further processing it if it's already an instance
  if (parameter instanceof mq) {
    return parameter;
  }

  var contextDOM = false, parameterDOM = false;

  if (parameter) {
    parameterDOM = isDOM(parameter);
  }

  if (context) {
    contextDOM = isDOM(context);

  }
  var select = false, single = false;

  // Parse it as a CSS selector if it's a string
  if (typeof parameter === 'string') {
    parameter =
      this.select(parameter, contextDOM ? context : null);
    select = true;
  }

  // If we're referring a specific node as in on('click', function(){ u(this) })
  // or the select() function returned a single node such as in '#id'
  if (parameter && parameter.nodeName) {
    parameter = [parameter];
    single = true;
  }

  // Convert to an array, since there are many 'array-like' stuff in js-land
  this.nodes = this.slice(parameter);

  if (!select && !single && isArrayLike(parameter) && 0 < parameter.length && !parameterDOM) {
    this.nodes = mq.flatten(parameter)
  }

  if (context && !contextDOM) {
    this.attr((function (context) {
      var data = {};

      for (var prop in context) {
        if (context.hasOwnProperty(prop)) {
          data[prop] = context[prop];
        }
      }
      return data;
    })(context));
  }

  var _mq = this;

  this.nodes.forEach(function (node, index) {
    _mq[index] = node;
  });

  Object.freeze(this)
};

// Map u(...).length to u(...).nodes.length
mq.prototype = {
  get length() {
    return this.nodes.length;
  }
};

// This made the code faster, read "Initializing instance variables" in
// https://developers.google.com/speed/articles/optimizing-javascript
mq.prototype.nodes = [];

mq.extend = mq.prototype.extend = function () {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }

  // extend jQuery itself if only one argument is passed
  if (length === i) {
    target = this;
    --i;
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) == null) {
      continue;
    }
    // Extend the base object
    for (name in options) {
      src = target[name];
      copy = options[name];

      // Prevent never-ending loop
      if (target === copy) {
        continue;
      }

      // Recurse if we're merging plain objects or arrays
      if (deep && copy && (mq.isPlainObject(copy) || (copyIsArray = mq.isArray(copy)))) {
        if (copyIsArray) {
          copyIsArray = false;
          clone = src && mq.isArray(src) ? src : [];

        } else {
          clone = src && mq.isPlainObject(src) ? src : {};
        }

        // Never move original objects, clone them
        target[name] = mq.extend(deep, clone, copy);

        // Don't bring in undefined values
      } else if (copy !== undefined) {
        target[name] = copy;
      }
    }
  }

  // Return the modified object
  return target;
};

mq.extend({

            // Assume jQuery is ready without the ready module
            isReady: true,

            error: function (msg) {
              throw new Error(msg);
            },

            noop: function () {
            },

            isPlainObject: function (obj) {
              var proto, Ctor;

              // Detect obvious negatives
              // Use toString instead of mq.type to catch host objects
              if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
              }

              proto = Object.getPrototypeOf(obj);

              // Objects with no prototype (e.g., `Object.create( null )`) are plain
              if (!proto) {
                return true;
              }

              // Objects with prototype are plain iff they were constructed by a global Object function
              Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
              return typeof Ctor === "function" && fnToString.call(Ctor)
                     === ObjectFunctionString;
            },

            isEmptyObject: function (obj) {
              var name;

              for (name in obj) {
                return false;
              }
              return true;
            },
            each: function (obj, callback) {
              var length, i = 0;

              if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                  if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                  }
                }
              } else {
                for (i in obj) {
                  if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                  }
                }
              }

              return obj;
            },

            trim: function (text) {
              return text == null ? "" : ''.trim.call(text);
            },

            // results is for internal usage only
            makeArray: function (arr, results) {
              var ret = results || [];

              if (arr != null) {
                if (isArrayLike(Object(arr))) {
                  mq.merge(ret,
                           typeof arr === "string" ?
                             [arr] : arr
                  );
                } else {
                  push.call(ret, arr);
                }
              }

              return ret;
            },

            inArray: function (elem, arr, i) {
              return arr == null ? -1 : indexOf.call(arr, elem, i);
            },

            merge: function (first, second) {
              var len = +second.length,
                j = 0,
                i = first.length;

              for (; j < len; j++) {
                first[i++] = second[j];
              }

              first.length = i;

              return first;
            },

            grep: function (elems, callback, invert) {
              var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

              // Go through the array, only saving the items
              // that pass the validator function
              for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                  matches.push(elems[i]);
                }
              }

              return matches;
            },

            // arg is for internal usage only
            map: function (elems, callback, arg) {
              var length, value,
                i = 0,
                ret = [];

              // Go through the array, translating each of the items to their new values
              if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                  value = callback(elems[i], i, arg);

                  if (value != null) {
                    ret.push(value);
                  }
                }

                // Go through every key on the object,
              } else {
                for (i in elems) {
                  value = callback(elems[i], i, arg);

                  if (value != null) {
                    ret.push(value);
                  }
                }
              }

              // Flatten any nested arrays
              return concat.apply([], ret);
            },

            // A global GUID counter for objects
            guid: 1,

            // mq.support is not used in Core but other projects attach their
            // properties to it so it needs to exist.
            support: {}
          });
