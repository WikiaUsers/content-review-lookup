/***********************************************
/* Hearthstone Wiki Card Table Collapse Script *
/***********************************************/
// Author:  Shawn Bruckner
// Date:    2014-Feb-04
// License: CC-BY 3.0
// Version: beta

var cardtable = cardtable || {
    oldWidth : 0,
    wideWidth : 1052,
    initialize : function() {
        var index = 0;
        var tables = $( "table.cardtable-collapsible" );
        if ( tables.length > 0 ) {
            cardtable.oldWidth = $( window ).width();
            $( window ).resize( cardtable.performLayout );
        }
        $( "table.cardtable-collapsible" ).each( function() {
            var firstRow = $( this ).find( "tr" ).first();
            if ( firstRow.length > 0 ) {
                ++index;
                $( this ).attr( "id", ( $( this ).attr( "id" ) ? $( this ).attr( "id" ) + " " : "" ) + "cardtable-collapsible-" + index );
                var linkHtml = "<div style=\"float: left; font-weight: normal; font-size: 95%;\">" +
                               "[<a href=\"javascript:cardtable.toggleTable( " +
                               index + " );\" class=\"cardtable-collapse-link-" + index + "\">hide</a>]</div>";
                var firstNarrowCell = firstRow.find( "th.narrowonly" ).first();
                var firstWideCell = firstRow.find( "th.wideonly" ).first();
                if ( firstNarrowCell.length > 0 && firstWideCell.length > 0 ) {
                    firstNarrowCell.html( firstNarrowCell.html() + linkHtml );
                    firstWideCell.html( firstWideCell.html() + linkHtml );
                } else {
                    var firstCell = firstRow.find( "th" ).first();
                    if ( firstCell.length > 0 ) {
                        firstCell.html( firstCell.html() + linkHtml );
                    }
                }
                if ( $( this ).hasClass( "cardtable-collapsed" ) ) {
                    $( this ).removeClass( "cardtable-collapsed" );
                    cardtable.toggleTable( index );
                }
            }
        } );
    },
    toggleTable : function( index ) {
        var links = $( "a.cardtable-collapse-link-" + index );
        if ( links.length > 0 ) {
            var table = $( "table#cardtable-collapsible-" + index );
            if ( table.hasClass( "cardtable-collapsed" ) ) {
                if ( $( window ).width() >= cardtable.wideWidth ) {
                    table.find( "tr" ).each( function() {
                        if ( !$( this ).hasClass( "narrowonly" ) ) {
                            $( this ).show();
                        }
                    } );
                } else {
                    table.find( "tr" ).show();
                }
                links.html( "hide" );
                table.removeClass( "cardtable-collapsed" );
            } else {
                table.find( "tr" ).hide();
                table.find( "tr" ).first().show();
                links.html( "show" );
                table.addClass( "cardtable-collapsed" );
            }
        }
    },
    performLayout : function() {
        var newWidth = $( window ).width();
        if ( cardtable.oldWidth < cardtable.wideWidth && newWidth >= cardtable.wideWidth ) {
             $( "table.cardtable-collapsible" ).each( function() {
                 cardtable.performLayoutOnTable( $( this ), "wideonly", "narrowonly" );
             } );
        } else if ( cardtable.oldWidth >= cardtable.wideWidth && newWidth < cardtable.wideWidth ) {
             $( "table.cardtable-collapsible" ).each( function() {
                 cardtable.performLayoutOnTable( $( this ), "narrowonly", "wideonly" );
             } );
        }
        cardtable.oldWidth = newWidth;
    },
    performLayoutOnTable : function( table, showClass, hideClass ) {
        var elements;
        if ( table.hasClass( "cardtable-collapsed" ) ) {
            elements = table.find( "tr" ).first();
        } else {
            elements = table;
        }
        elements.find( "." + hideClass ).hide();
        elements.find( "." + showClass ).show();
    }
}

$( document ).ready( cardtable.initialize );

/***************************************************
/* End Hearthstone Wiki Card Table Collapse Script *
/***************************************************/

/*******************
/* Countdown Timer *
/*******************/

/**
 * To create a timer add the class countdown-timer to the element that will container the countdown as well
 * as the attribute countdown-timer, which should container the target date-time for the countdown.
 * The target element can contain default output for if javascript is disabled by the user, such as the target date-time.
 *
 * Relies on [[MediaWiki:Gadget-Countdown]].
 */

