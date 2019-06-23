// [INTERNAL USE ONLY]
// Select the adecuate part from the context
mq.prototype.select = function (parameter, context) {
  // Allow for spaces before or after
  parameter = parameter.replace(/^\s*/, '').replace(/\s*$/, '');

  if (/^</.test(parameter)) {
    return mq().generate(parameter);
  }

  if (typeof window.Sizzle !== 'undefined') {
    return Sizzle(parameter, (context || document));
  }

  return (context || document).querySelectorAll(parameter);
};
