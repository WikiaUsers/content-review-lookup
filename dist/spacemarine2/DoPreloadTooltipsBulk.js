/*
Experimental proof-of-concept.
Requires a modified version of dev:Tooltips.js that exposes its API.
*/

// import tooltips API
var tooltipsAPI = window.tooltips

function getBulkPreloadElementId(id) {
    return 'tt-bulk-preload-' + id
}

function doPreloadTooltipsBulk(type, tooltips, callback) {
    var contexts = []
    var parseQuery = ''
    for (var i = 0, l = tooltips.length; i < l; i++) {
        var tooltip = tooltips[i]
        var $tooltip = $(tooltip)
        if (!$tooltip.hasClass(type)) {
        	continue
        }
        
        var context = tooltipsAPI.getTooltipContext(type, tooltip)
        if (context.exists) {
            /* Already loaded in the past, most likely either by us or by Tooltips.js */
            continue
        }
        var $tip = context.$tip
        
        if (!context.parse) {
            $tip.html(context.text).each(tooltipsAPI.calcSize)
        }
        else {
            var id = context.id
            var debugText = 'Bulk loading ' + tooltipsAPI.getTooltipElementId(type, id)
            tooltipsAPI.markTooltipParsing($tip, debugText)
            contexts.push(context)
            parseQuery += '<div id="' + getBulkPreloadElementId(id) +'">' + context.text + '</div>'
        }
    }
    if (!contexts.length) {
        if (typeof callback === 'function') callback(null)
        return
    }
    
    $.ajax({
        type: 'POST', /* Because the parse query can be too long for GET we need to use POST */
        url: tooltipsAPI.getAPI(),
        headers: {
            /* Recommended for performance when doing POST requests that doesn't write */
            "Promise-Non-Write-API-Action": true
        },
        data: {
            text: parseQuery
        },
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            var $mwOutput = $(data['parse']['text']['*'])
            
            for (var i = 0, l = contexts.length; i < l; i++) {
                var context = contexts[i]
                var id = context.id
                var $tip = context.$tip
                
                $tip.empty()
                $mwOutput.find('#' + getBulkPreloadElementId(id))
                    .children()
                    .appendTo($tip)
                    .each(tooltipsAPI.calcSize)
                tooltipsAPI.markTooltipParsed($tip)
            }
            
            if (typeof callback === 'function') callback(contexts)
        }
    })
}

doPreloadTooltipsBulk.isReady = function () {
    // Make sure we're using a modified version of Tooltip.js that has the proper API
    return typeof tooltipsAPI.getTooltipContext   === 'function'
        && typeof tooltipsAPI.getTooltipElementId === 'function'
        && typeof tooltipsAPI.markTooltipParsing  === 'function'
        && typeof tooltipsAPI.markTooltipParsed   === 'function'
}
window.doPreloadTooltipsBulk = doPreloadTooltipsBulk

/* Example usage:
$(function() {
    doPreloadTooltipsBulk('sm2-tooltip', document.getElementsByClassName('sm2-tooltip'), function(mocks) {
        if (mocks) {
            console.log('[tooltip preload] Tooltip bulk preload complete!')
        }
        else {
            console.log('[tooltip preload] Could not find any tooltips to bulk preload.')
        }
    })
})
/* */