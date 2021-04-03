/* Any JavaScript here will be loaded for users using the mobile site */
mw.loader.using( 'mobile.site.styles' );

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