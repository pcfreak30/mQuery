mq.prototype.show = function () {
  return this.each(function () {
    this.style.display == "none" && (this.style.display = '')
    if (mq(this).css('show') == "none") {
      this.style.display = defaultDisplay(this.nodeName)
    }
  })

};

var elementDisplay = {};

function defaultDisplay(nodeName) {
  var element, display
  if (!elementDisplay[nodeName]) {
    element = document.createElement(nodeName);
    document.body.appendChild(element);
    display = mq(element).css('display');
    element.parentNode.removeChild(element);
    display == "none" && (display = "block");
    elementDisplay[nodeName] = display
  }
  return elementDisplay[nodeName]
}
