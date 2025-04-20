importArticle({ type: 'script', article: 'MediaWiki:Details.js' });
mw.loader.using('jquery.makeCollapsible', function () {
  $('.mw-collapsible').makeCollapsible();
});