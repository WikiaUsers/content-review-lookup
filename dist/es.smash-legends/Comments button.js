(function () {
  if (mw.config.get('wgCanonicalNamespace') !== '' || [ 0, 1 ].includes( mw.config.get('wgArticleId') )) return
    
  mw.loader.using(['jquery', 'mediawiki.api']).then(function() {
	  var api = new mw.Api();
	  api.get({
	      action: 'query',
	      meta: 'allmessages',
	      amlang: mw.config.get('wgUserLanguage'),
	      ammessages: 'page-header-action-button-talk',
	      uselang: 'content', // T97096
	      maxage: 300,
	      smaxage: 300,
	      formatversion: 2
	    })
	    .then(function (data) {
	      const label = data.query.allmessages[0].content
	      return label.replace( '({{FORMATNUM:$1}})', '' )
	    })
	    .then(function (label) {
	      $('.page-header__action-button').eq(0)
	        .css('width', 'auto')
	        .append('<span style="margin-left: 6px;">' + label + '</span>')
	    });
  });
})()