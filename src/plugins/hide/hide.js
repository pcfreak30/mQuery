mq.prototype.hide = function () {
  return this.each(function () {
    mq(this).css('display', 'none')
  })
};
