/* Any JavaScript here will be loaded for all users on every page load. */

const WIKI_TOPICS = [
	// SMPs
	'Outsiders SMP', 
	'Rats SMP', 
	'Pirates SMP', 
	'Rats: In Paris',
	'Cowboy SMP',
	'Vampires SMP',
	
	// PowMinis
	'A Wild Pig\'s Chase', 
	
	// Other
	'Rat Hunt', 
];

// ============================================
//     Append article's topic to the header
// ============================================

// Articles which may contain wiki topic categories but are not canon to the universe - currently this only applies to TwitchCon panels.
const CATEGORIES_TO_IGNORE = [
	'TwitchCon'	
];

let articleName = mw.config.get('wgTitle');
let articleCategories = mw.config.get('wgCategories');

let articleTopics = [];

// Look for any wiki topic categories
articleCategories.forEach((category) => { if (WIKI_TOPICS.includes(category)) articleTopics.push(category); });

/*
	A couple of checks we want to do:
	- Make sure the page is an article (doesn't have a namespace)
	- Make sure the article isn't the wiki topic itself (we don't want the header to say "Rats SMP in Rats SMP")
	- Make sure the article isn't in any blacklisted categories (e.g. TwitchCon)
*/
let isArticle = !mw.config.get('wgCanonicalNamespace');
let isTopicArticle = WIKI_TOPICS.includes(articleName);
let includesIgnoredCategories = articleCategories.some((category) => CATEGORIES_TO_IGNORE.includes(category));

if ((articleTopics.length > 0) && (isArticle) && (!isTopicArticle) && (!includesIgnoredCategories)) {
	let spanString ='<span class="page-title-category">in ';
	
	for (let i in articleTopics) {
		let category = articleTopics[i];
		
		spanString += '<a href="/wiki/' + category + '" title="' + category + '">' + category.toUpperCase() + '</a>';
		
		// If this isn't the last wiki topic in the list (if there's more than one), add a comma
		if (i != (articleTopics.length - 1)) spanString += ', ';
	}
	
	spanString += '</span>';
	
	document.querySelector('#firstHeading').insertAdjacentHTML('beforeend', spanString);
}