// Testing the main file
describe(".remove()", function() {

  beforeEach(function() {
    base.append('\
      <ul class="remove-test"> \
        <li></li> \
        <li></li> \
      </ul> \
    ');

    expect(mq('.remove-test').length).to.equal(1);
    expect(mq('.remove-test li').length).to.equal(2);
  });

  afterEach(function() {
    mq('.remove-test').remove();
  });


  it("should be defined", function() {
    expect(typeof base.remove).to.equal('function');
  });

  it("can be called even without any node", function() {
    expect(mq('.remove-test div').length).to.equal(0);
    mq('.remove-test div').remove();
  });

  it("can be called even without parentNode", function() {
    var children = mq('.remove-test li');
    children.remove();
    expect(children.first().parentNode).to.be.null;
    children.remove(); // Remove them again
  });

  it("should return an instance of umbrella with the removed nodes", function() {
    var result = mq('.remove-test').remove();

    expect(result).to.be.instanceof(u);
    expect(result.nodes).to.have.length(1);
    expect(result.attr('class')).to.equal('remove-test');
    expect(result.children().nodes).to.have.length(2); // Two li children.
  });

  it("removes a single element", function() {
    mq('.remove-test').remove();
    expect(mq('.remove-test').length).to.equal(0);
  });

  it("removes several elements", function() {
    mq('.remove-test li').remove();
    expect(mq('.remove-test li').length).to.equal(0);
  });
});
