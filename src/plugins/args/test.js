
describe(".args(arguments)", function() {
  
  it("should be defined", function() {
    expect(typeof mq().args).to.equal('function');
  });
  
  it("accepts zero parameters", function(){
    expect(mq().args()).to.deep.equal([]);
  });
  
  it("accepts falsy", function(){
    expect(mq().args(null)).to.deep.equal([]);
    expect(mq().args(false)).to.deep.equal([]);
    expect(mq().args(undefined)).to.deep.equal([]);
    expect(mq().args("")).to.deep.equal([]);
    expect(mq().args([])).to.deep.equal([]);
  });
  
  it("doesn't accept two parameters", function(){
    expect(mq().args('a', 'b')).to.deep.equal(['a']);
  });
  
  it("accepts an umbrella instance", function(){
    expect(mq().args(mq(['a', 'b']))).to.deep.equal(['a', 'b']);
    expect(mq().args(mq(['a', 'b']).nodes)).to.deep.equal(['a', 'b']);
  });
  
  
  describe("works with a single string", function(){
    it("single string", function(){
      expect(mq().args('a')).to.deep.equal(['a']);
    });
    
    it("splits a string with space", function(){
      expect(mq().args('a b ')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with comma", function(){
      expect(mq().args('a,b,')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with space and comma", function(){
      expect(mq().args('a, b, ')).to.deep.equal(['a', 'b']);
    });
    
    it("splits a string with enter", function(){
      expect(mq().args('a\nb\t')).to.deep.equal(['a', 'b']);
    });
  });
  
  
  describe("works with different arrays", function(){
    
    it("single element", function(){
      expect(mq().args(['a'])).to.deep.equal(['a']);
    });
    
    it("single element", function(){
      expect(mq().args(['a', 'b', 'c'])).to.deep.equal(['a', 'b', 'c']);
    });
    
    it("splits a string with space", function(){
      expect(mq().args(['a b', 'c d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with comma", function(){
      expect(mq().args(['a,b', 'c,d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with space and comma", function(){
      expect(mq().args(['a, b', 'c, d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with whitespaces", function(){
      expect(mq().args(['a\nb', 'c\td'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
  });
  
  
  describe("works with a function", function(){
    
    it("single element", function(){
      expect(mq().args(['a'])).to.deep.equal(['a']);
    });
    
    it("single element", function(){
      expect(mq().args(['a', 'b', 'c'])).to.deep.equal(['a', 'b', 'c']);
    });
    
    it("splits a string with space", function(){
      expect(mq().args(['a b', 'c d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with comma", function(){
      expect(mq().args(['a,b', 'c,d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with space and comma", function(){
      expect(mq().args(['a, b', 'c, d'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
    
    it("splits a string with whitespaces", function(){
      expect(mq().args(['a\nb', 'c\td'])).to.deep.equal(['a', 'b', 'c', 'd']);
    });
  });
  
  
});
