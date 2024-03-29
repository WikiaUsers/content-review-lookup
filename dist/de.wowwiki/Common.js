/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // <pre>
 // Import [[MediaWiki:Onlyifuploading.js]] 
 

// 29.09.2018 System-msg: ShowHide is no longer supported 
/*
importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};
*/

/* Für die Zahlen in Polls, by Crypoc */
$(function() {
  $('#ajax-poll-area > div > div > span').each(function() {
    if ($(this).text() == "0","1") { $(this).css('color','white'); }
  });
});

 // </pre>
 
 /* Basis-Code für Tooltips */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js'
    ]
});
 
var tooltips = {
    debug: false,
 
    api: false,
    types: [],
    classes: ['basic-tooltip', 'advanced-tooltip'],
    advancedCounter: 1,
 
    events: ['EditPageAfterRenderPreview'],
    timeouts: [],
 
    offsetX: 20,
    offsetY: 20,
    waitForImages: false,
 
    init: function() {
        if(location.search.search('ttdebug=true') != -1 || (typeof tooltips_debug != 'undefined' && tooltips_debug)) tooltips.debug = true;
        var href = $('link[rel="canonical"]').attr('href')
        if(typeof href == 'undefined' || !href) {
            console.log('Tooltips: script couldn\'t find required  link[rel="canonical"]  tag');
            tooltips.disabled = true;
            return false;
        }
        href = href.split('/wiki/');
        tooltips.api = href[0]+'/api.php?format=json&action=parse&disablepp=true&prop=text&title='+href[1]+'&text=';
 
        tooltips.types['basic-tooltip'] = {};
        tooltips.types['advanced-tooltip'] = {};
 
        if(!tooltips.config()) {
            console.log('Tooltips: missing config');
            tooltips.disabled = true;
            return false;
        }
 
        var content = $('#WikiaMainContent')
        if(!content.length) content = $('#mw-content-text')
 
        if($('#tooltip-wrapper').length == 0) $('<div id="tooltip-wrapper" class="WikiaArticle"></div>').appendTo(content);
        if($('#tooltip-storage').length == 0) $('<div id="tooltip-storage" class="WikiaArticle"></div>').append('<div class="main-tooltip tt-basic-tooltip" id="tooltip-basic-tooltip">Lorem ipsum dolor sit amet</div>').appendTo(content);
 
        $('#tooltip-wrapper')
            .css({'margin':'0px','position':'fixed','height':'auto','min-height':'0'})
            .hide()
 
        $('#tooltip-storage')
            .css({'height':'0px','min-height':'0','visibility':'hidden','overflow':'hidden','position':'static'})
 
 
        $('#tooltip-basic-tooltip').data('type', 'basic-tooltip');
 
        tooltips.applyTooltips(document)
        if(typeof tooltips.events == 'string') tooltips.events = [tooltips.events]
        for(var x=0; x<tooltips.events.length; x++) { $(window).on(tooltips.events[x], function(ev, elem) { tooltips.applyTooltips(elem || this) }) }
 
        if(tooltips.debug) {
            $('#tooltip-wrapper').css({'background-color':'rgba(255,0,0,0.2)'})
            $('#tooltip-storage').css({'background-color':'rgba(0,255,0,0.2)','height':'500px','overflow-y':'scroll','visibility':'visible'})
        }
    },
    config: function() {
        if(typeof tooltips_list != 'undefined') {
            $(tooltips_list).each(function(i, v) { tooltips.addType(v) });
        }
        if(typeof tooltips_config == 'object') {
            tooltips.offsetX = tooltips_config.offsetX || tooltips.offsetX;
            tooltips.offsetY = tooltips_config.offsetY || tooltips.offsetY;
            tooltips.waitForImages = (tooltips_config.waitForImages || tooltips.waitForImages) && true;
            tooltips.events = tooltips_config.events || tooltips.events;
        }
 
        return true
    },
    applyTooltips: function(elem) {
        $(elem).find('.'+tooltips.classes.join(', .')).each(function() {
            $this = $(this)
            if($this.hasClass('tooltips-init-complete')) return;
 
            $this.find('*').removeAttr('title');
            $this.mouseover(tooltips.handlers.mouseOver);
            $this.mouseout(tooltips.handlers.mouseOut);
            $this.mousemove(tooltips.handlers.mouseMove);
 
            $this.data('tooltip-contents', $(this).attr('title'));
            $this.removeAttr('title');
 
            tooltips.advancedTooltip($this);
 
            $(this).addClass('tooltips-init-complete');
        });
    },
    advancedTooltip: function(elem) {
        elem = $(elem)
        if(!elem.hasClass('advanced-tooltip')) return;
        var tips = elem.find('.tooltip-contents')
        if(!tips.length) return;
        var tip = $('<div class="main-tooltip tt-advanced-tooltip"></div>').attr('id', 'tooltip-advanced-tooltip-'+tooltips.advancedCounter).appendTo('#tooltip-storage').data('type', 'advanced-tooltip').append($(tips[0]).contents()).each(tooltips.calcSize);
        tips.remove();
        elem.data('tooltip-id-advanced-tooltip', tooltips.advancedCounter);
        tooltips.advancedCounter++;
    },
    addType: function(tt) {
        if(typeof tooltips.types[tt.classname] == 'undefined') {
            var obj = {}
 
            if(typeof tt.parse == 'string' || typeof tt.parse == 'function') var parse = tt.parse; else var parse = false;
            if(typeof tt.text == 'string' || typeof tt.text == 'function') var text = tt.text; else var text = false;
 
            if(parse) {
                obj.text = parse;
                obj.parse = true;
            } else if(text) {
                obj.text = text;
                obj.parse = false;
            } else return;
 
            if(typeof obj.text == 'string') obj.parameters = tooltips.getParameters(obj.text); else obj.parameters = [];
 
            if(typeof tt.delay == 'string' || typeof tt.delay == 'number') obj.delay = parseInt(tt.delay); else obj.delay = false;
            if(typeof tt.onParsed == 'function') obj.onParsed = tt.onParsed;
            if(typeof tt.onShow == 'function') obj.onShow = tt.onShow;
            if(typeof tt.onHide == 'function') obj.onHide = tt.onHide;
 
            tooltips.types[tt.classname] = obj;
            if(tooltips.classes.indexOf(tt.classname) == -1) tooltips.classes.push(tt.classname)
        } else {
            if(typeof tt.delay == 'string' || typeof tt.delay == 'number') tooltips.types[tt.classname].delay = parseInt(tt.delay);
            if(typeof tt.onParsed == 'function') tooltips.types[tt.classname].onParsed = tt.onParsed;
            if(typeof tt.onShow == 'function') tooltips.types[tt.classname].onShow = tt.onShow;
            if(typeof tt.onHide == 'function') tooltips.types[tt.classname].onHide = tt.onHide;
        }
    },
    getParameters: function(text) {
        var list = []
        var matches = text.match(/<#\s*[a-z\-]+?\s*#>/gi)
        for(var x=0; x<matches.length; x++) {
            list.push(/<#\s*([a-z\-]+?)\s*#>/i.exec(matches[x])[1])
        }
        return list
    },
    getAPI: function(text) {
        return tooltips.api+encodeURIComponent(text)
    },
    getText: function(type, elem) {
        if(typeof tooltips.types[type].text == 'function') {
            var text = tooltips.types[type].text($(elem)[0])
        } else {
            var text = tooltips.types[type].text
            for(var x=0; x<tooltips.types[type].parameters.length; x++) {
                var param = tooltips.types[type].parameters[x]
                var value = $(elem).data(param)
                if(typeof value == 'undefined') value = ''
                var rx = new RegExp('<#\\s*'+param.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")+'\\s*#>', 'g')
                text = text.replace(rx, value)
            }
        }
        return text
    },
    getTooltip: function(type, elem) {
        elem = $(elem)
        if(elem.data('tooltip-id-'+type)) return $('#tooltip-'+type+'-'+elem.data('tooltip-id-'+type))
 
        var text = tooltips.getText(type, elem)
        var id = tooltips.hash(text)
        elem.data('tooltip-id-'+type, id)
 
        var tip = $('#tooltip-'+type+'-'+elem.data('tooltip-id-'+type))
        if(tip.length) return tip;
 
        tip = $('<div class="main-tooltip"></div>').attr('id', 'tooltip-'+type+'-'+id).appendTo('#tooltip-storage').data('type', type).addClass('tt-'+type)
 
        tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1])
        tooltips.sameWidth()
 
        if(!tooltips.types[type].parse) {
            tip.html(text).each(tooltips.calcSize)
            tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1])
            tooltips.sameWidth()
        } else {
            tip.addClass('tooltip-loading')
            var api = tooltips.getAPI(text)
            if(tooltips.debug) tip.html('<pre style="padding:2px 3px;font-size:11px;">'+api+'</pre>')
            tip.attr('title', api)
            $.ajax({
                url: api,
                dataType: 'json',
                context: tip,
                success: function(data, textStatus, jqXHR) {
                    $(this).html(data['parse']['text']['*']).each(tooltips.calcSize)
                    tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1])
                    tooltips.sameWidth()
                    if($(this).find('a.new').length > 0) $(this).addClass('has-redlinks')
                    var images = $(this).find('img')
                    images.fadeTo(0, 0).one('load', function() {
                        if(tooltips.waitForImages) {
                            $(this).fadeTo(0,1);
                            $(this).addClass('image-loaded')
                            tip = $(this).closest('.main-tooltip')
                            if(tip.find('img').length == tip.find('img.image-loaded').length) {
                                tip.removeClass('tooltip-loading').each(tooltips.calcSize)
                                tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1])
                                tooltips.sameWidth()
                            }
                        } else $(this).fadeTo(100,1);
                    })
                    if(tooltips.waitForImages) {
                        if(images.length == 0) {
                            $(this).removeClass('tooltip-loading').each(tooltips.calcSize)
                        }
                    } else {
                        $(this).removeClass('tooltip-loading').each(tooltips.calcSize)
                    }
                    var type = $(this).data('type') || false
                    if(type && typeof tooltips.types[type].onParsed == 'function') {
                        tooltips.types[type].onParsed.call(this);
                        tip.each(tooltips.calcSize)
                    }
                    tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1])
                    tooltips.sameWidth()
                }
            });
        }
        return tip
    },
    getBasicTooltip: function(elem) {
        return $("#tooltip-basic-tooltip").html($(elem).data('tooltip-contents').replace(/\\n/g,'<br />')).each(tooltips.calcSize);
    },
    getAdvancedTooltip: function(elem) {
        return $("#tooltip-advanced-tooltip-"+$(elem).data('tooltip-id-advanced-tooltip'));
    },
    getTooltips: function(elem) {
        elem = $(elem)
        var classes = elem.attr('class').split(' ')
        var tips = []
        for(var i=0;i<classes.length;i++) {
            var tip = false;
            if(classes[i] == 'advanced-tooltip') tip = tooltips.getAdvancedTooltip(elem);
            else if(classes[i] == 'basic-tooltip') tip = tooltips.getBasicTooltip(elem);
            else if(typeof tooltips.types[classes[i]] != 'undefined') tip = tooltips.getTooltip(classes[i], elem);
            if(tip) tips.push(tip[0]);
        }
        return $(tips)
    },
    setOwnWidth: function() {
        $this = $(this)
        if(typeof $this.data('width') != 'undefined') $this.css('width', $this.data('width')+'px')
        else $this.css('width', '')
    },
    calcSize: function() {
        $this = $(this)
        $this.css('position', 'absolute')
        var temp = $this.css('width')
        $this.css('width', '')
        $this.data('width', $this.width());
        $this.data('height', $this.height());
        $this.data('outerwidth', $this.outerWidth(true));
        $this.data('outerheight', $this.outerHeight(true));
        $this.css('width', $this.data('width')+'px')
        $this.css('position', '')
        $this.css('width', temp)
    },
    sameWidth: function() {
        if($("#tooltip-wrapper").find('.main-tooltip').length == 1) {
            $("#tooltip-wrapper").find('.main-tooltip').each(tooltips.setOwnWidth)
        } else {
            var width = 0;
            $("#tooltip-wrapper").find('.main-tooltip').each(function() { width = Math.max(width, $(this).data('width') || 0); });
            $("#tooltip-wrapper").find('.main-tooltip').each(function() { $(this).css('width', width+'px'); });
        }
    },
    wrapperPosition: function(mouseX, mouseY) {
        var tipH = parseInt($("#tooltip-wrapper").css('padding-top')) + parseInt($("#tooltip-wrapper").css('padding-bottom'));
        var tipW = 0;
 
        $("#tooltip-wrapper").find('.main-tooltip').each( function(){ if(typeof $(this).data('outerheight') != 'undefined') tipH += $(this).data('outerheight'); });
        $("#tooltip-wrapper").find('.main-tooltip').each( function(){ if(typeof $(this).data('outerwidth') != 'undefined') tipW = Math.max(tipW, $(this).data('outerwidth') + parseInt($("#tooltip-wrapper").css('padding-left')) + parseInt($("#tooltip-wrapper").css('padding-right'))); });
 
        var coordX = tooltips.offsetX+mouseX;
        var coordY = tooltips.offsetY+mouseY;
 
        var toRight = $(window).width()-coordX;
 
        if ($("#tooltip-wrapper").css('position') == 'fixed') {
            coordX = coordX-$(window).scrollLeft();
            coordY = coordY-$(window).scrollTop();
            coordY = Math.min(coordY, $(window).height()-tipH-$('#WikiaBarWrapper').height());
        } else {
            coordY = Math.min(coordY, $(window).height()-tipH-$('#WikiaBarWrapper').height()+$(window).scrollTop());
        }
        if(toRight >= tipW) $("#tooltip-wrapper").css({left: coordX + 'px', top: coordY + 'px'});
        else $("#tooltip-wrapper").css({left: coordX-tipW-tooltips.offsetX*2 + 'px', top: coordY + 'px'});
    },
    handlers: {
        mouseOver: function(e) {
            tooltips.lastKnownMousePos = [e.pageX, e.pageY]
            tooltips.wrapperPosition(e.pageX, e.pageY)
 
            var tips = tooltips.getTooltips(this)
            $("#tooltip-wrapper").prepend(tips).show();
            tooltips.sameWidth()
 
            var handle = this
            tips.each(function() {
                var $this = $(this);
                var type = $(this).data('type') || false;
 
                $this.show();
                if(type && typeof tooltips.types[type] != 'undefined' && tooltips.types[type].delay) {
                    $this.hide()
                    tooltips.timeouts[$(this).attr('id')] = setTimeout(function(){
                        $this.show();
                        if(type && typeof tooltips.types[type].onShow == 'function') tooltips.types[type].onShow.call($this[0], handle);
                    }, tooltips.types[type].delay)
                } else if(type && typeof tooltips.types[type].onShow == 'function') tooltips.types[type].onShow.call(this, handle);
            });
        },
        mouseOut: function(e) {
            tooltips.lastKnownMousePos = [e.pageX, e.pageY]
            tooltips.wrapperPosition(e.pageX, e.pageY)
 
            var handle = this
            $("#tooltip-wrapper").hide()
            $("#tooltip-wrapper").find('.main-tooltip').appendTo('#tooltip-storage').each(function() {
                var type = $(this).data('type') || false;
                if(type && typeof tooltips.types[type].onHide == 'function') tooltips.types[type].onHide.call(this, handle);
                $(this).show()
                clearTimeout(tooltips.timeouts[$(this).attr('id')])
                delete tooltips.timeouts[$(this).attr('id')]
            });
        },
        mouseMove: function(e) {
            tooltips.lastKnownMousePos = [e.pageX, e.pageY]
            tooltips.wrapperPosition(e.pageX, e.pageY)
        },
    },
    hash: function(text) {
        /* Source: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/ */
        var hash = 0, i, char;
        if (text.length == 0) return hash;
        for (i = 0, l = text.length; i < l; i++) {
            char  = text.charCodeAt(i);
            hash  = ((hash<<5)-hash)+char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    },
}
addOnloadHook(tooltips.init)
//

