// Testing the main file
describe(".empty()", function() {

  beforeEach(function() {
    base.append('\
      <div class="empty-test"> \
        <p></p> \
        <p></p> \
      </div> \
    ');

    expect(mq('.empty-test').length).to.equal(1);
    expect(mq('.empty-test p').length).to.equal(2);
  });

  afterEach(function() {
    mq('.empty-test').remove();
  });


  it("should be defined", function() {
    expect(typeof base.empty).to.equal('function');
  });

  it("can be called even without any node", function() {
    expect(mq('.empty-test div').length).to.equal(0);
    mq('.empty-test div').empty();
  });

  it("will clean text-only nodes", function() {
    mq('.empty-test').html('Hello world');
    expect(mq('.empty-test').html()).to.equal('Hello world');
    mq('.empty-test').empty();
    expect(mq('.empty-test').html()).to.equal('');
  });

  it("will clean mixed nodes", function() {
    mq('.empty-test').html('Hello world!<p>How <strong>are you</strong>?</p>');
    mq('.empty-test').empty();
    expect(mq('.empty-test').html()).to.equal('');
  });

  it("should return an instance of umbrella with the empty nodes", function() {
    var result = mq('.empty-test').empty();

    expect(result).to.be.instanceof(u);
    expect(result.nodes).to.have.length(1);
    expect(result.attr('class')).to.equal('empty-test');
  });

  it("empty element", function() {
    mq('.empty-test').empty();
    expect(mq('.empty-test p').length).to.equal(0);
  });
});
