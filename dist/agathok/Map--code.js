/* Adds visual map and mapping constructs to wiki pages. */

/**************************************************************************************

* This 'MediaWiki:Map/code.js' is included by MediaWiki:Common.js, and is
loaded after MW / Oasis, 'Common' and 'Wikia', will be loaded via import as 'load.php'
which appears at the *bottom* of the page.

* All files will be checked and minified nearly the same.

***************************************************************************************/

/*jshint multistr:true, jquery:true, browser:true, devel:true, camelcase:true,
 curly:false, undef:true, unused:true, bitwise:true, eqeqeq:true, forin:true,
 immed:true, latedef:true, newcap:true, noarg:true, unused:true, regexp:true,
 strict:true, trailing:true */
/*global mediaWiki:true*/

(function (mw, $, window, document) {

  'use strict';

  // Wrapper function, allows selectively and cleanly loading Map based on page context
  function initMaps($maps) {

    //var LEGEND_BG_LINK = '//images1.wikia.nocookie.net/__cb1/wowwiki/images/5/50/Map-legend-bg.jpg';
    var LEGEND_BG_LINK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8tMnrPwAHOwLfJJG8pgAAAABJRU5ErkJggg=='; //#E2B24A
    var ABOUT_NOTE_LINK = '/Template:Map/Note';
    var EDIT_NOTE_ENABLE = true;
    var MAP_RATIO = null;

    var MAP_MIN_WIDTH = 50,
      MAP_MAX_WIDTH = 1002,
      MAP_MAX_HEIGHT = 880,
      COLUMN_WIDTH = 240,
      COLUMN_PADDING = 6,
      HEADER_HEIGHT = 15,
      HEADER_PADDING = 4,
      MARGIN_INNER = 10,
      MARGIN_VERTICAL = 15,
      MARGIN_HORIZONTAL = 25,
      LEGEND_PADDING = 10,
      MIN_SCALE = 25;         // minimum percent of max scale before not open or auto close map

    var nId = 0;  // counter for for non-conflicting node IDs

    function GetValue(value, defvalue) { return value || parseInt(value) == 0  ?  value : defvalue; }
    var $settings = $('.map-settings').last();
    if ($settings.length) {
      LEGEND_BG_LINK = GetValue($settings.data("legend-bg-link"), LEGEND_BG_LINK);
      ABOUT_NOTE_LINK = GetValue($settings.data("about-note-link"), ABOUT_NOTE_LINK);
      EDIT_NOTE_ENABLE = GetValue($settings.data("edit-note-enable"), EDIT_NOTE_ENABLE) != 0;
      MAP_RATIO = GetValue($settings.data("map-ratio"), MAP_RATIO);
      MAP_MAX_WIDTH = GetValue($settings.data("map-max-width"), MAP_MAX_WIDTH);
      MAP_MAX_HEIGHT = GetValue($settings.data("map-max-height"), MAP_MAX_HEIGHT);
    }

    var callbacks = {
      close: $.Callbacks('unique'),
      enable: $.Callbacks('unique'),
      disable: $.Callbacks('unique'),
      refresh: $.Callbacks('unique'),
      resize: $.Callbacks('unique')
    };

/* *********************  Preloader  ********************* */

    var preloader = {

      imgDefers: {},
      imgDefer: function (src) {
        var imgDefer = this.imgDefers[src];
        if (!imgDefer) {
          var defer = $.Deferred(),
            img = new Image();

          img.src = src;
          img.onload = defer.resolve;
          this.imgDefers[src] = imgDefer = {
            defer: defer, img: img
          };
        }
        return imgDefer;
      },
      imgPromise: function (src) {
        var imgDefer = this.imgDefer(src);
        return imgDefer.defer.promise();
      },
      imgObj: function (src) {
        var imgDefer = this.imgDefer(src);
        var promise = imgDefer.defer.promise();
        if (promise.state() === 'pending')
          return null;

        return imgDefer.img;
      },

      marker: function (marker) {     // preload markers
        var $marker = $(marker);
        var bg = $marker.css("background-image");
        if (bg === "none") {
          bg = $marker.find("img").attr("src");
        } else {
          bg = bg.replace(/^url\(['"]?(.+?)['"]?\)/,'$1');
        }
        return (typeof bg == "string") ? this.imgPromise(bg) : $.when();
      },

      cancel: function (src) {
        delete preloader.imgDefers[src];
      },
    };

/* *********************  Sort  ********************* */

    function SortedObject(obj) {
      this.keys = [];
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          this.keys.push(i);
        }
      }
      this.keys.sort(this.compare);
      this.obj = obj;
      this.walker = -1;
    }

    var STOP_WORD_REGEX = /^\s*(?:a|the)\s+(.*)/i;

    $.extend(SortedObject.prototype, {

      compare: function (a, b) {
        /*jshint camelcase:false*/
        var m_a = a.match(STOP_WORD_REGEX),
          m_b = b.match(STOP_WORD_REGEX);
        a = m_a ? m_a[1] : a;
        b = m_b ? m_b[1] : b;
        return a > b ? 1 : (a < b ? -1 : 0);
      },

      reset: function () {
        this.walker = -1;
      },

      next: function () {
        return ++this.walker < this.keys.length;
      },

      key: function () {
        return this.keys[this.walker];
      },

      val: function () {
        return this.obj[this.keys[this.walker]];
      }
    });

/* *********************  Tool Tips  ********************* */

    // portions of this tipsie section derrived from mediawiki tipsy 12/1/17:
    // tipsy, facebook style tooltips for jquery, version 1.0.0a*
    // (c) 2008-2010 jason frame [jason@onehackoranother.com]
    // released under the MIT license
    // - shorter non-global version, w/ some mobile support
    // - note: CB means DOM callback verison that expects a DOM 'this'

    var tipsie = {
        get: function (elem) {
            return $.data(elem, 'tipsie');
        },

        enterCB: function () {
            var that = tipsie.get(this);
            if (!that) return;
            var options = that.options;
            that.hoverState = 'in';
            if (options.delayIn == 0) {
                that.show();
            } else {
                that.fixTitle();
                setTimeout(function() { if (that.hoverState == 'in') that.show(); }, options.delayIn);
            }
        },

        leaveCB: function() {
            var that = tipsie.get(this);
            if (!that) return;
            var options = that.options;
            that.hoverState = 'out';
            if (options.delayOut == 0) {
                that.hide();
            } else {
                setTimeout(function() { if (that.hoverState == 'out') that.hide(); }, options.delayOut);
            }
        },

        set: function ($elems, options) {
            if (!this.Tipsie) this.initTipsie();

            options = $.extend({}, this.defaults, options);

            $elems.each(function() {
                if (!tipsie.get(this)) $.data(this, 'tipsie', new tipsie.Tipsie(this, options));
            });

            if (options.trigger != 'manual')
                $elems.on(options.trigger == 'hover' ? 'mouseenter focus' : 'focus', this.enterCB)
              .on(options.trigger == 'hover' ? 'mouseleave blur' : 'blur', this.leaveCB);

            return this;
        },

        initTipsie: function () {
            this.defaults = {
                tipClass: null,
                delayIn: 0,
                delayOut: 0,
                fade: true,
                fallback: '',
                gravity: 'n',
                center: true,
                html: false,
                live: false,
                offset: 0,
                opacity: 1.0,
                title: 'title',
                trigger: 'hover'
            };

            this.Tipsie = function (element, options) {
                this.$element = $(element);
                this.options = $.metadata ? $.extend({}, options, this.$element.metadata()) : options;
                this.enabled = true;
                this.keyHandler = $.proxy( this.closeOnEsc, this );
                this.$template = null,
                this.fixTitle();
            };

            this.Tipsie.prototype = {
	
/******** start Tipsie prototype ********/

show: function() {
    var title = null;
    if (!this.enabled || !(title = this.getTitle())) return;
    var element = this.$element[0], options = this.options;

    // measurethat - http://tinyurl.com/ycfdnf5k jsperf - http://tinyurl.com/y9fuegc7
    if (!this.$template)
      this.$template = $('<div class="tipsie" role="tooltip" aria-hidden="false">' +
        '<div class="tipsie-arrow"></div><div class="tipsie-inner"></div></div>');
    var $this = this.$template.clone();

    var gravity = options.gravity, tipClass = options.tipClass;
    if (typeof gravity == 'function') gravity = gravity.call(element);
    if (typeof tipClass == 'function') tipClass = tipClass.call(element);
    $this.addClass('tipsie-' + gravity + ' ' + tipClass);

    $this.find('.tipsie-inner')[options.html ? 'html' : 'text'](title);

    var offset = this.$element.offset(), left = offset.left, top = offset.top,
      width = element.offsetWidth, height = element.offsetHeight;

    if (this.$tooltip) this.$tooltip.remove();
    this.$tooltip = $this;
    $this.appendTo(document.body);   // force layout

    var tipWidth = $this[0].offsetWidth, tipHeight = $this[0].offsetHeight;

    switch (gravity.charAt(0)) {
        case 'n': top = top + height + options.offset; left = left + width / 2 - tipWidth / 2; break;
        case 's': top = top - tipHeight - options.offset; left = left + width / 2 - tipWidth / 2; break;
        case 'e': top = top + height / 2 - tipHeight / 2; left = left - tipWidth - options.offset; break;
        case 'w': top = top + height / 2 - actualHeight / 2; left = left + width + options.offset; break;
    }
    switch (gravity.charAt(1)) {
        case 'e': left = options.center ? (offset.left + width / 2 - tipWidth + 15) : (offset.left + width); break;
        case 'w': left = options.center ? (offset.left + width / 2 - 15) : offset.left; break;
    }

    $( document ).on( 'keydown', this.keyHandler );
    if (options.fade)
        $this.stop().css({ top: top, left: left }).animate({ opacity: options.opacity }, 100);
    else
        $this.css({ top: top, left: left, opacity: options.opacity});
},

hide: function() {
    $( document ).off( 'keydown', this.keyHandler );
    if (this.$tooltip) {
      if (this.options.fade)
          this.$tooltip.stop().fadeOut(100, function() { $(this).remove(); });
      else
          this.$tooltip.remove();
    }
},

fixTitle: function() {
    var $element = this.$element;
    if ($element.attr('title') || typeof($element.attr('original-title')) != 'string') {
        $element.attr('original-title', $element.attr('title') || '').removeAttr('title');
    }
},

getTitle: function() {
    var title, $element = this.$element, o = this.options;
    this.fixTitle();
    if (typeof o.title == 'string') {
        title = $element.attr(o.title == 'title' ? 'original-title' : o.title);
    } else if (typeof o.title == 'function') {
        title = o.title.call($element[0]);
    }
    title = ('' + title).replace(/(^\s*|\s*$)/, "");
    return title || o.fallback;
},

validate: function() {
    if (!this.$element[0].parentNode) {
        this.hide();
        this.$element = null;
        this.options = null;
    }
},

closeOnEsc: function ( e ) {
    if ( e.keyCode === 27 ) {
        this.hide();
    }
},

enable: function() { this.enabled = true; },
disable: function() { this.enabled = false; },

/******** end Tipsie prototype ********/
            };
        }
    }


    /* map ToolTip interface */
    var tips = {
        // adds a text ToolTip
        addTextTip: function ($elems, trigger, autoShow) {
            var that = tipsie.set($elems, {
                tipClass: 'map-tip-text',
                delayIn: 20,  //50
                opacity: 1,
                trigger: trigger,
                fade: true,
                gravity: tips.gravityCB
              });

            if (autoShow && $elems.length) {
                this.show($elems);
                this.closeElems.push($elems);
                callbacks.close.add(tips.close);
            }
        },

        close: function () {
          var a = tips.closeElems;
          tips.closeElems = [];
          for (var i= 0, len = a.length; i < len; i++)
              tips.hide(a[i]);
        },
        closeElems: [],

        show: function ($elems) {
            $elems.each(function () { var that = tipsie.get(this); if (that) that.show(); })
        },

        hide: function ($elems) {
            $elems.each(function () { var that = tipsie.get(this); if (that) that.hide(); })
        },

        gravityCB: function () {
            var $elem = $(this),
                w = $elem.parent().width(),
                offset = w / 100 * $elem.data('x');
            return offset > 200 ? (offset < w - 200 ? 's' : 'se') : 'sw';
        }
    };

/* *********************  Lightbox  ********************* */

    var blackOut = {

      $blackOut: null,

      create: function () {
        var defer = $.Deferred();

        this.$blackOut = $('<div></div>')
          .addClass('map-blackout')
          .css({
            width: $(document).width() + 'px',
            height: $(document).height() + 'px',
            display: 'none'
          })
          .appendTo(document.body)
          .fadeIn(200, function () {
            $('html').css('overflow', 'hidden');
            blackOut.refresh();

            blackOut.$blackOut.click(callbacks.close.fire);

            callbacks.refresh.add(blackOut.refresh);
            callbacks.close.add(blackOut.close);

            defer.resolve();
          });

        return defer.promise();
      },

      refresh: function () {
        var $blackOut = blackOut.$blackOut;
        if (!$blackOut || !$blackOut.length) return;

        var $document = $(document);
        $blackOut
          .css({
            width: $document.width() + 'px',
            height: $document.height() + 'px'
          });
      },

      close: function () {
        var $blackOut = blackOut.$blackOut;
        if (!$blackOut || !$blackOut.length) return;

        $('html').css('overflow', 'auto');

        callbacks.refresh.remove(blackOut.refresh);
        callbacks.close.remove(blackOut.close);

        $blackOut
          .off('click')
          .stop().fadeOut(100, function () {
            $blackOut.remove();
            $blackOut = null;
          });
      }
    };

/* *********************  Map Base  ********************* */

    function Map() { }

    $.extend(Map.prototype, {
      $map: null,         // map dom object
      src: null,          // smallSrc href string
      extents: null,      // map coordinates meta

      mapLightbox: null,  // lightbox class object

      initMap: function ($map, editLink, $markers, autoShow) {
        var projectionType = $map.data('projection'),
          dataFile = $map.data('file'),
          largeSrc = $map.data('large'),
          smallSrc = $map.data('small');

        var projectionType = projectionType ? process : "flat";
        var file = 'File:' + dataFile;
        var href = mw.config.get('wgArticlePath').replace(/\$1/, file);

        // constrain wire size of large map, if larger than any max
        var maxW = MAP_MAX_WIDTH, maxH = MAP_MAX_HEIGHT;
        largeSrc = largeSrc.replace(/\/latest/, '/latest/scale-to-'
          + (maxW < maxH ? ('width-down/' + maxW) : ('height-down/' + maxH)));

        var left = Number($map.data('left')), top = Number($map.data('top')),
          right = Number($map.data('right')), bottom = Number($map.data('bottom')),
          centerx = Number($map.data('centerx')), centery = Number($map.data('centery'));
        var extents = {   // coordinate extents for this map image
          left: left ? left : 0.0,
          top: top ? top : 0.0,
          right: right ? right : 100.0,
          bottom: bottom ? bottom : 100.0,
          centerx: centerx ? centerx : null,
          centery: centery ? centery : null
        };

        this.$map = $map;
        this.src = smallSrc
        this.extents = extents;

        this.mapLightbox = new MapLightbox({
          projectionType: projectionType,
          src: largeSrc,        // full href to largeSrc
          zone: $map.data('zone'),
          extents: extents,
          editLink: editLink, // edit notes link
          file: file,           // wiki file name
          href: href,           // full href to wiki file
          $markers: $markers,
          autoShow: autoShow
        });

        this.callbacks = {
          enable: $.proxy(this.enable, this),
          disable: $.proxy(this.disable, this)
        };

        callbacks.enable.add(this.callbacks.enable);
        callbacks.disable.add(this.callbacks.disable);
      },

      openMapInLightboxCB: function () {
        var $this = $(this);
        var that = $this.data('map');

        // start the preload now
        var largeSrc = that.mapLightbox.largeSrc;

        var legendPromise = preloader.imgPromise(LEGEND_BG_LINK),
          largeSrcPromise = preloader.imgPromise(largeSrc);

        blackOut.create()
          .done(function () {
            $.when(
              legendPromise,
              largeSrcPromise,
              that.mapLightbox.create()
            )
            .done(function () {
              that.mapLightbox.initLightbox();
            });
          });
      },

      enable: function () {
        this.$map
          .removeClass('map-disabled')
          .off('click')
          .attr('title', 'click to enlarge')
          .click(this.openMapInLightboxCB);

        callbacks.enable.remove(this.callbacks.enable);
        callbacks.disable.add(this.callbacks.disable);
      },

      disable: function () {
        this.$map
          .addClass('map-disabled')
          .attr('title', '(window too small to display map)')
          .off('click');

        callbacks.disable.remove(this.callbacks.disable);
        callbacks.enable.add(this.callbacks.enable);
      },

      getMapPopupWH: function () {  // temp popup html, for small map popup
        var mapRatio = layout.getMapRatio(this.src);
        var w = this.$map.data('width'),
          h = mapRatio ? Math.round(w / mapRatio) : null;

        var w2 = !h ? Math.round(w / 2) : null;

        return { w:w, h:h, w2:w2 };
      },

      createMapPopupHtml: function () {   // real popup html, for small map popup
        var dim = this.getMapPopupWH();
        var w = dim.w, h = dim.h;

        var content = '<div style="position: relative;">' +
          '<img src="' + this.src + '" width="' + w +
          (h ? ('px" height="' + h) : '') + 'px">';

        var $markers = this.$map.find('.map-marker');
        $markers.each(function () {       // add markers verbatim from embedded markers
          content += $(this).prop('outerHTML');
        });

        return content += '</div>';
      },

      createMapPopupDefer: function () {  // temp popup html, for small map popup
        var dim = this.getMapPopupWH();
        var w = dim.w, h = dim.h;
        if (!dim.h) { w = dim.w2; h = w; }

        return '<div style="position: relative; width: ' +
          w + 'px; height: ' + h + 'px;' + '" class="map map-zone map-preload"></div>'
      },

      createMapPopupCB: function () {   // only used small map popup
        var $this = $(this);
        var that = $this.data('map');

        var promise = preloader.imgPromise(that.src);
        var pending = promise.state() === 'pending';

        if (pending) {
          var $markers = $this.find('.map-marker');
          $markers.each(function () {   // make sure markers preload also
            if (pending) promise = $.when(preloader.marker(this), promise);
          });

          promise.done(function () {    // reload and re-layout the popup
            that.mapPopupTooltipShow();
          });
          return that.createMapPopupDefer();
        }
        return that.createMapPopupHtml();
      },

      gravityCB: function () {
        var $this = $(this);
        var that = $this.data('map');

        // need the restricted height via the restricted width and current ratio
        var dim = that.getMapPopupWH();
        var height = dim.h ? dim.h : dim.w2;
        var top = $this.offset().top;

        return (top - height - 20) < $(window).scrollTop() ? 'nw' : 'sw';
      },

      mapPopupTooltipShowCB: function () {
        var $this = $(this);
        tips.show($this);
      },

      mapPopupTooltipHideCB: function () {
        var $this = $(this);
        tips.hide($this);
     },

      mapPopupTooltipShow: function () {
        tips.show(this.$map);
      },

      mapPopupTooltipHide: function () {
        tips.hide(this.$map);
      },

      createMapPopupTooltip: function () { // only used small map popup
          tipsie.set(this.$map, {
            tipClass: 'map-tip-popup',
            delayIn: 50,
            opacity: '1.0',
            html: true,
            fade: true,
            trigger: 'manual',
            gravity: this.gravityCB,
            title: this.createMapPopupCB
          });
          this.$map
            .on('mouseover mouseenter', this.mapPopupTooltipShowCB)
            .on('mouseleave click', this.mapPopupTooltipHideCB);
      },

    });

/* *********************  Map Coords with Hover Popup ********************* */

    function Coords($map) {
      var that = this;

      this.x = $map.data('x');
      this.y = $map.data('y');
      this.iconTitle = '[' + this.x + ',' + this.y + ']';

      var $a = $map.find('a');
      if ($a.length) {
        $map.find('sup').unwrap();
      }

      var $markers = $map.find('.map-marker');

      this.initMap($map, false, $markers, true);

      that.createMapPopupTooltip();
    }

    Coords.prototype = new Map();

/* *********************  Map Link with Hover Popup ********************* */

    function Link($map) {
      var that = this;

      var $a = $map.find('a');
      if ($a.length) {
        $map.text($a.text());
      }

      this.initMap($map, false, false, false);

      that.createMapPopupTooltip();
    }

    Link.prototype = new Map();

/* *********************  Embeded Map ********************* */

    function Embedded($map) { // Template:Map

      var smallSrc = $map.data('small');

      var $markers = $map.find('.map-marker');

      this.initMap($map, this.findEditLink($map), $markers.length ? $markers : false, false);

      $map.find('> a > img')
        .unwrap();

      if ($markers.length) {
        $map
          .addClass('map-preload');

        var defer = $.when(
          preloader.imgPromise(smallSrc)
        )

        $markers.each(function () {
          defer = $.when(preloader.marker(this), defer); // first display, make sure markers preload also
        });

        defer.done(function () {
          $map
            .removeClass('map-preload');
          tips.addTextTip($markers, 'hover');
        });
      } else {
        $map
          .removeClass('map-preload');
      }
    }

    Embedded.prototype = new Map();

    $.extend(Embedded.prototype, {

      findEditLink: function ($map) {
        var $walker = $map,
          $prev, $h = false,
          $top = $('#mw-content-text');

        while (!$walker.is($top)) {
          if (/^h\d$/i.test($walker[0].nodeName)) {
            $h = $walker;
            break;
          }
          $prev = $walker.prev();
          $walker = $prev.length ? $prev : $walker.parent();
        }

        if (!mw.config.get('wgUserName')) {
          return '/Special:SignUp?returnto=' +
            mw.util.wikiUrlencode(
              mw.config.get('wgPageName') +
              ($h ? '#' + $h
                .find('.mw-headline')
                .attr('id') : '')
            ) +
            '&type=login';
        }

        return $h ? $h
          .find('.editsection > a')
          .attr('href') : '?action=edit';
      }
    });

/* *********************  Legend  ********************* */

    function Legend($markers) {
      this.parsed = {};
      this.forceIndex = [];

      $markers.each(
        $.proxy(this.readNote, this)
      );
      delete this.forceIndex;
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

      isCoord: function (coord) {
        return (/^[-+]?\d{1,16}(?:\.\d{1,6})?$/).test(coord);
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
        if (!legend || !legend.length) return false;

        id = 'mn' + nId++;
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

      renderIndexed: function (key, notes) {
        var i, node, span;

        span = document.createElement('span');
        span.setAttribute('class', 'map-subGroup-name');
        span.appendChild(
          document.createTextNode(key)
        );

        node = document.createElement('div');
        node.setAttribute('class', 'map-subGroup');
        node.appendChild(span);

        for (i = 0; i < notes.length; i++) {
          span = document.createElement('span');
          span.setAttribute('class', 'map-subGroup-note pseudo-link');
          span.setAttribute('data-note', notes[i]);
          span.appendChild(
            document.createTextNode(i + 1)
          );
          node.appendChild(span);
        }

        return node;
      },

      renderNamed: function (key, value) {
        var node = document.createElement('div');
        node.setAttribute('data-note', value);
        node.setAttribute('class', 'map-group-note pseudo-link');
        node.appendChild(
          document.createTextNode(key)
        );
        return node;
      },

      renderGroup: function (key, list) {
        var sorted, nodes = [], div;

        div = document.createElement('div');
        div.setAttribute('class', 'map-group-name')
        div.appendChild(
          document.createTextNode(key)
        );
        nodes.push(div);

        div = document.createElement('div');
        div.setAttribute('class', 'map-group')
        nodes.push(div);

        sorted = new SortedObject(list.indexed);
        while (sorted.next()) {
          div.appendChild(
            this.renderIndexed(sorted.key(), sorted.val())
          );
        }

        sorted = new SortedObject(list.named);
        while (sorted.next()) {
          div.appendChild(
            this.renderNamed(sorted.key(), sorted.val())
          );
        }

        return nodes;
      },

      render: function () {
        var sorted = new SortedObject(this.parsed),
          nodes = [];

        while (sorted.next()) {
          nodes = nodes.concat(this.renderGroup(sorted.key(), sorted.val()));
        }

        this.$wrapper = $(document.createElement('div'))
          .addClass('map-legend-wrapper')
          .append(nodes);

        return $(document.createElement('div'))
          .addClass('map-legend')
          .css('background-image', "url('" + LEGEND_BG_LINK +"')")
          .append(this.$wrapper);
      },

      addScrollbar: function () {
        this.$wrapper.removeAttr('style');
        if (this.$wrapper.height() > layout.legend.h) {
          this.$wrapper
          .css({
            width: '255px',
            paddingRight: '15px',
            maxHeight: (layout.legend.h - 2 * LEGEND_PADDING) + 'px'
          });
        }
      }
    });

/* *********************  Map in Lightbox  ********************* */

    function MapLightbox(data) {
      this.projectionType = data.projectionType;
      this.largeSrc = data.src;
      this.zoneName = data.zone;
      this.extents = data.extents;
      this.editLink = data.editLink;
      this.file = data.file;
      this.href = data.href;
      this.autoShow = data.autoShow;

      var $markers = data.$markers

      if ($markers && $markers.length) {
        this.$markersOriginal = $markers;
        this.legend = new Legend($markers);
      }

      this.empty = !this.legend || this.legend.isEmpty();
    }

    $.extend(MapLightbox.prototype, {

      create: function () {
        var defer = $.Deferred();

        layout.setImage(this.largeSrc)

        this.createHeader();
        this.createLargeMap();
        if (!this.empty) {
          this.createLegend();
        }

        layout.setLegend(this.empty);

        return defer.resolve().promise();
      },

      initLightbox: function () {
        var that = this;

        layout.doLayout();  // need re-layout after image pre-load completes
        this.resize();          //  which suplies data to these resizes and inits

        this.initHeader();
        this.initLargeMap();
        if (!this.empty) {
          this.initLegend();
        }

        this.callbacks = {
          close: function () { that.close(); },
          resize: function () { that.resize(); },
          refresh: function () { that.refresh(); }
        };

        callbacks.refresh.add(this.callbacks.refresh);
        callbacks.resize.add(this.callbacks.resize);
        callbacks.close.add(this.callbacks.close);
      },

      createHeader: function () {
        this.$scale = $('<span class="map-scale" style="display:none;"></span>');
        this.$coordinates = $('<span class="map-coordinates" style="display:none;"></span>');
        this.$close = $('<a href="#" class="map-close pseudo-link" title="Close">Close</a>');

        this.$info = $('<span class="map-info"></span>')
          .append( $('<span class="map-title"></span>')
            .text(this.zoneName))
          .append(this.$scale)
          .append(this.$coordinates);

        this.$buttons = $('<span class="map-buttons"></span>');

        this.$buttons
          .append($('<a class="map-href"></a>')
              .prop('href', mw.html.escape(this.href))
              .prop('title', mw.html.escape(this.file))
              .text(this.file));

        if (EDIT_NOTE_ENABLE && this.editLink) {
          this.$buttons
            .append($('<a class="map-href" title="Edit Map Notes">Edit Map Notes</a>')
              .prop('href', this.editLink))
            .append($('<a class="map-href" title="About Map Notes">About Map Notes</a>')
              .prop('href', ABOUT_NOTE_LINK));
        }

        this.$buttons
          .append(this.$close);

        this.$header = $('<div class="map-header" style="display:none;"></div>')
          .css('background-image', "url('" + LEGEND_BG_LINK +"')")
          .append(this.$info)
          .append(this.$buttons)
          .appendTo(document.body);
      },

      closeButtonClick: function () {
        callbacks.close.fire();
        return false;
      },

      initHeader: function () {
        this.$close
          .click( this.closeButtonClick );
      },

      showNotice: function () {
        if (this.$notice) return;

        this.$notice = $('<div class="map-title">press SPACE to fade map</div>')
          .css({
            position: 'fixed',
            left: layout.map.x + layout.map.w / 20 + 'px',
            top: layout.map.y + layout.map.h / 10 * 9 + 'px'
          });

        this.$largeMap
          .append(this.$notice);

        this.clearNotice = $.proxy(this.removeNotice, this);
        callbacks.close.add(this.clearNotice);
        callbacks.refresh.add(this.clearNotice);
        callbacks.resize.add(this.clearNotice);

        window.setTimeout($.proxy(this.fadeNotice, this), 3000);
      },

      fadeNotice: function () {
        if (!this.$notice) return;
        this.$notice
          .fadeOut(200,
            $.proxy(this.removeNotice, this)
          );
      },

      removeNotice: function () {
        if (!this.$notice) return;
        this.$notice.remove();
        callbacks.close.remove(this.clearNotice);
        callbacks.refresh.remove(this.clearNotice);
        callbacks.resize.remove(this.clearNotice);
        delete this.$notice;
        delete this.clearNotice;
      },

      createLargeMap: function () {
        if (this.$markersOriginal) {
          this.$markers = this.$markersOriginal
            .clone()
            .each(function () {
              var $this = $(this);
              $this
                .attr({
                  id: $this.attr('data-note'),
                  title: $this.attr('original-title')
                })
                .removeAttr('orginal-title');
            });
        }

        this.$image = $('<img>', {
          src: this.largeSrc
        });

        this.$largeMap = $('<div class="map-large" style="display:none;"></div>')
          .append(this.$image);

        if (this.$markers) {
          this.$largeMap
            .append(this.$markers);
        }

        this.$largeMap
          .appendTo(document.body);
      },

      initLargeMap: function () {
        var that = this;

        if (this.$markers) {
          tips.addTextTip(this.$markers, 'hover', this.autoShow);
          //tips.addTextTip(this.$markers, 'manual', this.autoShow);
        }

        this.$largeMap
          .on('mouseenter mousemove', $.proxy(this.updateCoords, this))
          .mouseleave($.proxy(this.hideCoords, this));

        if (this.$markers) {
          this.showNotice();

          $(document.body)
            .on('keydown.mapLightbox', function (e) {
              if (e.which === 32) that.fadeMap();
            })
            .on('keyup.mapLightbox', function (e) {
              if (e.which === 32) that.showMap();
            })
            .on('keypress.mapLightbox', function (e) {
              e.stopImmediatePropagation();
              e.preventDefault();
            });
        }
      },

      createLegend: function () {
        this.$legend = this.legend.render()
          .css('display', 'none')
          .appendTo(document.body);
      },

      initLegend: function () {
        var that = this;
        this.$legend
          .find('.pseudo-link')
          .mouseenter(function () {
            tips.show($( document.getElementById($(this).data('note')) ));
          })
          .mouseleave(function () {
            tips.hide($( document.getElementById($(this).data('note')) ));
          });

        this.$legend
          .find('.map-group-name')
          .data('opened', true)
          .css('cursor', 'pointer')
          .click(function () {
            var $this = $(this),
              move = $this.data('opened') ? 'slideUp' : 'slideDown',
              $group = $this.next('.map-group');

            $this.data('opened', !$this.data('opened'));

            $group[move](100, function () {
              that.legend.addScrollbar();
            });
          });
      },

      hideCoords: function () {
        this.$coordinates.css('display', 'none');
        this.showMap();
        this.showHideButtons();
      },

      fadeMap: function () {
        if (!this.isInCorner) {
          this.$image.stop().animate({ opacity: 0.25 }, 200);
          this.isInCorner = true;
        }
      },

      showMap: function () {
        if (this.isInCorner) {
          this.$image.stop().animate({ opacity: 1 }, 200);
          this.isInCorner = false;
        }
      },

      updateCoords: function (e) {                // display current mouse hover map coordinates
        var projection = projectionLinear;
        //var projection = projectionEPSG3857;

        var displayString = projection.clientPointToCoordsDisplay(e, layout.map, this.extents)

        this.$coordinates
          .css('display', 'inline')
          .text(displayString);

        this.showHideButtons();
      },

/*
      formatCoord: function (coord, min, max) {   // format and clip coordinates to extents
        var c = Math.round(coord * 10.0) / 10.0;
        if (min > max) { var m = min; min = max; max = m; } // dont assume the coord systems handedness
        c = Math.min(max - 0.1, Math.max(min + 0.1, c));
        return Math.round(c) === c ? c + '.0' : c;
      },

      updateCoords: function (e) {                // display current mouse hover map coordinates
        var map = layout.map, extents = this.extents;
        var left = extents.left, top = extents.top,
          right = extents.right, bottom = extents.bottom,
          centerx = extents.centerx, centery = extents.centery;

        var x100 = (e.clientX - map.x) / map.w * 100.0,
          y100 = (e.clientY - map.y) / map.h * 100.0;

        var x, y;
        if (centerx)
          if (x100 < 50.0)
            x = ((x100 * 2) / 100.0) * (centerx - left) + left;
          else
            x = (((x100 - 50.0) * 2) / 100.0) * (right - centerx) + centerx;
        else
          x = (x100 / 100.0) * (right - left) + left;

        if (centery)
          if (y100 < 50.0)
            y = ((y100 * 2) / 100.0) * (centery - top) + top;
          else
            y = (((y100 - 50.0) * 2) / 100.0) * (bottom - centery) + centery;
        else
          y = (y100 / 100.0) * (bottom - top) + top;

        this.$coordinates
          .css('display', 'inline')
          .text(
            this.formatCoord(x, left,  right) + ',' +
            this.formatCoord(y, top, bottom) + (
              left == 0 && top == 0 && right == 100 && bottom == 100 ? '' :
              '   (' + this.formatCoord(x100, 0, 100) + ',' +
              this.formatCoord(y100, 0, 100) + ')'
            )
          );

        this.showHideButtons();
      },
*/
      refresh: function () {
        this.$header
          .add(this.$largeMap)
          .add(this.$legend)
          .css('display', 'none');
      },

      resize: function () {
        var map = layout.map;

        this.resizePart(this.$header, layout.header);
        this.resizePart(this.$largeMap, map);
        if (!this.empty) {
          this.resizePart(this.$legend, layout.legend);
        }

        this.$image.attr({
          width: map.w + 'px',
          height: map.h + 'px'
        });

        if (map.scale !== 100) {
          this.$scale
            .css('display', 'inline')
            .text('scale: ' + map.scale + '%');
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

        if (infoWidth + buttonWidth + 20 >= layout.map.w) {
          this.$buttons.addClass('map-minimal');
        }
      },

      resizePart: function (part, values) {
        part
          .css({
            width: values.w + 'px', height: values.h + 'px',
            left: values.x + 'px', top: values.y + 'px',
            display: 'block'
          });
      },

      close: function () {
        this.$header.remove();
        this.$largeMap.remove();
        if (!this.empty) {
          this.$legend.remove();
        }

        delete this.$info;
        delete this.$buttons;
        delete this.$scale;
        delete this.$coordinates;
        delete this.$close;
        delete this.$header;
        delete this.$image;
        delete this.$markers;
        delete this.$largeMap;
        if (!this.empty) {
          delete this.$legend;
          delete this.legend.$wrapper;
        }

        callbacks.refresh.remove(this.callbacks.refresh);
        callbacks.resize.remove(this.callbacks.resize);
        callbacks.close.remove(this.callbacks.close);
        delete this.callbacks;
      }
    }); // end of Map in Lightbox, MapLightbox


/* *********************  MapProjection  ********************* */

    var projectionLinear = {

      formatCoord: function (coord, min, max) {   // format and clip coordinates to extents
        var c = Math.round(coord * 10.0) / 10.0;
        if (min > max) { var m = min; min = max; max = m; } // dont assume the coord systems handedness
        c = Math.min(max - 0.1, Math.max(min + 0.1, c));
        return Math.round(c) === c ? c + '.0' : c;
      },

      // display current mouse hover map coordinates
      clientPointToCoordsDisplay: function (e, map, extents) {
        // find client point and percentage
        var left = extents.left, top = extents.top,
          right = extents.right, bottom = extents.bottom,
          centerx = extents.centerx, centery = extents.centery;

        var x100 = (e.clientX - map.x) / map.w * 100.0,
          y100 = (e.clientY - map.y) / map.h * 100.0;

        var x, y;
        if (centerx)
          if (x100 < 50.0)
            x = ((x100 * 2) / 100.0) * (centerx - left) + left;
          else
            x = (((x100 - 50.0) * 2) / 100.0) * (right - centerx) + centerx;
        else
          x = (x100 / 100.0) * (right - left) + left;

        if (centery)
          if (y100 < 50.0)
            y = ((y100 * 2) / 100.0) * (centery - top) + top;
          else
            y = (((y100 - 50.0) * 2) / 100.0) * (bottom - centery) + centery;
        else
          y = (y100 / 100.0) * (bottom - top) + top;

        // update display
        return this.formatCoord(x, left,  right) + ',' +
            this.formatCoord(y, top, bottom) + (
              left == 0 && top == 0 && right == 100 && bottom == 100 ? '' :
              '   (' + this.formatCoord(x100, 0, 100) + ',' +
              this.formatCoord(y100, 0, 100) + ')');
      }
    };

    var projectionEPSG3857 = {

      R: 6378137,
      MAX_LATITUDE: 85.0511287798,

      _a: null, _b: null, _c: null, _d: null,
      setTransform: function (a,b,c,d) {
        this._a = a; this._b = b; this._c = c; this._d = d;
      },

      formatCoord: function (coord, min, max) {   // format and clip coordinates to extents
        var c = Math.round(coord * 10.0) / 10.0;
        if (min > max) { var m = min; min = max; max = m; } // dont assume the coord systems handedness
        c = Math.min(max - 0.1, Math.max(min + 0.1, c));
        return Math.round(c) === c ? c + '.0' : c;
      },

      // display current mouse hover map coordintes
      clientPointToCoordsDisplay: function (e, map, extents) {
        // set environment for EPSG:3857
        var scale = 0.5 / (Math.PI * this.R);
        this.setTransform(scale, 0.5, -scale, 0.5)

        // find client point and percentage
        var left = extents.left, top = extents.top,
          right = extents.right, bottom = extents.bottom,
          centerx = extents.centerx, centery = extents.centery;

        var xP = e.clientX - map.x,
          yP = e.clientY - map.y;
        var x100 = xP / map.w * 100.0,
          y100 = yP / map.h * 100.0;
        var xPE = this.R * (x100 / 100.0),
          yPE = this.R * (y100 / 100.0);

        // transform the point to EPSG:3857
        scale = null;
        var scale = scale || 1;
        //var xPS = (xPE / scale - this._b) / this._a,
        //  yPS = (yPE / scale - this._d) / this._c;
        var xPS = xPE,
          yPS = yPE;

        var d = 180 / Math.PI;
        var y2 = (2 * Math.atan(Math.exp(yPS / this.R)) - (Math.PI / 2)) * d,
          x2 = xPS * d / this.R;
        if (isNaN(y2) || isNaN(x2))
          { y2 = 0; x2 = 0; }

        // transform as linear sections
        var x, y;
        if (centerx)
          if (x100 < 50.0)
            x = ((x100 * 2) / 100.0) * (centerx - left) + left;
          else
            x = (((x100 - 50.0) * 2) / 100.0) * (right - centerx) + centerx;
        else
          x = (x100 / 100.0) * (right - left) + left;

        if (centery)
          if (y100 < 50.0)
            y = ((y100 * 2) / 100.0) * (centery - top) + top;
          else
            y = (((y100 - 50.0) * 2) / 100.0) * (bottom - centery) + centery;
        else
          y = (y100 / 100.0) * (bottom - top) + top;

        // update display
        return this.formatCoord(x, left,  right) + ',' +
            this.formatCoord(y, top, bottom) +
            (left == 0 && top == 0 && right == 100 && bottom == 100 ? '' :
              '   (' + this.formatCoord(x100, 0, 100) + ',' +
              this.formatCoord(y100, 0, 100) + ')') +
            ('   (' + this.formatCoord(x2, -999999999999, 999999999999) + ',' +
              this.formatCoord(y2, -999999999999, 999999999999) + ')');
            //('   (' + x2 + ',' +
            //  y2 + ')');
      }
    };
          /*
      R: 6378137,
      MAX_LATITUDE: 85.0511287798,

      export function Transformation(a, b, c, d) {
        if (Util.isArray(a)) {
          // use array properties
          this._a = a[0];
          this._b = a[1];
          this._c = a[2];
          this._d = a[3];
          return;
        }
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
      }

      export function toTransformation(a, b, c, d) {
        return new Transformation(a, b, c, d);
      }

      transformation: (function () {
        var scale = 0.5 / (Math.PI * SphericalMercator.R);
        return toTransformation(scale, 0.5, -scale, 0.5);
      }())

      scale: function (zoom) {
        return 256 * Math.pow(2, zoom);
      },
      zoom: function (scale) {
        return Math.log(scale / 256) / Math.LN2;
      },

      pointToLatLng: function (point, zoom) {
        var scale = this.scale(zoom),
            untransformedPoint = this.transformation.untransform(point, scale);

        return this.projection.unproject(untransformedPoint);
      },

      untransform: function (point, scale) {
        scale = scale || 1;
        return new Point(
                (point.x / scale - this._b) / this._a,
                (point.y / scale - this._d) / this._c);
      }

      unproject: function (point) {
        var d = 180 / Math.PI;
        return new LatLng(
          (2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
            point.x * d / this.R);
      },

      export function LatLng(lat, lng, alt) {
        if (isNaN(lat) || isNaN(lng)) {
          throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
        }

        // @property lat: Number
        // Latitude in degrees
        this.lat = +lat;

        // @property lng: Number
        // Longitude in degrees
        this.lng = +lng;

        // @property alt: Number
        // Altitude in meters (optional)
        if (alt !== undefined) {
          this.alt = +alt;
        }
      }
      */

      /*
      transformation: (function () {
        var scale = 0.5 / (Math.PI * SphericalMercator.R);
        return toTransformation(scale, 0.5, -scale, 0.5);
      }())

      scale: function (zoom) {
        return 256 * Math.pow(2, zoom);
      },

      zoom: function (scale) {
        return Math.log(scale / 256) / Math.LN2;
      },

      pointToLatLng: function (point, zoom) {
        var scale = null; //1; //256 * Math.pow(2, zoom ? zoom : 1);

        scale = scale || 1;
        var x = (point.x / scale - this._b) / this._a;
        var y = (point.y / scale - this._d) / this._c;

        return this.projection.unproject(untransformedPoint);
      },

      untransform: function (point, scale) {
        scale = scale || 1;
        return new Point(
                (point.x / scale - this._b) / this._a,
                (point.y / scale - this._d) / this._c);
      }

      unproject: function (point) {
        var d = 180 / Math.PI;
        return new LatLng(
          (2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
            point.x * d / this.R);
      },
      */
/*
      formatCoord: function (coord, min, max) {   // format and clip coordinates to extents
        var c = Math.round(coord * 10.0) / 10.0;
        if (min > max) { var m = min; min = max; max = m; } // dont assume the coord systems handedness
        c = Math.min(max - 0.1, Math.max(min + 0.1, c));
        return Math.round(c) === c ? c + '.0' : c;
      },

      clientPointToCoordsDisplay: function (e, map, extents) {  // display current mouse hover map coordinates
        var left = extents.left, top = extents.top,
          right = extents.right, bottom = extents.bottom,
          centerx = extents.centerx, centery = extents.centery;

        var x100 = (e.clientX - map.x) / map.w * 100.0,
          y100 = (e.clientY - map.y) / map.h * 100.0;

        var d = 180 / Math.PI;
        var y2 = (2 * Math.atan(Math.exp(y100 / this.R)) - (Math.PI / 2)) * d;
        var x2 = x100 * d / this.R;

        var x, y;
        if (centerx)
          if (x100 < 50.0)
            x = ((x100 * 2) / 100.0) * (centerx - left) + left;
          else
            x = (((x100 - 50.0) * 2) / 100.0) * (right - centerx) + centerx;
        else
          x = (x100 / 100.0) * (right - left) + left;

        if (centery)
          if (y100 < 50.0)
            y = ((y100 * 2) / 100.0) * (centery - top) + top;
          else
            y = (((y100 - 50.0) * 2) / 100.0) * (bottom - centery) + centery;
        else
          y = (y100 / 100.0) * (bottom - top) + top;

        return this.formatCoord(x, left,  right) + ',' +
            this.formatCoord(y, top, bottom) +
            (left == 0 && top == 0 && right == 100 && bottom == 100 ? '' :
              '   (' + this.formatCoord(x100, 0, 100) + ',' +
              this.formatCoord(y100, 0, 100) + ')') +
            ('   (' + this.formatCoord(x2, left,  right) + ',' +
              this.formatCoord(y2, top, bottom) + ')');
      },
*/

/* *********************  Map in Lightbox Layout  ********************* */

    var layout = ({

      header: {
        h: HEADER_HEIGHT + HEADER_PADDING * 2
      },

      margin: {
        vertical: MARGIN_VERTICAL * 2,
        horizontal: MARGIN_HORIZONTAL * 2
      },

      between: {
        headerMap: MARGIN_INNER
      },

      // current layout, in pixels
      image: {        // natural image
        src: null
      },
      win: {          // html client window
        w: null,
        h: null
      },
      map: {          // image display layout
        w: null,
        h: null,
        scale: null   // percent scale of max display size
      },

      setImage: function (imageSrc) {
        this.image.src = imageSrc;
        preloader.imgObj(imageSrc);   // start the preload right away
      },

      getMapRatio: function (imageSrc) {
        var mapRatio = MAP_RATIO;       // predfined image ratio from settings

        if (!mapRatio) {  // get natural ratio if not predefined, if image is loaded
          var imgObj = preloader.imgObj(imageSrc);

          if (imgObj) {
            var w = imgObj.naturalWidth,
              h = imgObj.naturalHeight;

            if (w && h) {
              mapRatio = w / h;
            }
          }
        }
        return mapRatio;
      },

      resetLegend: function () {
        this.legend = {
          w: COLUMN_WIDTH + COLUMN_PADDING * 2
        };
        this.between.mapLegend = MARGIN_INNER;
      },

      setLegend: function (empty) {
        if (empty) {
          this.legend = { w: 0, h: 0, x: 0, y: 0 };
          this.between.mapLegend = 0;
        } else {
          this.resetLegend();
        }

        this.doLayout();
      },

      // sets layout of interface elements based on current client area and maximum possible image
      doLayout: function () {

        var win = this.win, $window = $(window);
        win.w = $window.width();
        win.h = $window.height();

        // total remaining area left-over available for image, inside current client area
        var header = this.header, legend = this.legend;
        var maxImageW = win.w - (legend.w + this.between.mapLegend + this.margin.horizontal);
        var maxImageH = win.h - (header.h + this.between.headerMap + this.margin.vertical);

        // clip max available height and width
        maxImageW = Math.min(MAP_MAX_WIDTH, maxImageW);
        maxImageH = Math.min(MAP_MAX_HEIGHT, maxImageH);

        // get image aspect ratio from predfined settings or image
        var mapRatio = this.getMapRatio(this.image.src);

        // scale max available height and width to ratio
        if (mapRatio) {
          var newHeight = Math.round(maxImageW / mapRatio);  // 3 wide / 2 high -> height = width / 1.5

          if (newHeight > maxImageH)                         // rescale width if scale height needs clipping
            maxImageW = Math.round(maxImageH * mapRatio);    // like 2 high * 1.5 = 3 wide
          else
            maxImageH = newHeight;                           // set new available height
        }

        // set straw-man image width and height
        var map = this.map;
        map.w = maxImageW;
        map.h = maxImageH;

        map.scale = Math.min(Math.max(Math.round(map.w / MAP_MAX_WIDTH * 100),
            Math.round(map.h / MAP_MAX_HEIGHT * 100)), 100);

        if (map.scale < MIN_SCALE) {  // image hole is less than 50% of the max hole then bail, not sure why
          callbacks.disable.fire();
          callbacks.close.fire();

        } else {
          header.y = Math.round((win.h - map.h - header.h - this.between.headerMap) / 2);
          header.x = Math.round((win.w - map.w - legend.w - this.between.mapLegend) / 2);
          header.w = map.w;

          map.x = header.x;
          map.y = header.y + header.h + this.between.headerMap;

          if (legend.w) {
            legend.h = map.h + header.h + this.between.headerMap;
            legend.x = map.x + header.w + this.between.mapLegend;
            legend.y = Math.round((win.h - legend.h) / 2);
          }

          callbacks.enable.fire();
        }
      },

      init: function () {
        this.resetLegend();
        callbacks.refresh.add($.proxy(this.doLayout, this));
        callbacks.close.add($.proxy(this.resetLegend, this));
        return this;
      }

    }).init();

    function isWikiaImage(src) {
      return src && src.length &&
        /^(?:https?:)?\/\/(images|static|img|vignette)(\d*)\.wikia\.(?:nocookie\.net|com)\//.test(src);
    }

    function isWithinBounds(data, min, max) {
      return data !== undefined && data !== null && data >= min && data <= max;
    }

    // now that the infrastructure is in place, process each command on the page
    $maps.each(function () {
      var $map = $(this);

      if (!$map.data('map') &&
        isWikiaImage($map.data('small')) &&
        isWikiaImage($map.data('large')) &&
        isWithinBounds($map.data('width'), MAP_MIN_WIDTH, MAP_MAX_WIDTH)
      ) {
        if ($map.hasClass('map-coords')                 // Template:Map/Coords
        ) {
          $map.data('map', new Coords($map));
        } else if ($map.hasClass('map-textlink')) { // Template:Map/Link
          $map.data('map', new Link($map));
        } else if ($map.hasClass('map-embed')) {    // Template:Map
          $map.data('map', new Embedded($map));
        }
      }
    });

    layout.doLayout();   // will also set Map to enabled
    $(window)
      .resize(callbacks.refresh.fire)
      .resize($.debounce(100, callbacks.resize.fire));

  } // end of initMaps()

  // only initialize map plugin if maps are found
  $(function () {
    var $maps = $('.map');    // maps are marked with map class
    if ($maps.length) {
      initMaps($maps);
    }
  });

}(mediaWiki, jQuery, window, window.document));