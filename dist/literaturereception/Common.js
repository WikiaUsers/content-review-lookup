/* Any JavaScript here will be loaded for all users on every page load. */
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
/*add pages to be purged every 24 hours directly below*/
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

// prevents existing tags from being hidden
(window.dev = window.dev [[:Template:!!]] {}).profileTags = { noHideTags: true };

window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { u: 'Has not edited recently' }
	}
};

//tagging Moderators to never be tagged as "usergroup-inactive"
UserTagsJS.modules.userfilter = {
	'UnboundBeartic': ['inactive'],
	'Moonwatcher x Qibli': ['inactive']
};