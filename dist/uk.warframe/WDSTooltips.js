// Source https://dev.fandom.com/wiki/MediaWiki:Tooltips.js

var wds_tooltips = {
    debug: false,
    
    api: false,
    types: [],
    classes: ['wds-basic-tooltip', 'wds-advanced-tooltip'],
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
        if(location.search.search(/ttdebug=(1|[Tt]rue)/) != -1 || (typeof tooltips_debug != 'undefined' && tooltips_debug)) wds_tooltips.debug = true;
        var href = (new mw.Uri($('link[rel="canonical"]').attr('href'))).path;
        if(typeof href == 'undefined' || !href) {
            console.log('Tooltips: script couldn\'t find required  link[rel="canonical"]  tag');
            wds_tooltips.disabled = true;
            return false;
        }
        href = href.split('/wiki/');
        wds_tooltips.api = href[0]+'/api.php?format=json&action=parse&disablelimitreport=true&prop=text&title='+href[1];
        if(mw.util.getParamValue('uselang')) wds_tooltips.api += '&uselang='+mw.util.getParamValue('uselang');
		// Cache tooltip contents on the CDN for 10 minutes for anonymous users
				wds_tooltips.api += '&maxage=600&smaxage=600'
        wds_tooltips.api += '&text=';
        
        wds_tooltips.types['wds-basic-tooltip'] = {};
        wds_tooltips.types['wds-advanced-tooltip'] = {};
        
        if(!wds_tooltips.config()) {
            console.log('Tooltips: missing config');
            wds_tooltips.disabled = true;
            return false;
        }
        var content = $('#WikiaMainContent');
        if(!content.length) content = $('#mw-content-text');
        wds_tooltips.$container = $('#mw-content-text')

        wds_tooltips.align = {
          left:  'wds-is-right-aligned',
          right: 'wds-is-left-aligned',
          top:   'wds-is-flipped'
        };
        
        if(!wds_tooltips.noCSS) {
            var cssImport = importArticle({
                type: 'style',
                article: 'MediaWiki:WDSTooltips.css'
            });
            if (Array.isArray(cssImport)) {
                // MW 1.19
                $(cssImport).prependTo('head');
            } else {
                // UCP
                cssImport.then(function () {
                    var expectedSource = mw.loader.moduleRegistry['MediaWiki:WDSTooltips.css'].style.css[0];
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
        
        if($('#wds-tooltip-storage').length === 0) $('<div id="wds-tooltip-storage" class="WikiaArticle"></div>').append('<div class="main-tooltip tt-wds-basic-tooltip" id="tooltip-wds-basic-tooltip">Lorem ipsum dolor sit amet</div>').appendTo(content);
        $('#wds-tooltip-storage')
            .css({'height':'0px','min-height':'0','visibility':'hidden','overflow':'hidden','position':'static','font-size':'14px'});
            
        
        $('#tooltip-wds-basic-tooltip').data('type', 'wds-basic-tooltip');
        
        wds_tooltips.applyTooltips(document);
        
        mw.hook('wikipage.content').add(function(elem) {
            wds_tooltips.applyTooltips($(elem));
        });
        
        if(typeof wds_tooltips.events == 'string') wds_tooltips.events = [wds_tooltips.events];
        for(var x=0; x<wds_tooltips.events.length; x++) { $(window).on(wds_tooltips.events[x], function(ev, elem) { wds_tooltips.applyTooltips(elem || this); }); }
        
        if(wds_tooltips.debug) {
            $('#wds-tooltip-wrapper').css({'background-color':'rgba(255,0,0,0.2)'});
            $('#wds-tooltip-storage').css({'background-color':'rgba(0,255,0,0.2)','height':'500px','overflow-y':'scroll','visibility':'visible'});
        }
    },
    config: function() {
        if(typeof wds_tooltips_list != 'undefined') {
            $(wds_tooltips_list).each(function(i, v) { wds_tooltips.addType(v) });
        }
        if(typeof wds_tooltips_config == 'object') {
            wds_tooltips.offsetX = wds_tooltips_config.offsetX || wds_tooltips.offsetX;
            wds_tooltips.offsetY = wds_tooltips_config.offsetY || wds_tooltips.offsetY;
            wds_tooltips.waitForImages = (wds_tooltips_config.waitForImages || wds_tooltips.waitForImages) && true;
            wds_tooltips.noCSS = wds_tooltips_config.noCSS || wds_tooltips.noCSS;
            wds_tooltips.events = wds_tooltips_config.events || wds_tooltips.events;
        }
        
        return true;
    },
    applyTooltips: function(elem) {
        $(elem).find('.'+wds_tooltips.classes.join(', .')).each(function() {
            $this = $(this);
            if($this.hasClass('tt-init-complete')) return;
            
            $this.find('*').removeAttr('title');
            $this.append('<div class="wds-dropdown__content" />');
            $this.on('mouseenter focusin', wds_tooltips.handlers.mouseOver);
            $this.mouseleave(wds_tooltips.handlers.mouseOut);
            
            $this.data('tooltip-contents', $(this).attr('title'));
            $this.removeAttr('title');
            
            wds_tooltips.advancedTooltip($this);
            
            $(this).addClass('tt-init-complete');
        });
    },
    advancedTooltip: function(elem) {
        elem = $(elem);
        if(!elem.hasClass('wds-advanced-tooltip')) return;
        var tips = elem.find('.tooltip-contents');
        if(!tips.length) return;
        var tip = $('<div class="main-tooltip tt-wds-advanced-tooltip"></div>').attr('id', 'tooltip-wds-advanced-tooltip-'+wds_tooltips.advancedCounter).appendTo('#wds-tooltip-storage').data('type', 'wds-advanced-tooltip').append($(tips[0]).contents()).each(wds_tooltips.calcSize);
        tips.remove();
        elem.data('tooltip-id-wds-advanced-tooltip', wds_tooltips.advancedCounter);
        wds_tooltips.advancedCounter++;
    },
    addType: function(tt) {
        if(typeof wds_tooltips.types[tt.classname] == 'undefined') {
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
            
            if(typeof obj.text == 'string') obj.parameters = wds_tooltips.getParameters(obj.text); else obj.parameters = [];
            
            if(typeof tt.delay == 'string' || typeof tt.delay == 'number') obj.delay = parseInt(tt.delay); else obj.delay = false;
            if(typeof tt.onParsed == 'function') obj.onParsed = tt.onParsed;
            if(typeof tt.onShow == 'function') obj.onShow = tt.onShow;
            if(typeof tt.onHide == 'function') obj.onHide = tt.onHide;
            
            wds_tooltips.types[tt.classname] = obj;
            if(wds_tooltips.classes.indexOf(tt.classname) == -1) wds_tooltips.classes.push(tt.classname);
        } else {
            if(typeof tt.delay == 'string' || typeof tt.delay == 'number') wds_tooltips.types[tt.classname].delay = parseInt(tt.delay);
            if(typeof tt.onParsed == 'function') wds_tooltips.types[tt.classname].onParsed = tt.onParsed;
            if(typeof tt.onShow == 'function') wds_tooltips.types[tt.classname].onShow = tt.onShow;
            if(typeof tt.onHide == 'function') wds_tooltips.types[tt.classname].onHide = tt.onHide;
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
        return wds_tooltips.api+encodeURIComponent(text);
    },
    getText: function(type, elem) {
        if(typeof wds_tooltips.types[type].text == 'function') {
            var text = wds_tooltips.types[type].text($(elem)[0]);
        } else {
            var text = wds_tooltips.types[type].text;
            for(var x=0; x<wds_tooltips.types[type].parameters.length; x++) {
                var param = wds_tooltips.types[type].parameters[x];
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
        
        var text = wds_tooltips.getText(type, elem);
        var id = wds_tooltips.hash(text);
        elem.data('tooltip-id-'+type, id);
        
        var tip = $('#tooltip-'+type+'-'+elem.data('tooltip-id-'+type));
        if(tip.length) return tip;
        
        tip = $('<div class="main-tooltip"></div>').attr('id', 'tooltip-'+type+'-'+id).appendTo('#wds-tooltip-storage').data('type', type).addClass('tt-'+type);

        if(!wds_tooltips.types[type].parse) {
            tip.html(text).each(wds_tooltips.calcSize);
        } else {
            tip.addClass('tooltip-loading');
            var api = wds_tooltips.getAPI(text);
            if(wds_tooltips.debug) tip.html('<pre style="padding:2px 3px;font-size:11px;">'+api+'</pre>');
            //tip.attr('title', api);
            $.ajax({
                url: api,
                dataType: 'json',
                context: tip,
                success: function(data, textStatus, jqXHR) {
                    $(this).html(data['parse']['text']['*']).each(wds_tooltips.calcSize);
                    
                    var images = $(this).find('img');
                    images.fadeTo(0, 0).one('load', function() {
                        if(wds_tooltips.waitForImages) {
                            $(this).fadeTo(0,1);
                            $(this).addClass('image-loaded');
                            tip = $(this).closest('.main-tooltip');
                            if(tip.find('img').length == tip.find('img.image-loaded').length) {
                                tip.removeClass('tooltip-loading').each(wds_tooltips.calcSize);
                            }
                        } else $(this).fadeTo(100,1);
                    });
                    if(wds_tooltips.waitForImages) {
                        if(images.length === 0) {
                            $(this).removeClass('tooltip-loading').each(wds_tooltips.calcSize);
                        }
                    } else {
                        $(this).removeClass('tooltip-loading').each(wds_tooltips.calcSize);
                    }
                    var type = $(this).data('type') || false;
                    if(type && typeof wds_tooltips.types[type].onParsed == 'function') {
                        wds_tooltips.types[type].onParsed.call(this);
                        tip.each(wds_tooltips.calcSize);
                    }
                    if($(this).find('a.new').length > 0) $(this).addClass('has-redlinks');
                }
            });
        }
        
        return tip;
    },
    getBasicTooltip: function(elem) {
        return $("#tooltip-wds-basic-tooltip").html(mw.html.escape($(elem).data('tooltip-contents')).replace(/\\n/g,'<br />')).each(wds_tooltips.calcSize);
    },
    getAdvancedTooltip: function(elem) {
        return $("#tooltip-wds-advanced-tooltip-"+$(elem).data('tooltip-id-wds-advanced-tooltip'));
    },
    getTooltips: function(elem) {
        elem = $(elem);
        var classes = elem.attr('class').split(' ');
        var tips = [];
        for(var i=0;i<classes.length;i++) {
            var tip = false;
            if(classes[i] == 'wds-advanced-tooltip') tip = wds_tooltips.getAdvancedTooltip(elem);
            else if(classes[i] == 'wds-basic-tooltip') tip = wds_tooltips.getBasicTooltip(elem);
            else if(typeof wds_tooltips.types[classes[i]] != 'undefined') tip = wds_tooltips.getTooltip(classes[i], elem);
            if(tip) tips.push(tip[0]);
        }
        return $(tips);
    },
		boundPosition: function($elem, posX, posY) {
			var tipH = $elem.outerHeight(true),
				tipW = $elem.outerWidth(true),
				scrW = $(window).width(),
				scrH = $(window).height();

			if (tipH + posY > scrH) $elem.parent().addClass(wds_tooltips.align.top);
			else $elem.parent().removeClass(wds_tooltips.align.top);
			
      //fix for short pages
        if(wds_tooltips.$container.height() < $elem.height()) {
            $('#content').css('overflow', 'unset');
            return;
        }
          
        //fix for tooltips clipped inside portable infobox
        var $piData = $elem.parents('.pi-data');
        if ($piData) {
            $piData.css('overflow', 'unset');
        }
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
        $this.css('position', '');
        $this.css('width', 'auto');
    },

    handlers: {
        mouseOver: function(e) {
          var tipBox = $(this).children('.wds-dropdown__content')[0];
          var $elem = $(tipBox);
          var tips = wds_tooltips.getTooltips(this);
          

          $elem.prepend(tips);
          $elem.show( 0, function() { wds_tooltips.boundPosition($elem, e.clientX, e.clientY); });

          var handle = this;
          tips.each(function() {
              var $this = $(this);
              var type = $(this).data('type') || false;
              
              $this.show();
              $(window).trigger('scroll');// trigger image lazy loader
              if(type && typeof wds_tooltips.types[type] != 'undefined' && wds_tooltips.types[type].delay) {
                  $this.hide();
                  wds_tooltips.timeouts[$(this).attr('id')] = setTimeout(function(){
                      $this.show();
                      if(type && typeof wds_tooltips.types[type].onShow == 'function') wds_tooltips.types[type].onShow.call($this[0], handle);
                  }, wds_tooltips.types[type].delay);
              } else if(type && typeof wds_tooltips.types[type].onShow == 'function') wds_tooltips.types[type].onShow.call(this, handle);
          });
        },
        mouseOut: function(e) {
        	$(this).children('.wds-dropdown__content').hide();
          var handle = this;
          $(this).find('.main-tooltip').appendTo('#wds-tooltip-storage').each(function() {
              var type = $(this).data('type') || false;
              if(type && typeof wds_tooltips.types[type].onHide == 'function') wds_tooltips.types[type].onHide.call(this, handle);
              $(this).show();
              clearTimeout(wds_tooltips.timeouts[$(this).attr('id')]);
              delete wds_tooltips.timeouts[$(this).attr('id')];
          });
        }
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
$(wds_tooltips.init);