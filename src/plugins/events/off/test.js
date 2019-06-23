describe('.off()', function () {

  var listener = function () {
    throw 'Shouldn\'t be called';
  };

  beforeEach(function () {
    base.append('<ul class="temp"><li class="off-single-test">1</li>\
    <li class="off-multiple-test">2</li>\
    <li class="off-multiple-test">3</li>\
    </ul>');
  });

  afterEach(function () {
    base.find(".temp").remove();
    expect(mq(".temp").length).to.equal(0);
  });

  it('should be defined', function () {
    expect(typeof base.off).to.equal('function');
  });

  it('on works', function (done) {
    mq('.off-single-test').on('click', function () {
      done();
    });
    mq('.off-single-test').trigger('click');
  });

  it('removes event from single element', function () {
    mq('.off-single-test').on('click', listener);
    mq('.off-single-test').off('click');
    mq('.off-single-test').trigger('click');
  });

  it('removes event from multiple elements', function () {
    mq('.off-multiple-test').on('click', listener);
    mq('.off-multiple-test').off('click');
    mq('.off-multiple-test').trigger('click');
  });

  it('removes event multiple times', function () {
    mq('.off-multiple-test').on('click', listener);
    mq('.off-multiple-test').on('click', function () {
      throw "Error";
    });
    mq('.off-multiple-test').off('click');
    mq('.off-multiple-test').trigger('click');
  });

  it('removes multiple events', function () {
    mq('.off-multiple-test').on('click mouseover', listener);
    mq('.off-multiple-test').off('click mouseover');
    mq('.off-multiple-test').trigger('mouseover');
  });

  it('does not remove manual event', function (done) {
    mq('.off-single-test').first().addEventListener('click', function () {
      done();
    });
    mq('.off-single-test').off('click');
    mq('.off-single-test').trigger('click');
  });
});
