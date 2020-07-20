$(".wds-global-navigation__links a.wds-global-navigation__link").remove();
/**************************************************************************
 ************************* GENERAL TOOLS **********************************
 *************************************************************************/
$(".wds-global-navigation__links").prepend(
'<div class="wds-dropdown wds-global-navigation__link-group wds-has-dark-shadow" id="ameri__nav-tools">' +
              '<div class="wds-dropdown__toggle wds-global-navigation__dropdown-toggle wds-global-navigation__link">' +
              '<span id="ameri__nav-tools-title">Tools</span>' +
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny">' +
                '<path d="M6 9l4-5H2" fill-rule="evenodd">' +
                '</path>' +
              '</svg>' +
            '</div>' +
             '<div class="wds-dropdown__content wds-global-navigation__dropdown-content wds-is-not-scrollable">' +
              '<ul class="wds-list wds-is-linked">' +
                '<li class="wds-dropdown-level-2">'+
                '<a href="//mediawiki.org" class="wds-dropdown-level-2__toggle">' +
                '<span>Reference</span>' + 
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                '</path>' +
                '</a>' +
                '<div class="wds-is-not-scrollable wds-dropdown-level-2__content">' +
                    '<ul class="wds-list wds-is-linked">' +
                    	'<li>'+
                    	'<a href="//mediawiki.org/wiki/Help:Tables" target="_blank">Tables</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="//mediawiki.org/wiki/Help:Magic_words" target="_blank">Magic words</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="//mediawiki.org/wiki/Extension:SyntaxHighlight_GeSHi" target="_blank">Syntax Highlighting</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="//mediawiki.org/wiki/Localisation" target="_blank">Localization</a>' +
                    	'</li>' +
                    '</ul>' +
             '</div>' +
			'</li>' +
			'<li class="wds-dropdown-level-2">'+
                '<a href="/wiki/Special:About" class="wds-dropdown-level-2__toggle">' +
                '<span>About</span>' + 
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                '</path>' +
                '</a>' +
                '<div class="wds-is-not-scrollable wds-dropdown-level-2__content">' +
                    '<ul class="wds-list wds-is-linked">' +
                    	'<li>'+
                    	'<a href="/wiki/Special:Insights" target="_blank">Insights</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:Statistics" target="_blank">Statistics</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:Version" target="_blank">Version</a>' +
                    	'</li>' +
                    '</ul>' +
             '</div>' +
			'</li>' +
				'<li class="wds-dropdown-level-2">'+
                '<a href="/wiki/Special:Categories" class="wds-dropdown-level-2__toggle">' +
                '<span>Categories</span>' + 
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                '</path>' +
                '</a>' +
                '<div class="wds-is-not-scrollable wds-dropdown-level-2__content">' +
                    '<ul class="wds-list wds-is-linked">' +
                    	'<li>'+
                    	'<a href="/wiki/Special:Mostpopularcategories" target="_blank">Popular Categories</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:WantedCategories" target="_blank">Wanted Categories</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:UnusedCategories" target="_blank">Unused Categories</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:CategoryTree" target="_blank">Category Tree</a>' +
                    	'</li>' +
                    '</ul>' +
             '</div>' +
			'</li>' +
        '</ul>' +
    '</div>'
);
/**************************************************************************
 *************************** MISCELLANEOUS ********************************
 *************************************************************************/
