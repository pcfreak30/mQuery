  // Testing the main file
describe(".clone(options)", function() {
  afterEach(function(){
    mq('.container').remove();
  });

  describe("clone() nodes without events", function() {
    beforeEach(function() {
      base.append('<div class="container">\
        <div class="testClone1">Hello</div>\
        <div class="cloneDestination">Goodbye</div>\
      </div>');
    });

    it("should be a function", function() {
      isFn(base.clone);
    });

    it("should clone a single simple node", function() {
      mq('.cloneDestination').append(mq('.testClone1'));
      size('.container > .testClone1', 1);
      size('.cloneDestination > .testClone1', 1);
      size('.testClone1', 2);
      expect(mq('.cloneDestination > .testClone1').text()).to.eq('Hello');
    });

    it("should clone nested nodes", function() {
      mq('.testClone1').append('<div class="testClone2">Hi</div>');

      size('.container > .testClone1 > .testClone2', 1);
      expect(mq('.testClone2').text()).to.eq('Hi');
    });
  });



  describe("clone() nodes with events", function() {
    beforeEach(function() {
      base.append('<div class="container">\
        <div class="testClone1">Hello</div>\
        <div class="testClone2">\
          <div class="testCloneWithEvents1">\
            click, touch, etc\
          </div>\
        </div>\
        <div class="cloneDestination"></div>\
      </div>');
    });

    it("should clone a node and its events by default", function(done) {
      mq('<div>').on('click', function (e) {
        mq(e.target).off('click');
        done();
      }).clone().trigger('click').trigger('click');
    });

    it("should clone nested nodes and their events by default", function(done) {
      mq('.testCloneWithEvents1').on('click', function () {
        done();
      });
      mq('.cloneDestination').append(mq('.testClone2'));
      mq('.cloneDestination > .testClone2 > .testCloneWithEvents1').trigger('click');
    });
  });



  describe("clone() form elements", function() {
    before(function() {
      mq('form.clone [type=text]').first().value = 'test input';
      mq('form.clone [type=checkbox]').first().checked = true;
      mq('form.clone [type=radio]').first().checked = true;
      mq('form.clone select').first().value = 'b';
      mq('form.clone textarea').first().value = 'test textarea';
    });

    afterEach(function(){
      mq('.destination').html("");
    });

    it("has the correct values initially", function(){
      expect(mq('form.clone [type=text]').first().value).to.equal('test input', 'beforeClone');
      expect(mq('form.clone [type=checkbox]').first().checked).to.equal(true, 'beforeClone');
      expect(mq('form.clone [type=radio]').first().checked).to.equal(true, 'beforeClone');
      expect(mq('form.clone select').first().value).to.equal('b', 'beforeClone');
      expect(mq('form.clone textarea').first().value).to.equal('test textarea', 'beforeClone');
    });


    it ("clones a full form correctly", function(){
      mq('.destination').append(mq('form.clone'));
      expect(mq('.destination [type=text]').length).to.equal(1);
      expect(mq('.destination [type=text]').first().value).to.equal('test input');
      expect(mq('.destination [type=checkbox]').first().checked).to.equal(true);
      expect(mq('.destination [type=radio]').first().checked).to.equal(true);
      expect(mq('.destination select').first().value).to.equal('b');
      expect(mq('.destination textarea').first().value).to.equal('test textarea');
    });

    it ("should clone a text input and its value by default", function() {
      mq('.destination').append(mq('form.clone [type=text]'));
      expect(mq('.destination [type=text]').first().value).to.eq('test input');
    });

    it ("should clone a checkbox input and its value by default", function() {
      mq('.destination').append(mq('form.clone [type=checkbox]'));
      expect(mq('.destination [type=checkbox]').first().checked).to.eq(true);
    });

    it ("should clone a radio input and its value by default", function() {
      mq('.destination').append(mq('form.clone [type=radio]'));
      expect(mq('.destination [type=radio]').first().checked).to.eq(true);
    });


    it ("should clone a textarea input and its value by default", function() {
      mq('.destination').append(mq('form.clone textarea'));
      expect(mq('.destination textarea').first().value).to.eq('test textarea');
    });

    it ("should clone a select input and its value by default", function() {
      mq('.destination').append(mq('form.clone select'));
      expect(mq('.destination select').first().value).to.eq('b');
    });
  });




  describe(".clone() and node data attributes", function() {
    beforeEach(function() {
      base.append('<div class="container"><div class="testCloneData" data-foo="bar"></div><div class="destination"></div></div>');
    });

    it("should clone node data attributes", function() {
      mq('.destination').append(mq('.testCloneData'));
      expect(mq('.destination .testCloneData').data('foo')).to.eq('bar');
    });
  });
});
