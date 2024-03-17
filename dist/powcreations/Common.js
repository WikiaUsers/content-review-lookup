/* Any JavaScript here will be loaded for all users on every page load. */

// ============================================
//     Append article's topic to the header
// ============================================

var TOPIC_ARTICLES = ['Outsiders SMP', 'Rats SMP', 'A Wild Pig\'s Chase', 'Pirates SMP'];

var articleName = mw.config.get('wgTitle');
var articleCategories = mw.config.get('wgCategories');

var topicCategory = '';

articleCategories.forEach(function(cat) {
	if (TOPIC_ARTICLES.includes(cat)) topicCategory = cat;
});

// Unneccesary to add topic to header if the article is the topic itself (no need to put "in RATS SMP" if it's the Rats SMP article)
var isTopicArticle = TOPIC_ARTICLES.includes(articleName);

// To make sure it's not adding the topic to category or template pages for example.
var isArticle = !mw.config.get('wgCanonicalNamespace');

if (topicCategory && !isTopicArticle && isArticle) {
	document.querySelector('#firstHeading').insertAdjacentHTML('beforeend', '<span class="page-title-category">in <a href="/wiki/' + topicCategory + '" title="' + topicCategory + '">' + topicCategory.toUpperCase() + '</a></span>');
}