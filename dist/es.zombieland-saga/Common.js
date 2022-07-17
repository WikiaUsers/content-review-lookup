  /********************************/
  /* Tooltips for the media icons */
  /********************************/

  $('#media-icons a').tooltip();
  
  
  /* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
	type:'script',
	articles: [
        'MediaWiki:Common.js/redditwidget.js',      // Adds reddit widget to id="reddit-widget"
	]
});