mw.loader.using('ext.fandom.ContentReview.legacyLoaders.js', function() {
  importArticles({
      type: 'script',
      articles: [
          'u:dev:MediaWiki:WikiActivity.js',
      ]
  });
});

$(document).ready(function(){
    var recentChangesButton = $(".wiki-tools .wds-button[data-tracking='recent-changes']");
    recentChangesButton.attr("href", "/wiki/Special:WikiActivity");
    recentChangesButton.attr("title",  "Wiki Activity [alt-shift-r]");
    
    var wikiActivityLink = $(".new[href='/wiki/Special:WikiActivity']");
    wikiActivityLink.attr("class", "");
    wikiActivityLink.attr("title", "Special:WikiActivity");
});