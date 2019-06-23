var cssNumber = {
  'column-count': 1,
  'columns': 1,
  'font-weight': 1,
  'line-height': 1,
  'opacity': 1,
  'z-index': 1,
  'zoom': 1
};

mq.prototype.css = function (property, value) {
  if (arguments.length < 2) {
    var element = this.first();
    if (typeof property == 'string') {
      if (!element) {
        return
      }
      return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(
        property)
    } else if (isArrayLike(property)) {
      if (!element) {
        return
      }
      var props = {}
      var computedStyle = getComputedStyle(element, '')
      $.each(property, function (_, prop) {
        props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
      })
      return props
    }
  }

  var css = ''
  if (toType(property) == 'string') {
    if (!value && value !== 0) {
      this.each(function () {
        this.style.removeProperty(dasherize(property))
      })
    } else {
      css = dasherize(property) + ":" + maybeAddPx(property, value)
    }
  } else {
    for (key in property) {
      if (!property[key] && property[key] !== 0) {
        this.each(function () {
          this.style.removeProperty(dasherize(key))
        })
      } else {
        css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
      }
    }
  }

  return this.each(function () {
    this.style.cssText += ';' + css
  })
};

function maybeAddPx(name, value) {
  return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
}

function dasherize(str) {
  return str.replace(/::/g, '/')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

var camelize = function (str) {
  return str.replace(/-+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : ''
  })
};
