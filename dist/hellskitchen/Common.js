/* Any JavaScript here will be loaded for all users on every page load. */
/* User profile header custom tags */

window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{Remove this to start creating your userpage}}',
        3: false
    },
    summary: 'Script: Creating userpage on first edit'
};

mw.loader.using('mediawiki.api').then(function(){
	if (document.querySelector(".community-page-rail")) {
		const api = new mw.Api();
		api.get({
			action:'parse',
			page:'Template:CommunityRail',
		}).done( function ( data ) {
			mw.hook('wikipage.content').fire($(".community-page-rail").prepend(data.parse.text['*']));
		});
	}
});
window.MastheadRightsBadgeSettings = {
    iconSize: '60px',
};