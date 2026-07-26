/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/* ========== 1. Исправление для отображения .webm в галереях ========== */
$(function() {
    'use strict';
    
    function processWebmAsGif() {
        $('video').each(function() {
            var video = this;
            if (video.classList.contains('webm-gif-processed')) return;
            var src = video.src || (video.querySelector('source') ? video.querySelector('source').src : '');
            if (src && src.indexOf('.webm') > -1) {
                video.controls = false;
                video.loop = true;
                video.muted = true;
                video.preload = 'auto';
                function tryPlay() {
                    var playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(function() {
                            $(document).one('click touchstart', function() {
                                video.play();
                            });
                        });
                    }
                }
                tryPlay();
                video.addEventListener('loadedmetadata', function() { video.controls = false; });
                video.addEventListener('play', function() { video.controls = false; });
                video.addEventListener('pause', function() {
                    if (!video.ended) { video.play(); }
                });
                video.classList.add('webm-gif-processed');
            }
        });
    }
    
    processWebmAsGif();
    var observer = new MutationObserver(function() { processWebmAsGif(); });
    observer.observe(document.body, { childList: true, subtree: true });
    $(window).on('hashchange', function() { setTimeout(processWebmAsGif, 100); });
});

/* ========== 2. Переключение +/− для кастомных кнопок шаблона Names ========== */
$(function() {
    $('.names-toggle').on('click', function() {
        var $this = $(this);
        var targetId = $this.attr('id').replace('toggle-', '');
        var $target = $('#mw-customcollapsible-' + targetId);
        if ($target.hasClass('mw-collapsed')) {
            $this.text('[−]');
        } else {
            $this.text('[+]');
        }
    });
});

/* ========== 3. СИСТЕМА ТУЛТИПОВ ========== */
window.tooltips_list = [
	{
		classname: 'item-tooltip',
		parse: '{' + '{Template:Item tip|1=<#name#>|2=<#title#>|3=<#tier#>|4=<#use#>|5=<#desc#>|6=<#obtain#>|7=<#firstdrop#>|8=<#regdrop#>|9=<#specdrop#>|10=<#base#>|11=<#cond#>}}',
	},  {
		classname: 'enemy-tooltip',
		parse: '{' + '{Template:Enemy tip|1=<#name#>|2=<#title#>|3=<#code#>|4=<#race#>|5=<#type#>}}',
	},  {
		classname: 'character-tooltip',
		parse: '{' + '{Template:Character tip|1=<#name#>|2=<#title#>|3=<#class#>|4=<#branch#>|5=<#star#>|6=<#faction#>}}',
	},	{
		classname: 'collectible-tooltip',
		parse: '{' + '{Template:Collectible tip|1=<#name#>|2=<#title#>|3=<#num#>|4=<#qlt#>|5=<#use#>|6=<#desc#>|7=<#theme#>|8=<#cond#>}}',
	},	{
		classname: 'furniture-tooltip',
		parse: '{' + '{Template:Furniture tip|1=<#name#>|2=<#title#>|3=<#use#>|4=<#desc#>|5=<#ambience#>|6=<#cat#>|7=<#theme#>|8=<#set#>|9=<#obtain#>|10=<#firstdrop#>|11=<#regdrop#>}}',
	},	{
		classname: 'outfit-tooltip',
		parse: '{' + '{Template:Outfit tip|1=<#name#>|2=<#model#>|3=<#num#>|4=<#artist#>|5=<#use#>|6=<#quote#>|7=<#series#>|8=<#desc#>|9=<#obtain#>|10=<#title#>}}',
	},	{
		classname: 'glossary',
		parse: '{' + '{Template:Glossary tip|1=<#name#>|2=<#title#>|3=<#desc#>}}',
	},	{
		classname: 'profile-picture-tooltip',
		parse: '{' + '{Template:Profile picture tip|1=<#name#>|2=<#title#>|3=<#desc#>|4=<#obtain#>}}',
	}
];

