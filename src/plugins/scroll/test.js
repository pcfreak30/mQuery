// insert tall element to test scroll()
var elHeight = window.innerHeight + 100;
var el = '<div style="height:' + elHeight + 'px" id="scrollTest"></div>';
mq('body').append(el);


describe('.scroll()', function() {

  it('should be a function', function() {
    expect(typeof base.scroll).to.equal('function');
  });

  it('should return this Umbrella Object', function() {
    size(mq('li').scroll(), mq('li').length);
  });

  it('can scroll to the element', function(done) {
    expect(mq('body').size().top).to.be.above(-10);
    mq('#scrollTest').scroll();

    setTimeout(function(){
      expect(mq('body').size().top).to.be.below(-10);
      mq('#scrollTest').remove();
      mq('body').scroll();
      done();
    }, 100);
  });
});
