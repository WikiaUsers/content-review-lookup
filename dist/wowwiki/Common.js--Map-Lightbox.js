//<pre>

/* ==== Map Lightbox (simplfied version) ==== */

(function (mw, $, window, document) {

    if (window.sessionStorage) {
        if (window.sessionStorage.getItem('devMapLightbox')) {
            importScript('MediaWiki:Common.js/Map-Lightbox-Dev.js');
            return;
        }
        if (window.sessionStorage.getItem('noMapLightbox')) return;
    }
    
    var MAP_ICONS = 'https://images.wikia.nocookie.net/wowwiki/images/f/f3/Map-sprites.png';
    
    function initZoneMaps ($zoneMaps) {
        
        mw.util.addCSS('\
            .map-area {\
                height: 668px !important;\
            }\
        ');
        
        var preloaded = {};
        function preload (src) {
            if (!preloaded[src]) {
                var defer = $.Deferred(),
                    img = new Image();
                img.src = src;
                img.onload = function () {
                    defer.resolve();
                };
                preloaded[src] = {
                    defer: defer, img: img
                };
            }
            return preloaded[src].defer.promise();
        }
        
        function ZoneMap ($zoneMap) {
            this.$zoneMap = $zoneMap;
            this.smallSrc = $zoneMap.data('small'),
            this.largeSrc = $zoneMap.data('large'),
            
            $.when(
                preload(MAP_ICONS),
                preload(this.smallSrc)
            )
            .done($.proxy(this.init, this));
        }
        
        $.extend(ZoneMap.prototype, {
            
            positionMapArea: function () {
                if (this.$mapArea && this.$mapArea.length) {
                    var $w = $(window);
                    this.$mapArea.css({
                        left: Math.max(0, ($w.width()  - this.mapAreaWidth)  / 2)  + 'px', 
                        top:  Math.max(0, ($w.height() - this.mapAreaHeight) / 2)  + 'px',
                    });
                }
            },
            
            createBlackOut: function () {
                var defer = $.Deferred();
                this.$blackOut = $('<div></div>')
                .addClass('map-blackout')
                .css({
                    width:  $(document).width(),
                    height: $(document).height(),
                    display: 'none'
                })
                .appendTo(document.body)
                .fadeIn(200, function () {
                    defer.resolve();
                })
                .click($.proxy(this.closeMap, this));
                return defer.promise();
            },
            
            closeMap: function () {
                this.$mapArea.remove();
                delete this.$mapArea;
                this.$blackOut
                .stop().fadeOut(200, $.proxy(function () {
                    this.$blackOut.remove();
                    delete this.$blackOut;
                }, this));
                $(window)
                .off('resize.map');
            },
            
            createLargeMap: function () {
                this.$largeMap = $('<div></div>')
                .addClass('map-large')
                .appendTo(this.$mapArea);
                
                this.mapWidth  = this.$largeMap.width();
                this.mapHeight = this.$largeMap.height();
            },
            
            initLargeMap: function () {
                var $clone = this.$zoneMap.clone();
                this.$largeMap
                .replaceWith($clone);
                this.$largeMap = $clone
                .removeAttr('style')
                .css('background-image', 'url("' + this.largeSrc + '")')
                .addClass('map-large');
                
                $('<span></span>', {
                    title: 'Close'
                })
                .addClass('map-close pseudo-link')
                .css({
                    position: 'absolute',
                    right: '80px',
                    top: '40px'
                })
                .text('Close')
                .appendTo(this.$largeMap)
                .click($.proxy(this.closeMap, this));
            },
            
            createMapArea: function () {
                this.$mapArea = $('<div></div>')
                .addClass('map-area map-preload')
                .css('display', 'none')
                .appendTo(document.body);
                
                this.mapAreaWidth  = this.$mapArea.width();
                this.mapAreaHeight = this.$mapArea.height();
                
                this.createLargeMap();
                
                this.positionMapArea();
                $(window)
                .on('resize.map', $.proxy(this.positionMapArea, this));
                
                this.$mapArea
                .css('display', 'block');
            },
            
            initMapArea: function () {
                this.$mapArea
                .removeClass('map-preload');
                this.initLargeMap();
            },
            
            showMapArea: function () {
                this.$mapArea
                .css('display', 'block');
            },
            
            openMapArea: function () {
                var largeSrcPromise = preload(this.largeSrc);
                
                this.createBlackOut()
                .done($.proxy(
                    function () {
                        this.createMapArea();
                        largeSrcPromise
                        .done(
                            $.proxy(this.initMapArea(), this)
                        );
                    }, this)
                );
            },
           
            init: function () {
                this.$zoneMap
                .css('background-image', 'url("' + this.smallSrc + '")')
                .removeClass('map-preload')
                .click($.proxy(this.openMapArea, this));
            }
        });
        
        $zoneMaps
        .each(function () {
            var $zoneMap = $(this);
            if (!$zoneMap.data('zoneMap')) {
                $zoneMap.data('zoneMap', new ZoneMap($zoneMap));
            }
        });
    }
    
    $(function () {
        var $zoneMaps = $('.ZoneMap');
        if ($zoneMaps.length) {
            initZoneMaps($zoneMaps);
        }
    });
}(mediaWiki, jQuery, window, window.document));
//</pre>