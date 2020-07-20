(function() {
  "use strict";
  new mw.Api().get({
    action: 'parse',
    page: 'Template:Promotion',
    prop: 'text'
  }, {
    ok: function (json) {
      $('#WikiaArticle').prepend(json.parse.text['*']);
    }
  });
}).call(this);