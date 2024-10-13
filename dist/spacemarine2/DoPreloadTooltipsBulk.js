/* Experimental proof-of-concept.
   This code is very likely to do something wrong if dev:Tooltips.js updates.
   It would be preferable if dev:Tooltips.js exposed some of their functions instead of me having to mock them here.
*/

var tooltipsMock = (function () {
    /* Mock of https://spacemarine2.fandom.com/load.php?lang=en&modules=ext.fandom.ImportJs&skin=fandomdesktop&version=34h1s
       to be able to do bulk preloading of tooltips */
    var NOOP = function () { }
    var tooltips = {
        debug: false,
        api: false,
        types: [],
        /* [...] */
        waitForImages: false,
        /* [...] */
        ready: false,
        init: function () {
            /* [...] */
            if (location.search.search(/ttdebug=(1|[Tt]rue)/) != -1 || (typeof tooltips_debug != 'undefined' && tooltips_debug))
                tooltips.debug = true
            
            var href = (new mw.Uri($('link[rel="canonical"]').attr('href'))).path
            if (typeof href == 'undefined' || !href) {
                console.log('Tooltips: script couldn\'t find required  link[rel="canonical"]  tag')
                tooltips.disabled = true
                return false
            }
            href = href.split('/wiki/')
            tooltips.api = href[0] + '/api.php?format=json&action=parse&disablelimitreport=true&prop=text&title=' + href[1]
            if (mw.util.getParamValue('uselang'))
                tooltips.api += '&uselang=' + mw.util.getParamValue('uselang')
            tooltips.api += '&maxage=600&smaxage=600'
            // api += '&text=' /* We're sending this via POST data instead */
            /* [...] */
            if (!tooltips.config()) {
                console.log('Tooltips: missing config')
                tooltips.disabled = true
                return false
            }
            tooltips.ready = true
            /* [...] */
        },
        config: function() {
            if (typeof tooltips_list != 'undefined') {
                $(tooltips_list).each(function(i, v) {
                    tooltips.addType(v)
                })
            }
            if (typeof tooltips_config == 'object') {
                /* [...] */
                tooltips.waitForImages = (tooltips_config.waitForImages || tooltips.waitForImages) && true
                /* [...] */
            }    
            return true
        },
        addType: function (tt) {
            if (typeof tooltips.types[tt.classname] == 'undefined') {
                var obj = {}
                
                if(typeof tt.parse == 'string' || typeof tt.parse == 'function') var parse = tt.parse; else var parse = false
                if(typeof tt.text == 'string' || typeof tt.text == 'function') var text = tt.text; else var text = false

                if(parse) {
                    obj.text = parse
                    obj.parse = true
                } else if(text) {
                    obj.text = text
                    obj.parse = false
                } else return
                /* [...] */
                if (typeof obj.text == 'string')
                    obj.parameters = tooltips.getParameters(obj.text)
                else
                    obj.parameters = []
                /* [...] */
                if (typeof tt.onParsed == 'function')
                    obj.onParsed = tt.onParsed
                /* [...] */
                tooltips.types[tt.classname] = obj
                /* [...] */
            }
            else {
                /* [...] */
                if (typeof tt.onParsed == 'function')
                    tooltips.types[tt.classname].onParsed = tt.onParsed
                /* [...] */
            }
        },
        getParameters: function(text) {
            var list = []
            var matches = text.match(/<#\s*[a-z0-9_\-]+?\s*#>/gi)
            if (matches) {
                for (var x = 0; x < matches.length; x++) {
                    list.push(/<#\s*([a-z0-9_\-]+?)\s*#>/i.exec(matches[x])[1])
                }
            }
            return list
        },
        getAPI: function(text) {
            return tooltips.api + (text ? '&text=' + encodeURIComponent(text) : '')
        },
        getText: function(type, elem) {
            if (typeof tooltips.types[type].text == 'function') {
                var text = tooltips.types[type].text($(elem)[0])
            } else {
                var text = tooltips.types[type].text
                for (var x = 0; x < tooltips.types[type].parameters.length; x++) {
                    var param = tooltips.types[type].parameters[x]
                    var value = $(elem).data(param)
                    if (typeof value == 'undefined')
                        value = ''
                    var rx = new RegExp('<#\\s*' + param.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + '\\s*#>','g')
                    text = text.replace(rx, value)
                }
            }
            return text
        },
        getTooltipMock: function (type, elem) {      
            var text = tooltips.getText(type, elem)
            var id = $(elem).data('tooltip-id-' + type)
            if (!id) {
                id = tooltips.hash(text)
            }

            var tip = $('<div class="main-tooltip"></div>')
                .data('type', type)
                .addClass('tt-' + type)
            
            return {
                id: id,
                text: text,
                parse: tooltips.types[type].parse,
                $tip: tip,
            }
        },
        getTooltipMockPreAJAXFix: function () {
            var $this = $(this)
            $this.addClass('tooltip-loading')
            if (tooltips.debug) {   
                $this.html('<pre style="padding:2px 3px;font-size:11px;">Bulk loading ' + ('tooltip-' + type + '-' + id) + '</pre>')
            }
        },
        getTooltipMockPostAJAXFix: function() {
            var images = $(this).find('img')
            images.fadeTo(0, 0).one('load', function () {
                if (tooltips.waitForImages) {
                    $(this).fadeTo(0, 1)
                    $(this).addClass('image-loaded')
                    tip = $(this).closest('.main-tooltip')
                    if (tip.find('img').length == tip.find('img.image-loaded').length) {
                        tip.removeClass('tooltip-loading').each(tooltips.calcSize)
                        tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1])
                        tooltips.sameWidth()
                    }
                } else
                    $(this).fadeTo(100, 1)
            })
            if (tooltips.waitForImages) {
                if (images.length === 0) {
                    $(this).removeClass('tooltip-loading').each(tooltips.calcSize)
                }
            } else {
                $(this).removeClass('tooltip-loading').each(tooltips.calcSize)
            }
            var type = $(this).data('type') || false
            if (type && typeof tooltips.types[type].onParsed == 'function') {
                tooltips.types[type].onParsed.call(this)
                tip.each(tooltips.calcSize)
            }
            if ($(this).find('a.new').length > 0)
                $(this).addClass('has-redlinks')
        },
        calcSize: function() {
            $this = $(this)
            $this.css('position', 'absolute')
            var temp = $this.css('width')
            $this.css('width', '')
            $this.data('width', parseFloat(window.getComputedStyle($this[0]).width))
            $this.data('height', parseFloat(window.getComputedStyle($this[0]).height))
            $this.data('outerwidth', $this.outerWidth(true))
            $this.data('outerheight', $this.outerHeight(true))
            $this.css('width', $this.data('width') + 'px')
            $this.css('position', '')
            $this.css('width', temp)
        },
        sameWidth: NOOP,
        wrapperPosition: NOOP,
        hash: function(text) {
            var hash = 0, i, char
            if (text.length === 0)
                return hash
            for (i = 0,
            l = text.length; i < l; i++) {
                char = text.charCodeAt(i)
                hash = ((hash << 5) - hash) + char
                hash |= 0
            }
            return hash
        }
    }
    return tooltips
})()

