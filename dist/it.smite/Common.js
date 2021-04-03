$( function() {
'use strict';

/**
 * Element animator (used in [[Template:God infobox]])
 *
 * Will cycle the active class on any child elements within an element with the animated class.
 */
if ( $( '.animated' ).length ) {
    setInterval( function() {
        $( '.animated' ).each( function() {
            var current = $( this ).find( '.active' ).removeClass( 'active' ), next = current.next();
            if ( !current.next().length ) {
                next = $( this ).children().eq( 0 );
            }
            next.addClass( 'active' );
        } );
    }, 2000 );
}


/**
 * Animation parser
 * 
 * Requests the urls for all the frames on a page in 2
 * API requests (due to a bug, 1 API request when it is fixed)
 * and appends them to the correct location.
 *
 * A maximum of 50 frames per page is supported (API limit)
 * until a separate set of API requests would be required
 */
var baseURL = '/', wikiURL = '/', $animated = $( '.animated' ), titles = '';
if ( $animated.length ) {
    $animated.each( function() {
        var imgs = $( this ).data( 'images' );
        if ( !imgs ) {
            return true;
        }
        
        imgs = imgs.split( ';' );
        imgs.shift();
        $.each( imgs, function() {
            if ( !this.trim() ) {
                return true;
            }
            
            titles += 'File:' + this.trim().replace( /_/g, ' ' ) + '|';
        } );
    } );
    
    /* Thanks to bug 23750 (https://bugzilla.wikimedia.org/show_bug.cgi?id=23750)
     * &redirects doesn't work properly with prop=imageinfo. Some of the images
     * will return without any imageinfo, even though they are valid.
     * So the redirects have to be resolved in a separate request...
     */
    titles = titles.slice( 0, -1 );
    if ( titles ) {
        var redirects = {}, urls = {};
        $.ajax( {
            type: 'POST',
            url: baseURL + 'api.php?action=query&format=json&redirects',
            data: { titles: titles },
            timeout: 20000
        } ).done( function( data ) {
            if ( data.query.redirects ) {
                $.each( data.query.redirects, function() {
                    redirects[this.to] = this.from;
                    titles = titles.replace( this.from, this.to );
                } );
            }
            
            $.ajax( {
                type: 'POST',
                url: baseURL + 'api.php?action=query&format=json&prop=imageinfo&iiprop=url&iiurlwidth=250',
                data: { titles: titles },
                timeout: 20000
            } ).done( function( data ) {
                $.each( data.query.pages, function( index ) {
                    if ( index < 0 ) {
                        return true;
                    }
                    
                    if ( redirects.hasOwnProperty( this.title ) ) {
                        urls[redirects[this.title].replace( /File:(.*)/, '$1' )] = this.imageinfo[0].thumburl;
                    } else {
                        urls[this.title.replace( /File:(.*)/, '$1' )] = this.imageinfo[0].thumburl;
                    }
                } );
                
                $animated.each( function() {
                    var imgs = $( this ).data( 'images' ), html = '';
                    if ( !imgs ) {
                        return true;
                    }
                    
                    imgs = imgs.split( ';' );
                    imgs.shift();
                    $.each( imgs, function() {
                        if ( !this.trim() ) {
                            return true;
                        }
                        
                        if ( urls[this.trim().replace( /_/g, ' ' )] ) {
                            html += 
                                '<span>' +
                                    '<a class="image" href="' + wikiURL + 'File:' + this.trim().replace( / /g, '_' ) + '">' +
                                        '<img width="250" src="' + urls[this.trim().replace( /_/g, ' ' )] + '" alt="' + this.trim() + '">' +
                                    '</a>' +
                                '</span>';
                        } else {
                            html += 
                                '<span>' +
                                    '<a title="File:' + this.trim() + '" class="new" href="' + baseURL + 'index.php?title=Special:Upload&wpDestFile=' + this.trim().replace( / /g, '_' ) + '">250px</a>' +
                                '</span>';
                        }
                    } );
                    
                    $( this ).append( html );
                } );
            } ).fail( function( error ) {
                console.error( error );
            } );
        } ).fail( function( error ) {
            console.error( error );
        } );
    }
}

/**
 * These are for creating tooltips that appear when an object with the "tooltip-hover" class is hovered over.
 * The trigger object should have an id, while the tooltip should have the same id with "-tooltip" added.
 * The tooltip should have "display: none;" by default.
 */
$('.tooltip-hover').hover(function() {
    $('[id="' + this.id + '-tooltip"]').show();
}, function() {
    $('[id="' + this.id + '-tooltip"]').hide();
});
$('.tooltip-hover').mousemove(function(e) {
    var tooltip = $('[id="' + this.id + '-tooltip"]');
    var pos = $('#bodyContent').position();
    var padding = 20;
    var maxX = $('#bodyContent').width() - tooltip.width() - padding;
    var x = Math.max(padding, Math.min(e.pageX + 10 - pos.left, maxX));
    tooltip.css('position','absolute');
    tooltip.css('top',e.pageY + 10 - pos.top + 'px');
    tooltip.css('left',x + 'px');
});

}); /* document.ready */