$(".wds-global-navigation__links").prepend(
'<div class="wds-dropdown wds-global-navigation__link-group wds-has-dark-shadow" id="ameri__nav-misc">' +
              '<div class="wds-dropdown__toggle wds-global-navigation__dropdown-toggle wds-global-navigation__link">' +
              '<span id="ameri__nav-misc-title">Misc</span>' +
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny">' +
                '<path d="M6 9l4-5H2" fill-rule="evenodd">' +
                '</path>' +
              '</svg>' +
            '</div>' +
             '<div class="wds-dropdown__content wds-global-navigation__dropdown-content wds-is-not-scrollable">' +
    '<ul class="wds-list wds-is-linked">' +
            '<li class="wds-dropdown-level-2">'+
                '<a href="#" class="wds-dropdown-level-2__toggle">' +
                '<span>MediaWiki</span>' + 
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                '</path>' +
                '</a>' +
                '<div class="wds-is-not-scrollable wds-dropdown-level-2__content">' +
                    '<ul class="wds-list wds-is-linked">' +
                        '<li>'+
                    	'<a href="/wiki/MediaWiki:ImportJS" target="_blank">ImportJS</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/MediaWiki:Common.js" target="_blank">Common.js</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/MediaWiki:Wikia.js" target="_blank">Wikia.js</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/MediaWiki:Chat.js" target="_blank">Chat.js</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/MediaWiki:Common.css" target="_blank">Common.css</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/MediaWiki:Wikia.css" target="_blank">Wikia.css</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/MediaWiki:Chat.css" target="_blank">Chat.css</a>' +
                    	'</li>' +
                    '</ul>' +
             '</div>' +
			'</li>' +
	        '<li class="wds-dropdown-level-2">'+
                '<a href="/wiki/Special:ListUsers" class="wds-dropdown-level-2__toggle">' +
                '<span>Users</span>' + 
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                '</path>' +
                '</a>' +
                '<div class="wds-is-not-scrollable wds-dropdown-level-2__content">' +
                    '<ul class="wds-list wds-is-linked">' +
                    	'<li>'+
                    	'<a href="/wiki/Special:ListUsers/sysop" target="_blank">Admins</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:ListUsers/bureaucrat" target="_blank">Bureaucrats</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:ListUsers/bot" target="_blank">Bots</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:ListUsers/threadmoderator" target="_blank">Discussions Moderators</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:ListUsers/content-moderator" target="_blank">Content Moderators</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:ListUsers/chatmoderator" target="_blank">Chat Moderators</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:ListUsers/rollback" target="_blank">Rollbackers</a>' +
                    	'</li>' +
                    '</ul>' +
             '</div>' +
		'</li>' +
		'<li class="wds-dropdown-level-2">'+
                '<a href="?debug=1" class="wds-dropdown-level-2__toggle">' +
                '<span>Debug</span>' + 
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                '</path>' +
                '</a>' +
                '<div class="wds-is-not-scrollable wds-dropdown-level-2__content">' +
                    '<ul class="wds-list wds-is-linked">' +
                    	'<li>'+
                    	'<a href="?useuserjs=0" target="_blank">No User JS</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?useusercss=0" target="_blank">No User CSS</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?usesitejs=0" target="_blank">No Site JS</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?usesitecss=0" target="_blank">No Site CSS</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?useuserjs=0&usesitejs=0" target="_blank">No JS</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?useusercss=0&useuserjs=0" target="_blank">No User JS/CSS</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?usesitecss=0&usesitejs=0" target="_blank">No Site JS/CSS</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?useusercss=0&usesitecss=0&useuserjss=0&usesitejs=0" target="_blank">No JS/CSS</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?uselang=qqx" target="_blank">MW Messages</a>' +
                    	'</li>' +
                    '</ul>' +
             '</div>' +
		'</li>' +
		'<li class="wds-dropdown-level-2">'+
                '<a href="#" class="wds-dropdown-level-2__toggle">' +
                '<span>Actions</span>' + 
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                '</path>' +
                '</a>' +
                '<div class="wds-is-not-scrollable wds-dropdown-level-2__content">' +
                    '<ul class="wds-list wds-is-linked">' +
                    	'<li>'+
                    	'<a href="?action=edit" target="_blank">Edit</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?action=history" target="_blank">History</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?action=raw" target="_blank">Raw</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?action=credits" target="_blank">Credits</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?action=watch" target="_blank">Watch</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?action=unwatch" target="_blank">Unwatch</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?action=delete" target="_blank">Delete</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?action=purge" target="_blank">Purge</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/Special:MovePage/' + wgPageName + '" target="_blank">Move Page</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="?useskin=mercury" target="_blank">Mobile Skin</a>' +
                    	'</li>' +
                    '</ul>' +
             '</div>' +
		'</li>' +
    '</ul>' +
'</div>'
);
/**************************************************************************
 *************************** ADMIN TOOLS **********************************
 *************************************************************************/
$(".wds-global-navigation__links").prepend(
'<div class="wds-dropdown wds-global-navigation__link-group wds-has-dark-shadow" id="ameri__nav-admin">' +
              '<div class="wds-dropdown__toggle wds-global-navigation__dropdown-toggle wds-global-navigation__link">' +
              '<span id="ameri__nav-admin-title">Admin</span>' +
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny">' +
                '<path d="M6 9l4-5H2" fill-rule="evenodd">' +
                '</path>' +
              '</svg>' +
            '</div>' +
             '<div class="wds-dropdown__content wds-global-navigation__dropdown-content wds-is-not-scrollable">' +
              '<ul class="wds-list wds-is-linked">' +
                '<li class="wds-dropdown-level-2">'+
                '<a href="#" class="wds-dropdown-level-2__toggle">' +
                '<span>Tools</span>' + 
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                '</path>' +
                '</a>' +
                '<div class="wds-is-not-scrollable wds-dropdown-level-2__content">' +
                    '<ul class="wds-list wds-is-linked">' +
                    	'<li>'+
                    	'<a href="/Special:RecentChanges" target="_blank">Recent Changes</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:WikiActivity" target="_blank">Wiki Activity</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:Community" target="_blank">Community</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:AdminDashboard" target="_blank">Admin Dashboard</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:UserRights" target="_blank">User Rights</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/MediaWiki:Community-corner" target="_blank">Community Corner</a>' +
                    	'</li>' +
                    '</ul>' +
             '</div>' +
			'</li>' +
		   '<li class="wds-dropdown-level-2">'+
                '<a href="#" class="wds-dropdown-level-2__toggle">' +
                '<span>Settings</span>' + 
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron">' +
                '<path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd">' +
                '</path>' +
                '</a>' +
                '<div class="wds-is-not-scrollable wds-dropdown-level-2__content">' +
                    '<ul class="wds-list wds-is-linked">' +
                        '<li>'+
                    	'<a href="/wiki/Special:ThemeDesigner" target="_blank">Theme Designer</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:WikiFeatures" target="_blank">Features</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/MediaWiki:Wiki-navigation" target="_blank">Local Navigation</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/MediaWiki:Emoticons" target="_blank">Emoticons</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:Export" target="_blank">Export</a>' +
                    	'</li>' +
                    	'<li>'+
                    	'<a href="/wiki/Special:Import" target="_blank">Import</a>' +
                    	'</li>' +
                    '</ul>' +
             '</div>' +
			'</li>' +
			'<li>' +
	            '<a href="/wiki/Special:Block" class="wds-button wds-is-secondary wds-global-navigation__link-button">Block</a>' +
            '</li>' +
        '</ul>' +
    '</div>'
);