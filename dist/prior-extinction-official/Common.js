/* Any JavaScript here will be loaded for all users on every page load. */

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
        tooltips.api = href[0]+'/api.php?format=json&action=parse&disablelimitreport=true&prop=text&title='+href[1];
        if(mw.util.getParamValue('uselang')) tooltips.api += '&uselang='+mw.util.getParamValue('uselang');
		// Cache tooltip contents on the CDN for 10 minutes for anonymous users
		tooltips.api += '&maxage=600&smaxage=600'
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
            var cssImport = importArticle({
                type: 'style',
                article: 'u:dev:MediaWiki:Tooltips.css'
            });
            if (Array.isArray(cssImport)) {
                // MW 1.19
                $(cssImport).prependTo('head');
            } else {
                // UCP
                cssImport.then(function () {
                    var expectedSource = mw.loader.moduleRegistry['u:dev:MediaWiki:Tooltips.css'].style.css[0];
                    for (var node = document.querySelector('head > meta[name="ResourceLoaderDynamicStyles"]').previousElementSibling; node.tagName === 'STYLE'; node = node.previousElementSibling) {
                        if (node.textContent === '\n' + expectedSource) {
                            document.head.prepend(node);
                            return;
                        }
                    }
                    throw new Error('WTF? Failed to find RL-inserted style!');
                });
            }
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
        return $("#tooltip-basic-tooltip").html(mw.html.escape($(elem).data('tooltip-contents')).replace(/\\n/g,'<br />')).each(tooltips.calcSize);
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

/* Link Preview */
window.pPreview = $.extend(true, window.pPreview, {
    RegExp: (window.pPreview || {}).RegExp || {},
    defimage: 'https://static.wikia.nocookie.net/prior-extinction-official/images/2/2b/Footprints.png/revision/latest?cb=20221223174119&format=original',
    noimage: 'https://static.wikia.nocookie.net/prior-extinction-official/images/2/2b/Footprints.png/revision/latest?cb=20221223174119&format=original',
    tlen: 1000,
    RegExp: {
        iparents: ['.myclass', '#myid', 'div[data-ignore-me=1]']
    }
});

/* Brings back the user's first edit date */
$(function() {
	if (window.FirstEditDate) return;
	window.FirstEditDate = true;
	
	const c = mw.config.get(['wgScriptPath', 'profileUserId']);
	var i18n;
	if (!c.profileUserId) return;

	function init() {
		$.ajax({
			method: 'get',
			url: c.wgScriptPath + '/wikia.php',
			data: {
				controller: 'UserProfile',
				method: 'getUserData',
				format: 'json',
				userId: c.profileUserId
			}
		}).done(function(r) {
			$('.user-identity-stats')
			.append($('<li>', { id: 'wr', text: i18n.msg('label').plain() + ' ' })
				.append($('<strong>', {
					text: r.userData.registration ? r.userData.registration : i18n.msg('noedit').plain()
				}))
			);
		}).fail(function(e) {
			console.error('FED says an exception:', e);
		});
	}
	
	importArticle({ type: 'script', article: 'u:dev:MediaWiki:i18n-js/code.js' });
	
	mw.hook('dev.i18n').add(function(i18np) {
		i18np.loadMessages('FirstEditDate').done(function(i18np) {
			i18n = i18np;
			i18n.useUserLang();
			var timer = setInterval(function() {
				if ($('#userProfileApp').length) {
					clearInterval(timer);
					init();
				}
			}, 100);
		});
	});
});


/**
 * @version 3.0.0
 */

