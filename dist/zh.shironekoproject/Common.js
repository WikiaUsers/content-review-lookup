/**
 * @copyright
 * http://zh.shironekoproject.wikia.com 白貓Project wiki
 * cc-by-sa 3.0
 */

; (function ($) {
  var updateResult = function (lookupTable) {
    var filters = [];
    var match = {
      'exact': function (attr, rule) { return attr === rule; },
      'contain': function (attr, rule) { return attr.indexOf(rule) !== -1; },
      'regexp': function (attr, rule) { return attr.match(RegExp(rule)); },
    };
    $('.mw-lookuptable-filtertype', lookupTable).each(function () {
      var filtertype = $(this), attrname = filtertype.data('attrname');
      var matchtype = filtertype.data('matchtype'), matchaction = filtertype.data('matchaction') === 'whitelist';
      var ruleitems = $('.mw-lookuptable-button[data-attrname="' + attrname + '"]', lookupTable), rules = [];
      ruleitems.each(function () {
        var rule = $(this);
        if (rule.hasClass('mw-lookuptable-filteroff') !== matchaction) rules.push(rule.data('value'));
      });
      var matchfunc = match[matchtype];
      filters.push(function (item) {
        var itemval = item.data(attrname);
        var result = !matchaction;
        $.each(rules, function (index, rule) {
          if (matchfunc(itemval, rule)) result = matchaction;
        });
        return result;
      });
    });
    var order = !$('.mw-lookuptable-sortdec.mw-lookuptable-sort-active').length; // true: inc; false: dec
    var sortactive = $('.mw-lookuptable-sortbutton.mw-lookuptable-sort-active'), sortattr, sorttype, sortinfo;
    sortattr = sortactive.data('attrname'), sorttype = sortactive.data('sorttype'), sortinfo = sortactive.data('sortinfo') || null;
    var cmps = {
      'numeric': function () { return function (x, y) { return x - y; }; },
      'literal': function () { return function (x, y) { return '' + x > '' + y ? 1 : '' + x < '' + y ? -1 : 0; }; },
      'custom': function () {
        var list = sortactive.data('sortorder').split(/\s+/);
        return function (x, y) { return list.indexOf(x) - list.indexOf(y); };
      }
    };
    var cmp = cmps[sorttype]();
    var container = $('.mw-lookuptable-items', lookupTable);
    $('.mw-lookuptable-item', container).sort(function (x, y) {
      var attr_x = $(x).data(sortattr), attr_y = $(y).data(sortattr);
      if (order) return cmp(attr_x, attr_y); else return -cmp(attr_x, attr_y);
    }).each(function () {
      var item = $(this);
      item.show();
      $.each(filters, function (i, filter) {
        if (!filter(item)) item.hide();
      });
      var iteminfo = $('.mw-lookuptable-iteminfo', item);
      if (!iteminfo.length) {
        $('a', item).prepend($('<span>').addClass('mw-lookuptable-iteminfo'));
        iteminfo = $('.mw-lookuptable-iteminfo', item);
      }
      if (sortinfo) iteminfo.text(item.data(sortinfo));
      else iteminfo.text('');
    }).appendTo(container);
  };
  var lookupTableHandler = function (lookupTable) {
    $('.mw-lookuptable-button', lookupTable).append($('<span class="mw-lookuptable-filterofftip">OFF</span>'));
    $('.mw-lookuptable-item', lookupTable).each(function () {
      var item = $(this), child = item.children(), ref = item;
      if (child.length === 1 && child.prop('tagName').toLowerCase() === 'a') ref = child;
      ref.prepend($('<span>').addClass('mw-lookuptable-iteminfo'));
    });
    lookupTable.on('click', '.mw-lookuptable-button a', function (event) { event.preventDefault(); });
    lookupTable.on('click', '.mw-lookuptable-filterbutton', function () {
      $(this).toggleClass('mw-lookuptable-filteroff');
      updateResult(lookupTable);
    });
    lookupTable.on('dblclick', '.mw-lookuptable-filterbutton', function () {
      $('.mw-lookuptable-filterbutton[data-attrname="' + $(this).data('attrname') + '"]', lookupTable).addClass('mw-lookuptable-filteroff');
      $(this).toggleClass('mw-lookuptable-filteroff');
      updateResult(lookupTable);
    });
    lookupTable.on('click', '.mw-lookuptable-sortbutton', function (event) {
      $('.mw-lookuptable-sortbutton', lookupTable).removeClass('mw-lookuptable-sort-active');
      $(this).addClass('mw-lookuptable-sort-active');
      updateResult(lookupTable);
    });
    lookupTable.on('click', '.mw-lookuptable-sortorderbutton', function (event) {
      $('.mw-lookuptable-sortorderbutton', lookupTable).removeClass('mw-lookuptable-sort-active');
      $(this).addClass('mw-lookuptable-sort-active');
      updateResult(lookupTable);
    });
    updateResult(lookupTable);
  };
  $(document).ready(function () {
    var lookupTable = $('.mw-lookuptable');
    if (!lookupTable.length) return;
    lookupTableHandler(lookupTable);
    lookupTable.show();
  });
}(jQuery));