//****************************************
//****    Tooltips                    ****
//****************************************
 
// See [[Help:Tooltips]]
// default setting to turn tooltips on
var tooltipsOn = true;
 
// allow users to specify an external db to change links to
var extDB = "http://de.wow.wikia.com/";
 
var $tfb;
var $ttfb;
var $htt;
 
// hides the tooltip
function hideTip() {
  $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
}
 
// displays the tooltip
function displayTip(e) {
  $htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
  moveTip(e);
  $htt.not(":empty").css("visibility", "visible");
}
 
// moves the tooltip
function moveTip(e) {
  var newTop = e.clientY + ((e.clientY > ($(window).height() / 2)) ? -($htt.not(".hidden").innerHeight() + 20) : 20);
  var newLeft = e.clientX + ((e.clientX > ($(window).width() / 2)) ? -($htt.not(".hidden").innerWidth() + 20) : 20);
  $htt.not(".hidden").css({
    "position": "fixed",
    "top": newTop + "px",
    "left": newLeft + "px"
  });
}
 
// AJAX tooltips
function showTip(e) {
  $t = $(this);
  $p = $t.parent();
  if ($p.hasClass("selflink") == false) {
    $t.removeAttr("title");
    $p.removeAttr("title");
    $tfb.load("/" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "?action=render div.tooltip-content", function () {
      if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
      $tfb.find(".tooltip-content").css("display", "");
      displayTip(e);
    });
  }
}
 
