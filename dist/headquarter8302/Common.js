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

// Set to alternate background
if (window.user.config.styleBgType === "staticRadialGradient") {
  document.getElementsByTagName("body")[0].style.setProperty("background-image", "radial-gradient(ellipse at top, transparent, rgba(0 0 0 / 0.25))");
}