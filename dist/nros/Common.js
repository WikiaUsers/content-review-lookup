/* Any JavaScript here will be loaded for all users on every page load. */

SpoilerAlert = {
  pages: ["Spoiler"],
}
importArticles({
    type: "script",
    articles: [
        "w:c:dev:SpoilerAlert/code.2.js"
    ]
});
importArticles({
	type: 'style',
	articles: [
		'u:dev:MediaWiki:TZclock.css'
	]
}, {
	type: 'script',
	articles: [
		'u:dev:TZclock.js'
	]
});
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};