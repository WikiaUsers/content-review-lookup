//importScriptURI('//en.wikipedia.org/w/index.php?title=User:Cacycle/wikEd.js&action=raw&ctype=text/javascript');


if ($('.wikimarks-logo').length) {
    $('head').append('<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Chela+One|Sancreek&text=Wikima*rks"><style type="text/css">.WikiaArticle .wikimarks-logo{font-family: "Chela One",sans-serif; font-size: 1.1em;font-style:normal;font-variant:normal;font-weight:400;opacity:.9}.WikiaArticle .wikimarks-star1{position: relative; width: 0.7em; display: inline-block}.WikiaArticle .wikimarks-star2{position: absolute; left: -0.06em; top: -0.45em; font-size: 2.2em; font-family: Sancreek,sans-serif}</style>');
}

switch (wgPageName) {
    case 'EventOrder':
        importScript('EventOrder/EventOrder.js');
        break;
    case 'Thread:2537':
        importScript('Quote.js');
        importStylesheet('Quote.css');
        break;
    case 'SharedDemo.js':
        if (wgAction === 'view') importScript('SharedDemo.js');
        break;
    case 'Slider.js':
        if (wgAction === 'view') importScript('Slider.js');
        break;
    case 'Countdown':
        importScript('Countdown.js');
        break;
    case 'Dropdown':
        importStylesheet('MediaWiki:Dropdown.css');
        break;
}


window.SpoilerAlert = {
    isSpoiler: function () {
        return $('#spoiler').length > 0;
    }
}

if (/^docs\//i.test(wgPageName) && wgAction == 'view') {
    importScript('Jsdoc.js');
    importStylesheet('Jsdoc.css');
}

$(document).ready(function () {
    if ($('#info-widgets').length) {
        importScriptPage('InfoWidgets/code.js', 'dev');
        window.widgetsLoaded = function () {
 
            np = Widgets.newPages();
            np.selector = '#new-pages';
            Widgets.add(np);
 
            rc = Widgets.recentChanges();
            rc.selector = '#recent-changes';
            Widgets.add(rc);
 
            Widgets.add({
                selector: '#new-files',
                type: 'api',
                params: {
                    action: 'query',
                    format: 'json',
                    list: 'recentchanges',
                    rclimit: 20,
                    rcshow: '!redirect',
                    rcprop: 'title',
                    rcnamespace: 6
                }
            });
         }
    }
});

$(function () {

    $('h1.wordmark a').html('<span style="display: block;"><span style="display: inline-block; text-indent: 1.8em; font: 400 0.9em \'Lucida Bright\',\'Lucida Sans Unicode\',\'Lucida Sans\',\'Lucida Grande\',sans-serif;"><span style="color:#971771">p</span><span style="color:#971771;font-size:1em">e</span><span style="color:#bf4e46">c</span><span style="color:#d06333"><span class="oo">o</span><span class="oe">ø</span></span><span style="color:#e6811b;vertical-align:-0.25em;border-top:1px solid #e6811b">e</span><span style="color:#ffa200">s<span class="oo">\'</span><span class="oe">"</span></span>&nbsp;<span style="line-height: 0.4em; text-indent: 2.8em; display: block; color: rgb(214, 173, 11);">sandbo<span class="oo">x</span><span style="vertical-align: -0.15em;" class="oe">X</span></span></span></span>');
    
    if ($('#SpoilerAlertDemo').length) {
        $('#SpoilerAlertDemo').empty();
        $('<button>Clear cookie and reload</button>').appendTo('#SpoilerAlertDemo').css({
            width: '250px',
            margin: '200px auto'
        }).click(function () {
            $.cookies.set('spoilers', '', {
                path: '/', domain: wgServer.substr('http://'.length), hoursToLive: 365 * 24
            });
            location.reload();
        });
        $('<p>This page is a demo for <a href="http://dev.wikia.com/wiki/SpoilerAlert">SpoilerAlert</a>.</p>').appendTo('#SpoilerAlertDemo').css({
            textAlign: 'center',
            fontSize: 'small'
        });

        window.SpoilerAlert = { isSpoiler: function () { return true; } };
        
        //importScriptPage('SpoilerAlert/code.js', 'dev');
    }
});


