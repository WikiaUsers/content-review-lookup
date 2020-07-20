/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxBatchDelete/code.js',
    ]
});

/**
 * Dynamic Navigation Bars. See [[Wikipedia:NavFrame]]
 * 
 * Based on script from en.wikipedia.org, 2008-09-15.
 *
 * @source www.mediawiki.org/wiki/MediaWiki:Gadget-NavFrame.js
 * @maintainer Helder.wiki, 2012–2013
 * @maintainer Krinkle, 2013
 */
( function () {

// Set up the words in your language
var collapseCaption = 'hide';
var expandCaption = 'show';

var navigationBarHide = '[' + collapseCaption + ']';
var navigationBarShow = '[' + expandCaption + ']';

/**
 * Shows and hides content and picture (if available) of navigation bars.
 *
 * @param {number} indexNavigationBar The index of navigation bar to be toggled
 * @param {jQuery.Event} e Event object
 */
function toggleNavigationBar( indexNavigationBar, e ) {
	var navChild,
		navToggle = document.getElementById( 'NavToggle' + indexNavigationBar ),
		navFrame = document.getElementById( 'NavFrame' + indexNavigationBar );

	// Prevent browser from jumping to href "#"
	e.preventDefault();

	if ( !navFrame || !navToggle ) {
		return false;
	}

	// If shown now
	if ( navToggle.firstChild.data == navigationBarHide ) {
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( hasClass( navChild, 'NavPic' ) ) {
				navChild.style.display = 'none';
			}
			if ( hasClass( navChild, 'NavContent' ) ) {
				navChild.style.display = 'none';
			}
		}
		navToggle.firstChild.data = navigationBarShow;

	// If hidden now
	} else if ( navToggle.firstChild.data == navigationBarShow ) {
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
				navChild.style.display = 'block';
			}
		}
		navToggle.firstChild.data = navigationBarHide;
	}
}

/**
 * Adds show/hide-button to navigation bars.
 *
 * @param {jQuery} $content
 */
function createNavigationBarToggleButton( $content ) {
	var i, j, navFrame, navToggle, navToggleText, navChild,
		indexNavigationBar = 0,
		navFrames = $content.find( 'div.NavFrame' ).toArray();

	// Iterate over all (new) nav frames
	for ( i = 0; i < navFrames.length; i++ ) {
		navFrame = navFrames[i];
		// If found a navigation bar
		indexNavigationBar++;
		navToggle = document.createElement( 'a' );
		navToggle.className = 'NavToggle';
		navToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
		navToggle.setAttribute( 'href', '#' );
		$( navToggle ).on( 'click', $.proxy( toggleNavigationBar, null, indexNavigationBar ) );

		navToggleText = document.createTextNode( navigationBarHide );
		for ( navChild = navFrame.firstChild; navChild != null; navChild = navChild.nextSibling ) {
			if ( $( navChild ).hasClass( 'NavPic' ) || $( navChild ).hasClass( 'NavContent' ) ) {
				if ( navChild.style.display == 'none' ) {
					navToggleText = document.createTextNode( navigationBarShow );
					break;
				}
			}
		}

		navToggle.appendChild( navToggleText );
		// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
		for ( j = 0; j < navFrame.childNodes.length; j++ ) {
			if ( $( navFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
				navFrame.childNodes[j].appendChild( navToggle );
			}
		}
		navFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
	}
}

mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton );

}());

/* Auto Refresh */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
        // group: { associated tag data }
        bureaucrat: { u: 'Chairman' },
        inactive: { u: 'Has not edited recently'},
        content moderator: { u: 'Double-Star Hunter' },
	}
};

UserTagsJS.modules.mwGroups = ['bureaucrat'];

UserTagsJS.modules.newuser = {
	days: 10, // Must have been on the Wiki for 10 days
	edits: 40, // And have at least 40 edits to remove the tag
	namespace: 0 // Edits must be made to articles to count
};

/* importArticles */
importArticles({
    type: 'script',
    articles: [
        'u:admintools:MediaWiki:Common.js/displayClock.js',
    ]
});

// BEGINNING: JavaScript for placing the fair use rationale template inside the summary box on [[Special:Upload]]. Code by "[[wikipedia:User:Pinky49]]", created and coded specifically for [[wikia:c:cdnmilitary|Duty & Valour]].
 
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '{{Fair use rationale\n| Description       = \n| Source            = \n| Portion           = \n| Purpose           = \n| Resolution        = \n| Replaceability    = \n| Other Information = \n}}';
	}
});
// ****** END: JavaScript for [[Special:Upload]] ******

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(document).ready(function() {
        var $tabs = $("#portal_slider").tabs({ fx: { opacity: 'toggle', duration: 100 } });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

/* Replaces {{Visitor}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 1;
var collapseCaption = 'hide';
var expandCaption = 'show';
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();

// Randomize wiki logo
$(function() {
	var images = [
		'https://images.wikia.nocookie.net/hunterxhunter/images/4/49/Wiki-wordmark2.png',
		'https://images.wikia.nocookie.net/hunterxhunter/images/c/c7/Wiki-wordmark8.png',
	];

	$('h2.wordmark a img').attr('src', images[Math.floor(Math.random() * images.length)]);
});

/* End of the {{Visitor}} replacement */
 
$(function() {
    $('.page-User_- Darkchylde #WikiaRail').append(
        $('<section></section>', { class: 'module' })
            .append(
                $('<img></img>', { src: 'https://pre00.deviantart.net/3263/th/pre/i/2012/090/1/e/killua_wanted_poster_by_nightmanexe-d4uigjp.png' })
            )
    )
});

window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};