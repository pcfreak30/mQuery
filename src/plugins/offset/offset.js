mq.prototype.offset = function (coordinates) {
  if (coordinates) {
    return this.each(function (index) {
      var $this = mq(this),
        coords = funcArg(this, coordinates, index, $this.offset()),
        parentOffset = $this.offsetParent().offset(),
        props = {
          top: coords.top - parentOffset.top,
          left: coords.left - parentOffset.left
        };

      if ($this.css('position') === 'static') {
        props['position'] = 'relative'
      }
      $this.css(props)
    })
  }
  if (!this.length) {
    return null
  }
  if (document.documentElement !== this.first() && !mq.contains(document.documentElement,
                                                                this.first())) {
    return {top: 0, left: 0}
  }
  var obj = this.first().getBoundingClientRect();
  return {
    left: obj.left + window.pageXOffset,
    top: obj.top + window.pageYOffset,
    width: Math.round(obj.width),
    height: Math.round(obj.height)
  }
};
