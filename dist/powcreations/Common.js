/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================
//     Append article's topic to the header
// ============================================

var TOPIC_ARTICLES = ['Outsiders SMP', 'Rats SMP', 'A Wild Pig\'s Chase', 'Pirates SMP', 'Rat Hunt', 'Rats: In Paris'];

// Articles which are a part of the topic, but aren't "in" the topic, such as TwitchCon panels. "in XYZ" should therefore not be appended to the title.
var BLACKLISTED_ARTICLES = ['Rats SMP: A Minecraft Tail', 'Pirates SMP: A Voyage to the Past!']

var articleName = mw.config.get('wgTitle');
var articleCategories = mw.config.get('wgCategories');

var topicCategories = [];

articleCategories.forEach(function(cat) {
	if (TOPIC_ARTICLES.includes(cat)) topicCategories.push(cat);
});

// Unneccesary to add topic to header if the article is the topic itself (no need to put "in RATS SMP" if it's the Rats SMP article)
var isTopicArticle = TOPIC_ARTICLES.includes(articleName);

var isBlacklistedArticle = BLACKLISTED_ARTICLES.includes(articleName);

// To make sure it's not adding the topic to category or template pages for example.
var isArticle = !mw.config.get('wgCanonicalNamespace');

// If article contains topic categories, is an article and not a topic one, and is not a blacklisted article.
if ((topicCategories.length > 0) && (isArticle) && (!isTopicArticle) && (!isBlacklistedArticle)) {
	var spanString ='<span class="page-title-category">in ';
	
	for (var i in topicCategories) {
		var category = topicCategories[i];
		
		spanString += '<a href="/wiki/' + category + '" title="' + category + '">' + category.toUpperCase() + '</a>';
		
		if (i != (topicCategories.length - 1)) spanString += ', ';
	}
	
	spanString += '</span>';
	
	document.querySelector('#firstHeading').insertAdjacentHTML('beforeend', spanString);
}