function doPreloadTooltipsBulk(type, tooltips, callback) {
    var parseQuery = ''
    var mocks = []
    for (var i = 0, l = tooltips.length; i < l; i++) {
        var tooltip = tooltips[i]
        var $tooltip = $(tooltip)
        if (!$tooltip.hasClass(type)) {
        	continue
        }
        if ($tooltip.data('tooltip-id-' + type)) {
            /* Already loaded in the past, most likely either by us or by dev:Tooltips.js */
            continue
        }
        
        var mock = tooltipsMock.getTooltipMock(type, tooltip)
        var id = mock.id
        var $tip = mock.$tip
        if ($('#tooltip-' + type + '-' + id).length) {
            /* Already loaded in the past, most likely either by us or by dev:Tooltips.js */
            $tip.remove()
            continue
        }
        
        /* Make things official like they're from dev:Tooltips.js */
        $tooltip.data('tooltip-id-' + type, id)
        $tip.attr('id', 'tooltip-' + type + '-' + id).appendTo('#tooltip-storage')
        
        if (!mock.parse) {
            $tip.html(mock.text).each(tooltipsMock.calcSize)
        }
        else {   
            tooltipsMock.getTooltipMockPreAJAXFix.call($tip)
            mocks.push(mock)
            parseQuery += '<div id="tt-mock-' + id +'">' + mock.text + '</div>'
        }
    }
    if (!mocks.length) {
        if (typeof callback === 'function') callback(null)
        return
    }
    
    var api = tooltipsMock.getAPI()
    $.ajax({
        type: 'POST', /* Because the parse query can be too long for GET we need to use POST */
        headers: {
            /* Recommended for performance when doing POST requests that doesn't write */
            "Promise-Non-Write-API-Action": true
        },
        url: api,
        data: {
            text: parseQuery
        },
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            var $mwOutput = $(data['parse']['text']['*'])
            
            for (var i = 0, l = mocks.length; i < l; i++) {
                var mock = mocks[i]
                var id = mock.id
                var $tip = mock.$tip
                
                $tip.empty()
                $mwOutput.find('#tt-mock-' + id)
                    .children()
                    .appendTo($tip)
                    .each(tooltipsMock.calcSize)
                tooltipsMock.getTooltipMockPostAJAXFix.call($tip)
            }
            
            if (typeof callback === 'function') callback(mocks)
        }
    })
}

doPreloadTooltipsBulk.tooltipsMock = tooltipsMock
doPreloadTooltipsBulk.init = tooltipsMock.init
doPreloadTooltipsBulk.isReady = function() {
	return tooltipsMock.ready
}
window.doPreloadTooltipsBulk = doPreloadTooltipsBulk

/* Example usage:
$(function() {
    doPreloadTooltipsBulk.init()
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