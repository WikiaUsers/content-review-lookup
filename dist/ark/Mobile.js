importArticle({ type: "script", article: "MediaWiki:Gadget-site.js" });

/************************************
/* Main Page Mobile Collapse Script *
/************************************/
// Author:  Shawn Bruckner
// Date:    2018-Jun-7
// License: CC-BY 3.0

// This script, paired with .mobilecollapsible styles in MediaWiki:Mobile.css, supports making .fpbox collapsible in the mobile view using both the standard
// 2 or 3-column responsive front pages.

// Making an .fpbox collapsible in mobile view involves the following:
//   1. Adding "mobilecollapsible" as another class alongside "fpbox".
//   2. Making sure there is a heading identified by the "fpheading" class.
//      * Links inside headings can still work, but aren't recommended because they'll be easy to fat-finger while trying to collapse/expand the box.
//      * The script allows multiple headings and automatically ignores any with the "nomobile" or "notoggle" class.
//      * If there are still multiple headings after excluding those, only the first is turned into a collapsing toggle link.
//   3. Placing the area that should be hidden when collapsed inside a div or other block with the "fpbody" class.
//      * It's usually best for this to be everything in the box *except* the heading.
//   4. Optionally add "expanded" next to "mobilecollapsible" to leave the box expanded by default.

var fpmobilecollapse = fpmobilecollapse || {
    initialize : function() {
        var index = 0;
        $( '.fpbox.mobilecollapsible' ).each( function() {
            var heading = $( this ).children( '.fpheading' ).not( '.nomobile, .notoggle' );
            if ( heading.length > 0 && $( this ).children( '.fpbody' ).length > 0 ) {
                $( this ).addClass( 'mobilecollapsible' + index );
                heading.first().html( $( '<a class="togglecollapse" href="javascript:fpmobilecollapse.toggle( ' + index + ' )"></a>' ).html( heading.html() ) );
            }
            ++index;
        } );
    },
    toggle : function( index ) {
        $( '.fpbox.mobilecollapsible' + index ).each( function() {
            if ( $( this ).hasClass( 'collapsed' ) ) {
                $( this ).removeClass( 'collapsed' );
                $( this ).addClass( 'expanded' );
            } else {
                $( this ).removeClass( 'expanded' );
                $( this ).addClass( 'collapsed' );
            }
        } );
    }
};

window.fpmobilecollapse = fpmobilecollapse;

$( document ).ready( fpmobilecollapse.initialize );

/****************************************
/* End Main Page Mobile Collapse Script *
/****************************************/

// Tabbers are not available in the mobile skin, and scripts are blocked from being served to mobile user agents:
// mw.loader.load('/load.php?debug=false&lang=en&modules=ext.Tabber&*', 'text/javascript', false);
// As a workaround (as we're tabber-heavy and replacing them is not as easy as it seems), add a bold text block
// with a tab's title before each tab.
$(function() {
	$('.tabber .tabbertab').each(function () {
		$('<b style="display:block">').text($(this).attr('title')).insertBefore($(this));
	});
});

// Load our other scripts conditionally
mw.hook('wikipage.content').add(function($content) {
	// Load our other scripts conditionally
	var articles = [];
	[
		// RegionMapStyles
		[ '#regionMapStyles', 'u:ark:MediaWiki:RegionMapStyles.js' ],
		// Colorblind
		[ '#colorblind', 'u:ark:MediaWiki:Colorblind.js' ],
		// KillXP
		[ '#creatureKillXP', 'u:ark:MediaWiki:Killxp.js' ],
		// CloningCost
		[ '#creature-select', 'u:ark:MediaWiki:CloningCost.js' ],
		// ARKCode
		[ '#ARKCode', 'u:ark:MediaWiki:ARKCode.js' ],
		// Cooking calculator
		[ '#cookingCalc', 'u:ark:MediaWiki:Cooking calculator.js' ],
		// Wild creature stats calculator
		[ '.wildstatscalc, #wildStatCalc', 'u:ark:MediaWiki:WildCreatureStats.js' ],
		// Kill XP calculator
		[ '.killxpcalc', 'u:ark:MediaWiki:Killxp.js' ],
		// Experimental cloning calculator
		[ '.cloningcalc', 'u:ark:MediaWiki:CloningCalculator.js' ],
		// Common Data page fetch function if a spawn map or an interactive region map are present.
		// Separate request for cache efficiency (load once, not every time for a combination).
		[ '.data-map-container[data-spawn-data-page-name], .interactive-regionmap', 'u:ark:MediaWiki:DataFetch.js' ],
		// Interactive region map
		[ '.interactive-regionmap', 'u:ark:MediaWiki:RegionMaps.js' ],
		// Data map scripts
		[ '.data-map-container', 'u:ark:MediaWiki:ResourceMaps.js' ],
		[ '.data-map-container', 'u:ark:MediaWiki:SpawnMaps.js' ],
		// Grid filtering
		[ '#creature-grid', 'u:ark:MediaWiki:GridFiltering.js' ]
	].forEach(function (req) {
		if ($content.find(req[0]).length > 0) articles.push(req[1]);
	});
	// Dev:Countdown
	articles.push('u:dev:MediaWiki:Countdown/code.js');
	importArticles({ type: 'script', articles: articles });
});