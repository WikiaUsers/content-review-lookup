/* Any JavaScript here will be loaded for users using the 2 column main page layout */
/*****************************************
/* Front Page column height equalization *
/*****************************************/
// Author:  Shawn Bruckner
// Date:    2015-Feb-12
// License: CC-BY 3.0
// Version: beta

var fp = fp || {
  equalizeColumns : function() {
    $( '.fpcontent' ).each( function () {
      fp.resetSectionBoxHeights( $( this ).find( '#fptopsection, #fpflexsection, #fpbottomsection' ) );
    } );
    var excludeSel = '';
    if ( $( window ).width() > 1539 ) {
      excludeSel = '.fpmaybercol'; // at this width, it's necessary to hit those boxes in a separate pass after .fpcontent
    }
    if ( $( window ).width() > 889 ) {
      fp.equalizeColumnsOfBlock( '.fpcontent',
                                 '#fptopsection, #fpbottomsection',
                                 '#fpbottomsection',
                                 '#fpflexsection',
                                 '#fpflexsection',
                                 excludeSel
                               );
    }
    if ( $( window ).width() > 1539 ) {
      fp.equalizeColumnsOfBlock( '.fpmaybecols',
                                 '.fpmaybelcol',
                                 '.fpmaybelcol',
                                 '.fpmaybercol',
                                 '.fpmaybercol',
                                 ''
                               );
    }
  },

  equalizeColumnsOfBlock : function( blockSel, leftSel, leftBottomSel, rightSel, rightBottomSel, excludeSel ) {
    $( blockSel ).each( function ( index ) {
      var tryCount = 0;
      do {
        var leftBottom = $( this ).find( leftBottomSel ).offset().top + $( this ).find( leftBottomSel ).height();
        var rightBottom = $( this ).find( rightBottomSel ).offset().top + $( this ).find( rightBottomSel ).height();

        var difference = Math.round( Math.abs( rightBottom - leftBottom ) );
        
        if ( leftBottom < rightBottom ) {
          fp.adjustSectionBoxHeights( difference, $( this ).find( leftSel ).not( excludeSel ) );
        } else if ( rightBottom < leftBottom ) {
          fp.adjustSectionBoxHeights( difference, $( this ).find( rightSel ).not( excludeSel ) );
        }
        ++tryCount;
      } while ( Math.round( leftBottom ) != Math.round( rightBottom ) && tryCount < 4 );
    } );
  },

  resetSectionBoxHeights : function ( sections ) {
    sections.each( function () {
      $( this ).find( '.fpbox' ).each( function () {
        $( this ).height( 'auto' );
      } );
    } );
  },

  adjustSectionBoxHeights : function ( heightToAdd, sections ) {
    var boxCount = 0;
    sections.each( function() {
      boxCount += $( this ).find( '.fpbox' ).length;
    } );

    var avgHeightToAdd = heightToAdd / boxCount;
    var decimalPortion = 0.0;
    var boxes, heightToAdd;
    sections.each( function() {
      boxes = $( this ).find( '.fpbox' );

      boxes.each( function() {
        heightToAdd = Math.round( decimalPortion + avgHeightToAdd ); /* should iron out rounding error */
        decimalPortion += avgHeightToAdd - heightToAdd;
        $( this ).height( $( this ).height() + heightToAdd );
      } );
    } );
  }
};

$( document ).ready( fp.equalizeColumns );
$( window ).resize( fp.equalizeColumns );
/*********************************************
/* End Front Page column height equalization *
/*********************************************/


/*************************
 * JQuery Random  Plugin *
 *************************/

/**
 * Adds a 'random' filter to jQuery, which selects 1 or more elements at random for the current jQuery set.
 * Defaults to 1 element if a amount isn't given.
 */

jQuery.fn.random = function(count) {
    var count = (typeof count !== 'undefined') ?  count : 1;
    // Return the current set if an invalid count is asked for.
    if ( count < 1 || count >= this.length || ! Number.isInteger(Number(count)) ) {
        return jQuery(this);
    }

    var indexes = [];
    var resultset = [];
    while ( indexes.length < count ) {
        // Generate a random index
        var index = Math.floor(Math.random() * this.length);
        
        // reroll the random index if it's already present
        var reroll = false;
        for (var i = 0; i < indexes.length; i++) {
            if ( indexes[i] == index ) {
                reroll = true;
            }
        }
        if (reroll) {
            continue;
        }

        // Add the index/element to the result set
        indexes.push(index);
        resultset.push(this[index]);
    }
    return jQuery(resultset);
}

/*****************
 * Random subset *
 *****************/