// quick tooltips
function hideTemplateTip() {
  $ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}
 
function showTemplateTip(e) {
  $ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
  displayTip(e);
}
 
// add the tooltip calls to the page
function eLink(db, nm) {
  dbs = new Array("http://us.battle.net/wow/de/search?q=", "http://de.wowhead.com/?search=", /*"http://db.mmo-champion.com/search/all/",*/ "http://www.wowdb.com/search?search=");
  dbTs = new Array("Armory", "Wowhead", /*"DB MMO-Champion",*/ "WoWDB");
  dbHs = new Array("ℜ ", "ω ", /*"δ ",*/ "ϖ ");
  el = '<a href="' + dbs[db] + nm + '" target="_blank" title="' + dbTs[db] + '">' + dbHs[db] + '</a>';
  return el;
}
 
function ttBind() {
  $t = $(this);
  $p = $t.parent();
  if ($p.hasClass("selflink") == false) {
    $t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
    if ($p.hasClass("new")) {
      els = '<sup><span class="plainlinks fromWikia">';
      y = ($t.hasClass("itemlink")) ? 0 : 1;
      z = ($t.hasClass("achievementlink")) ? 3 : 3;
      for (x = y; x < z; x++) els += eLink(x, $t.data("tt").replace("Quest:", ""));
      $p.after(els + '</span></sup>');
    }
    if (extDB != "http://de.wow.wikia.com/") {
      fullextURL = extDB + $t.data("tt");
      $p.attr("href", fullextURL);
    }
  }
}
 
// check to see if it is active then do it
function ttMouseOver(foo) {
  if (tooltipsOn && getCookie("wiki-tiploader") != "no") {
    $("#WikiaArticle").mouseover(hideTip);
    $("#WikiaArticle").append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"><div>');
    $tfb = $("#tfb");
    $ttfb = $("#templatetfb");
    $htt = $("#tfb,#templatetfb");
    if (foo == 1) {
      $("#WikiaArticle span.ajaxttlink").each(ttBind);
    }
    $("#WikiaArticle span.tttemplatelink").mouseover(showTemplateTip).mouseout(hideTemplateTip).mousemove(moveTip);
  }
}