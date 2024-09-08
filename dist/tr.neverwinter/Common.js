/* Any JavaScript here will be loaded for all users on every page load. */

/*******************************
/* Wiki Subpage Tooltip Script *
/*******************************/
// Author:  Shawn Bruckner
// Date:    2013-Apr-28
// License: CC-BY 3.0
// Version: beta

var wst = wst || {

    dataSubpageTitle : '/Tooltip',
    loadingTemplate: 'Template:Tooltip hover box loading',
    loadedTemplate: 'Template:Tooltip hover box',
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
            if ( decodeURIComponent( result[1] ).substring(0, 5) !== "Özel:" ) {
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

$( document ).ready( wst.beginLinkSetup );

/***********************************
/* End Wiki Subpage Tooltip Script *
/***********************************/