/**
 * A random subset of list elements within elements with the 'random-subset' class are show, while the rest are hidden.
 * The 'data-random-subset-count' attribute can be used to specify the number of elements to be displayed.
 */

$('.random-subset').each(function() {
    var count = 1;
    // If the data-random-subset-count attribute is present use that count
    if ($(this).attr('data-random-subset-count')) {
        count = $(this).attr('data-random-subset-count');
    }
    var entries = $(this).find('li');
    $(entries).random(entries.length - count).remove();
    // show the root element in case it was hidden while waiting for JS.
    $(this).show();
});

/*******************************
/* Wiki Subpage Tooltip Script *
/*******************************/
// Author:  Shawn Bruckner
// Date:    2013-Apr-28
// License: CC-BY 3.0
// Version: beta

var wst = wst || {

    dataSubpageTitle : '/Tooltip',
    loadingTemplate: 'Template:Tooltip Loading',
    loadedTemplate: 'Template:Tooltip',
    loadingHtml: null,
    classPrefix: 'wst-tooltip-',
    articlePath : null,
    fullScriptPath : null,
    scriptPath: null,
    dataTitlesToCheck: Array(),
    contentTitles: Array(),
    dataTitles: Array(),

    encodeAllSpecial : function( unencoded ) {
        var encoded = ""; 
        var c;
        var safeChars = /[0-9A-Za-z]/;
        for( var i = 0; i < unencoded.length; i++ ) {
            c = unencoded.charAt(i);
            if ( safeChars.test( c ) ) {
                encoded = encoded + c;
            } else {
                encoded = encoded + '_' + c.charCodeAt().toString(16) + '-';
            }
        }
        return encoded;
    },

    getTitleFromHref : function( href ) {
        var end;
        var result = null;
        if ( href.indexOf( wst.fullScriptPath ) === 0 ) {
            end = href.substring( wst.fullScriptPath.length );
            result = ( new RegExp( 'title=([^&]*)' ) ).exec( end );
        } else if ( href.indexOf( wst.scriptPath ) === 0 ) {
            end = href.substring( wst.scriptPath.length );
            result = ( new RegExp( 'title=([^&]*)' ) ).exec( end );
        } else if ( href.indexOf( wst.articlePath ) === 0 ) {
            end = href.substring( wst.articlePath.length );
            result = ( new RegExp( '([^?]*)' ) ).exec( end );
        }

        if ( result ) {
            if ( result[1].substring(0, 8) !== "Special:" ) {
                return decodeURIComponent( result[1] );
            } else {
                return null;
            }
        } else {
            return null;
        }
    },

    getTitlesAndContentLinks : function() {
        var links = $( '#mw-content-text a[href]' );
        var uniqueTitles = {};
        var title;

        for ( var i = 0; i < links.length; i++ ) {
            if( title = wst.getTitleFromHref( links[i].href ) ) {
                uniqueTitles[title] = null; // hackish way to ensure only unique titles are added
            }
        }

        for ( uniqueTitle in uniqueTitles ) { 
          wst.dataTitlesToCheck.push( uniqueTitle + wst.dataSubpageTitle ); // put unique titles into the array
        }
    },

    beginLinkSetup : function() {
        wst.articlePath = mw.config.get( 'wgServer' ) + mw.config.get( 'wgArticlePath' ).replace( /\$1/, '' );
        wst.fullScriptPath = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' );
        wst.scriptPath = mw.config.get( 'wgScript' );

        wst.getTitlesAndContentLinks();

        if ( wst.dataTitlesToCheck.length > 0 ) {
            $.ajax( {
                type: 'POST',
                url: mw.util.wikiScript( 'api' ),
                data: { action: 'parse', format: 'json', text: '{{:' + wst.loadingTemplate + '}}' },
                dataType: 'json',
                success: wst.midLinkSetup
            } );
        }
    },

    midLinkSetup: function( jsonData ) {
        wst.loadingHtml = jsonData.parse.text['*'];

        wst.startQueryPageExistence();        
    },

    startQueryPageExistence : function( ) {
        titleSubset = Array();
        for ( i = 0; i < 50 && wst.dataTitlesToCheck.length > 0; i++ ) {
            titleSubset.push( wst.dataTitlesToCheck.pop() );
        }
        var titles = titleSubset.join( '|' );

        $.ajax( {
             type: 'POST',
             url: mw.util.wikiScript( 'api' ),
             data: { action: 'query', format: 'json', titles: titles },
             dataType: 'json',
             success: wst.finishQueryPageExistence
        } );
    },

    finishQueryPageExistence : function( jsonData ) {
        wst.filterTitles( jsonData.query.pages );

        if ( wst.dataTitlesToCheck.length > 0 ) {
            wst.startQueryPageExistence();
        } else {
            wst.finishLinkSetup();
        }
    },

    filterTitles : function( pageData ) {
        var result, title;
        for ( index in pageData ) {
            result = pageData[index];
            if ( result.missing === undefined ) {
                title = result.title.replace( / /g, '_' );
                wst.dataTitles.push( title );
                wst.contentTitles.push( title.substring( 0, title.length - wst.dataSubpageTitle.length ) );
            }
        }
    },

    finishLinkSetup : function( ) {
        for ( var i = 0; i < wst.contentTitles.length; i++ ) {
            $( 'body' ).append( '<div id="' + wst.classPrefix + wst.encodeAllSpecial( wst.contentTitles[i] ) + 
                '" style="display: none; position: absolute; z-index: 10000;">' + 
                wst.loadingHtml.replace( /\$1/, wst.contentTitles[i].replace( /_/, " " ) ) + '</div>' );
        }

        var title, id;
        var links = $( '#mw-content-text a[href]' );
        for ( var i = 0; i < links.length; i++ ) {
            title = wst.getTitleFromHref( links[i].href );
            if ( title !== null && $.inArray( title, wst.contentTitles ) !== -1 ) {
                id = wst.classPrefix + wst.encodeAllSpecial( title );
                links.eq(i).on( 'mouseover', { id : id, title : title }, function( event ) { wst.showTooltip( event ); } );
                links.eq(i).on( 'mousemove', { id : id }, function( event ) { wst.moveTooltip( event ); } );
                links.eq(i).on( 'mouseout', { id : id }, function( event ) { wst.hideTooltip( event ); } );
            }
        }
    },

    showTooltip : function( event ) {
        tooltipBox = $( '#' + event.data.id );
        wst.positionTooltip( event.data.id, event.pageX, event.pageY );
        tooltipBox.fadeIn();

        if ( !tooltipBox.hasClass( 'loaded' ) && !tooltipBox.hasClass( 'loading' ) ) {
            tooltipBox.addClass( wst.classPrefix + 'loading' );
            wst.beginLoadTooltip( event.data.id, event.data.title );
        }
    },

    beginLoadTooltip : function( id, title ) {
        $.ajax( {
             type: 'POST',
             url: mw.util.wikiScript( 'api' ),
             data: { action: 'parse', format: 'json', title: title.replace( /_/, ' ' ),
                 text: '{{:' + title + wst.dataSubpageTitle + '|' + wst.loadedTemplate + '}}' },
             dataType: 'json',
             success: function( jsonData ) { wst.finishLoadTooltip( id, jsonData ); }
        } );
    },

    finishLoadTooltip : function( id, jsonData ) {
        tooltipBox = $( '#' + id );
        tooltipBox.addClass( 'loaded' );
        tooltipBox.removeClass( 'loading' );
        tooltipBox.html( jsonData.parse.text['*'] );
    },

    moveTooltip : function( event ) {
        wst.positionTooltip( event.data.id, event.pageX, event.pageY );
    },

    positionTooltip: function( id, pageX, pageY ) {
        var tooltip = $( '#' + id );
        var bodyOffsets = document.body.getBoundingClientRect();
        var bodyX = pageX - bodyOffsets.left;
        var bodyY = pageY - bodyOffsets.top;
        var scrollX = $( document ).scrollLeft();
        var scrollY = $( document ).scrollTop();
        var bodyWidth = $( 'body' ).width();
        var bodyHeight = $( 'body' ).height();
        var viewWidth = $( window ).width();
        var viewHeight = $( window ).height();
        var topAdjust = 6;

        if ( tooltip.width() * 1.1 > pageX - scrollX ) {
            tooltip.css( { 'left' : bodyX - scrollX + 15, 'right' : 'auto' } );
            topAdjust = 36;
        } else {
            tooltip.css( { 'right' : bodyWidth - bodyX + scrollX + 6, 'left' : 'auto' } );
        }

        if ( tooltip.height() * 1.5 > pageY - scrollY ) {
            tooltip.css( { 'top' : bodyY - scrollY + topAdjust, 'bottom' : 'auto' } );
        } else {
            tooltip.css( { 'bottom' : bodyHeight - bodyY + scrollY + 3, 'top' : 'auto' } );
        }
    },

    hideTooltip : function( event ) {
        $( '#' + event.data.id ).fadeOut();
    }

};

mw.loader.using( 'mediawiki.util' ).then( function() {
    wst.beginLinkSetup();
} );

/***********************************
/* End Wiki Subpage Tooltip Script *
/***********************************/