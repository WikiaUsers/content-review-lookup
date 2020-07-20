
var tooltips = {
    debug: false,
 
    api: false,
    types: [],
    classes: ['basic-tooltip', 'advanced-tooltip'],
    advancedCounter: 1,
 
    events: [],
    timeouts: [],
 
    // whether to place the tooltip at the bottom / top / left / right of the mouse.
    placement: 'bottom',
    alignment: 'mouse',
    offsetX: 20,
    offsetY: 20,
    waitForImages: false,
 
    init: function() {
        if ($(document.body).hasClass('mw-special-InfoboxBuilder')) return;
        
        // allow use of "?ttdebug=true" in the URL.
        if (location.search.search('ttdebug=true') != -1 || (typeof tooltips_debug != 'undefined' && tooltips_debug)) {
            tooltips.debug = true;
        }
        
        // build up MediaWiki API URL
        var href = $('link[rel="canonical"]').attr('href');
        if (!href) {
            console.log('Tooltips: script couldn\'t find required  link[rel="canonical"]  tag');
            tooltips.disabled = true;
            return false;
        }
        href = href.split('/wiki/');
        tooltips.api = href[0] + '/api.php?format=json&action=parse&disablepp=true&prop=text&title=' + href[1];
        if (mw.util.getParamValue('uselang')) {
            tooltips.api += '&uselang=' + mw.util.getParamValue('uselang');
        }
        tooltips.api += '&text=';
 
        // register the default tooltip types.
        tooltips.types['basic-tooltip'] = {};
        tooltips.types['advanced-tooltip'] = {};
 
        if(!tooltips.config()) {
            console.log('Tooltips: missing config');
            tooltips.disabled = true;
            return false;
        }
 
        var content = $('#WikiaMainContent');
        if (!content.length) content = $('#mw-content-text');
 
        // wrapper is used to allow multiple tooltips to be shown for a single element
        var $wrapper = $('#tooltip-wrapper');
        if ($wrapper.length === 0) {
            $wrapper = $('<div id="tooltip-wrapper" class="WikiaArticle"></div>').appendTo(document.body);
        }
        $wrapper
            .css({'margin':'0px','position':'fixed','height':'auto','min-height':'0','z-index': 6000000})
            .hide();
        
        // storage is used to cache tooltips that have been shown before.
        var $storage = $('#tooltip-storage');
        if ($storage.length === 0) {
            $storage = $('<div id="tooltip-storage" class="WikiaArticle"></div>')
                .css({'position': 'static', 'visibility': 'hidden', 'height': '0px', 'min-height': '0', 'overflow': 'hidden'})
                .appendTo(content);
        }
        
        if (tooltips.debug) {
            $wrapper.css({'background-color':'rgba(255,0,0,0.2)'});
            $storage.css({'visibility': 'visible', 'overflow-y': 'scroll', 'height': '500px','background-color': 'rgba(0, 255, 0, 0.2)'});
            $('<div class="main-tooltip tt-basic-tooltip" id="tooltip-basic-tooltip">Lorem ipsum dolor sit amet</div>')
                .data('type', 'basic-tooltip')
                .appendTo($storage);
        }
 
        tooltips.applyTooltips(document);
 
        mw.hook('wikipage.content').add(function(elem) {
            tooltips.applyTooltips($(elem));
        });
 
        if (_.isString(tooltips.events)) {
            tooltips.events = [tooltips.events];
        }
        
        // allow custom events to initialize tooltips.
        tooltips.events.forEach(function(event) {
            $(window).on(event, function(e, elem) {
                tooltips.applyTooltips(elem || this);
            });
        });

    },
    config: function() {
        if (typeof tooltips_list !== 'undefined' && _.isArray(tooltips_list)) {
            tooltips_list.forEach(function(type) {
                tooltips.addType(type);
            });
        }
        if (typeof tooltips_config === 'object') {
            tooltips.offsetX = tooltips_config.offsetX || tooltips.offsetX;
            tooltips.offsetY = tooltips_config.offsetY || tooltips.offsetY;
            tooltips.waitForImages = (tooltips_config.waitForImages || tooltips.waitForImages) && true;
            tooltips.events = tooltips_config.events || tooltips.events;
        }
 
        return true;
    },
    getType: function(type, defaultValue) {
        if (!type || _.isUndefined(tooltips.types[type])) {
            return defaultValue || null;
        }
        
        return tooltips.types[type];
    },
    addType: function(tt) {
        // convert user configured tooltips to a config object we'll use internally.
        var delay = (_.isString(tt.delay) || _.isNumber(tt.delay)) ? parseInt(tt.delay, 10) : false;
        
        var obj = tooltips.getType(tt.classname);
        if (obj) {
            if (delay) obj.delay = delay;
            if (_.isFunction(tt.onParsed)) obj.onParsed = tt.onParsed;
            if (_.isFunction(tt.onShow)) obj.onShow = tt.onShow;
            if (_.isFunction(tt.onHide)) obj.onHide = tt.onHide;
            tooltips.types[tt.classname] = obj;
            return;
        }
        
        var parse = (_.isString(tt.parse) || _.isFunction(tt.parse)) ? tt.parse : false;
        var text = (_.isString(tt.text) || _.isFunction(tt.text)) ? tt.text : false;

        if (!parse && !text) {
            return;
        }
        
        obj = {
            text: parse || text,
            parse: !!parse,
            parameters: tt.parameters || [], // allow to have parameters while text is a function.
            delay: delay,
            onShow: tt.onShow,
            onHide: tt.onHide,
            async: tt.async || false, // allow text function to be async on opt-in basis
        };
        
        if (obj.parameters.length === 0 && _.isString(obj.text)) {
            obj.parameters = tooltips.getParameters(obj.text);
        }

        tooltips.types[tt.classname] = obj;
        // build up a list of all classes that should spawn a tooltip.
        if (tooltips.classes.indexOf(tt.classname) == -1) {
            tooltips.classes.push(tt.classname);
        }
    },
    applyTooltips: function(elem) {
        // look for tooltips inside the given element.
        var selector = '.' + tooltips.classes.join(', .');
        $(elem).find(selector).each(function() {
            $this = $(this);
            if ($this.hasClass('tooltips-init-complete')) {
                return;
            }
            
            $this.find('*').removeAttr('title');
            $this.on(tooltips.handlers);
 
            $this.data('tooltip-contents', $this.attr('title'));
            $this.removeAttr('title');
 
            // advanced tooltips have the content in the DOM,
            // so we need to clean that up
            tooltips.advancedTooltip($this);
 
            $this.addClass('tooltips-init-complete');
        });
    },
    advancedTooltip: function($elem) {
        if (!$elem.hasClass('advanced-tooltip')) {
            return;
        }
        
        var tips = $elem.find('.tooltip-contents');
        if (!tips.length) {
            return;
        }
        
        // move tooltip content from the tooltip definition to the storage container.
        var innerHtml = tips.contents();
        var tip = $('<div class="main-tooltip tt-advanced-tooltip"></div>')
            .attr('id', 'tooltip-advanced-tooltip-' + tooltips.advancedCounter)
            .data('type', 'advanced-tooltip')
            .append(innerHtml)
            .appendTo('#tooltip-storage')
            .each(tooltips.calcSize);
            
        tips.remove();
        $elem.data('tooltip-id-advanced-tooltip', tooltips.advancedCounter);
        tooltips.advancedCounter++;
    },
   
    getParameters: function(text) {
        // the parameters are identified using the static text, using <#param#> syntax.
        var paramRegex = /<#\s*([a-z0-9_\-]+?)\s*#>/gi;
        var match, matches = [];
        while (match = paramRegex.exec(text)) {
            matches.push(match[1]);
        }
        return matches;
    },
    getAPI: function(text) {
        return tooltips.api + encodeURIComponent(text);
    },
    getText: function(type, elem) {
        var deferred = $.Deferred();
        
        var $elem = $(elem);
        var config = tooltips.types[type];
        
        var parameters = {};
        config.parameters.forEach(function(param) {
            var value = $elem.data(param);
            if (_.isUndefined(value)) {
                value = '';
            }
            parameters[param] = value;
        });
        
        var text = config.text;
        if (_.isFunction(text)) {
            if (config.async) {
                switch (config.text.length) {
                    case 3:
                        config.text($(elem), parameters, deferred.resolve);
                        break;
                    case 2: 
                        config.text($(elem), deferred.resolve);
                        break;
                    default:
                        config.text(deferred.resolve);
                        break;
                }
                return deferred.promise();
            }
            else {
                // by not returning, we can replace parameters inside the 
                // text that has been returned from the function.
                text = config.text($(elem), parameters);
            }
        }
        
        config.parameters.forEach(function(param) {
            var paramRegex = new RegExp('<#\\s*'+ tooltips.escapeRegExp(param) + '\\s*#>', 'g');
            text = text.replace(paramRegex, parameters[param]);
        });
        
        deferred.resolve(text);
        return deferred.promise();
    },
    escapeRegExp: function(text) {
        return text.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
    },
    getTooltip: function(type, elem) {
        // type is the custom classname or one of the default types.
        elem = $(elem);
        
        var tooltipHash = elem.data('tooltip-id-' + type);
        if (tooltipHash) {
            var deferred = $.Deferred();
            deferred.resolve($('#tooltip-' + type + '-' + tooltipHash));
            return deferred.promise();
        }
 
        return tooltips.getText(type, elem)
            .then(function(text) {
                var hash = tooltips.hash(text);
                elem.data('tooltip-id-' + type, hash);
         
                var tip = $('#tooltip-' + type + '-' + tooltipHash);
                if (tip.length) {
                    return tip;
                }
         
                tip = $('<div class="main-tooltip"></div>')
                    .attr('id', 'tooltip-' + type + '-' + hash)
                    .data('type', type)
                    .addClass('tt-' + type)
                    .appendTo('#tooltip-storage');
         
                tooltips.updateTooltip();
         
                if(!tooltips.types[type].parse) {
                    tooltips.updateTooltip(tip.html(text));
                    return tip;
                }
                
                tip.addClass('tooltip-loading');
                var api = tooltips.getAPI(text);
                if (tooltips.debug) {
                    tip.html('<pre style="padding:2px 3px;font-size:11px;">' + api + '</pre>');
                }
                tip.attr('title', api);
                $.ajax({
                    url: api,
                    dataType: 'json',
                    context: tip,
                    success: function(data, textStatus, jqXHR) {
                        var $this = $(this);
                        var parsedHtml = data.parse.text['*'];
                        tooltips.updateTooltip($this.html(parsedHtml));
                        var images = $this.find('img');
                        images.fadeTo(0, 0).one('load', function() {
                            var $img = $(this);
                            if (tooltips.waitForImages) {
                                $img.fadeTo(0,1).addClass('image-loaded');
                                tip = $img.closest('.main-tooltip');
                                if(tip.find('img').length == tip.find('img.image-loaded').length) {
                                    tooltips.updateTooltip(tip.removeClass('tooltip-loading'));
                                }
                            }
                            else {
                                $img.fadeTo(100,1);
                            }
                        });
                        if (!tooltips.waitForImages || 
                            (tooltips.waitForImages && images.length === 0)) {
                            $this.removeClass('tooltip-loading').each(tooltips.calcSize);
                        }
                        var type = $this.data('type') || false;
                        var config = tooltips.getType(type);
                        if (config && _.isFunction(config.onParsed)) {
                            config.onParsed.call($this);
                            tip.each(tooltips.calcSize);
                        }
                        if ($this.find('a.new').length > 0) {
                            $this.addClass('has-redlinks');
                        }
                        tooltips.updateTooltip();
                    }
                });
                return tip;
            });
    },
    getBasicTooltip: function(elem) {
        var deferred = $.Deferred();
        var content = $(elem).data('tooltip-contents').replace(/\\n/g,'<br />');
        deferred.resolve($("#tooltip-basic-tooltip").html(content).each(tooltips.calcSize));
        return deferred.promise();
    },
    getAdvancedTooltip: function(elem) {
        var deferred = $.Deferred();
        deferred.resolve($("#tooltip-advanced-tooltip-" + $(elem).data('tooltip-id-advanced-tooltip')));
        return deferred.promise();
    },
    getTooltips: function(elem) {
        elem = $(elem);
        var classes = elem.attr('class').split(' ');
        
        var promises = [];
        classes.forEach(function(className) {
            var tip = false;
            
            if (className == 'advanced-tooltip') {
                tip = tooltips.getAdvancedTooltip(elem);
            }
            else if (className == 'basic-tooltip') {
                tip = tooltips.getBasicTooltip(elem);
            }
            else {
                var config = tooltips.getType(className);
                if (config) {
                    tip = tooltips.getTooltip(className, elem);
                }
            }
            
            if (tip) {
                promises.push(tip);
            }
        });
        
        return $.when.apply($, promises)
            .then(function() {
                var tips = [];
                for (var i = 0, l = arguments.length; i < l; i++) {
                    var tip = arguments[i];
                    if (tip) {
                        tips.push(tip[0]);
                    }
                }
                return $(tips);
            });
    },
    updateTooltip: function(elem) {
        if (elem && elem.length > 0) {
            elem.each(tooltips.calcSize);
        }
        tooltips.wrapperPosition();
        tooltips.sameWidth();
    },
    setOwnWidth: function() {
        $this = $(this);
        var width = $this.data('width');
        $this.data('width', (width) ? width + 'px' : '');
    },
    calcSize: function() {
        $this = $(this);
        // $this.css('position', 'absolute');
        var temp = $this.css('width');
        var computedStyle = window.getComputedStyle($this[0]);
        $this.css('width', '');
        $this.data('width', parseFloat(computedStyle.width));
        $this.data('height', parseFloat(computedStyle.height));
        $this.data('outerwidth', $this.outerWidth(true));
        $this.data('outerheight', $this.outerHeight(true));
        // $this.css('width', $this.data('width')+'px');
        // $this.css('position', '');
        $this.css('width', temp);
    },
    sameWidth: function() {
        var $mainTooltip = $('#tooltip-wrapper').find('.main-tooltip');
        if($mainTooltip.length == 1) {
            $mainTooltip.each(tooltips.setOwnWidth);
        } else {
            var $this = $(this);
            var width = 0;
            $mainTooltip.each(function() { 
                width = Math.max(width, $this.data('width') || 0);
            });
            $mainTooltip.each(function() {
                $this.css('width', width + 'px');
            });
        }
    },
    wrapperPosition: function($elem, mouseX, mouseY) {
        mouseX = mouseX || tooltips.lastKnownMousePos[0];
        mouseY = mouseY || tooltips.lastKnownMousePos[1];
        
        var type = $elem.data('type');
        var config = tooltips.types[type];
        
        var $wrapper = $('#tooltip-wrapper');
        var $mainTooltip = $wrapper.find('.main-tooltip');
        var $window = $(window);
        
        var wrapperPadding = parseInt($wrapper.css('padding-left'), 10) + parseInt($wrapper.css('padding-right'), 10);
        var tipH = parseInt($wrapper.css('padding-top'), 10) + parseInt($wrapper.css('padding-bottom'), 10);
        var tipW = 0;
 
        $mainTooltip.each(function() {
            var outerHeight = $(this).data('outerheight');
            var outerWidth = $(this).data('outerwidth');
            if (!_.isUndefined(outerHeight)) {
                tipH += outerHeight;
            }
            
            if (!_.isUndefined(outerWidth)) { 
                tipW = Math.max(tipW, outerWidth + wrapperPadding); 
            }
        });
            
        var x = config.offsetX || tooltips.offsetX;
        var y = config.offsetX || tooltips.offsetY;
        var align = config.alignment || tooltips.alignment;
        
        if (align === 'mouse') {
            x += mouseX;
            y += mouseY;
        }
        else {
            x += Math.round($elem.outerWidth(true) / 2);
            y += Math.round($elem.outerHeight(true) / 2);
        }
 
        var toRight = $window.width() - x;
 
        if ($wrapper.css('position') == 'fixed') {
            x -= $window.scrollLeft();
            y -= $window.scrollTop();
            y = Math.min(y, $window.height() - tipH - $('#WikiaBarWrapper').height());
        } else {
            y = Math.min(y, $window.height() - tipH - $('#WikiaBarWrapper').height() + $window.scrollTop());
        }
        if (toRight >= tipW) {
            $wrapper.css({left: x + 'px', top: y + 'px'});
        }
        else {
            $wrapper.css({left: x - tipW - tooltips.offsetX * 2 + 'px', top: y + 'px'});
        }
    },
    show: function($tooltip, handle, config) {
        $tooltip.show();
        if (config.onShow) {
            config.onShow.call($tooltip, handle);
        }
    },
    handlers: {
        mouseover: function(e) {
            tooltips.lastKnownMousePos = [e.pageX, e.pageY];
            tooltips.wrapperPosition($(this), e.pageX, e.pageY);
 
            tooltips.getTooltips(this)
                .then(function(tips) {
                    // add the element's tooltips to the wrapper to become visible to the user.
                    $("#tooltip-wrapper").prepend(tips).show();
                    tooltips.sameWidth();
         
                    var handle = this;
                    tips.each(function() {
                        var $this = $(this);
                        var id = $this.attr('id');
                        var type = $this.data('type') || false;
                        var config = tooltips.getType(type, {});
         
                        if (!config.delay) {
                            return tooltips.show($this, handle, config);
                        }
                        
                        $this.hide();
                        tooltips.timeouts[id] = setTimeout(function() {
                            tooltips.show($this, handle, config);
                        });
                    });
                });
        },
        mouseout: function(e) {
            tooltips.lastKnownMousePos = [e.pageX, e.pageY];
            tooltips.wrapperPosition($(this), e.pageX, e.pageY);
 
            var handle = this;
            var $wrapper = $("#tooltip-wrapper").hide();
            var $mainTooltip = $wrapper.find('.main-tooltip').appendTo('#tooltip-storage');
            
            $mainTooltip.each(function() {
                var $this = $(this);
                var id = $this.attr('id');
                var type = $this.data('type') || false;
                var config = tooltips.getType(type, {});
                
                if (config.onHide) {
                    config.onHide.call($this, handle);
                }
                $this.show();
                clearTimeout(tooltips.timeouts[id]);
                delete tooltips.timeouts[id];
            });
        },
        mousemove: function(e) {
            tooltips.lastKnownMousePos = [e.pageX, e.pageY];
            tooltips.wrapperPosition($(this), e.pageX, e.pageY);
        },
    },
    hash: function(text) {
        /* Source: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/ */
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
// initialize tooltips on document ready
$(tooltips.init);