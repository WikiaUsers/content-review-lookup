/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
    $('div#mw-panel div.portal').addClass('persistent');
});

function leftline (toppos) {
    var top = (toppos * 74) + 38;
    return '<div class="left" style="top: ' + top + 'px;"></div>';
}

function verticalline (toppos,bottompos) {
    var top = (toppos * 74) + 38;
    var height = (bottompos * 74) - top + 46;
    return '<div class="vertical" style="top: ' + top + 'px; height: ' + height +  'px;"></div>';
}

function rightline (toppos) {
    var top = (toppos*74) + 38;
    return '<div class="right" style="top: ' + top + 'px;"></div>';
}

function drawItemTableLines(table) {
    var basic = table.find('.basic-items .item-list-entry:visible');
    var advanced = table.find('.advanced-items .item-list-entry:visible');
    var legendary = table.find('.legendary-items .item-list-entry:visible');
    
    var basicadvanced = table.find('.basic-advanced');
    var advancedlegendary = table.find('.advanced-legendary');
    
    var basicselected = -1;
    var advancedselected = -1;
    var legendaryselected = -1;
    
    for (var i = 0; i < basic.length; i++) {
        if (basic.eq(i).hasClass('selected')) {
            basicselected = i;
            break;
        }
    }
    
    for (var i = 0; i < advanced.length; i++) {
        if (advanced.eq(i).hasClass('selected')) {
            advancedselected = i;
            break;
        }
    }
    
    for (var i = 0; i < legendary.length; i++) {
        if (legendary.eq(i).hasClass('selected')) {
            legendaryselected = i;
            break;
        }
    }
    
    
    basicadvanced.html(leftline(basicselected));
    
    if (advancedselected < 0) {
        basicadvanced.append(verticalline(0,Math.max(basicselected,advanced.length -1)));
        for (var i = 0; i < advanced.length; i++) {
            basicadvanced.append(rightline(i));
        }
        advancedlegendary.html("");
    } else {
        if (basicselected < advancedselected) {
            basicadvanced.append(verticalline(basicselected,advancedselected));
        } else {
            basicadvanced.append(verticalline(advancedselected,basicselected));
        }
        basicadvanced.append(rightline(advancedselected));
        
        advancedlegendary.html(leftline(advancedselected));
        
        if (legendaryselected < 0) {
            advancedlegendary.append(verticalline(0,Math.max(advancedselected,legendary.length - 1)));
            for (var i = 0; i < legendary.length; i ++) {
                advancedlegendary.append(rightline(i));
            }
        } else {
            if (advancedselected < legendaryselected) {
                advancedlegendary.append(verticalline(advancedselected,legendaryselected));
            } else {
                advancedlegendary.append(verticalline(legendaryselected,advancedselected));
            }
            advancedlegendary.append(rightline(legendaryselected));
        }
    }
}

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

$(".item-list-table .basic-items .item-list-entry").click(function () {
   if (!$(this).hasClass("selected")) {
       $(".item-list-table .item-list-entry.selected").removeClass("selected");
       $(this).addClass("selected");
       var name = $(this).attr("id").substring(5);
       $(".item-list-table .advanced-items .item-list-entry, .item-list-table .legendary-items .item-list-entry").hide();
       $(".upgrade-of-" + name).show();
       drawItemTableLines($(this).parents('table.item-list-table'));
   }
});

$(".item-list-table .advanced-items .item-list-entry").click(function () {
    if (!$(this).hasClass("selected")) {
        $(".item-list-table .advanced-items .item-list-entry.selected, .item-list-table .legendary-items .item-list-entry.selected").removeClass("selected");
        $(this).addClass("selected");
        var name = $(this).attr("id").substring(5);
        $(".item-list-table .legendary-items .item-list-entry").hide();
        $(".upgrade-of-" + name).show();
        drawItemTableLines($(this).parents('table.item-list-table'));
    }
});

$(".item-list-table .legendary-items .item-list-entry").click(function () {
    if (!$(this).hasClass("selected")) {
        $(".item-list-table .legendary-items .item-list-entry.selected").removeClass("selected");
        $(this).addClass("selected");
        drawItemTableLines($(this).parents('table.item-list-table'));
    }
});

$(".item-list-table .item-list-entry").click(function () {
    if (!$(this).hasClass("active")) {
        $(".item-list-table .item-list-entry.active").removeClass("active");
        $(this).addClass("active");
        $(".item-details:visible").hide();
        var name = $(this).attr("id").substring(5);
        $("#item-details-"+name).show();
    }
});

}); /* document.ready */