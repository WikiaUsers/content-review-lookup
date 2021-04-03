/*************
 * Ajax Load *
 *************/

var ajaxCache = new Object();

var wgScript = mw.config.get( 'wgScript' );

window.ajaxLoad = function(el,source,fragment) {
    if(source) {
        $(el).html('<div style="text-align: center;"><img src="/extensions/WikiEditor/modules/images/dialogs/loading.gif" /></div>');
        if (fragment) {
            var url = wgScript + '?title=' + source.replace(/ /g,'_').replace(/\?/g,'%3F') + '&action=render ' + fragment;
        } else {
            var url = wgScript + '?title=' + source.replace(/ /g,'_').replace(/\?/g,'%3F') + '&action=render';
        }

        if (ajaxCache[url]) {
            $(el).html(ajaxCache[url]);
        } else {
            $(el).load(url,function( response, status, xhr ){
                if( status == "error" ) {
                    $(this).html('Ajax failed to load: ' + xhr.status + " " + xhr.statusText);
                } else {
                    ajaxCache[url] = response;
                }
            });
        }
    } else {
        console.log("Can't load ajax without a source URL.");
        return;
    }
}

/**
 * A simple example where elements with the ajax-load class are loaded using
 * their data-ajax-source and data-ajax-fragment attributes for source and fragement.
 */
$('.ajax-load').each(function() {
    ajaxLoad( this, $(this).attr('data-ajax-source'), $(this).attr('data-ajax-fragment') );
});

/*************
 *  Tooltips *
 *************/

/**
 * See http://help.gamepedia.com/User:Sigilbaram/tooltips for documentation.
 */

var tooltipPadding = $('div#content').css('padding-right');
var tooltipBuffer = tooltipPadding;

function jqEscapeId( id ) {
    return id.replace(/(:|\.|\[|\])/g, "\\$1" );
}

var initTooltipHover = function (el) {
    $(el).hover(function() {
        $(this).data('tooltip').show();
    }, function() {
        $(this).data('tooltip').hide();
    });

    $(el).mousemove(function(e) {
        var tooltip = $(this).data('tooltip');
        placeTooltip(tooltip, e.pageX, e.pageY);
    });
}

var placeTooltip = function (tooltip, mouseX, mouseY) {
    var pos = $('#bodyContent').position();
    var maxX = $('#bodyContent').width() - tooltip.width() - tooltipPadding;
    var x = Math.max(tooltipPadding, Math.min(mouseX + tooltipBuffer - pos.left, maxX));

    tooltip.css('position', 'absolute');
    tooltip.css('top', mouseY + tooltipBuffer - pos.top + 'px');
    tooltip.css('left', x + 'px');
}

/** We don't want this to interfere with existing instances of the tooltip-hover class
$('.tooltip-hover').each(function() {
    var tooltipId = $(this).attr('data-tooltip');

    if (tooltipId) {
        var tooltip = $('[id="' + jqEscapeId(tooltipId) + '"]');
    } else {
        var tooltip = $(this).find('.tooltip-content');
    }

    if(tooltip) {
        $(this).data('tooltip',tooltip);
        initTooltipHover(this);
    }
});
*/

$('.ajax-tooltip-hover').hover(function (e) {
    if(!ajaxLoad) {
        console.log('Tried to use ajax tooltips without ajaxLoad function. See: http://help.gamepedia.com/User:Sigilbaram/Ajax_load');
        return;
    }

    /* Make sure these steps only happen once */
    $(this).removeClass('ajax-tooltip-hover');
    $(this).off('hover');

    /* Get some variables for later */
    var tooltipClass = $(this).attr('data-ajax-tooltip-class');
    var source = $(this).attr('data-ajax-source');
    var fragment = $(this).attr('data-ajax-fragment');

    /* Create the tooltip and keep it hidden for now */
    var tooltip = $(document.createElement('div')).css('position','absolute').hide();

    /* Add the specified class(es), if any, to the tooltip */
    if (tooltipClass) {
        tooltip.addClass(tooltipClass);
    }

    /* Position the tooltip and display it */
    placeTooltip(tooltip,e.pageX,e.pageY);
    $('#mw-content-text').append(tooltip);
    $(this).data('tooltip',tooltip);
    /*$(this).addClass('tooltip-hover');*/
    initTooltipHover(this);
    $(tooltip).html('<img src="http://help.gamepedia.com/extensions/WikiEditor/modules/images/dialogs/loading.gif" />');
    $(tooltip).show();
    ajaxLoad(tooltip,source,fragment);
});