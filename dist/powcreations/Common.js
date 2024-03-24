/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================
//     Append article's topic to the header
// ============================================

var TOPIC_ARTICLES = ['Outsiders SMP', 'Rats SMP', 'A Wild Pig\'s Chase', 'Pirates SMP', 'Rat Hunt'];

var articleName = mw.config.get('wgTitle');
var articleCategories = mw.config.get('wgCategories');

var topicCategories = [];

articleCategories.forEach(function(cat) {
	if (TOPIC_ARTICLES.includes(cat)) topicCategories.push(cat);
});

// Unneccesary to add topic to header if the article is the topic itself (no need to put "in RATS SMP" if it's the Rats SMP article)
var isTopicArticle = TOPIC_ARTICLES.includes(articleName);

// To make sure it's not adding the topic to category or template pages for example.
var isArticle = !mw.config.get('wgCanonicalNamespace');

if (topicCategories.length && !isTopicArticle && isArticle) {
	var spanString ='<span class="page-title-category">in ';
	
	for (var i in topicCategories) {
		var category = topicCategories[i];
		
		spanString += '<a href="/wiki/' + category + '" title="' + category + '">' + category.toUpperCase() + '</a>';
		
		if (i != (topicCategories.length - 1)) spanString += ', ';
	}
	
	spanString += '</span>';
	
	document.querySelector('#firstHeading').insertAdjacentHTML('beforeend', spanString);
}