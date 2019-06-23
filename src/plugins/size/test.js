describe('.size()', function() {

  it('should be a function', function() {
    expect(typeof base.size).to.equal('function');
  });

  it('should return this Umbrella Object', function() {
    size(mq('li').scroll(), mq('li').length);
  });

  it('can get the right size', function() {
    var size = mq('body').size();
    expect(size).to.deep.equal(mq('body').first().getBoundingClientRect());
  });

  it('can get the height', function() {
    var size = mq('body').size();
    expect(Math.round(size.height)).to.equal(mq('body').first().clientHeight);
  });
});