importScriptPage('SpoilerAlert/code.js', 'dev');


(function (mw, $, window, document) {
    
    'use strict';

    if (window.sessionStorage && window.sessionStorage.getItem('noMapLightbox')) return;
    
    var MAP_ICONS = '//images3.wikia.nocookie.net/wowwiki/images/f/f3/Map-sprites.png',
        LEGEND_BG = '//images1.wikia.nocookie.net/wowwiki/images/5/50/Map-legend-bg.jpg',
        ABOUT_NOTES = '/Template:Zone_Map_Note',
        
        MAP_MAX_WIDTH   = 1002,
        MAP_MAX_HEIGHT  =  668,
        
        COLUMN_WIDTH    =  240,
        COLUMN_PADDING  =    6,
        
        HEADER_HEIGHT   =   15,
        HEADER_PADDING  =    4,
        
        MARGIN_INNER    =   10,
        MARGIN_VERTICAL =   15,
        MARGIN_HORIZONTAL = 25,
        
        LEGEND_PADDING  =   10,
        
        MIN_SCALE       =   50,
        
        STOP_WORD_REGEX = /^\s*(?:a|the)\s+(.*)/i;
    
    function initMaps ($maps) {
        
        mw.util.addCSS('\
            .map-group-name, .map-group {\
                width: 228px;\
            }\
            .map-subGroup-name {\
                min-width: 85px;\
            }\
            .icon.map-Icon, .icon.map-POI {\
                cursor: default;\
            }\
        ');
        
        var n = 0;
        
        var log = (window.console && window.sessionStorage &&
            window.sessionStorage.getItem('mapLightboxDebug') && function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift('MapLightbox: ');
                return window.console.log.apply(window.console, args);
            }) || $.noop;
        
        var callbacks = {
            prepare: $.Callbacks('unique'),
            close:   $.Callbacks('unique'),
            enable:  $.Callbacks('unique'),
            disable: $.Callbacks('unique'),
            refresh: $.Callbacks('unique'),
            resize:  $.Callbacks('unique')
        };
        
        var preloader = {
            
            imgDefers: {},
            img: function (src) {
                if (!preloader.imgDefers[src]) {
                    var defer = $.Deferred(),
                        img = new Image();
                    img.src = src;
                    img.onload = defer.resolve;
                    preloader.imgDefers[src] = {
                        defer: defer, img: img
                    };
                }
                return preloader.imgDefers[src].defer.promise();
            },
            
            tipsy: function () {
                var defer = $.Deferred();
                mw.loader.using('jquery.tipsy', defer.resolve);
                return defer.promise();
            }
        };
        
        function Walker (obj) {
            this.keys = [];
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    this.keys.push(i);
                }
            }
            this.keys.sort(this.compare);
            this.obj = obj;
        }
        
        $.extend(Walker.prototype, {
            
            compare: function (a, b) {
                /*jshint camelcase:false*/
                var m_a = a.match(STOP_WORD_REGEX),
                    m_b = b.match(STOP_WORD_REGEX);
                a = m_a ? m_a[1] : a;
                b = m_b ? m_b[1] : b;
                return a > b ? 1 : (a < b ? -1 : 0);
            },
            
            each: function (callback, container) {
                var i, key;
                for (i = 0; i < this.keys.length; i++) {
                    key = this.keys[i];
                    callback(container, key, this.obj[key]);
                }
            }
        });
        
        var tooltips = {
            
            gravity: function () {
                var $icon = $(this),
                    w = $icon.parent().width(),
                    offset = w / 100 * $icon.data('x');
                return offset > 200 ? (offset < w - 200 ? 's' : 'se') : 'sw';
            },
            
            add: function ($icons, trigger) {
                $icons
                .tipsy({
                    delayIn: 50,
                    opacity: 1,
                    trigger: trigger,
                    fade: true,
                    gravity: tooltips.gravity
                });
                if (trigger === 'manual') {
                    $icons
                    .mouseenter(tooltips.show)
                    .mouseleave(tooltips.hide);
                }
            },
            
            show: function () {
                $(this).tipsy('show');
            },
            
            hide: function () {
                $(this).tipsy('hide');
            }
        };
        
        var blackOut = ({
            
            $blackOut: false,
            
            init: function () {
                this.callbacks = {
                    refresh: $.proxy(this.refresh, this),
                    close:   $.proxy(this.close, this)
                };
                return this;
            },
            
            create: function () {
                log('blackOut.create');
                var defer = $.Deferred(),
                    that = this;
                
                $('html').css('overflow', 'hidden');
                
                this.$blackOut = $('<div></div>')
                .addClass('map-blackout')
                .css({
                    width:  $(document).width()  + 'px',
                    height: $(document).height() + 'px',
                    display: 'none'
                })
                .appendTo(document.body)
                .fadeIn(200, function () {
                    
                    that.$blackOut.click(callbacks.close.fire);
                    
                    callbacks.refresh.add(that.callbacks.refresh);
                    callbacks.close.add(that.callbacks.close);
                    
                    defer.resolve();
                });
                return defer.promise();
            },
            
            refresh: function () {
                if (this.$blackOut && this.$blackOut.length) {
                    this.$blackOut
                    .css({
                        width:  $(document).width()  + 'px',
                        height: $(document).height() + 'px'
                    });
                }
            },
            
            close: function () {
                log('blackOut.close');
                if (this.$blackOut && this.$blackOut.length) {
                    var that = this;
                    
                    $('html').css('overflow', 'auto');
                    
                    callbacks.refresh.remove(this.callbacks.refresh);
                    callbacks.close.remove(this.callbacks.close);
                    
                    this.$blackOut
                    .off('click')
                    .stop().fadeOut(100, function () {
                        that.$blackOut.remove();
                        that.$blackOut = false;
                    });
                }
            }
            
        }).init();
        
        function Map ($map) {
            var smallSrc = $map.data('small'),
                $icons = $map.find('.map-Icon,.map-POI'),
                
                iconDefer     = preloader.img(MAP_ICONS),
                smallSrcDefer = preloader.img(smallSrc),
                tipsyDefer    = preloader.tipsy();
            
            this.$map = $map;
            this.mapLightbox = new MapLightbox($map, $icons);
            
            this.callbacks = {
                enable:  $.proxy(this.enable, this),
                disable: $.proxy(this.disable, this)
            };
            
            callbacks.enable.add(this.callbacks.enable);
            callbacks.disable.add(this.callbacks.disable);

            $.when(
                iconDefer, smallSrcDefer, tipsyDefer
            )
            .done(function () {
                $map
                .css('background-image', 'url("' + smallSrc + '")')
                .removeClass('map-preload');
                tooltips.add($icons, 'hover');
            });
        }
        
        $.extend(Map.prototype, {
            
            openLightbox: function () {
                log('Map.openLightbox');
                
                var largeSrc = this.$map.data('large'),
                    that = this,
                    
                    legendPromise   = preloader.img(LEGEND_BG),
                    largeSrcPromise = preloader.img(largeSrc);
                
                blackOut.create()
                .done(function () {
                    $.when(
                        legendPromise,
                        largeSrcPromise,
                        that.mapLightbox.prepare()
                    )
                    .done(function () {
                        that.mapLightbox.init();
                    });
                });
            },
            
            enable: function () {
                log('Map.enable');
                this.$map
                    .removeClass('map-disabled')
                    .attr('title', 'Click to enlarge')
                    .off('click')
                    .click($.proxy(this.openLightbox, this));
                
                callbacks.enable.remove(this.callbacks.enable);
                callbacks.disable.add(this.callbacks.disable);
            },
            
            disable: function () {
                log('Map.disable');
                this.$map
                    .addClass('map-disabled')
                    .attr('title', '(window too small to enlarge)')
                    .off('click');
                
                callbacks.disable.remove(this.callbacks.disable);
                callbacks.enable.add(this.callbacks.enable);
            }
        });
        
        function Legend ($icons) {
            this.parsed = {};
            this.forceIndex = [];
            $icons.each(
                $.proxy(this.readNote, this)
            );
            delete this.forceIndex;
            log(this.parsed);
        }
        
        $.extend(Legend.prototype, {
            
            isEmpty: function () {
                if (this.empty === undefined) {
                    this.empty = true;
                    for (var i in this.parsed) {
                        if (this.parsed.hasOwnProperty(i)) {
                            this.empty = false;
                            break;
                        }
                    }
                }
                return this.empty;
            },
            
            isCoord: function (n) {
                return (/^\d{1,2}(?:\.\d)?$/).test(n);
            },
            
            parseNote: function (node) {
                var $note = $(node),
                    x, y, title, icon, id, legend;
                
                if (!$note.attr('title')) return false;
                
                x = $note.data('x');
                if (!this.isCoord(x)) return false;
                y = $note.data('y');
                if (!this.isCoord(y)) return false;
                
                title = $note.data('title') || '';
                
                icon = $note.data('icon');
                if (!icon || !icon.length) return false;
                
                legend = $note.data('legend');
                if (!legend.length) return false;
                
                id = 'mn' + n++;
                $note.attr('data-note', id);
                
                return { id: id, legend: legend };
            },
            
            readNote: function (key, node) {
                var i, g, legend, hash, colon,
                    note = this.parseNote(node);
                if (!note) return;
                
                legend = note.legend.split(/\s*;;\s*/);
                for (i = 0; i < legend.length; i++) {
                    hash = legend[i].split(/\s*##\s*/);
                    if (hash.length === 2) {
                        this.parsed[hash[0]] = this.parsed[hash[0]] || {
                            indexed: {}, named: {}
                        };
                        g = this.parsed[hash[0]];
                        g.indexed[hash[1]] = g.indexed[hash[1]] || [];
                        g.indexed[hash[1]].push(note.id);
                    } else {
                        colon = legend[i].split(/\s*::\s*/);
                        if (colon.length === 2) {
                            this.parsed[colon[0]] = this.parsed[colon[0]] || {
                                indexed: {}, named: {}
                            };
                            g = this.parsed[colon[0]];
                            if (this.forceIndex.indexOf(colon[1]) !== -1) {
                                g.indexed[colon[1]].push(note.id);
                            } else if (g.named[colon[1]]) {
                                this.forceIndex.push(colon[1]);
                                g.indexed[colon[1]] = g.indexed[colon[1]] || [];
                                g.indexed[colon[1]].push(g.named[colon[1]]);
                                g.indexed[colon[1]].push(note.id);
                                delete g.named[colon[1]];
                            } else {
                                g.named[colon[1]] = note.id;
                            }
                        }
                    }
                }
            },
            
            walkIndexed: function (nodes, key, notes) {
                var $subGroup = $('<div></div>')
                .addClass('map-subGroup')
                .append(
                    $('<span></span>')
                        .addClass('map-subGroup-name')
                        .text(key)
                );
                for (var i = 0; i < notes.length; i++) {
                    $('<span></span>')
                        .attr('data-note', notes[i])
                        .addClass('map-subGroup-note pseudo-link')
                        .text(i + 1)
                        .appendTo($subGroup);
                }
                nodes.push($subGroup);
            },
            
            walkNamed: function (nodes, key, value) {
                nodes.push(
                    $('<div></div>')
                        .attr('data-note', value)
                        .addClass('map-group-note pseudo-link')
                        .text(key)
                );
            },
            
            walkGroups: function (nodes, key, list) {
                var walker, sub = [];
                nodes.push(
                    $('<div></div>')
                    .addClass('map-group-name')
                    .text(key)
                );
                walker = new Walker(list.indexed);
                walker.each(this.walkIndexed, sub);
                walker = new Walker(list.named);
                walker.each(this.walkNamed, sub);
                nodes.push(
                    $('<div></div>')
                    .addClass('map-group')
                    .append(sub)
                );
            },
            
            render: function () {
                var walker = new Walker(this.parsed),
                    nodes = [];
                    
                walker.each($.proxy(this.walkGroups, this), nodes);
                
                this.$wrapper = $('<div></div>')
                    .addClass('map-legend-wrapper')
                    .append(nodes);
                    
                return $('<div></div>')
                    .addClass('map-legend')
                    .append(this.$wrapper);
            },
            
            addScrollbar: function () {
                this.$wrapper.removeAttr('style');
                if (this.$wrapper.height() > dimensions.legend.h) {
                    this.$wrapper
                    .css({
                        width: '255px',
                        paddingRight: '15px',
                        maxHeight: (dimensions.legend.h - 2 * LEGEND_PADDING) + 'px'
                    });
                }
            }
        });
        
        
        function MapLightbox ($map, $icons) {
            this.largeSrc = $map.data('large');
            this.zoneName = $map.data('zone');
            this.editLink = this.findEditLink($map);
            this.file = 'File:' + this.largeSrc.split('/').pop();
            this.href = mw.config.get('wgArticlePath').replace(/\$1/, this.file);
            
            this.$originalIcons = $icons;
            this.legend = new Legend($icons);
            
            this.callbacks = {
                refresh: $.proxy(this.refresh, this),
                resize:  $.proxy(this.resize, this),
                close:   $.proxy(this.close, this)
            };
        }
        
        $.extend(MapLightbox.prototype, {
            
            findEditLink: function ($map) {
                var $walker = $map.prev();
                while ($walker.length) {
                    if (/^h\d$/i.test($walker[0].nodeName)) {
                        return $walker
                            .find('.editsection > a')
                            .attr('href');
                    }
                    $walker = $walker.prev();
                }
                return '?action=edit';
            },

            prepare: function () {
                log('MapLightbox.prepare');
                var defer = $.Deferred(),
                    empty = this.legend.isEmpty();
                
                this.prepareHeader();
                this.prepareLargeMap();
                if (!empty) {
                    this.prepareLegend();
                }
                
                dimensions.setLegend(empty);
                
                //callbacks.prepare.fire(empty);
                
                return defer.resolve().promise();
            },
            
            init: function () {
                log('MapLightbox.create');
                
                this.resize();
                
                this.initHeader();
                this.initLargeMap();
                if (!this.legend.isEmpty()) {
                    this.initLegend();
                }
                
                callbacks.refresh.add(this.callbacks.refresh);
                callbacks.resize.add(this.callbacks.resize);
                callbacks.close.add(this.callbacks.close);
            },
            
            prepareHeader: function () {
                log('MapLightbox.prepareHeader');
                
                this.$coords = $('<span></span>')
                .addClass('map-coords')
                .css('display', 'none');
                
                this.$close = $('<span></span>', {
                    title: 'Close'
                })
                .addClass('map-close pseudo-link')
                .text('Close');
                
                this.$scale = $('<span></span>')
                .addClass('map-scale')
                .css('display', 'none');
                
                this.$info = $('<span></span>')
                .addClass('map-info')
                .append(
                    $('<span></span>')
                    .addClass('map-title')
                    .text(this.zoneName)
                )
                .append(this.$scale)
                .append(this.$coords);
                
                this.$buttons = $('<span></span>')
                .addClass('map-buttons')
                .append(
                    $('<a></a>', {
                        title: mw.html.escape(this.file),
                        href:  mw.html.escape(this.href)
                    })
                    .addClass('map-href')
                    .text(this.file)
                )
                .append(
                    $('<a></a>', {
                        title: 'Edit Map Notes',
                        href: this.editLink
                    })
                    .addClass('map-href')
                    .text('Edit Map Notes')
                )
                .append(
                    $('<a></a>', {
                        title: 'About Map Notes',
                        href: ABOUT_NOTES
                    })
                    .addClass('map-href')
                    .text('About Map Notes')
                )
                .append(this.$close);
                
                this.$header = $('<div></div>')
                .addClass('map-header')
                .css('display', 'none')
                .append(this.$info)
                .append(this.$buttons)
                .appendTo(document.body);
            },
            
            initHeader: function () {
                this.$close
                .click(callbacks.close.fire);
            },
            
            prepareLargeMap: function () {
                log('MapLightbox.prepareLargeMap');
                
                this.$icons = this.$originalIcons
                .clone()
                .each(function () {
                    var $this = $(this);
                    $this
                    .attr({
                        id:    $this.attr('data-note'),
                        title: $this.attr('original-title')
                    })
                    .removeAttr('orginal-title');
                });
                
                this.$image = $('<img>', {
                    src: this.largeSrc
                });
                
                this.$largeMap = $('<div></div>')
                .addClass('map-large')
                .css('display', 'none')
                .append(this.$image)
                .append(this.$icons)
                .appendTo(document.body);
            },
            
            initLargeMap: function () {
                log('MapLightbox.initLargeMap');
                tooltips.add(this.$icons, 'manual');
                
                this.$largeMap
                .on('mouseenter mousemove', $.proxy(this.updateCoords, this))
                .mouseleave($.proxy(this.hideCoords, this));
            },
            
            prepareLegend: function () {
                log('MapLightbox.prepareLegend');
                this.$legend = this.legend.render()
                .css('display', 'none')
                .appendTo(document.body);
            },
            
            initLegend: function () {
                log('MapLightbox.initLegend');
                var that = this;
                this.$legend
                .find('.pseudo-link')
                .mouseenter(function () {
                    $(document.getElementById($(this).data('note'))).tipsy('show');
                })
                .mouseleave(function () {
                    $(document.getElementById($(this).data('note'))).tipsy('hide');
                });
                
                $('.map-group-name')
                .data('opened', true)
                .css('cursor', 'pointer')
                .click(function () {
                    var $this = $(this),
                        move = $this.data('opened') ? 'slideUp' : 'slideDown',
                        $group = $this.next('.map-group');
                    $this.data('opened', ! $this.data('opened'));
                    $group[move](100, function () {
                        that.legend.addScrollbar();
                    });
                });
            },
            
            formatCoord: function (coord) {
                var c = Math.round(coord * 10) / 10;
                c = Math.min(99.9, Math.max(0.1, c));
                return Math.round(c) === c ? c + '.0' : c;
            },
            
            hideCoords: function () {
                this.$coords
                .css('display', 'none');
                this.showHideButtons();
            },
            
            updateCoords: function (e) {
                var x = this.formatCoord(
                        (e.clientX - dimensions.largeMap.x) / dimensions.largeMap.w  * 100
                    ),
                    y = this.formatCoord(
                        (e.clientY - dimensions.largeMap.y) / dimensions.largeMap.h * 100
                    );
                this.$coords
                    .css('display', 'inline')
                    .text(x + ',' + y);
                this.showHideButtons();
            },
            
            refresh: function () {
                this.$header
                .add(this.$largeMap)
                .add(this.$legend)
                .css('display', 'none');
            },
            
            resize: function () {
                log('MapLightbox.resize');
                this.resizePart(this.$header, dimensions.header);
                this.resizePart(this.$largeMap, dimensions.largeMap);
                if (!this.legend.isEmpty()) {
                    this.resizePart(this.$legend, dimensions.legend);
                }
                
                this.$image.attr({
                    width:  dimensions.largeMap.w + 'px',
                    height: dimensions.largeMap.h + 'px'
                });
                
                if (dimensions.scale !== 100) {
                    this.$scale
                    .css('display', 'inline')
                    .text('scale: ' + dimensions.scale + '%');
                } else {
                    this.$scale
                    .css('display', 'none');
                }
                
                if (this.$legend) {
                    this.legend.addScrollbar();
                }
                
                this.showHideButtons();
            },
            
            showHideButtons: function () {
                var infoWidth = this.$info.width(),
                    buttonWidth = this.$buttons.removeClass('map-minimal').width();
                
                if (infoWidth + buttonWidth + 20 >= dimensions.largeMap.w) {
                    this.$buttons.addClass('map-minimal');
                }
            },
            
            resizePart: function (part, values) {
                part
                .css({
                    width: values.w + 'px', height: values.h + 'px',
                    left:  values.x + 'px', top:    values.y + 'px',
                    display: 'block'
                });
            },
            
            close: function () {
                log('MapLightbox.close');
                this.$header.remove();
                this.$largeMap.remove();
                if (this.$legend) {
                    this.$legend.remove();
                }
                
                delete this.$info;
                delete this.$buttons;
                delete this.$scale;
                delete this.$coords;
                delete this.$close;
                delete this.$header;
                delete this.$image;
                delete this.$icons;
                delete this.$largeMap;
                if (this.$legend) {
                    delete this.$legend;
                    delete this.legend.$wrapper;
                }
                
                callbacks.refresh.remove(this.callbacks.refresh);
                callbacks.resize.remove(this.callbacks.resize);
                callbacks.close.remove(this.callbacks.close);
            }
        });
        
        var dimensions = ({
            
            header: {
                h: HEADER_HEIGHT + HEADER_PADDING * 2 // HEADER_PADDING really necessary ???
            },
            
            margin: {
                vertical:   MARGIN_VERTICAL   * 2,
                horizontal: MARGIN_HORIZONTAL * 2
            },
            
            between: {
                headerMap: MARGIN_INNER
            },
            
            resetLegend: function () {
                this.legend = {
                    w: COLUMN_WIDTH + COLUMN_PADDING * 2  // COLUMN_PADDING really necessary ???
                };
                this.between.mapLegend = MARGIN_INNER;
            },
            
            setLegend: function (empty) {
                log('dimensions.setLegend', empty);
                if (empty) {
                    this.legend = { w: 0, h: 0, x: 0, y: 0 };
                    this.between.mapLegend = 0;
                } else {
                    this.resetLegend();
                }
                this.calculate();
            },
            
            calculate: function () {
                
                this.win = {
                    w: $(window).width(),
                    h: $(window).height()
                };
                
                this.largeMap = {
                    w: Math.min(
                        MAP_MAX_WIDTH,
                        this.win.w - this.legend.w - this.between.mapLegend - this.margin.horizontal,
                        Math.round(
                            Math.min(
                                MAP_MAX_HEIGHT,
                                this.win.h - this.header.h - this.between.headerMap - this.margin.vertical
                            ) * 3 / 2
                        )
                    )
                };
                
                this.scale = Math.round(this.largeMap.w / MAP_MAX_WIDTH * 100);
                
                if (this.scale < MIN_SCALE) {
                    callbacks.disable.fire();
                    callbacks.close.fire();
                } else {
                    this.largeMap.h = Math.round(this.largeMap.w * 2 / 3);
                    
                    this.header.y = Math.round((this.win.h - this.largeMap.h - this.header.h - this.between.headerMap) / 2);
                    this.header.x = Math.round((this.win.w - this.largeMap.w - this.legend.w - this.between.mapLegend) / 2);
                    this.header.w = this.largeMap.w;
                    
                    this.largeMap.x = this.header.x;
                    this.largeMap.y = this.header.y + this.header.h + this.between.headerMap;
                    
                    if (this.legend.w) {
                        this.legend.h = this.largeMap.h + this.header.h + this.between.headerMap;
                        this.legend.x = this.largeMap.x + this.header.w + this.between.mapLegend;
                        this.legend.y = Math.round((this.win.h - this.legend.h) / 2);
                    }
                    
                    callbacks.enable.fire();
                }
            },
            
            init: function () {
                this.resetLegend();
                callbacks.refresh.add($.proxy(this.calculate,   this));
                callbacks.close  .add($.proxy(this.resetLegend, this));
                callbacks.prepare.add($.proxy(this.setLegend,   this));
                return this;
            }
            
        }).init();
        
        function isWikiaImage (src) {
            return src && src.length &&
                /^(?:https?:)?\/\/images(\d*)\.wikia\.(?:nocookie\.net|com)\//.test(src);
        }
        
        $maps
        .each(function () {
            var $map = $(this);
            if (!$map.data('map') &&
                isWikiaImage($map.data('small')) &&
                isWikiaImage($map.data('large'))
            ) {
                $map.data('map', new Map($map));
            }
        });
        
        dimensions.calculate();
        
        $(window)
        .resize(callbacks.refresh.fire)
        .resize($.debounce(100, callbacks.resize.fire));
    }
    
    $(function () {
        var $maps = $('.ZoneMap');
        if ($maps.length) {
            initMaps($maps);
        }
    });
    
}(mediaWiki, jQuery, window, window.document));