// Движок тултипов (с wiki.gg)
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

    init: function() {
        if ( location.search.search( /ttdebug=(1|[Tt]rue)/ ) != -1 || ( typeof tooltips_debug != 'undefined' && tooltips_debug ) )
            tooltips.debug = true;

        const wgPageName = mw.config.get( 'wgPageName' ),
            wgServer = mw.config.get( 'wgServer' );
        if ( !wgPageName ) {
            tooltips.disabled = true;
            return false;
        }
        
        tooltips.api = new URL( mw.util.wikiScript( 'api' ), wgServer );
        tooltips.api.search = new URLSearchParams( {
            format: 'json',
            action: 'parse',
            disablelimitreport: 'true',
            prop: 'text',
            title: wgPageName,
            maxage: 60 * 60 * 24 * 1,
            smaxage: 60 * 60 * 24 * 30,
        } ).toString();
        if ( mw.util.getParamValue( 'uselang' ) ) {
            tooltips.api.searchParams.set( 'uselang', mw.util.getParamValue( 'uselang' ) );
        }

        tooltips.types['basic-tooltip'] = {};
        tooltips.types['advanced-tooltip'] = {};

        if(!tooltips.config()) {
            console.log('Tooltips: missing config');
            tooltips.disabled = true;
            return false;
        }

        var content = $('#mw-content-text');
        if($('#tooltip-wrapper').length === 0) $('<div id="tooltip-wrapper"></div>').appendTo(document.body);
        if($('#tooltip-storage').length === 0) $('<div id="tooltip-storage"></div>').append('<div class="main-tooltip tt-basic-tooltip" id="tooltip-basic-tooltip">Lorem ipsum dolor sit amet</div>').appendTo(content);

        $('#tooltip-wrapper')
            .css({'position':'fixed','height':'auto','min-height':'0','z-index': 6000000})
            .hide();
        $('#tooltip-storage')
            .css({'height':'0px','min-height':'0','visibility':'hidden','overflow':'hidden','position':'static'});
        $('#tooltip-basic-tooltip').data('type', 'basic-tooltip');

        tooltips.applyTooltips(document);
        mw.hook('wikipage.content').add(function(elem) {
            tooltips.applyTooltips($(elem));
        });

        if(typeof tooltips.events == 'string') tooltips.events = [tooltips.events];
        for(var x=0; x<tooltips.events.length; x++) { 
            $(window).on(tooltips.events[x], function(ev, elem) { 
                tooltips.applyTooltips(elem || this);
            });
        }

        if(tooltips.debug) {
            $('#tooltip-wrapper').css({'background-color':'rgba(255,0,0,0.2)'});
            $('#tooltip-storage').css({'background-color':'rgba(0,255,0,0.2)','height':'500px','overflow-y':'scroll','visibility':'visible'});
        }
    },
    config: function() {
        if(typeof tooltips_list != 'undefined') {
            $(tooltips_list).each(function(i, v) { tooltips.addType(v); });
        }
        if(typeof tooltips_config == 'object') {
            tooltips.offsetX = tooltips_config.offsetX || tooltips.offsetX;
            tooltips.offsetY = tooltips_config.offsetY || tooltips.offsetY;
            tooltips.waitForImages = (tooltips_config.waitForImages || tooltips.waitForImages) && true;
            tooltips.events = tooltips_config.events || tooltips.events;
        }
        return true;
    },
    applyTooltips: function(elem) {
        $(elem).find('.'+tooltips.classes.join(', .')).each(function() {
            $this = $(this);
            if($this.hasClass('tooltips-init-complete')) return;
            $this.find('*').removeAttr('title');
            $this.mouseover(tooltips.handlers.mouseOverLatent);
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
        var tip = $('<div class="main-tooltip tt-advanced-tooltip"></div>')
            .attr('id', 'tooltip-advanced-tooltip-'+tooltips.advancedCounter)
            .appendTo('#tooltip-storage')
            .data('type', 'advanced-tooltip')
            .append($(tips[0]).contents())
            .each(tooltips.calcSize);
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
    getAPI: function( text ) {
        const retval = new URL( tooltips.api );
        retval.searchParams.set( 'text', text );
        return retval.toString();
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
            const api = tooltips.getAPI(text);
            if(tooltips.debug) tip.html('<pre style="padding:2px 3px;">'+api+'</pre>');
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
        var $wrapper = $("#tooltip-wrapper");
        if($wrapper.find('.main-tooltip').length === 1) {
            $("#tooltip-wrapper").find('.main-tooltip').each(tooltips.setOwnWidth);
        } else {
            var width = 0;
            $wrapper.find('.main-tooltip').each(function() { width = Math.max(width, $(this).data('width') || 0); });
            $wrapper.find('.main-tooltip').each(function() { $(this).css('width', width+'px'); });
        }
    },
    wrapperPosition: function(mouseX, mouseY) {
        var $wrapper = $("#tooltip-wrapper");
        var $window = $(window);
        var tipH = parseInt($wrapper.css('padding-top')) + parseInt($wrapper.css('padding-bottom'));
        var tipW = 0;
        var barH = 0;

        $wrapper.find('.main-tooltip').each( function(){ if(typeof $(this).data('outerheight') != 'undefined') tipH += $(this).data('outerheight'); });
        $wrapper.find('.main-tooltip').each( function(){ if(typeof $(this).data('outerwidth') != 'undefined') tipW = Math.max(tipW, $(this).data('outerwidth') + parseInt($("#tooltip-wrapper").css('padding-left')) + parseInt($("#tooltip-wrapper").css('padding-right'))); });

        mouseX = mouseX - $window.scrollLeft();
        mouseY = mouseY - $window.scrollTop();

        var spaceTop = mouseY - tooltips.offsetY - barH;
        var spaceLeft = mouseX - tooltips.offsetX;
        var spaceRight = $(window).width() - mouseX - tooltips.offsetX;
        var spaceBottom = $(window).height()  - mouseY - tooltips.offsetY;

        var coordX = mouseX + tooltips.offsetX;
        var coordY = mouseY + tooltips.offsetY;

        if(spaceRight < tipW && spaceLeft >= tipW){
            coordX = mouseX - tipW - tooltips.offsetX;
        }
        if(spaceBottom < tipH && spaceTop >= tipH){
            coordY = mouseY - tipH - tooltips.offsetY;
        }

        coordX = Math.min(coordX, $(window).width() - tipW);
        coordY = Math.min(coordY, $(window).height() - tipH);

        if ($wrapper.css('position') !== 'fixed') {
            coordX = coordX+$(window).scrollLeft();
            coordY = coordY+$(window).scrollTop();
        }
        
        coordX = Math.floor(coordX);
        coordY = Math.floor(coordY);

        $wrapper.css({left: coordX + 'px', top: coordY + 'px'});
    },
    handlers: (window.innerWidth || document.documentElement.clientWidth) > 725 ? {
        mouseOverLatent(e) {
            if ( tooltips.mouseoverTimeoutId ) {
                clearTimeout( tooltips.mouseoverTimeoutId );
            }
            tooltips.mouseEventForMouseover = e;
            tooltips.mouseoverTimeoutId = setTimeout( () => {
                tooltips.mouseoverTimeoutId = null;
                tooltips.handlers.mouseOver.call( this, tooltips.mouseEventForMouseover );
            }, 150 );
        },
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
                $(window).trigger('scroll');
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
            if ( tooltips.mouseoverTimeoutId ) {
                clearTimeout( tooltips.mouseoverTimeoutId );
                tooltips.mouseoverTimeoutId = null;
            }
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
            tooltips.mouseEventForMouseover = e;
            tooltips.lastKnownMousePos = [e.pageX, e.pageY];
            tooltips.wrapperPosition(e.pageX, e.pageY);
        }
    } : undefined,
    hash: function(text) {
        var hash = 0, i, char;
        if (text.length === 0) return hash;
        for (i = 0, l = text.length; i < l; i++) {
            char  = text.charCodeAt(i);
            hash  = ((hash<<5)-hash)+char;
            hash |= 0;
        }
        return hash;
    },
};
mw.loader.using( 'mediawiki.util', () => $( tooltips.init ) );

/* ========== 4. СИСТЕМА ФОНОВ ДЛЯ ДИАЛОГОВ ========== */
$(function() {
    var $bgHeader = $('.story-summary-header').filter(function() {
        return $(this).text().trim() === 'Фоны';
    }).first();
    
    var bgMap = {};
    var charMap = {}; // Слово-метка → Имя персонажа
    var $storyInfoTable = null;
    
// Парсим персонажей из Story Info
var $charContainer = $('.story-char-container').first();
if ($charContainer.length) {
    $charContainer.children('div').each(function() {
        var $wrapper = $(this);
        if ($wrapper.css('position') !== 'relative') return;
        
        // Пропускаем unknown=true (пустой div с line-height:100px)
        if ($wrapper.find('div[style*="line-height:100px"]').length) return;
        
        var $img = $wrapper.find('img').first();
        if (!$img.length) return;
        
        // Имя персонажа из alt изображения (убираем " icon" с конца)
        var charName = ($img.attr('alt') || '').replace(/\s*icon\s*$/i, '').trim();
        if (!charName) return;
        
        // Метка (label) — текст в нижней плашке
        var $labelDiv = $wrapper.find('div[style*="position:absolute"]').first();
        var label = '';
        var titleName = '';
        
        // Пробуем взять текст из ссылки внутри плашки (обычный случай)
        var $link = $labelDiv.find('a').first();
        if ($link.length) {
            label = $link.text().trim();
            titleName = $link.attr('title') || '';
        } else {
            // nolink=true: ссылки нет, берём текстовое содержимое напрямую
            label = $labelDiv.text().trim();
        }
        
        if (charName && label) {
            charMap[label] = charName;
            if (titleName && titleName !== label && titleName !== charName) {
                charMap[titleName] = charName;
            }
            
            // Обрабатываем alias (альтернативные имена через запятую)
            var aliasData = $wrapper.attr('data-alias') || '';
            if (aliasData) {
                var aliases = aliasData.split(',');
                for (var i = 0; i < aliases.length; i++) {
                    var alias = aliases[i].trim();
                    if (alias && !charMap[alias]) {
                        charMap[alias] = charName;
                    }
                }
            }
        }
    });
}
    
    if ($bgHeader.length) {
        $storyInfoTable = $bgHeader.closest('.mrfz-btable');
        var $bgContainer = $bgHeader.closest('tr').next('tr').find('td > div').first();
        
        if ($bgContainer.length) {
            $bgContainer.children('div').each(function() {
                var $wrapper = $(this);
                if ($wrapper.css('position') !== 'relative') return;
                
                var bgNumber = $wrapper.find('div[style*="position:absolute"]').first().text().trim();
                var imageName = ($wrapper.find('img').first().attr('data-image-name') || '').trim();
                
                if (bgNumber && imageName) {
                    bgMap[bgNumber] = imageName;
                }
            });
        }
    }
    
    var SPECIAL = {
        '__black__':    { type: 'color', value: '#000000' },
        '__white__':    { type: 'color', value: '#ffffff' },
        '__fadeout__':  { type: 'fadeout' },
        '__fadein__':   { type: 'fadein' },
        '__fadeoutin__':{ type: 'fadeoutin' }
    };
    
    function getBgInfo(bgData) {
        if (!bgData) return null;
        if (SPECIAL[bgData]) return SPECIAL[bgData];
        if (bgData.indexOf('__image__') === 0) {
            return { type: 'image', value: bgData.replace('__image__', '') + '.png' };
        }
        if (bgMap[bgData]) return { type: 'image', value: bgMap[bgData] };
        return null;
    }
    
    function getRowType($row) {
        var $cells = $row.find('td');
        
        if ($cells.length === 2 && $cells.eq(0).attr('width') === '20%') {
            return 'talk';
        }
        
        if ($cells.length === 1) {
            var $cell = $cells.eq(0);
            var colspan = $cell.attr('colspan');
            var style = $cell.attr('style') || '';
            
            if (colspan === '100%') {
                if (style.indexOf('background:var(--theme-th-background)') >= 0 &&
                    (style.indexOf('font-style:italic') >= 0 || style.indexOf('font-style:oblique') >= 0)) {
                    return 'action';
                }
                if (style.indexOf('background:var(--theme-th-background)') === -1 &&
                    style.indexOf('background:var(--theme-highlight-background)') === -1) {
                    return 'speech';
                }
            }
        }
        
        return 'other';
    }
    
    $('.mrfz-btable').each(function() {
        var $table = $(this);
        if ($storyInfoTable && $table.is($storyInfoTable)) return;
        if (!$table.find('.story-bg-marker').length && !$table.find('.story-flashback-marker').length) return;
        
        var currentBgType = 'none';
        var currentBgValue = null;
        var savedBgType = 'none';
        var savedBgValue = null;
        var groupRows = [];
        var pendingFadeoutin = false;
        var inFlashback = false;
        
        function applyBgToRow($row, bgType, bgValue, extraDim) {
            var $cells = $row.find('td');
            var rowType = getRowType($row);
            
            $row.css('background-image', '');
            $row.css('background-color', '');
            $row.css('background', '');
            $row.css('background-attachment', '');
            $row.css('position', '');
            $row.css('filter', '');
            $cells.css('background-color', '');
            $cells.css('background', '');
            $cells.css('color', '');
            $cells.css('text-shadow', '');
            
            var normalDim = 'rgba(0,0,0,0.3)';
            var actionDim = 'rgba(0,0,0,0.5)';
            var darkDim = 'rgba(0,0,0,0.95)';
            var blackDim = 'rgba(0,0,0,1)';
            
            if (bgType === 'image') {
                var bgUrl = '/ru/wiki/Special:FilePath/' + bgValue;
                $row.css('background-image', 'url("' + bgUrl + '")');
                $row.css('background-size', 'cover');
                $row.css('background-position', 'center');
                $row.css('background-repeat', 'no-repeat');
                $row.css('background-attachment', 'fixed');
                
                if (inFlashback) {
                    $row.css('filter', 'grayscale(1) brightness(1.2) contrast(0.9)');
                }
                
                if (extraDim) {
                    $cells.css('background', 'linear-gradient(to bottom, ' + blackDim + ' 0%, ' + darkDim + ' 30%, ' + normalDim + ' 100%)');
                } else if (rowType === 'action') {
                    $cells.css('background-color', actionDim);
                } else {
                    $cells.css('background-color', normalDim);
                }
            } else if (bgType === 'color') {
                if (bgValue === '#000000') {
                    if (savedBgType === 'image' && savedBgValue) {
                        var savedUrl = '/ru/wiki/Special:FilePath/' + savedBgValue;
                        $row.css('background-image', 'url("' + savedUrl + '")');
                        $row.css('background-size', 'cover');
                        $row.css('background-position', 'center');
                        $row.css('background-repeat', 'no-repeat');
                        $row.css('background-attachment', 'fixed');
                        
                        if (inFlashback) {
                            $row.css('filter', 'grayscale(1) brightness(1.2) contrast(0.9)');
                        }
                    }
                    $cells.css('background-color', darkDim);
                } else {
                    $row.css('background-color', bgValue);
                    if (bgValue === '#ffffff') {
                        $cells.css('background-color', 'rgba(255,255,255,0.85)');
                        $cells.css('color', '#000');
                    }
                }
            } else if (bgType === 'fadeoutin_row') {
                if (currentBgType === 'image' && currentBgValue) {
                    var fadeUrl = '/ru/wiki/Special:FilePath/' + currentBgValue;
                    $row.css('background-image', 'url("' + fadeUrl + '")');
                    $row.css('background-size', 'cover');
                    $row.css('background-position', 'center');
                    $row.css('background-repeat', 'no-repeat');
                    $row.css('background-attachment', 'fixed');
                    
                    if (inFlashback) {
                        $row.css('filter', 'grayscale(1) brightness(1.2) contrast(0.9)');
                    }
                }
                $cells.css('background', 'linear-gradient(to bottom, ' + darkDim + ' 0%, ' + normalDim + ' 100%)');
            }
            
// Добавляем иконку персонажа в левый столбец (только если фон НЕ из mode=image)
var isImageMode = (currentBgType === 'image' && currentBgValue && currentBgValue.indexOf('Background-') !== 0);
if (rowType === 'talk' && !isImageMode) {
    var $nameCell = $cells.eq(0);
    // Ищем имя: сначала в <b>, потом в <span style="font-weight:bold">
    var $speakerEl = $nameCell.find('b').first();
    if (!$speakerEl.length) {
        $speakerEl = $nameCell.find('span[style*="font-weight:bold"]').first();
    }
    var speakerName = $speakerEl.text().trim();
    
// Применяем обводку ко всем строкам диалогов
$nameCell.find('b, span, font').css('text-shadow', '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000');

// Проверяем, есть ли иконка для этого персонажа
var charName = charMap[speakerName];
if (charName) {
    $nameCell.find('.story-char-icon').remove();
    $nameCell.find('.story-char-spacer').remove();
    
    // Оборачиваем содержимое в контейнер с flex
    var $existingContent = $nameCell.contents().not('.story-char-icon, .story-char-spacer');
    var $wrapper = $('<div class="story-char-wrapper" style="display: flex; align-items: center; justify-content: center; min-height: 90px; position: relative; z-index: 2;"></div>');
    $wrapper.append($existingContent);
    $nameCell.append($wrapper);
    
    // Формируем имя файла (заменяем пробелы на подчёркивания)
    var fileName = charName.replace(/ /g, '_') + '_icon.png';
    // Используем /ru/wiki/Special:FilePath/ для русской вики
    var iconUrl = '/ru/wiki/Special:FilePath/' + fileName;
    
    var $icon = $('<img class="story-char-icon" src="' + iconUrl + '" style="position: absolute; bottom: 5px; left: 5px; width: 90px; height: 90px; opacity: 0.8; object-fit: contain; z-index: 1;" onerror="this.style.display=\'none\'">');
    $nameCell.css('position', 'relative');
    $nameCell.append($icon);
}

// Минимальная высота для всех строк диалогов
$row.css('height', '60px');
$nameCell.css('vertical-align', 'middle');
}
            
            $row.addClass('story-dialog-row');
        }
        
        function flushGroup() {
            if (groupRows.length === 0) return;
            
            var isImageMode = (currentBgType === 'image' && currentBgValue && currentBgValue.indexOf('Background-') !== 0);
            
            if (isImageMode) {
                var nonActionRows = 0;
                groupRows.forEach(function($row) {
                    if (getRowType($row) !== 'action') {
                        nonActionRows++;
                    }
                });
                
                if (nonActionRows > 0 && nonActionRows < 5) {
                    var $firstRow = groupRows[0];
                    var $lastRow = groupRows[groupRows.length - 1];
                    var totalEmpty = 5 - nonActionRows;
                    var emptyTop = Math.floor(totalEmpty / 2);
                    var emptyBottom = Math.ceil(totalEmpty / 2);
                    
                    for (var i = 0; i < emptyTop; i++) {
                        var $emptyRow = $('<tr class="story-empty-row"><td colspan="2" style="height: 3em;"></td></tr>');
                        $firstRow.before($emptyRow);
                        applyBgToRow($emptyRow, currentBgType, currentBgValue, false);
                    }
                    
                    for (var j = 0; j < emptyBottom; j++) {
                        var $emptyRow = $('<tr class="story-empty-row"><td colspan="2" style="height: 3em;"></td></tr>');
                        $lastRow.after($emptyRow);
                        applyBgToRow($emptyRow, currentBgType, currentBgValue, false);
                    }
                }
            }
            
            groupRows.forEach(function($row) {
                applyBgToRow($row, currentBgType, currentBgValue, false);
            });
            
            groupRows = [];
        }
        
        $table.find('tr').each(function() {
            var $row = $(this);
            var $marker = $row.find('.story-bg-marker');
            
            if ($marker.length || $row.find('.story-flashback-marker').length) {
                if ($row.find('.story-flashback-marker').length) {
                    flushGroup();
                    var fbData = $row.find('.story-flashback-marker').attr('data-flashback');
                    if (fbData === 'start') {
                        if (currentBgType !== 'none') {
                            applyBgToRow($row, currentBgType, currentBgValue, false);
                        }
                        inFlashback = true;
                    } else if (fbData === 'end') {
                        if (currentBgType !== 'none') {
                            applyBgToRow($row, currentBgType, currentBgValue, false);
                        }
                        inFlashback = false;
                    }
                    return;
                }
                
                flushGroup();
                
                var bgData = $marker.attr('data-bg') || '';
                var bgInfo = getBgInfo(bgData);
                
                if (!bgInfo) {
                    currentBgType = 'none';
                    currentBgValue = null;
                    savedBgType = 'none';
                    savedBgValue = null;
                    pendingFadeoutin = false;
                    return;
                }
                
                if (bgInfo.type === 'fadeout') {
                    savedBgType = currentBgType;
                    savedBgValue = currentBgValue;
                    currentBgType = 'color';
                    currentBgValue = '#000000';
                    pendingFadeoutin = false;
                } else if (bgInfo.type === 'fadein') {
                    currentBgType = savedBgType;
                    currentBgValue = savedBgValue;
                    savedBgType = 'none';
                    savedBgValue = null;
                    pendingFadeoutin = false;
                } else if (bgInfo.type === 'fadeoutin') {
                    pendingFadeoutin = true;
                } else {
                    currentBgType = bgInfo.type;
                    currentBgValue = bgInfo.value;
                    savedBgType = 'none';
                    savedBgValue = null;
                    pendingFadeoutin = false;
                }
                return;
            }
            
            var rowType = getRowType($row);
            var isDialog = (rowType === 'talk' || rowType === 'speech' || rowType === 'action');
            
            if (isDialog && currentBgType !== 'none') {
                if (pendingFadeoutin && rowType === 'talk') {
                    applyBgToRow($row, 'fadeoutin_row', null, true);
                    pendingFadeoutin = false;
                } else if (pendingFadeoutin) {
                    pendingFadeoutin = false;
                    groupRows.push($row);
                } else {
                    groupRows.push($row);
                }
            } else {
                flushGroup();
                pendingFadeoutin = false;
                if (!isDialog && !$row.hasClass('story-empty-row')) {
                    $row.css('background-image', '');
                    $row.css('background-color', '');
                    $row.css('background', '');
                    $row.css('background-attachment', '');
                    $row.css('position', '');
                    $row.css('filter', '');
                }
            }
        });
        
        flushGroup();
    });
});