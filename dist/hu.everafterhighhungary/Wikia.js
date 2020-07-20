/*<pre><nowiki>*/
 
importArticles( {
	type: 'script',
	articles: [
		'MediaWiki:Wikia.js/preload.js'			// Template preloads
	]
});
 
// Randomize wiki logo Thread578801
$(function() {
    var images = [
      'https://images.wikia.nocookie.net/__cb20140730151939/everafterhighhungary/hu/images/8/89/Wiki-wordmark.png',
      'https://images.wikia.nocookie.net/__cb20130616095101/everafterhighhungary/hu/images/archive/8/89/20140730151803!Wiki-wordmark.png',
      'https://images.wikia.nocookie.net/__cb20140731131544/everafterhighhungary/hu/images/4/49/Wiki-wordmark2.png',
    ];
 
    $('h1.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});
 
/*</nowiki></pre>*/