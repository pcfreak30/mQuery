// [INTERNAL USE ONLY]
// Generate a fragment of HTML. This irons out the inconsistences
mq.prototype.generate = function (html) {
  // Table elements need to be child of <table> for some f***ed up reason
  if (/^\s*<tr[> ]/.test(html)) {
    return mq(document.createElement('table')).html(html).children().children().nodes;
  } else if (/^\s*<t(h|d)[> ]/.test(html)) {
    return mq(document.createElement('table')).html(html).children().children().children().nodes;
  } else if (/^\s*</.test(html)) {
    return mq(document.createElement('div')).html(html).children().nodes;
  } else {
    return document.createTextNode(html);
  }
};