(function() {
    if (window.Discord && Discord.init) return;

    var ucpOnRailReadyModuleName = mw.loader.getModuleNames().find(function (name) { return name.startsWith('onRailReady-'); });
    var blankImgUrl = mw.config.get('wgBlankImgUrl');
    var canNativelyLazyLoadImages = window.HTMLImageElement.prototype.hasOwnProperty('loading');
    var shouldPolyfillLazyLoadImages = !canNativelyLazyLoadImages && window.hasOwnProperty('IntersectionObserver');
    var extendFrom = window.Discord instanceof Node ? {} : window.Discord;

    var ui;

    window.Discord = $.extend({
        $rail: $('#WikiaRail'),
        // Resource managing
        loaded: 9,
        onload: function(type, arg) {
            switch (type) {
                case 'i18n':
                    arg.loadMessages('Discord').then(this.onload.bind(this, 'lang'));
                    break;
                case 'lang':
                    this.i18n = arg;
                    break;
                case 'api':
                    this.api = new mw.Api();
                    this.getMessages();
                    break;
                case 'dorui':
                    ui = arg;
                    break;
                // case 'messages':
                //     if (this.messages.id) {
                //         this.fetchWidgetData(this.messages.id).done(this.handleWidgetData.bind(this));
                //     } else {
                //         this.onload();
                //     }
                //     break;
            }
            if (--this.loaded) return;
            this.init();
        },
        // Map to cache concurrent widget JSON requests
        requests: {},
        // Get all necessary mw messages to make the script work, with some i18n.msg key defaults
        defaults: {
            // Not needed in case you don't want a rail module but do want element widgets?
            // id: new Error('You have to supply a Discord widget ID! Please edit MediaWiki:Custom-Discord-id'),
            theme: 'auto',
            branding: 'old',
            roles: {}
        },
        messages: {},
        getMessages: function() {
            this.api.get({
                action: 'query',
                list: 'allpages',
                apnamespace: 8,
                apprefix: 'Custom-Discord-',
                aplimit: 'max',
                uselang: 'content', // T97096
                maxage: 300,
                smaxage: 300
            })
            .then(this.onPagesLoaded.bind(this))
            .then(this.handleMessages.bind(this));
        },
        onPagesLoaded: function(data) {
            var first = data.query.allpages[0],
            index = first ? first.title.indexOf(':') + 1 : null,
            allpages = data.query.allpages.map(function(page) {
                return page.title.slice(index);
            });

            return this.api.get({
                action: 'query',
                meta: 'allmessages',
                amlang: mw.config.get('wgUserLanguage'),
                ammessages: allpages.join('|'),
                uselang: 'content', // T97096
                maxage: 300,
                smaxage: 300
            });
        },
        handleMessages: function(data) {
            window.dev = window.dev || {};
            dev.i18n = dev.i18n || {};
            dev.i18n.overrides = dev.i18n.overrides || {};
            dev.i18n.overrides.Discord = dev.i18n.overrides.Discord || {};

            if (data.query) {
                for (var i in data.query.allmessages) {
                    var message = data.query.allmessages[i],
                    title = message.name.slice('Custom-Discord-'.length),
                    content = message['*'];

                    if (message.missing === '') continue;

                    if (title.indexOf('-') != -1) {
                        var split = title.split('-'),
                        key = split.pop();
                        title = split[0];

                        this.messages[title] = this.messages[title] || {};
                        this.messages[title][key] = content;
                    } else {
                        this.messages[title] = this.messages[title] || content;
                        dev.i18n.overrides.Discord[title] = dev.i18n.overrides.Discord[title] || content;
                    }
                    delete this.defaults[title];
                }
            }
            for (var key in this.defaults) {
                var value = this.defaults[key];
                if (!this.messages[key]) {
                    if (value instanceof Error) {
                        console.error(value);
                        return;
                    }
                    this.messages[key] = value;
                }
            }
            this.onload('messages');
        },
        fetchWidgetData: function(id) {
            if (this.requests[id]) return this.requests[id];
            var widgetResource = '/api/guilds/' + id + '/widget.json';
            // If configured, `Discord.apiProxyBaseUrl` would look something like "https://[FQDN]".
            if (window.Discord && Discord.apiProxyBaseUrl && Discord.apiProxyBaseUrl.startsWith('https://')) {
                this.requests[id] = $.ajax(Discord.apiProxyBaseUrl + widgetResource, {
                    dataType: 'json',
                    headers: {
                        // To differentiate between language wikis from the same origin, we'll pass along the wiki's unique ID.
                        // We will not use the referrer header, as it may not be reliably present.
                        'X-City-Id': mw.config.get('wgCityId')
                    }
                }).then(null, function () {
                    // If the configured API proxy endpoint errors out, then fall back to the official API endpoint.
                    return $.getJSON('https://discord.com' + widgetResource);
                });
            } else {
                this.requests[id] = $.getJSON('https://discord.com' + widgetResource);
            }
            return this.requests[id];
        },
        handleWidgetData: function(data) {
            this.railWidgetData = data;
            // this.onload();
            this.addToRail();
        },
        // Called on init to turn the role ID lists into arrays
        mapMessages: function() {
            for (var key in this.messages.roles) {
                var value = this.messages.roles[key];
                // Regex notes:
                //   - Why word boundaries? If editors choose to add usernames to help identify snowflakes, then the chances of a username being just 17+ digits should be pretty low.
                //   - Why no leading zero(es)? Because that's silly.
                //   - Why 17+ digits? Because that's how many digits there'd need to be for snowflakes created after 2015-01-28T14:16:25.791Z (which is about a month after Discord's epoch and a few months before Discord's public launch).
                //   - Why 20- digits? Because that's how many digits it takes to represent the biggest uint64.
                this.messages.roles[key] = value.match(/\b[1-9]\d{16,19}\b/g);
            }
        },
        logo: function(data) {
        	var path = 'm20.6644 20s-0.863-1.0238-1.5822-1.9286c3.1404-0.8809 4.339-2.8333 4.339-2.8333-0.9828 0.6429-1.9178 1.0953-2.7568 1.4048-1.1986 0.5-2.3493 0.8333-3.476 1.0238-2.3014 0.4286-4.411 0.3095-6.2089-0.0238-1.36649-0.2619-2.54114-0.6429-3.52402-1.0238-0.55137-0.2143-1.15069-0.4762-1.75-0.8095-0.07192-0.0477-0.14384-0.0715-0.21575-0.1191-0.04795-0.0238-0.07192-0.0476-0.09589-0.0714-0.43151-0.2381-0.67124-0.4048-0.67124-0.4048s1.15069 1.9048 4.19521 2.8095c-0.71918 0.9048-1.60617 1.9762-1.60617 1.9762-5.29794-0.1667-7.31164-3.619-7.31164-3.619 0-7.6666 3.45205-13.8808 3.45205-13.8808 3.45206-2.5714 6.73635-2.49997 6.73635-2.49997l0.2397 0.285711c-4.31509 1.23808-6.30481 3.11902-6.30481 3.11902s0.52739-0.28572 1.41438-0.69047c2.56507-1.11904 4.60273-1.42856 5.44183-1.49999 0.1438-0.02381 0.2637-0.04762 0.4075-0.04762 1.4623-0.190471 3.1164-0.23809 4.8425-0.04762 2.2773 0.26191 4.7226 0.92857 7.2157 2.2857 0 0-1.8938-1.7857-5.9692-3.02378l0.3356-0.380948s3.2843-0.0714279 6.7363 2.49997c0 0 3.4521 6.21423 3.4521 13.8808 0 0-2.0377 3.4523-7.3356 3.619zm-11.1473-11.1189c-1.36644 0-2.4452 1.19044-2.4452 2.64284s1.10274 2.6428 2.4452 2.6428c1.36648 0 2.44518-1.1904 2.44518-2.6428 0.024-1.4524-1.0787-2.64284-2.44518-2.64284zm8.74998 0c-1.3664 0-2.4452 1.19044-2.4452 2.64284s1.1028 2.6428 2.4452 2.6428c1.3665 0 2.4452-1.1904 2.4452-2.6428s-1.0787-2.64284-2.4452-2.64284z';
        	var viewBox = '0 0 28 20';
        	var branding = data.branding || this.messages.branding;
        	
        	if (branding === 'new') {
        		// svg source from https://discord.com/branding
        		viewBox = '0 0 73 50';
        		path = 'M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z';
        	}
            return ui.svg({
                viewBox: viewBox,
                height: '18',
                width: '18',
                child: ui.path({
                    d: path
                })
            });
        },
        avatar: function(member, ext, size) {
            // For `widget.json`s returned by the API proxy, we have an obfuscated URL that returns a (limited) resizable image.
            if (member.alt_avatar_url) return member.alt_avatar_url + '?size=' + size;
            // For `widget.json`s returned by Discord proper, we have an obfuscated URL that returns a non-resizable image.
            if (!member.avatar) return member.avatar_url;
            // This is a fossil from a bygone era. We no longer expect to hit this case. Someday, these two lines will be lost to the sands of time.
            return 'https://cdn.discordapp.com/avatars/' + member.id + '/' + member.avatar + '.' + ext + '?size=' + size;
        },
        getRandomId: function(prefix, i) {
            var charset = '1234567890abcdef',
            len = charset.length;
            while (i--) {
                prefix += charset[Math.floor(Math.random() * len)];
            }
            return prefix;
        },
        buildWidget: function(data) {
        	var classes = ['discord-widget'];
        	var branding = data.branding || this.messages.branding;
        	if (branding === 'new') {
        		classes.push('new-branding');
        	}

            var widget = ui.frag([
                this.buildTitle(data),
                ui.div({
                    classes: ['discord-widget-container'],
                    id: this.getRandomId('discord-widget-', 64),
                    role: 'complementary',
                    style: data.size || {},
                    child: ui.div({
                        classes: classes,
                        child: ui.div({
                            classes: [
                                'widget',
                                'widget-theme-' + (data.theme || this.messages.theme)
                            ],
                            children: [
                                this.buildHeader(data),
                                this.buildBody(data),
                                this.buildFooter(data)
                            ]
                        })
                    })
                })
            ]);

            if (shouldPolyfillLazyLoadImages) {
                var avatarLazyLoadIntersectionObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.intersectionRatio === 1) {
                            entry.target.src = entry.target.dataset.src; delete entry.target.dataset.src;
                            if (entry.target.dataset.srcset) {
                                entry.target.srcset = entry.target.dataset.srcset; delete entry.target.dataset.srcset;
                            }
                            avatarLazyLoadIntersectionObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    root: widget.querySelector('.widget-body'),
                    rootMargin: '46px 0px',  // TODO: Calculate this as root padding + chip height.
                    threshold: 1
                });
                widget.querySelectorAll('.widget-member-avatar-img').forEach(function (img) {
                    avatarLazyLoadIntersectionObserver.observe(img);
                });
            }
            return widget;
        },
        buildTitle: function(data) {
            return data.header != '0' && ui.div({
                classes: ['title-container'],
                child: ui.h2({
                    classes: ['title', 'has-icon'],
                    children: [
                        this.logo(data),
                        ui.span({
                            html: this.i18n.msg('header', data.name).parse()
                        })
                    ]
                })
            });
        },
        buildHeader: function(data) {
            return ui.div({
                classes: ['widget-header'],
                children: [
                    ui.a({
                        classes: ['widget-logo'],
                        href: 'https://discord.com/?utm_source=Discord%20Widget&utm_medium=Logo',
                        target: '_blank'
                    }),
                    data.members && ui.span({
                        classes: ['widget-header-count'],
                        html: this.i18n.msg('online',
                            data.presence_count || data.members && data.members.length
                        ).parse()
                    })
                ]
            });
        },
        buildBody: function(data) {
            /* TODO: Channels? */
            var roles = data.members
                ? this.groupMemberRoles(data.members)
                : null;

            return ui.div({
                classes: {
                    'widget-body': true,
                    'body-loading': !data.members
                },
                children: data.members
                    ? roles.map(this.buildRoleContainer.bind(this, data))
                    : []
            });
        },
        buildRoleContainer: function(data, role) {
            var name = role[0],
            members = role[1],
            defaultRole = role[2];

            return members.length && ui.div({
                classes: ['widget-role-container'],
                'data-name': name,
                children: [
                    ui.div({
                        classes: ['widget-role-name'],
                        attrs: {
                            'data-name': name,
                            'data-default': defaultRole
                                ? 'true'
                                : false
                        },
                        html: name
                    })
                ].concat(members.map(this.buildUserChip.bind(this, data)))
            });
        },
        buildUserChip: function(data, member) {
            // TODO: GIF avatars
            var avatarAttrs = {
                // TODO: Caculate appropriate ceilings based on effective dimensions of loaded stylesheet(s); for now we're assuming the default of 28. The [docs](https://github.com/discordapp/discord-api-docs/blob/24f892b7de66c102c0c199e41a1bbe8577eddb9f/docs/Reference.md) say this "can be any power of two between 16 and 2048" though empirically other resolutions like 20 also work.
                src: this.avatar(member, 'png', 32)
            };
            // This rephrases predicates from `Discord.avatar`.
            if (member.alt_avatar_url || member.avatar) {
                avatarAttrs.srcset = this.avatar(member, 'png', 64) + ' 2x';
            }

            if (canNativelyLazyLoadImages) {
                avatarAttrs.loading = 'lazy';
            } else if (shouldPolyfillLazyLoadImages) {
                avatarAttrsSrcset = avatarAttrs.srcset;
                avatarAttrs = {
                    'src': blankImgUrl,
                    'data-src': avatarAttrs.src
                };

                if (avatarAttrsSrcset) {
                    avatarAttrs['data-srcset'] = avatarAttrsSrcset;
                }
            }

            return ui.div({
                classes: ['widget-member'],
                children: [
                    ui.div({
                        classes: ['widget-member-avatar'],
                        children: [
                            ui.img({
                                classes: ['widget-member-avatar-img'],
                                attrs: avatarAttrs
                            }),
                            ui.span({
                                classes: [
                                    'widget-member-status',
                                    'widget-member-status-' + member.status
                                ]
                            })
                        ]
                    }),
                    ui.span({
                        classes: ['widget-member-name'],
                        text: member.nick || member.username
                    })
                ],
                events: {
                    click: this.showMemberModal.bind(this, data, member)
                }
            });
        },
        buildFooter: function(data) {
            var invite = data.invite || this.messages.invite || data.instant_invite
            var footer = this.messages.guidelines || this.messages.footer;

            return ui.div({
                classes: ['widget-footer'],
                children: [
                    footer && ui.span({
                        classes: ['widget-footer-info'],
                        html: this.i18n.msg('footer', this.messages.guidelines).parse()
                    }),
                    invite && ui.a({
                        classes: ['widget-btn-connect'],
                        href: invite,
                        target: '_blank',
                        html: this.i18n.msg('join').parse()
                    })
                ]
            });
        },
        // Returns Array<[role, members[]]> because objects aren't required to keep assignment order, and maps are horrifying to use
        groupMemberRoles: function(members) {
            var grouped = [],
            indices = {},
            defaultRole = this.i18n.msg('users').plain(),
            roles = Object.keys(this.messages.roles);

            members.sort(function(a, b) {
                return (a.nick || a.username).localeCompare(b.nick || b.username);
            });

            if (this.messages.order) {
                var order = this.messages.order.split(',').map(function(name) {
                    return name.trim();
                });

                roles.sort(function(a, b) {
                    var aIndex = order.indexOf(a);
                    if (aIndex == -1) return 1;
                    var bIndex = order.indexOf(b);
                    if (bIndex == -1) return -1;
                    return aIndex - bIndex;
                });
            }

            for (var i in roles) {
                var role = roles[i];
                indices[role] = grouped.push([ role, [] ]) - 1;
            }
            indices[defaultRole] = grouped.push([ defaultRole, [], true ]) - 1;

            for (var i in members) {
                var member = members[i],
                assigned = false;

                for (var role in this.messages.roles) {
                    var ids = this.messages.roles[role];
                    if (ids && ids.includes(member.id)) {
                        grouped[indices[role]][1].push(member);
                        // I could technically use named loops and break with that, but that's just ew
                        assigned = true;
                        break;
                    }
                }

                if (!assigned) {
                    grouped[indices[defaultRole]][1].push(member);
                }
            }

            return grouped;
        },
        showMemberModal: function(data, member) {
            var game = member.game || {};
            dev.showCustomModal(mw.html.escape(member.nick || member.username),
                ui.div({
                    classes: ['discord-member-modal-content'],
                    children: [
                        ui.div({
                            classes: ['avatar-container', 'loading'],
                            child: ui.a({
                                classes: ['avatar-link'],
                                href: this.avatar(member, 'png', 2048),
                                target: '_blank',
                                child: ui.img({
                                    classes: ['avatar'],
                                    src: this.avatar(member, 'png', 256),
                                    events: {
                                        load: function() {
                                            this.parentElement.parentElement.classList.remove('loading');
                                        }
                                    }
                                })
                            })
                        }),
                        ui.div({
                            classes: ['details'],
                            children: [
                                // Why 17+ digits? Because that's how many digits there'd need to be for snowflakes created after 2015-01-28T14:16:25.791Z (which is about a month after its epoch and a few months before its public launch).
                                // The remaining anonymized users will get faux IDs starting at zero.
                                // Guilds have a default max presence count of 5000, so we usually won't be returning more than that many members.
                                // Even _if_ we're serving for a guild with a bumped max presence count, it's unlikely we'll be returning 10,000,000,000,000,000 (ten quadrillion) members such that the faux IDs would collide with genuine snowflakes (that we support).
                                member.id.length >= 17 && ui.div({
                                    classes: ['username'],
                                    children: [
                                        ui.span({
                                            classes: ['name'],
                                            text: member.username
                                        }),
                                        ui.span({
                                            classes: ['discriminator'],
                                            text: '#' + member.discriminator
                                        })
                                    ]
                                }),
                                game.name && ui.div({
                                    classes: ['playing'],
                                    html: this.i18n.msg(
                                        game.name == 'Spotify'
                                            ? 'listening'
                                            : 'playing',
                                        game.name
                                    ).parse()
                                })
                            ]
                        })
                    ]
                }),
                {
                    id: 'discord-member-modal',
                    width: 'invalid so that the CSS can take over lol',
                    className: 'discord-member-modal-theme-' + (data.theme || this.messages.theme)
                }
            );
        },
        addToRail: function() {
            if (this.$rail.length === 0) return;

            $('.discord-module').remove();

            if (!this.railWidgetData) {
                this.fetchWidgetData(this.messages.id).then(this.handleWidgetData.bind(this));
            }

            var widget = this.buildWidget(this.railWidgetData || {}),
            railModule = ui.section({
                classes: ['rail-module', 'discord-module'],
                'data-widget-state': 'loading',
                child: widget
            }),
            $ads = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last(),
            $jsrt = $('.content-review-module');

            if ($ads.length !== 0) {
                $ads.after(railModule);
            } else if ($jsrt.length !== 0) {
                $jsrt.after(railModule);
            } else {
                this.$rail.prepend(railModule);
            }

            this.onRenderedWidget(railModule);
            mw.hook('Discord.widget.rail').fire(railModule);
        },
        replaceWidget: function(_, elem) {
            elem.dataset.widgetState = 'loading';
            var id = elem.getAttribute('data-id') || this.messages.id,
            theme = elem.getAttribute('data-theme') || this.messages.theme,
            branding = elem.getAttribute('data-branding') || this.messages.branding,
            // TODO: Make adaptive chip orientation based on width and how many avatars can fit in a row
            width = elem.getAttribute('data-width'),
            height = elem.getAttribute('data-height'),
            invite = elem.getAttribute('data-invite'),
            header = elem.getAttribute('data-header');
            if (!id) return;
            this.fetchWidgetData(id).then(function(data) {
            	data.branding = branding;
                data.theme = theme;
                data.size = {};
                if (width) {
                    data.size.width = width;
                }
                if (height) {
                    data.size.height = height;
                }
                if (invite) {
                    data.invite = invite;
                } else {
                    data.invite = data.instant_invite;
                }
                if (header) {
                    data.header = header;
                }
                var widget = this.buildWidget(data);
                $(elem).empty().append(widget);

                this.onRenderedWidget(elem);
            }.bind(this));
        },
        onRenderedWidget: function(widget) {
            var container = widget.querySelector('.discord-widget-container'),
            discord = container.querySelector('.discord-widget'),
            body = discord.querySelector('.widget-body'),
            largest = Array.from(body.children).sort(this.sortRoleContainers.bind(this))[0];
            if (!largest) return;

            var members = largest.querySelectorAll('.widget-member'),
            initial = members[0].offsetTop,
            count = 0;

            for (var i = 0; i < members.length; i++) {
                if (members[i].offsetTop > initial) break;
                count++;
            }

            discord.classList.add('resolved-columns');

            this.addCSS(this.createNameDirectionStyles(count, container.id));

            widget.dataset.widgetState = 'loaded';
            mw.hook('Discord.widget').fire(widget);
        },
        sortRoleContainers: function(a, b) {
            return b.children.length - a.children.length;
        },
        addCSS: function(styles) {
            mw.util.addCSS(styles);
        },
        createNameDirectionStyles: function(count, id) {
            var half = Math.floor(count / 2),
            i = half,
            selectors = [];

            while (i--) {
                selectors.push(this.createDirectionSelector(count, id, i - half + 2));
            }

            return selectors.join(',\n') + '{\n\tpadding: 0 32px 0 8px;\n\tright: 4px;\n}';
        },
        createDirectionSelector: function(count, id, half) {
            var n = half == 0
                ? ''
                : half > 0
                    ? '+' + half
                    : '-' + Math.abs(half);
            return '#' + id + ' .widget-member:nth-child(' + count + 'n' + n + ') .widget-member-name';
        },
        replaceWidgets: function($container) {
            $container.find('.DiscordWidget:not([data-widget-state])').each(this.replaceWidget.bind(this));
        },
        getHeight: function(elem) {
            var style = getComputedStyle(elem);
            return elem.clientHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
        },
        reflow: function(elem, columns, force) {
            if (this.reflowing) {
                this.reflowing = false;
                if (!force) {
                    return;
                }
            }
            this.reflowing = true;

            var full = 0,
            sum = 0,
            overhead = 5,
            children = elem.children,
            i = children.length;

            elem.style.maxHeight = '';

            if (innerWidth > 1023) return;

            while (i--) {
                full += this.getHeight(children[i]);
            }

            var partition = full / columns;

            for (var i = 0; i < children.length; i++) {
                sum += this.getHeight(children[i]);
                if (sum > partition) {
                    break;
                }
            }

            elem.style.maxHeight = (sum + overhead) + 'px';
        },
        patchStupidRail: function() {
            if (this.$rail.length === 0 || !window.MutationObserver || navigator.maxTouchPoints === 0) return;

            var rail = this.$rail.get(0);

            rail.parentElement.style.columnCount = 'auto';

            rail.style.display = 'flex';
            rail.style.flexDirection = 'column';
            rail.style.flexWrap = 'wrap';

            this.reflow(rail, 2, true);

            new MutationObserver(this.reflow.bind(this, rail, 2, false))
                .observe(rail, {
                    childList: true,
                    subtree: true,
                    attributes: true
                });
        },
        init: function() {
            this.mapMessages();

            if (this.messages.id) {
                this.addToRail();
            }

            this.replaceWidgets(mw.util.$content);
            mw.hook('wikipage.content').add(this.replaceWidgets.bind(this));

            this.patchStupidRail();
        }
    }, extendFrom);

    // Resources and hooks
    if (
        Discord.$rail.length === 0 ||      // There _is_ no rail, probably because we're on the main page.
        Discord.$rail.hasClass('is-ready')
    ) {
        Discord.onload();
    } else {
        if (ucpOnRailReadyModuleName != null) {
            mw.loader.using(ucpOnRailReadyModuleName, function(require) {
                require(ucpOnRailReadyModuleName).onRailReady(Discord.onload.bind(Discord));
            });
        } else {
            Discord.$rail.on('afterLoad.rail', Discord.onload.bind(Discord));
        }
    }

    mw.hook('dev.i18n').add(Discord.onload.bind(Discord, 'i18n'));
    mw.hook('dev.showCustomModal').add(Discord.onload.bind(Discord, 'showCustomModal'));
    mw.hook('doru.ui').add(Discord.onload.bind(Discord, 'dorui'));
    mw.loader.using('mediawiki.api').then(Discord.onload.bind(Discord, 'api'));
    mw.loader.using('mediawiki.util').then(Discord.onload.bind(Discord));

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Dorui.js',
            'u:dev:MediaWiki:ShowCustomModal.js',
        ]
    });

    var style = importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:Discord.css'
    })[0];

    if (style) {
        style.onload = Discord.onload.bind(Discord);
    } else {
        Discord.onload();
    }
})();