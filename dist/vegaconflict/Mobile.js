/* Any JavaScript here will be loaded for all users on every page load. */
// Custom Blocks
var pageMask = document.createElement("div");
var globalDiv = document.createElement("div");

// Custom Tooltips: Position at bottom-right of cursor
window.onmousemove = function(e) {
    $(".hover-content").css("top", e.clientY + 20);
    $(".hover-content").css("left", e.clientX + 20);
};

/* [[Template:Button]] */
function runEvent($element, event) {
	switch (event) {
		case "button-blue-clicked":
			$element.children(".button-blue-middle").text("Clicked");
			break;
		case "button-yellow-clicked":
			$element.children(".button-yellow-middle").text("Clicked");
			break;
		default:
	}
}

$(document).ready(function() {
	// CSS sets the objects to be hidden. JavaScript reverts this.
	$(".hide-if-nojs").removeClass("hide-if-nojs");
	
	$(".remove-if-js").remove();
	$(".hide-if-js").hide();
	
    // Custom Tooltips: Override default tooltip and remove title
	$(".game-ui-tooltip").removeAttr("title");
    $(".game-ui-tooltip").children().removeAttr("title");
    
    // Custom User-Initiated Pop-Up Blocks: Init
	var $body = $(document.body);
	var $pageMask = $(pageMask);
	var $globalDiv = $(globalDiv);
	
	function showGlobalDiv() {
		$pageMask.show();
		$globalDiv.show();
	}
	function hideGlobalDiv() {
		$pageMask.hide();
		$globalDiv.hide();
	}
    
    $pageMask.css({
    	"position": "fixed",
    	"top": "0",
    	"bottom": "0",
    	"height": "100%",
    	"width": "100%",
    	"background-color": "black",
    	"opacity": "0.6",
    });
    $globalDiv.addClass("frame").css({
    	"display": "flex",
    	"align-items": "center",
    	"justify-content": "center",
		"position": "fixed",
		"top": "0",
		"right": "0",
		"bottom": "0",
		"left": "0",
		"margin": "auto",
		"max-width": "90%",
		"z-index": "99",
	}).click(function(e) { if (e.target === this) hideGlobalDiv(); });	// Do not hide if user has clicked on a descendant
	
    $body.append($pageMask);
	$body.append($globalDiv);
	hideGlobalDiv();

	// Custom Infoboxes: Button Clicks
	function invokeLua(module, func, $data, onDone) {
		return new mw.Api().get({
		    action: "parse",
		    format: "json",
		    prop: "text",
		    text: "{{#invoke:" + module + "|" + func + "|" + $data.map(function() { return $(this).text(); }).get().join('|') + "}}",
		    contentmodel: "wikitext"
		}).done(onDone);
	}
	
	$(".button").click(function() {
		var $data = $(this).find(".data");
	});
	$(".game-ui-edit-button").click(function() {
		var $data = $(this).find(".data");
		window.location = $data.eq(0).text();
	});
	$(".game-ui-showstats-button").click(function() {
		var $data = $(this).find(".data");
		
		invokeLua("Statistic", "generateStatisticsBlock", $data, function(output) {
			$globalDiv.html(output.parse.text['*']).find(".game-ui-hidestats-button").click(hideGlobalDiv);
			showGlobalDiv();
		});
	});
	$(".game-ui-showmodifiers-button").click(function() {
		var $data = $(this).find(".data");
		
		invokeLua("Statistic", "generateModifiersBlock", $data, function(output) {
			$globalDiv.html(output.parse.text['*']).find(".game-ui-hidemodifiers-button").click(hideGlobalDiv);
			showGlobalDiv();
		});
	});
	$(".game-ui-showability-button").click(function() {
		var $data = $(this).find(".data");
		
		invokeLua("StatusEffect", "generateAbilityBlock", $data, function(output) {
			$globalDiv.html(output.parse.text['*']).find(".game-ui-hideability-button").click(hideGlobalDiv);
			showGlobalDiv();
		});
	});

	// Parent item calculator
	function reloadParentItemCalc(item, leftTabState, slotLayer, rightTabState, itemData) {
		var $parentItemCalc = $(".game-ui-parentitemcalc-menu");
		
		// TODO
	}
	
	$(".game-ui-selectothership-button").click(function () {
		var $data = $(this).find(".data");
		
		invokeLua("ParentItemCalc", "listShips", $data, function(output) {
			$globalDiv.html(output.parse.text['*']).find(".game-ui-selectpreviousship-button").click(hideGlobalDiv);
			showGlobalDiv();
		});
	});
	$(".game-ui-viewskins-button").click(function () {
		var $data = $(this).find(".data");
		
		invokeLua("ParentItemCalc", "listSkins", $data, function(output) {
			$globalDiv.html(output.parse.text['*']).find(".game-ui-unviewskins-button").click(hideGlobalDiv);
			showGlobalDiv();
		});
	});
	$(".game-ui-togglelayer-button").click(function () {
		var data = $(this).find(".data");
		var $itemDisplay = $(this).closest(".game-ui-parentitemdisplay-label");
		
		if (data == '0');
		else if (data == '1');
	});
	
	// [[Template:Button]]
	$(".button-blue").hover(
		function() {
			$(this).children(".button-blue-left").css("background-image", "url(/Special:Redirect/file/GameButtonLeftSelected.png)");
			$(this).children(".button-blue-middle").css("background-image", "url(/Special:Redirect/file/GameButtonMiddleSelected.png)");
			$(this).children(".button-blue-right").css("background-image", "url(/Special:Redirect/file/GameButtonRightSelected.png)");
		}, function() {
			$(this).children(".button-blue-left").css("background-image", "url(/Special:Redirect/file/GameButtonLeft.png)");
			$(this).children(".button-blue-middle").css("background-image", "url(/Special:Redirect/file/GameButtonMiddle.png)");
			$(this).children(".button-blue-right").css("background-image", "url(/Special:Redirect/file/GameButtonRight.png)");
		}
	).click(
		function() {
			/* Keep size constant */
			var width = $(this).width();
			var height = $(this).height();
			
			/* Placeholder */
			runEvent($(this), "button-blue-clicked");
			
			/* Keep size constant */
			$(this).width(width).height(height);
		}
	);
	
	$(".button-yellow").hover(
		function() {
			$(this).children(".button-yellow-left").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonLeftSelected.png)");
			$(this).children(".button-yellow-middle").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonMiddleSelected.png)");
			$(this).children(".button-yellow-right").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonRightSelected.png)");
		}, function() {
			$(this).children(".button-yellow-left").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonLeft.png)");
			$(this).children(".button-yellow-middle").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonMiddle.png)");
			$(this).children(".button-yellow-right").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonRight.png)");
		}
	).click(
		function() {
			/* Keep size constant */
			var width = $(this).width();
			var height = $(this).height();
			
			/* Placeholder */
			runEvent($(this), "button-yellow-clicked");
			
			/* Keep size constant */
			$(this).width(width).height(height);
		}
	);
});

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
//   2. Making sure there is a heading identified by the "heading" class.
//      * Links inside headings can still work, but aren't recommended because they'll be easy to fat-finger while trying to collapse/expand the box.
//      * The script allows multiple headings and automatically ignores any with the "nomobile" or "notoggle" class.
//      * If there are still multiple headings after excluding those, only the first is turned into a collapsing toggle link.
//   3. Placing the area that should be hidden when collapsed inside a div or other block with the "body" class.
//      * It's usually best for this to be everything in the box *except* the heading.
//   4. Optionally add "expanded" next to "mobilecollapsible" to leave the box expanded by default.

var fpmobilecollapse = fpmobilecollapse || {
    initialize : function() {
        var index = 0;
        $( '.fpbox.mobilecollapsible' ).each( function() {
            var heading = $( this ).children( '.heading' ).not( '.nomobile, .notoggle' );
            if ( heading.length > 0 && $( this ).children( '.body' ).length > 0 ) {
                $( this ).addClass( 'mobilecollapsible' + index );
                if ( !( $( this ).hasClass( 'expanded') ) ) {
                    $( this ).addClass( 'collapsed' );
                }
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
}

window.fpmobilecollapse = fpmobilecollapse;

$( document ).ready( fpmobilecollapse.initialize );

/****************************************
/* End Main Page Mobile Collapse Script *
/****************************************/