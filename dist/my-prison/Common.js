/* Any JavaScript here will be loaded for all users on every page load. */

		/* ==== [[MediaWiki:ImportJS]] customization ==== */
	// MarkBlocked strike and tooltip configuration
window.mbIndefStyle = 'color: #ff0000; opacity: 0.7; font-style: italic; text-decoration: line-through; text-decoration-thickness: 0.1px; font-weight: 300; letter-spacing: 0.8px';

window.mbTooltip = 'blocked by $2 for $1 with the reason: \"$3\" ($4 ago)';

	// AutoCreateUserPages configuration
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{NewUser}}',
    }, 
    summary: 'Automatically creating this user\'s page',
    notify: true
};

	// LinkPreview Content configuration  
window.pPreview.RegExp.noinclude = ['.pull-quote'];

		/* == Others Gadgets: [[Special:Gadgets]] */

	/* ==== Search Bar for Change Log ==== */
// Moved to [[MediaWiki:Gadget-ChangeLogFilter.js]].

	/* ==== Resource Calculator ==== */
(function() {
    var pageName = mw.config.get('wgPageName');
        if (pageName === 'Calculator') {
            mw.loader.load('ext.gadget.PrisonManager');
        }
})();
	// Moved to [[MediaWiki:Gadget-PrisonManager.js]].