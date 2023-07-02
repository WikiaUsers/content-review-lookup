/* Any JavaScript here will be loaded for all users on every page load. */
/* experimental toolbar button for main wiki */
var toolbarLabel = 'Important';
var toolbarLinks = [
    {link: 'http://the-book-lovers.fandom.com/wiki/The_book_lovers_Wiki:Rules', label: 'Rules'},
    {link: 'http://the-book-lovers.fandom.com/wiki/The_book_lovers_Wiki:Wiki_Staff', label: 'Staff'},
    {link: 'https://docs.google.com/forms/d/e/1FAIpQLSf-ZiP9CkR47YzySmRp1LYkYQuXeqb0kd4TKdJCis-lH40zpg/viewform?usp=send_form&amp;usp=embed_facebook&amp;usp=embed_facebook&amp;usp=embed_facebook', label: 'Staff Application'}
];
// Ajax auto-refresh
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:WikiActivity',
    'Special:Contributions'
];
var toolbarElement = document.createElement( 'li' );
var toolbarWrapper = document.querySelector( '#WikiaBar .tools, #WikiaBar .wikia-bar-anon' );
toolbarElement.classList.add( 'custom' );
toolbarElement.classList.add( 'menu' );
toolbarElement.classList.add( 'wds-dropdown' );
toolbarElement.classList.add( 'wikiabar-button' );
toolbarElement.classList.add( 'wds-is-flipped' );
toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
    '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + 
'</span>' + 
'<div class="wds-dropdown__content">' + 
    '<h2 style="margin-left: 16px">Important</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

window.AjaxRCRefreshText = 'Auto-refresh';

/**
 * Add a css class to user tags based on the tag's text
 */
(function () {
    // Don't run on pages w/o a masthead
    if (!$('#userProfileApp').length) return;

    // Wait until the masthead loads
    const interval = setInterval(function () {
        if ($('#userProfileApp').length) {
            clearInterval(interval);
            // Get all the tags
            const userTags = document.querySelectorAll('.user-identity-header__tag');

            // For each tag add a class equal to
            // 'user-identity-header__tag--' + lowercased tag text
            userTags.forEach(function (tag) {
                tag.classList.add(
                    'user-identity-header__tag--' + tag.textContent.toLowerCase().replace(' ', '-')
                );
            });
        }
    }, 1000);
})();

// adds show/hide-button to navigation bars
function createDivToggleButton(){
    var indexNavigationBar = 0;
    // iterate over all < div >-elements 
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "DivFrame")) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'DivToggle';
            NavToggle.setAttribute('id', 'DivToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleDiv(' + indexNavigationBar + ');');
 
            var isCollapsed = hasClass( NavFrame, "collapsed" );
 
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'DivContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
 
 
            var NavToggleText = document.createTextNode(isCollapsed ? DivShowTxt : DivHideTxt);
            NavToggle.appendChild(NavToggleText);
 
            // Find the NavHead and attach the toggle link
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "DivHead")) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'DivFrame' + indexNavigationBar);
        }
    }
}
 
$( createDivToggleButton );



//automatic daily purge

(function DailyPurge(window, $, mw) {
	"use strict";

	const pagesList = [
		'Blog:Staff Blog Posts'
                'Category:Staff Blog Posts'
                'Special:Community'
	].map(function(string) {
		return string.replaceAll(' ', '_');
	});
	if (!pagesList.includes(mw.config.get('wgPageName')))
		return;

	mw.loader.using('mediawiki.api').then(function() {
		try {
			const lastPurgeTimestamp = 
				mw.config.get('wgPageParseReport')
				.cachereport
				.timestamp;

			const lastPurgeTimeParts = lastPurgeTimestamp.match(/(....)(..)(..)(..)(..)(..)/);
			const lastPurgeTime = new Date(Date.UTC(
				lastPurgeTimeParts[1],
				lastPurgeTimeParts[2] - 1,
				lastPurgeTimeParts[3],
				lastPurgeTimeParts[4],
				lastPurgeTimeParts[5],
				lastPurgeTimeParts[6],
			));

			if (Date.now() - lastPurgeTime.valueOf() <= 24 * 60 * 60 * 1000)
				return;

		} catch(e) {
			return;
		}

		(new mw.Api()).post({
			action: 'purge',
			titles: mw.config.get('wgPageName')
		});
	});

})(window, jQuery, mediaWiki);