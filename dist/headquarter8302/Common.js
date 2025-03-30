// Dev imports
importArticles({
	type: 'script',
    articles: [
        'u:dev:MediaWiki:MediaWikiBacklink/code.js',
    ]
});

// Wiki-wide configuration
(function (window) {
  window.wiki = window.wiki ||  {
  	config: {
      styleBgTypes: ["animatedLinearGradient", "staticRadialGradient"]
    }
  };
  
  window.user = window.user || {};
})(this);