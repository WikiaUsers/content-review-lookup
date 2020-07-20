/* <pre><nowiki> */
/* == Begin Tooltip == */
var noCache; /* set to true to disable cache */

var ttHTMLStart = '<div style="font-size: 1em; width: auto; max-width: 20em; background-color: black;" class="itemtooltip"><div class="t"><div class="b"><div class="l"><div class="r"><div class="bl"><div class="br"><div class="tl"><div class="tr">';
var ttHTMLEnd = '</div></div></div></div></div></div></div></div></div>';
var ttLoading = ttHTMLStart + '<b>Loading...</b><br/>Please wait.' + ttHTMLEnd;

var ttAjax = null;
var toolTip;
/**
 * setup page for tooltips
 */
$(document).ready(function() {
    $('#bodyContent').prepend('<div id="toolTip" style="display: none; position: absolute; z-index: 10"></div>');
    toolTip = $('#toolTip');
});

/* basic tooltip functions */
/**
 * display and store in cache
 *
 * @param string key to cache data under
 * @param string html to display and store
 */
function cacheTip(pageName, html) {
    toolTip.html(html);
    if (!noCache) {
        var key = pageName + '-cache';
        if (null == toolTip.data(key)) {
            toolTip.data(key, html);
        }
    }
}

var bodySize;
/**
 * store screen size
 */
function onResize() {
    var bc = $('#bodyContent');
    var w = $(window);
    bodySize = {
        width:  bc.width() + bc.scrollLeft(),
        height: w.height() + w.scrollTop(),
    };
}
$(document)
.resize(onResize)
.ready(onResize);

/**
 * move tip to current mouse position
 */
function moveTip(e) {
    var width  = toolTip.outerWidth();
    var height = toolTip.outerHeight();

    /* cursor position plus offset */
    var posX   = e.pageX + 16;
    var posY   = e.pageY + 16;

    /* adjust for floating parant position */
    p = toolTip.parent().parent().offset();
    posX -= p.left;
    posY -= p.top;

    if (posX + width > bodySize.width) {
        /* Move left */
        posX = bodySize.width - width;
    }
    if (posY + height > bodySize.height) {
        /* Move tooltip to above cursor */
        posY = e.pageY - 48 - height;
    }

    toolTip.css({'top': posY, 'left': posX});
}

/**
 * hide tooltip
 */
function hideTip(e) {
    toolTip.hide();
}

/**
 * show previously cached tip
 * @return boolean if cached or not
 */
function showCacheTip(cacheName) {
    if (null == toolTip.data(cacheName + '-cache')) {
        return false
    }
    toolTip.html(toolTip.data(cacheName + '-cache'));
    return true;
}
/* end basic tooltip functions */

/* === {{loot}} === */
/**
 * setup loot template handling
 */
$(document).ready(function() {
    $(':not(.selflink) > span.itemlink') /* don't show tooltip if on items own page */
    .mouseover(function() {
        toolTip.html('').show()
        var itemName = $(this).data('itemName');
        if (null == itemName) {
            /* get item name from title and remove title */
            itemName = $(this).parent().attr('title').replace(' (page does not exist)', '');
            $(this).parent().attr('title', '');
            $(this).data('itemName', itemName);
        }

        if (!showCacheTip(itemName)) {
            toolTip.html(ttLoading);

            /* fetch and show if not cached */
            ttAjax = $.getJSON(wgServer + wgScriptPath + '/api.php', {
                'action' : 'parse',
                'prop'   : 'text',
                'text'   : '{{:' + itemName + '|mode=home}}',
                'format' : 'json',
            }, function(json) {
                showItemTip(itemName, json.parse.text['*']);
            });
        }
    })
    .mousemove(moveTip)
    .mouseout(hideTip)
});

/**
 * show item tooltip
 *
 * @param string pageName name of item
 * @param string html html to display
 */
function showItemTip(pageName, html) {
    ttAjax = null;
    html = html.split('<!--')[0]; /* dont need page stats */

    /* TODO: change from length to class check on trigger elem
             check for invalid template use */
    if (html.length < 280 /* indexOf('class="new"') */) {
        cacheTip(pageName, ttHTMLStart + '<b>Error</b><br>The target item\'s page does not exist.<br>The page must be created in order<br>to display a tooltip.' + ttHTMLEnd);
    } else {
        html = html.replace(/<div .+"tr">/, ttHTMLStart)
        cacheTip(pageName, html);
    }
    /* TODO: update position after load */
}
/* end {{loot}} */

/* === {{coords}} === */
/**
 * setup coords template handling
 */
