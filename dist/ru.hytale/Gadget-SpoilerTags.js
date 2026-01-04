mw.hook('dev.spoilerTags').add(function() {
console.log('SpoilerTags initialized.');

if (window.dev.spoilerTags.spoilers && window.dev.spoilerTags.spoilers.length > 0) {
if (window.dev.spoilerTags.isAllSpoiled()) {
document.body.classList.add('show-all-spoilers');
console.log('All spoilers are shown. Added class "show-all-spoilers" to body.');
} else {
console.error('Some spoilers are still hidden.');
}
} else {
console.error('Spoilers array is not populated or is empty.');
}
});
importArticles({
type: 'script',
articles: [
	'u:dev:MediaWiki:SpoilerTags.js'
	]
});