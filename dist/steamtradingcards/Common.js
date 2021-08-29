/* Any JavaScript here will be loaded for all users on every page load. */

/** Loading UserTags from a predefined Json Page **/
mw.loader.using('mediawiki.api').then(function() {
    new mw.Api().get({
        action: 'query',
        titles: 'MediaWiki:Custom-UserTags.json',
        prop: 'revisions',
        rvprop: 'content',
        rvslots: 'main'
    }).then(function(data) {
        window.UserTagsJS = JSON.parse(data.query.pages[183267].revisions[0].slots.main['*']);
    });
});

// Disables the Rollback Script 
window.RollbackWikiDisable = true;

// Default Image License: Fairuse
$(function() {
	if (wgPageName === "Special:Upload") {
    	$("#wpLicense").val("Fairuse");
	}
});