$(document).ready(function() {
    $('span.coordslink')
    .mouseover(function() {
        toolTip.html('').show();
        /* get map and coords */
        coordsInfo = jQuery(this)
                    .attr('class')
                    .replace('coordslink ', '')
                    .match(/([\w _]+)-(-?\d+)-(-?\d+)/);
        coordsInfo.shift();

        if (!showCacheTip(coordsInfo.join('_'))) {
            toolTip.html(ttLoading);

            /* fetch image url if not cached */
            ttAjax = $.getJSON(wgServer + wgScriptPath + '/api.php', {
                'prop'       : 'imageinfo',
                'titles'     : 'File:Map ' + coordsInfo[0] + '.png',
                'iiprop'     : 'url',
                'iiurlwidth' : 300,
                'action'     : 'query',
                'format'     : 'json',
            }, function(json) {
                var url = 'https://images.wikia.nocookie.net/jdf2p/images/1/18/Map_World.png'; /* default to world */
                if (json.query.pages[-1]) {
                    /* map not found */
                    html = ttHTMLStart + '<b>Error</b><br/>Map `' + coordsInfo[0] + '` does not exist. <br/>Please make sure valid map name is used.' + ttHTMLEnd;
                    cacheTip(coordsInfo.join('-'), html);
                }
                /* use each since accessed by unknown pageid */
                $.each(json.query.pages, function(index, page) {
                    if (!page.imageinfo || page.title != 'File:Map ' + coordsInfo[0].replace('_', ' ') + '.png') {
                        return true; /* continue */
                    }
                    url = page.imageinfo[0].thumburl;
                    showCoordsTip(url, coordsInfo[1], coordsInfo[2]);
                });
            });
        }
    })
    .mousemove(moveTip)
    .mouseout(hideTip)
});


var ttCoordStart = '<div style="font-size: 1em; width: auto; background-color: black;" class="itemtooltip">';
/**
 * Show map with position marked by blip
 *
 * @param string url url of map image
 * @param int coordX x coordinate
 * @paarm int coordY y coordinate
 */
function showCoordsTip(url, coordX, coordY) {
    ttAjax = null;

    /* ( half map size + half of coord ) / 5.24 (ratio)*/
    posX = (262 +  coordX / 2)  / 5.24;
    posY = (262 - (coordY / 2)) / 5.24;

    html = ttCoordStart + '<div class="ZoneMap" style="position: relative; width: 300px; height: 300px;">'
            +'<img src="' + url + '" alt="" />'
            +'<div style="position: absolute; left:' + posX + '%; top: ' + posY + '%; margin: -5px">'
            +'<img src="https://images.wikia.nocookie.net/jdf2p/images/e/ed/Blip1.png" alt="" />'
            +'</div></div></div>';

    cacheTip(url + '-' + coordX + '-' + coordY, html);
}
/* end {{coords}} */

/* === {{npc}} === */
/**
 * setup npc template handling
 */
$(document).ready(function() {
    $(':not(.selflink) > span.npclink') /* don't show tooltip if on items own page */
    .mouseover(function() {
        toolTip.html('').show();

        var npcName = $(this).data('npcName');
        if (null == npcName) {
            toolTip.html(ttLoading);
            /* get npc name from title and remove title */
            npcName = $(this).parent().attr('title').replace(' (page does not exist)', '');
            $(this).parent().attr('title', '');
            $(this).data('npcName', npcName);
        }

        if (!showCacheTip(npcName)) {
            /* fetch and show if not cached */
            ttAjax = $.get(wgServer + wgScript, {
                'title'  : npcName,
                'action' : 'render',
            }, function(text) {
                showNpcTip(npcName, text);
            }, 'text');
        }
    })
    .mousemove(moveTip)
    .mouseout(hideTip)
});

/**
 * Show npc tip
 */
function showNpcTip(npcName, text) {
    var html = $(text);
    var tooltip = '';
    var pic, icon;

    var name = $('.npcname', html).text();

    if (pic = $('.npcpic a img', html).attr('src')) {
        tooltip += '<img src="' + pic + '" alt="' + name + '" style="max-width:95%; max-height:150px;">'
                + '</div><div align="center">'; // start rest on new line
    }

    if (icon = $('.npcicon', html).html()) {
        tooltip += '<div style="float:left;">' + icon + '</div>';
    }

    tooltip += name;

    var fields = {'level' : 'Level',
                 'exp'    : 'Exp',
                 'hp'     : 'Health',
                 'sp'     : 'Spirit',
                 'atk'    : 'Attack',
                 'def'    : 'Defense',
                 'aggro'  : 'Agressive',
                 'loc'    : 'Location',
    }
    $.each(fields, function(key, value) {
        var test = $('.npc' + key, html).text();
        if (test) {
            tooltip += '<br />' + value + ' :' + test;
        }
    });

    html = ttHTMLStart + "<div align='center'>" + tooltip + "</div>" + ttHTMLEnd;
    cacheTip(npcName, html);
}
/* end {{npc}} */

/* ----- End Tooltip ----- */
/* </nowiki></pre> */