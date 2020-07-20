/* Adds visual WoW map and mapping constructs to the wiki pages. */
 
/**************************************************************************************
 
* This 'MediaWiki:MapLightbox/code.js' is included by MediaWiki:Common.js, and is
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
 
  // this module needs lots of CSS and all of it is in MediaWiki:Wikia.css (for now)
  if ('oasis' !== mw.config.get('skin')) return;
 
  if (window.sessionStorage && window.sessionStorage.getItem('noMapLightbox')) return;
 
  var MAP_ICONS = '//images3.wikia.nocookie.net/__cb1/wowwiki/images/f/f3/Map-sprites.png',
    LEGEND_BG = '//images1.wikia.nocookie.net/__cb1/wowwiki/images/5/50/Map-legend-bg.jpg',
    ABOUT_NOTES = '/Template:Zone_Map_Note',
 
    MAP_MAX_WIDTH   = 1002,
    MAP_MAX_HEIGHT  =  668,
    MAP_MIN_WIDTH   =   50,
 
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
 
    var n = 0;
 
    var log = (window.console && window.sessionStorage &&
      window.sessionStorage.getItem('debugMapLightbox') && function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('MapLightbox: ');
        return window.console.log.apply(window.console, args);
      }) || $.noop;
 
    var callbacks = {
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
 
      cancel: function (src) {
        delete preloader.imgDefers[src];
      },
 
      tipsy: function () {
        var defer = $.Deferred();
        mw.loader.using('jquery.tipsy', defer.resolve);
        return defer.promise();
      }
    };
 
    function SortedObject (obj) {
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
 
    var tips = {
 
      gravity: function () {
        var $icon = $(this),
          w = $icon.parent().width(),
          offset = w / 100 * $icon.data('x');
        return offset > 200 ? (offset < w - 200 ? 's' : 'se') : 'sw';
      },
 
      add: function ($icons, trigger, autoShow) {
        $icons
        .tipsy({
          delayIn: 50,
          opacity: 1,
          trigger: trigger,
          fade: true,
          gravity: tips.gravity
        });
        if (autoShow && $icons.length) {
          $icons.tipsy('show');
          tips.close = function () {
            $icons.tipsy('hide');
            callbacks.close.remove(tips.close);
            delete tips.close;
          };
          callbacks.close.add(tips.close);
        } else if (trigger === 'manual') {
          $icons
          .mouseenter(tips.show)
          .mouseleave(tips.hide);
        }
      },
 
      show: function () {
        $(this).tipsy('show');
      },
 
      hide: function () {
        $(this).tipsy('hide');
      }
    };
 
    var blackOut = {
 
      $blackOut: false,
 
      create: function () {
        log('blackOut.create');
        var defer = $.Deferred();
 
        this.$blackOut = $('<div></div>')
        .addClass('map-blackout')
        .css({
          width:  $(document).width()  + 'px',
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
        if (blackOut.$blackOut && blackOut.$blackOut.length) {
          blackOut.$blackOut
          .css({
            width:  $(document).width()  + 'px',
            height: $(document).height() + 'px'
          });
        }
      },
 
      close: function () {
        log('blackOut.close');
        if (blackOut.$blackOut && blackOut.$blackOut.length) {
 
          $('html').css('overflow', 'auto');
 
          callbacks.refresh.remove(blackOut.refresh);
          callbacks.close.remove(blackOut.close);
 
          blackOut.$blackOut
          .off('click')
          .stop().fadeOut(100, function () {
            blackOut.$blackOut.remove();
            blackOut.$blackOut = false;
          });
        }
      }
    };
 
    function Map () {}
 
    $.extend(Map.prototype, {
 
      init: function ($map, editLink, $icons, autoShow) {
        var largeSrc = $map.data('large'),
          file = 'File:' + largeSrc.split('/').pop(),
          href = mw.config.get('wgArticlePath').replace(/\$1/, file);
 
        this.src = $map.data('small');
        this.$map = $map;
 
        this.mapLightbox = new MapLightbox({
          src: largeSrc,
          zone: $map.data('zone'),
          editLink: editLink,
          file: file,
          href: href,
          $icons: $icons,
          autoShow: autoShow
        });
 
        this.callbacks = {
          enable:  $.proxy(this.enable, this),
          disable: $.proxy(this.disable, this)
        };
 
        callbacks.enable.add(this.callbacks.enable);
        callbacks.disable.add(this.callbacks.disable);
      },
 
      openLightbox: function () {
        log('Map.openLightbox');
 
        var $this = $(this),
          largeSrc = $this.data('large'),
          that = $this.data('map'),
 
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
          .off('click')
          .attr('title', 'click to enlarge')
          .click(this.openLightbox);
 
        callbacks.enable.remove(this.callbacks.enable);
        callbacks.disable.add(this.callbacks.disable);
      },
 
      disable: function () {
        log('Map.disable');
        this.$map
          .addClass('map-disabled')
          .attr('title', '(window too small to show map)')
          .off('click');
 
        callbacks.disable.remove(this.callbacks.disable);
        callbacks.enable.add(this.callbacks.enable);
      },
 
      createMap: function () {
        log('Map.createMap');
        var $this = $(this),
          that = $this.data('map'),
          w = $this.data('size'),
          h = Math.round(w * 2 / 3),
          promise = preloader.img(that.src),
          pending = promise.state() === 'pending',
          blip = that.x || that.y,
          content, id;
 
        if (blip && pending) {
          promise = $.when(
            preloader.img(MAP_ICONS),
            promise
          );
        }
 
        content  = '<div style="position: relative;">';
        content += '<img src="' + that.src + '" width="' +
          w + 'px" height="' + h + 'px">';
        if (blip) {
          content += '<div class="map-Icon map-Blip" style="left: ' +
            that.x + '%; top: ' + that.y + '%;"></div>';
        }
        content += '</div>';
 
        if (pending) {
          id = 'hm' + (n++);
 
          promise
          .done(function () {
            $('#'+id).replaceWith(content);
          });
 
          return '<div id="' + id +
            '" style="position: relative; width: '+ w + 'px;' +
            'height: ' + h + 'px;" class="ZoneMap map map-preload"></div>';
        }
 
        return content;
      },
 
      gravity: function () {
        var $this = $(this),
          top = $this.offset().top,
          h = Math.round($this.data('size') * 2 / 3);
        return top - h - 20 < $(window).scrollTop() ? 'nw' : 'sw';
      },
 
      addTipsy: function () {
        log('Map.addTipsy');
        this.$map
        .tipsy({
          delayIn: 50,
          opacity: '1.0',
          html: true,
          fade: true,
          trigger: 'manual',
          gravity: this.gravity,
          title: this.createMap
        })
        .on('mouseover mouseenter', function () {
          if (!$(document.body).hasClass('map-tipsy')) {
            $(this).tipsy('show');
            $(document.body).addClass('map-tipsy');
          }
        })
        .on('mouseleave click', function () {
          $(this).tipsy('hide');
          $(document.body).removeClass('map-tipsy');
        });
      }
    });
 
    function Coords ($map) {
      var $a = $map.find('a'),
        that = this, $icon;
 
      this.x = $map.data('x');
      this.y = $map.data('y');
      this.iconTitle = '[' + this.x + ',' + this.y + ']';
 
      if ($a.length) {
        $map.find('sup').unwrap();
      }
 
      $map.addClass('map-preload');
 
      $icon = $('<div></div>', {
        'data-x': this.x,
        'data-y': this.y,
        'data-icon': 'Blip',
        'data-note': 'mn0',
        'title': this.iconTitle,
        'original-title': this.iconTitle
      })
      .css({
        left: this.x + '%',
        top:  this.y + '%'
      })
      .addClass('map-Icon map-Blip');
 
      this.init($map, false, $icon, true);
 
      preloader.tipsy()
      .done(function () {
        that.addTipsy();
      });
    }
 
    Coords.prototype = new Map();
 
    function Link ($map) {
      var $a = $map.find('a'),
        that = this;
 
      if ($a.length) {
        $map.text($a.text());
      }
 
      this.init($map, false, false, false);
 
      preloader.tipsy()
      .done(function () {
        that.addTipsy();
      });
 
    }
 
    Link.prototype = new Map();
 
    function Embedded ($map) {
 
      var smallSrc = $map.data('small'),
        $icons = $map.find('.map-Icon,.map-POI');
 
      if (!$icons.length) $icons = false;
 
      this.init($map, this.findEditLink($map), $icons, false);
 
      $map
      .find('> a > img')
      .unwrap();
 
      if ($icons) {
        $map
        .addClass('map-preload');
        $.when(
          preloader.img(MAP_ICONS),
          preloader.tipsy(),
          preloader.img(smallSrc)
        )
        .done(function () {
          $map
          .removeClass('map-preload');
          tips.add($icons, 'hover');
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
        if (!legend || !legend.length) return false;
 
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
 
      renderIndexed: function (key, notes) {
        var i, node, n;
 
        n = document.createElement('span');
        n.setAttribute('class', 'map-subGroup-name');
        n.appendChild(
          document.createTextNode(key)
        );
 
        node = document.createElement('div');
        node.setAttribute('class', 'map-subGroup');
        node.appendChild(n);
 
        for (i = 0; i < notes.length; i++) {
          n = document.createElement('span');
          n.setAttribute('class', 'map-subGroup-note pseudo-link');
          n.setAttribute('data-note', notes[i]);
          n.appendChild(
            document.createTextNode(i + 1)
          );
          node.appendChild(n);
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
        var sorted, nodes = [], n;
 
        n = document.createElement('div');
        n.setAttribute('class', 'map-group-name')
        n.appendChild(
          document.createTextNode(key)
        );
        nodes.push(n);
 
        n = document.createElement('div');
        n.setAttribute('class', 'map-group')
        nodes.push(n);
 
        sorted = new SortedObject(list.indexed);
        while (sorted.next()) {
          n.appendChild(
            this.renderIndexed(sorted.key(), sorted.val())
          );
        }
 
        sorted = new SortedObject(list.named);
        while (sorted.next()) {
          n.appendChild(
            this.renderNamed(sorted.key(), sorted.val())
          );
        }
 
        return nodes;
      },
 
      render: function () {
        var sorted = new SortedObject(this.parsed),
          nodes = [], n;
 
        while (sorted.next()) {
          nodes = nodes.concat(this.renderGroup(sorted.key(), sorted.val()));
        }
 
        this.$wrapper = $(document.createElement('div'))
          .addClass('map-legend-wrapper')
          .append(nodes);
 
        return $(document.createElement('div'))
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
 
    function MapLightbox (data) {
      this.largeSrc = data.src;
      this.zoneName = data.zone;
      this.editLink = data.editLink;
      this.file     = data.file;
      this.href     = data.href;
      this.autoShow = data.autoShow;
 
      if (data.$icons && data.$icons.length) {
        this.$originalIcons = data.$icons;
        this.legend = new Legend(data.$icons);
      }
 
      this.empty = !this.legend || this.legend.isEmpty();
    }
 
    $.extend(MapLightbox.prototype, {
 
      prepare: function () {
        log('MapLightbox.prepare');
        var defer = $.Deferred();
 
        this.prepareHeader();
        this.prepareLargeMap();
        if (!this.empty) {
          this.prepareLegend();
        }
 
        dimensions.setLegend(this.empty);
 
        return defer.resolve().promise();
      },
 
      init: function () {
        log('MapLightbox.create');
 
        this.resize();
 
        this.initHeader();
        this.initLargeMap();
        if (!this.empty) {
          this.initLegend();
        }
 
        var that = this;
 
        this.callbacks = {
          close:   function () { that.close();   },
          resize:  function () { that.resize();  },
          refresh: function () { that.refresh(); }
        };
 
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
        );
 
        if (this.editLink) {
          this.$buttons
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
          );
        }
 
        this.$buttons
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
 
      showNotice: function () {
        if (this.$notice) return;
 
        this.$notice = $('<div></div>')
        .addClass('map-title')
        .text('press SPACE to fade map')
        .css({
          position: 'fixed',
          left: dimensions.largeMap.x + dimensions.largeMap.w / 20 + 'px',
          top:  dimensions.largeMap.y + dimensions.largeMap.h / 10 * 9 + 'px'
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
 
      prepareLargeMap: function () {
        log('MapLightbox.prepareLargeMap');
 
        if (this.$originalIcons) {
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
        }
 
        this.$image = $('<img>', {
          src: this.largeSrc
        });
 
        this.$largeMap = $('<div></div>')
        .addClass('map-large')
        .css('display', 'none')
        .append(this.$image);
 
        if (this.$icons) {
          this.$largeMap
          .append(this.$icons);
        }
 
        this.$largeMap
        .appendTo(document.body);
      },
 
      initLargeMap: function () {
        log('MapLightbox.initLargeMap');
        if (this.$icons) {
          tips.add(this.$icons, 'manual', this.autoShow);
        }
 
        this.$largeMap
        .on('mouseenter mousemove', $.proxy(this.updateCoords, this))
        .mouseleave($.proxy(this.hideCoords, this));
 
        if (this.$icons) {
          this.showNotice();
 
          var that = this;
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
 
        this.$legend
        .find('.map-group-name')
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
        this.$coords.css('display', 'none');
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
 
      updateCoords: function (e) {
        var x = (e.clientX - dimensions.largeMap.x) / dimensions.largeMap.w * 100,
          y = (e.clientY - dimensions.largeMap.y) / dimensions.largeMap.h * 100;
 
        this.$coords
          .css('display', 'inline')
          .text(this.formatCoord(x) + ',' + this.formatCoord(y));
 
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
        if (!this.empty) {
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
        if (!this.empty) {
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
        if (!this.empty) {
          delete this.$legend;
          delete this.legend.$wrapper;
        }
 
        callbacks.refresh.remove(this.callbacks.refresh);
        callbacks.resize.remove(this.callbacks.resize);
        callbacks.close.remove(this.callbacks.close);
        delete this.callbacks;
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
        return this;
      }
 
    }).init();
 
    function isWikiaImage (src) {
      return src && src.length &&
        /^(?:https?:)?\/\/(images|static|img|vignette)(\d*)\.wikia\.(?:nocookie\.net|com)\//.test(src);
    }
 
    function isWithinBounds (data, min, max) {
      return data !== undefined && data !== null && data >= min && data <= max;
    }
 
    $maps
    .each(function () {
      var $map = $(this);
      if (!$map.data('map') &&
        isWikiaImage($map.data('small')) &&
        isWikiaImage($map.data('large')) &&
        isWithinBounds($map.data('size'), MAP_MIN_WIDTH, MAP_MAX_WIDTH)
      ) {
        if ($map.hasClass('coords') &&
          isWithinBounds($map.data('x'), 0, 100) &&
          isWithinBounds($map.data('y'), 0, 100)
        ) {
          $map.data('map', new Coords($map));
        } else if ($map.hasClass('map-textlink')) {
          $map.data('map', new Link($map));
        } else if ($map.hasClass('map-embed')) {
          $map.data('map', new Embedded($map));
        }
      }
    });
 
    preloader.tipsy()
    .done(function () {
      dimensions.calculate();
    });
 
    $(window)
    .resize(callbacks.refresh.fire)
    .resize($.debounce(100, callbacks.resize.fire));
  }
 
  $(function () {
    var $maps = $('.map');
    if ($maps.length) {
      initMaps($maps);
    }
  });
 
}(mediaWiki, jQuery, window, window.document));