; (function ($) {
  var now = new Date();
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  $('.mw-time-countdown').each(function () {
    var s = $(this);
    var starttime = new Date(s.data('starttime'));
    var endtime = new Date(s.data('endtime'));
    if (isNaN(+starttime * +endtime * +now)) return;
    var remaining = endtime - now;
    var t = '', n = '', c = remaining < 2 * day;
    if (starttime > now) {
      t = '尚未開始'; n = 'bs';
    } else if (remaining > day) {
      t = '還剩 ' + Math.floor(remaining / day) + ' 天'; n = 'g2';
    } else if (remaining > hour) {
      t = '還剩 ' + Math.floor(remaining / hour) + ' 小時'; n = 'g1';
    } else if (remaining > 0) {
      t = '還剩 ' + Math.floor(remaining / minute) + ' 分鐘'; n = 'g0';
    } else {
      t = '已經結束'; n = 'e';
    }
    var d = $('<span>').addClass('mw-time-countdown-' + n).text(t);
    if (c) d.css({ color: 'red' }).addClass('mw-time-countdown-warn');
    s.empty();
    s.append(d);
  });
}(jQuery));

// used by Template:建築物資訊方塊
$(function () {
  
  // parse and validate json data
  var parseData = function (table) {
    var jsonText = $('.wcp-building-info-json', table).text();
    var runeContainer = $('.wcp-building-rune', table);
    var runeNames = $.map(runeContainer, function (r) { return $(r).data('runeName'); });
    var gold = !!$('.wcp-building-gold', table)[0];
    var time = !!$('.wcp-building-time', table)[0];
    
    var data = {}, valid = true;
    try { data = JSON.parse(jsonText); }
    catch (_ignore) { return null; }
    
    if (!data.name) return null;
    if (!data.maxLevel) return null;
    if (typeof data.maxLevel !== 'number') return null;
    if (!data.runes) return null;
    // we cannot handle building with special rune info
    // e.g. glico城堡
    if (data.specialRune) return false;
    
    // validation for runes
    if (runeNames && runeNames.length) {
      if (!data.runes) return null;
      if (!_.isArray(data.runes)) return null;
      if (!data.runes.length) return null;
    }
    _.each(runeNames, function (runeName) {
      var find = false, target = null;
      _.each(data.runes, function (runeInfo) {
        if (runeInfo.name === runeName) {
          if (find === true) target = null;
          else {
            find = true;
            target = runeInfo;
          }
        }
      });
      if (!target || !target.level) valid = false;
      if (!_.isArray(target.level)) valid = false;
      if (target.level.length !== data.maxLevel) valid = false;
    });
    if (!valid) return false;
    
    // validation for gold and time
    var needValidation = [];
    if (gold) needValidation.push('gold');
    if (time) needValidation.push('time');
    _.each(needValidation, function (type) {
      if (!data[type]) valid = false;
      if (!_.isArray(data[type])) valid = false;
      if (data[type].length !== data.maxLevel) valid = false;
    });
    if (!valid) return null;
    
    return data;
  };
  
  var replaceInput = function (table, data, onChange) {
    var oldLevel = $('.wcp-building-rune-start-level', table);
    if (!oldLevel) return;
    
    var key = data.name + '_levels';
    var input = $('<input type="number" class=".wcp-building-rune-count" />');
    input.attr('min', 0).attr('max', data.maxLevel).css({ width: '32px' });
    
    var finishedText = $('.wcp-building-finished', table)[0];
    var onInput = function () {
      var level = parseInt(input.val(), 10);
      if (level !== level || level < 0) level = 0;
      else if (level > data.maxLevel) level = data.maxLevel;
      if (!finishedText && level === data.maxLevel) level--;
      if ('' + level !== '' + input.val()) input.val(level);
      try { localStorage.setItem(key, level); }
      catch (_ignore) {}
      onChange(level);
    };
    
    var lastLevel = localStorage.getItem(key) || 0;
    input.val(lastLevel);
    onInput(lastLevel);
    input.on('input', onInput);

    oldLevel.replaceWith(input);
    return input;
  };
  
  var updater = function (table, data) {
    var runeCount = {};
    _.each(data.runes, function (rune) {
      runeCount[rune.name] = rune.level;
    });
    var runeContainerList = $('.wcp-building-rune', table);
    var goldContainer = $('.wcp-building-gold', table)[0];
    var timeContainer = $('.wcp-building-time', table)[0];
    var finishedText = $('.wcp-building-finished', table);
    
    var updateItem = function (levelArray, countElement, containerElement, formatter) {
      var count = _.foldl(levelArray, function (x, y) { return x + y; }, 0);
      countElement.html(formatter(count));
      if (count) containerElement.show(); else containerElement.hide();
      return !!count;
    };
    
    var runeFormatter = function (n) {
      return '' + Math.ceil(Number(n));
    };
    
    var goldFormatter = function (n) {
      var match = ('' + Math.ceil(n)).match(/^(.+?)((?:...)*)$/);
      return match[1] + match[2].replace(/(...)/g, ',$1');
    };
    
    var smallText = function (t) {
      var element = $('<span style="font-size: 80%;"></span>').text(t);
      return $('<div>').append(element).html();
    };
    var timeFormatter = function (n) {
      var time = Math.ceil(Number(n));
      var units = [
        { text: '天', seconds: 86400 },
        { text: '時', seconds: 3600  },
        { text: '分', seconds: 60    },
        { text: '秒', seconds: 1     },
      ];
      var timeRem = time, timeText = [''], timeAboutText = [''];
      _.each(units, function (unit) {
        if (timeRem === 0) return;
        var unitCount = Math.floor(timeRem / unit.seconds);
        var unitCountAbout = Math.ceil(timeRem / unit.seconds);
        var lastText = timeText[timeText.length - 1];
        if (unitCount === 0 && lastText === '') return;
        var unitText = smallText(unit.text);
        var aboutText = unitCountAbout !== unitCount ? smallText('約') : '';
        timeText.push(lastText + unitCount + unitText);
        timeAboutText.push(aboutText + lastText + unitCountAbout + unitText);
        timeRem = timeRem - unit.seconds * unitCount;
      });
      return timeAboutText[2] || timeAboutText[1] || '0';
    };

    return function (level) {
      // update each count
      var anythingShown = false;
      _.each(runeContainerList, function (c) {
        var container = $(c), name = container.data('runeName');
        var countElement = $('.wcp-building-rune-count', container);
        var shown = updateItem(runeCount[name].slice(level), countElement, container, runeFormatter);
        anythingShown = anythingShown || shown;
      });
      if (goldContainer) (function (c) {
        var container = $(c);
        var goldElement = $('.wcp-building-gold-count', container);
        var shown = updateItem(data.gold.slice(level), goldElement, container, goldFormatter);
        anythingShown = anythingShown || shown;
      }(goldContainer));
      if (timeContainer) (function (c) {
        var container = $(c);
        var timeElement = $('.wcp-building-time-count', container);
        var shown = updateItem(data.time.slice(level), timeElement, container, timeFormatter);
        anythingShown = anythingShown || shown;
      }(timeContainer));
      if (anythingShown) finishedText.hide(); else finishedText.show();
    };
  };
  
  // find out all .wcp-building-info; add input and update remaining rune / gold / time
  setInterval(function () {
    $.each($('.wcp-building-info.wcp-building-info-loading'), function () {
      try {
        var table = $(this);
        table.removeClass('wcp-building-info-loading');
        var data = parseData(table); if (!data) return;
        var update = updater(table, data); if (!update) return;
        var input = replaceInput(table, data, update); if (!input) return;
      } catch (ex) {
        console.error(ex);
      }
    });
  }, 100);

});

// 將角色頁投票至於右側
;(function () {
  $("#WikiaRail").append($(".wcp-char-poll-area"));
}());

// 將建築物資訊方塊至於右側
;(function () {
  $("#WikiaRail").append($(".wcp-move-to-right-column"));
}());


// 修改預覽評論的語言、文字
window.fng = $.extend(true, window.fng, {cp: (window.fng || {}).cp || {} });
window.fng.cp.uselang = 'zh';
window.fng.cp.lang = $.extend(true, {}, window.fng.cp.lang, { 
    zh: {preview: '預覽', cancel: '取消', publish: '發表評論'}
});