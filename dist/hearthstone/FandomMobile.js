/* Any JavaScript here will be loaded for users using the mobile site */

/*****************************************************
/* Hearthstone Wiki Mobile Main Page Collapse Script *
/*****************************************************/
// Author:  Shawn Bruckner
// Date:    2017-Feb-13
// License: CC-BY 3.0
// Version: beta

var hwmmpcollapse = hwmmpcollapse || {
    initialize : function() {
        var index = 0;
        $( ".mmpcollapsible" ).each( function() {
            var heading = $( this ).find( ".imageheading" )
            if ( heading.length > 0 ) {
                $( this ).addClass( "mmpcollapsible" + index );
                $( this ).addClass( "expanded" );
                heading.html( $( '<a href="javascript:hwmmpcollapse.toggle( ' + index + ' )"></a>' ).html( heading.html() ) );
            }
            ++index;
        } );
    },
    toggle : function( index ) {
        $( ".mmpcollapsible" + index ).each( function() {
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

window.hwmmpcollapse = hwmmpcollapse;

$( document ).ready( hwmmpcollapse.initialize );

/*********************************************************
/* End Hearthstone Wiki Mobile Main Page Collapse Script *
/*********************************************************/

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

window.cardtable = cardtable;

$( document ).ready( cardtable.initialize );

/***************************************************
/* End Hearthstone Wiki Card Table Collapse Script *
/***************************************************/

mw.loader.getScript('https://dev.fandom.com/load.php?mode=articles&articles=MediaWiki:ArticlesAsResources.js&only=scripts').then(function() {
	importArticles({
		type: 'script',
		articles: [
			'u:dev:MediaWiki:Countdown/code.js'
		]
	});
});