if (typeof countdown !== 'undefined') { // Check that the countdown library is present
$('.countdown-timer[data-countdown-timer]').each(function () {
    var el = this;
    var targetDate = new Date($(el).attr('data-countdown-timer'));
    countdown.setLabels('||m|h|d|','||m|h|d|',' ',' ');
    $(el).html(countdown(null, targetDate, countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString());
    countdown.resetLabels();
    setInterval(function() {
        countdown.setLabels('||m|h|d|','||m|h|d|',' ',' ');
        $(el).html(countdown(null, targetDate, countdown.DAYS | countdown.HOURS | countdown.MINUTES).toString());
        countdown.resetLabels();
    }, 1000);
});
} else {
    console.error('Warning: The Countdown javascript library is not present on the wiki or its gadget is disable in your user preferences. Countdowns will not function.');
}

/***********************
/* End Countdown Timer *
/***********************/

/*******************************************
/* Hearthstone Wiki Custom Collapse Script *
/*******************************************/
// Author:  Shawn Bruckner
// Date:    2017-Feb-13
// License: CC-BY 3.0
// Version: beta

var hwcollapse = hwcollapse || {
    initialize : function() {
        var index = 0;
        $( ".hw-collapsible" ).each( function() {
            $( this ).addClass( "hw-collapsible-" + index );
            if ( $( this ).find( ".hw-collapsible-content" ).length < 1 ) {
                $( this ).html( $( '<div class="hw-collapsible-content"></div>' ).html( $( this ).html() ) );
            }
            if ( $( this ).hasClass( 'hw-collapsed' ) ) {
                $( this ).find( ".hw-collapsible-content" ).hide();
                linkText = hwcollapse.makeLinkText( true, $( this ).data( "text" ) );
            } else {
                linkText = hwcollapse.makeLinkText( false, $( this ).data( "text" ) );
            }
            $( this ).prepend( $ ( '<div class="hw-collapsible-toggle" style="text-align: center;">' +
                                   '<a href="javascript:hwcollapse.toggle( ' + index + ' )">' + linkText + '</a>' +
                                   '</div>' ) );
            ++index;
        } );
    },
    toggle : function( index ) {
        $( ".hw-collapsible-" + index ).each( function() {
            if ( $( this ).hasClass( 'hw-collapsed' ) ) {
                $( this ).find( ".hw-collapsible-toggle a" ).html( hwcollapse.makeLinkText( false, $( this ).data( "text" ) ) );
                $( this ).removeClass( 'hw-collapsed' );
                $( this ).find( ".hw-collapsible-content" ).show();
            } else {
                $( this ).find( ".hw-collapsible-toggle a" ).html( hwcollapse.makeLinkText( true, $( this ).data( "text" ) ) );
                $( this ).addClass( 'hw-collapsed' );
                $( this ).find( ".hw-collapsible-content" ).hide();
            }
        } );
    },
    makeLinkText : function( collapsed, append ) {
        if ( collapsed ) {
            text = "Click to view";
        } else {
            text = "Click to hide";
        }

        if ( typeof append !== "undefined" && append !== "" ) {
            text = text + " " + append;
        }

        return text;
    }
}

$( document ).ready( hwcollapse.initialize );

/***********************************************
/* End Hearthstone Wiki Custom Collapse Script *
/***********************************************/

/*******************************
/* Card infobox image selector *
/*******************************/
// Author:  Shawn Bruckner
// Date:    2019-Dec-07
// License: CC-BY 3.0
// Version: 1.0

// This script enables the mobile collapse features of responsive flex passages
// See Template:RFP block for more information.

var cardInfoboxImageSelector = cardInfoboxImageSelector || {
    initialize : function() {
        $( ".card-infobox-other-versions a" ).each( function() {
            $( this ).removeClass( "to_hasTooltip" );
            $( this ).off( "mouseover", "**" );
            $( this ).off( "mousemove", "**" );
            $( this ).off( "mouseout", "**" );
        } );
        var selectorIndex = 0;
        $( ".card-infobox-image-selector-nojs" ).each( function() {
            $( this ).find( ".card-infobox-image-selected" ).html( $( this ).find( ".card-infobox-image" ).first().html() );
            $( this ).find( ".card-infobox-image" ).first().remove();

            $( this ).attr( "id", "card-infobox-image-selector-" + selectorIndex );

            var links = $( '<div class="card-infobox-image-selector-links">' );
            $( this ).prepend( links );
            var imageIndex = 0;
            $( this ).find( ".card-infobox-image" ).each( function() {
                $( this ).addClass( "card-infobox-image-" + imageIndex );

                var title = $( this ).find( ".card-infobox-image-title" );
                if ( $( this ).hasClass( "card-infobox-image-selected" ) ) {
                    title.addClass( "card-infobox-image-selected" );
                }
                title.addClass( "card-infobox-image-title-" + imageIndex );

                var text = title.html();
                title.html( "" );
                title.append( $( '<span class="card-infobox-image-title-text">' + text + '</span>' ) );
                title.append( $( '<a class="card-infobox-image-title-link" onclick="cardInfoboxImageSelector.select(' + selectorIndex + ', ' + imageIndex + ')">' + text + '</a>' ) );
                links.append( title );
                
                ++imageIndex;
            } );

            ++selectorIndex;

            $( this ).removeClass( "card-infobox-image-selector-nojs" );
            $( this ).addClass( "card-infobox-image-selector-js" );
        } );
    },
    select : function( selectorIndex, imageIndex ) {
        var selector = $( "#card-infobox-image-selector-" + selectorIndex );
        
        selector.find( ".card-infobox-image-title" ).each( function() {
            $( this ).removeClass( "card-infobox-image-selected" );
        } );
        selector.find( ".card-infobox-image" ).each( function() {
            $( this ).removeClass( "card-infobox-image-selected" );
        } );
        selector.find( ".card-infobox-image-title-" + imageIndex ).addClass( "card-infobox-image-selected" );
        selector.find( ".card-infobox-image-" + imageIndex ).addClass( "card-infobox-image-selected" );
    }
}

window.cardInfoboxImageSelector = cardInfoboxImageSelector;

$( document ).ready( cardInfoboxImageSelector.initialize );

/***********************************
/* End Card infobox image selector *
/***********************************/

//CrazyEgg
setTimeout(function(){var a=document.createElement("script");
var b=document.getElementsByTagName("script")[0];
a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/0011/8371.js?"+Math.floor(new Date().getTime()/3600000);
a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);

/*******************************************
/* Hearthstone Wiki Custom Collapse Toggle and Content Seperated *
/*******************************************/
// Author:      Use25
// Date:        2020-11-20
// License:     CC-BY 3.0
// Version:     1.0
// Description: This is used to make a collapsible block with toggles and content blocks being seperated and can be put anywhere.

var buttonCollapse = buttonCollapse || {
    initialize : function() {
        var index = 0;
        var index_content = 0;
        $( ".tw-content" ).each( function() {
        	$( this ).addClass( "tw-content-" + index_content );
            ++index_content;
        } );
        $( ".tw-links" ).each( function() {
        	$( this ).addClass( "tw-links-" + index );
            if ( $( this ).hasClass( 'tw-hide' ) ) {
                linkText = buttonCollapse.makeLinkText( true );
                $( ".tw-content-" + index ).hide();
            } else {
                linkText = buttonCollapse.makeLinkText( false );
                $( ".tw-content-" + index ).show();
            }
            $( this ).prepend( $ ( '<span>[<a href="javascript:buttonCollapse.toggle( ' + index + ' )">' + linkText + '</a>]</span>' ) );
            ++index;
        } );
    },
    toggle : function( index ) {
        $( ".tw-links-" + index ).each( function() {
            if ( $( this ).hasClass( 'tw-hide' ) ) {
                $( this ).find( "a" ).html( buttonCollapse.makeLinkText( false ) );
                $( ".tw-content-" + index ).show();
                $( this ).removeClass( 'tw-hide' );
            } else {
                $( this ).find( "a" ).html( buttonCollapse.makeLinkText( true ) );
                $( ".tw-content-" + index ).hide();
                $( this ).addClass( 'tw-hide' );
            }
        } );
    },
    makeLinkText : function( collapsed ) {
        if ( collapsed ) {
            text = "Show";
        } else {
            text = "Hide";
        }
        return text;
    }
};

$( document ).ready( buttonCollapse.initialize );

/***********************************************
/* End Hearthstone Wiki Custom Collapse Script *
/***********************************************/

/*** Title tag banner */

function addTagBanner() {
   var elem = $('div.tag-banner').get(0);
   if (typeof elem === 'undefined') {
      return;
   }
   // Relocate it and make it appear 
   var parent = $('.page-header__contribution-buttons .wds-button-group, .page-header__bottom .page-header__actions').get(0);
   if (typeof parent !== 'undefined') {
      $(parent).prepend(elem);
      $(elem).addClass('tag-banner-visible');
   }
}
$(document).ready(function() {
   addTagBanner();
});