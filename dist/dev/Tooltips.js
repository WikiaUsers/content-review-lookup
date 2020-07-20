var tooltips = {
    debug: false,
    
    api: false,
    types: [],
    classes: ['basic-tooltip', 'advanced-tooltip'],
    advancedCounter: 1,
    
    events: [],
    timeouts: [],
    
    offsetX: 20,
    offsetY: 20,
    waitForImages: false,
    noCSS: false,
    
    flip: false,
    
    init: function() {
        if($(document.body).hasClass('mw-special-InfoboxBuilder')) return;
        if(location.search.search(/ttdebug=(1|[Tt]rue)/) != -1 || (typeof tooltips_debug != 'undefined' && tooltips_debug)) tooltips.debug = true;
        var href = (new mw.Uri($('link[rel="canonical"]').attr('href'))).path;
        if(typeof href == 'undefined' || !href) {
            console.log('Tooltips: script couldn\'t find required  link[rel="canonical"]  tag');
            tooltips.disabled = true;
            return false;
        }
        href = href.split('/wiki/');
        tooltips.api = href[0]+'/api.php?format=json&action=parse&disablepp=true&prop=text&title='+href[1];
        if(mw.util.getParamValue('uselang')) tooltips.api += '&uselang='+mw.util.getParamValue('uselang');
        tooltips.api += '&text=';
        
        tooltips.types['basic-tooltip'] = {};
        tooltips.types['advanced-tooltip'] = {};
        
        if(!tooltips.config()) {
            console.log('Tooltips: missing config');
            tooltips.disabled = true;
            return false;
        }
        
        var content = $('#WikiaMainContent');
        if(!content.length) content = $('#mw-content-text');
        
        if(!tooltips.noCSS) {
            $(importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:Tooltips.css'
            })).prependTo('head');
        }
        
        if($('#tooltip-wrapper').length === 0) $('<div id="tooltip-wrapper" class="WikiaArticle"></div>').appendTo(document.body);
        if($('#tooltip-storage').length === 0) $('<div id="tooltip-storage" class="WikiaArticle"></div>').append('<div class="main-tooltip tt-basic-tooltip" id="tooltip-basic-tooltip">Lorem ipsum dolor sit amet</div>').appendTo(content);
        
        $('#tooltip-wrapper')
            .css({'margin':'0px','position':'fixed','height':'auto','min-height':'0','z-index': 6000000,'font-size':'14px'})
            .hide();
        
        $('#tooltip-storage')
            .css({'height':'0px','min-height':'0','visibility':'hidden','overflow':'hidden','position':'static','font-size':'14px'});
            
        
        $('#tooltip-basic-tooltip').data('type', 'basic-tooltip');
        
        tooltips.applyTooltips(document);
        
        mw.hook('wikipage.content').add(function(elem) {
            tooltips.applyTooltips($(elem));
        });
        
        if(typeof tooltips.events == 'string') tooltips.events = [tooltips.events];
        for(var x=0; x<tooltips.events.length; x++) { $(window).on(tooltips.events[x], function(ev, elem) { tooltips.applyTooltips(elem || this) }) }
        
        if(tooltips.debug) {
            $('#tooltip-wrapper').css({'background-color':'rgba(255,0,0,0.2)'});
            $('#tooltip-storage').css({'background-color':'rgba(0,255,0,0.2)','height':'500px','overflow-y':'scroll','visibility':'visible'});
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
            tooltips.noCSS = tooltips_config.noCSS || tooltips.noCSS;
            tooltips.events = tooltips_config.events || tooltips.events;
        }
        
        return true;
    },
    applyTooltips: function(elem) {
        $(elem).find('.'+tooltips.classes.join(', .')).each(function() {
            $this = $(this);
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
        elem = $(elem);
        if(!elem.hasClass('advanced-tooltip')) return;
        var tips = elem.find('.tooltip-contents');
        if(!tips.length) return;
        var tip = $('<div class="main-tooltip tt-advanced-tooltip"></div>').attr('id', 'tooltip-advanced-tooltip-'+tooltips.advancedCounter).appendTo('#tooltip-storage').data('type', 'advanced-tooltip').append($(tips[0]).contents()).each(tooltips.calcSize);
        tips.remove();
        elem.data('tooltip-id-advanced-tooltip', tooltips.advancedCounter);
        tooltips.advancedCounter++;
    },
    addType: function(tt) {
        if(typeof tooltips.types[tt.classname] == 'undefined') {
            var obj = {};
            
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
            if(tooltips.classes.indexOf(tt.classname) == -1) tooltips.classes.push(tt.classname);
        } else {
            if(typeof tt.delay == 'string' || typeof tt.delay == 'number') tooltips.types[tt.classname].delay = parseInt(tt.delay);
            if(typeof tt.onParsed == 'function') tooltips.types[tt.classname].onParsed = tt.onParsed;
            if(typeof tt.onShow == 'function') tooltips.types[tt.classname].onShow = tt.onShow;
            if(typeof tt.onHide == 'function') tooltips.types[tt.classname].onHide = tt.onHide;
        }
    },
    getParameters: function(text) {
        var list = [];
        var matches = text.match(/<#\s*[a-z0-9_\-]+?\s*#>/gi);
        if(matches) {
            for(var x=0; x<matches.length; x++) {
                list.push(/<#\s*([a-z0-9_\-]+?)\s*#>/i.exec(matches[x])[1]);
            }
        }
        return list;
    },
    getAPI: function(text) {
        return tooltips.api+encodeURIComponent(text);
    },
    getText: function(type, elem) {
        if(typeof tooltips.types[type].text == 'function') {
            var text = tooltips.types[type].text($(elem)[0]);
        } else {
            var text = tooltips.types[type].text;
            for(var x=0; x<tooltips.types[type].parameters.length; x++) {
                var param = tooltips.types[type].parameters[x];
                var value = $(elem).data(param);
                if(typeof value == 'undefined') value = '';
                var rx = new RegExp('<#\\s*'+param.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")+'\\s*#>', 'g');
                text = text.replace(rx, value);
            }
        }
        return text;
    },
    getTooltip: function(type, elem) {
        elem = $(elem);
        if(elem.data('tooltip-id-'+type)) return $('#tooltip-'+type+'-'+elem.data('tooltip-id-'+type));
        
        var text = tooltips.getText(type, elem);
        var id = tooltips.hash(text);
        elem.data('tooltip-id-'+type, id);
        
        var tip = $('#tooltip-'+type+'-'+elem.data('tooltip-id-'+type));
        if(tip.length) return tip;
        
        tip = $('<div class="main-tooltip"></div>').attr('id', 'tooltip-'+type+'-'+id).appendTo('#tooltip-storage').data('type', type).addClass('tt-'+type);
        
        tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1]);
        tooltips.sameWidth();
        
        if(!tooltips.types[type].parse) {
            tip.html(text).each(tooltips.calcSize);
            tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1]);
            tooltips.sameWidth();
        } else {
            tip.addClass('tooltip-loading');
            var api = tooltips.getAPI(text);
            if(tooltips.debug) tip.html('<pre style="padding:2px 3px;font-size:11px;">'+api+'</pre>');
            tip.attr('title', api);
            $.ajax({
                url: api,
                dataType: 'json',
                context: tip,
                success: function(data, textStatus, jqXHR) {
                    $(this).html(data['parse']['text']['*']).each(tooltips.calcSize);
                    tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1]);
                    tooltips.sameWidth();
                    var images = $(this).find('img');
                    images.fadeTo(0, 0).one('load', function() {
                        if(tooltips.waitForImages) {
                            $(this).fadeTo(0,1);
                            $(this).addClass('image-loaded');
                            tip = $(this).closest('.main-tooltip');
                            if(tip.find('img').length == tip.find('img.image-loaded').length) {
                                tip.removeClass('tooltip-loading').each(tooltips.calcSize);
                                tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1]);
                                tooltips.sameWidth();
                            }
                        } else $(this).fadeTo(100,1);
                    });
                    if(tooltips.waitForImages) {
                        if(images.length === 0) {
                            $(this).removeClass('tooltip-loading').each(tooltips.calcSize);
                        }
                    } else {
                        $(this).removeClass('tooltip-loading').each(tooltips.calcSize);
                    }
                    var type = $(this).data('type') || false;
                    if(type && typeof tooltips.types[type].onParsed == 'function') {
                        tooltips.types[type].onParsed.call(this);
                        tip.each(tooltips.calcSize);
                    }
                    if($(this).find('a.new').length > 0) $(this).addClass('has-redlinks');
                    tooltips.wrapperPosition(tooltips.lastKnownMousePos[0], tooltips.lastKnownMousePos[1]);
                    tooltips.sameWidth();
                }
            });
        }
        return tip;
    },
    getBasicTooltip: function(elem) {
        return $("#tooltip-basic-tooltip").html($(elem).data('tooltip-contents').replace(/\\n/g,'<br />')).each(tooltips.calcSize);
    },
    getAdvancedTooltip: function(elem) {
        return $("#tooltip-advanced-tooltip-"+$(elem).data('tooltip-id-advanced-tooltip'));
    },
    getTooltips: function(elem) {
        elem = $(elem);
        var classes = elem.attr('class').split(' ');
        var tips = [];
        for(var i=0;i<classes.length;i++) {
            var tip = false;
            if(classes[i] == 'advanced-tooltip') tip = tooltips.getAdvancedTooltip(elem);
            else if(classes[i] == 'basic-tooltip') tip = tooltips.getBasicTooltip(elem);
            else if(typeof tooltips.types[classes[i]] != 'undefined') tip = tooltips.getTooltip(classes[i], elem);
            if(tip) tips.push(tip[0]);
        }
        return $(tips);
    },
    setOwnWidth: function() {
        $this = $(this);
        if(typeof $this.data('width') != 'undefined') $this.css('width', $this.data('width')+'px');
        else $this.css('width', '');
    },
    calcSize: function() {
        $this = $(this);
        $this.css('position', 'absolute');
        var temp = $this.css('width');
        $this.css('width', '');
        $this.data('width', parseFloat(window.getComputedStyle($this[0]).width));
        $this.data('height', parseFloat(window.getComputedStyle($this[0]).height));
        $this.data('outerwidth', $this.outerWidth(true));
        $this.data('outerheight', $this.outerHeight(true));
        $this.css('width', $this.data('width')+'px');
        $this.css('position', '');
        $this.css('width', temp);
    },
    sameWidth: function() {
        if($("#tooltip-wrapper").find('.main-tooltip').length == 1) {
            $("#tooltip-wrapper").find('.main-tooltip').each(tooltips.setOwnWidth);
        } else {
            var width = 0;
            $("#tooltip-wrapper").find('.main-tooltip').each(function() { width = Math.max(width, $(this).data('width') || 0); });
            $("#tooltip-wrapper").find('.main-tooltip').each(function() { $(this).css('width', width+'px'); });
        }
    },
    wrapperPosition: function(mouseX, mouseY) {
        var tipH = parseInt($("#tooltip-wrapper").css('padding-top')) + parseInt($("#tooltip-wrapper").css('padding-bottom'));
        var tipW = 0;
        var barH = $('#WikiaBarWrapper').height();
       
        $("#tooltip-wrapper").find('.main-tooltip').each( function(){ if(typeof $(this).data('outerheight') != 'undefined') tipH += $(this).data('outerheight'); });
        $("#tooltip-wrapper").find('.main-tooltip').each( function(){ if(typeof $(this).data('outerwidth') != 'undefined') tipW = Math.max(tipW, $(this).data('outerwidth') + parseInt($("#tooltip-wrapper").css('padding-left')) + parseInt($("#tooltip-wrapper").css('padding-right'))); });
        
        var spaceTop = mouseY - tooltips.offsetY;
        var spaceLeft = mouseX - tooltips.offsetX;
        var spaceRight = $(window).width() - mouseX - tooltips.offsetX;
        var spaceBottom = $(window).height() - barH - mouseY - tooltips.offsetY;
        
        var coordX = mouseX + tooltips.offsetX;
        var coordY = mouseY + tooltips.offsetY;
        
        if(spaceRight < tipW && spaceBottom < tipH) {
            if(spaceLeft >= tipW && tooltips.flip != 'h') {
                coordX = mouseX - tipW - tooltips.offsetX;
                tooltips.flip = 'v';
            } else if(spaceTop >= tipH) {
                coordY = mouseY - tipH - tooltips.offsetY;
                tooltips.flip = 'h';
            } else {
                coordX = mouseX - tipW - tooltips.offsetX;
                coordY = mouseY - tipH - tooltips.offsetY;
                tooltips.flip = 'vh';
            }
        } else {
            tooltips.flip = false;
        }
        if ($("#tooltip-wrapper").css('position') == 'fixed') {
            coordX = coordX-$(window).scrollLeft();
            coordY = coordY-$(window).scrollTop();
            
            coordX = Math.min(coordX, $(window).width() - tipW);
            coordY = Math.min(coordY, $(window).height() - tipH - barH);
        } else {
            coordX = Math.min(coordX, $(window).width() - tipW);
            coordY = Math.min(coordY, $(window).height() - tipH - barH + $(window).scrollTop());
        }
        $("#tooltip-wrapper").css({left: coordX + 'px', top: coordY + 'px'});
    },
    handlers: {
        mouseOver: function(e) {
            tooltips.lastKnownMousePos = [e.pageX, e.pageY];
            tooltips.wrapperPosition(e.pageX, e.pageY);
            
            var tips = tooltips.getTooltips(this);
            $("#tooltip-wrapper").prepend(tips).show();
            tooltips.sameWidth();
            
            var handle = this;
            tips.each(function() {
                var $this = $(this);
                var type = $(this).data('type') || false;
                
                $this.show();
                $(window).trigger('scroll');// trigger image lazy loader
                if(type && typeof tooltips.types[type] != 'undefined' && tooltips.types[type].delay) {
                    $this.hide();
                    tooltips.timeouts[$(this).attr('id')] = setTimeout(function(){
                        $this.show();
                        if(type && typeof tooltips.types[type].onShow == 'function') tooltips.types[type].onShow.call($this[0], handle);
                    }, tooltips.types[type].delay);
                } else if(type && typeof tooltips.types[type].onShow == 'function') tooltips.types[type].onShow.call(this, handle);
            });
        },
        mouseOut: function(e) {
            tooltips.lastKnownMousePos = [e.pageX, e.pageY];
            tooltips.wrapperPosition(e.pageX, e.pageY);
            
            var handle = this;
            $("#tooltip-wrapper").hide();
            $("#tooltip-wrapper").find('.main-tooltip').appendTo('#tooltip-storage').each(function() {
                var type = $(this).data('type') || false;
                if(type && typeof tooltips.types[type].onHide == 'function') tooltips.types[type].onHide.call(this, handle);
                $(this).show();
                clearTimeout(tooltips.timeouts[$(this).attr('id')]);
                delete tooltips.timeouts[$(this).attr('id')];
            });
        },
        mouseMove: function(e) {
            tooltips.lastKnownMousePos = [e.pageX, e.pageY];
            tooltips.wrapperPosition(e.pageX, e.pageY);
        },
    },
    hash: function(text) {
        /* Source: https://archive.is/nq2F9 */
        var hash = 0, i, char;
        if (text.length === 0) return hash;
        for (i = 0, l = text.length; i < l; i++) {
            char  = text.charCodeAt(i);
            hash  = ((hash<<5)-hash)+char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    },
};
$(tooltips.init);