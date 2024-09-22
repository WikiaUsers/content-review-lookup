/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
	type: 'script',
	articles: ['u:dev:MediaWiki:NullEditButton/code.js',
	]
});
window.countdownTimer = {
    selfNullEdit: function () {
       $("#ca-null-edit").click();
    }
};