function fixranks() {
    var rank1s = $('div.item-ranks .itemrank.rank1');
    var rank2s = $('div.item-ranks .itemrank.rank2');
    var rank3s = $('div.item-ranks .itemrank.rank3');
    
    var tmp = $(rank3s).wrapAll('<div style="text-align: center" />').parent();
    
    $(tmp).insertBefore(rank2s);
    $(rank1s).insertAfter(rank2s);
    
    $(rank1s).hide();
    $(rank1s).css('position','absolute');
    $(rank1s).css('z-index','1');
    $(rank1s).each(function() {
        itemthumbwrap(this, 'rank1')
    });

    $(rank2s).hide();
    $(rank2s).css('position','absolute');
    $(rank2s).css('z-index','1');
    $(rank2s).each(function() {
        itemthumbwrap(this, 'rank2')
    });
    $(rank2s).parent().after('<div class="v-path" />');
    
    var count = $(rank3s).size();
    $(rank3s).hide();
    
    if (count > 1) {
        $(tmp).after('<div class="v-path-split-top" /><div class="v-path-split-bottom" />');
    } else {
        $(tmp).after('<div class="v-path" />');
    }
    $(rank3s).css('position','absolute');
    $(rank3s).css('z-index','1');
    $(rank3s).each(function() {
        itemthumbwrap(this, 'rank3')
    });
    $(rank3s).parent().css('display', 'inline-block');
}

function itemthumbwrap (node, rank) {
    var tmp = $(node).wrap('<div class="item-thumb ' + rank + '" />').parent();
    
    $(tmp).append('<div class="price">' + $(node).find('.cost').html() + '</div>');
    $(tmp).append($(node).find('.icon').html());
    $(tmp).children('img').wrap('<div class="select-icon-wrapper" />').after('<div class="select-icon" />');
    
    tmp.hover(function() {
        $(node).show();
    }, function() {
        $(node).hide();
    });
    tmp.mousemove(function(e) {
        var pos = $('#bodyContent').position();
        var padding = 20;
        var maxX = $('#bodyContent').width() - $(node).width() - padding;
        var x = Math.max(padding, Math.min(e.pageX + 10 - pos.left, maxX));
        $(node).css('top', e.pageY + 10 - pos.top + 'px');
        $(node).css('left', x + 'px');
    });
    tmp.click(function(e) {
        $('.item-ranks > .itemrank').remove();
        $('.select-icon').hide();
        $(this).find('.select-icon').show();
        var clone = $(node).clone();
        $(clone).css( 'position','static' );
        $(clone).css( 'margin-top','1em' );
        $(clone).appendTo( $(tmp).closest( '.item-ranks' ) );
        $(clone).show();
    });
}

$(document).ready(fixranks);