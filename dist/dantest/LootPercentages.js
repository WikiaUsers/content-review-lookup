/*jslint browser: true, devel: true, plusplus: true, white: true, indent: 2 */
/*global $, wgTitle */
(function () {
  'use strict';
  var
  //from MediaWiki:LootStatistics-Data.js
  current_tibia_version = window.loot_parser_data.current_tibia_version,
  //from MediaWiki:LootStatistics-Data.js
  lootparser_versions_ex = window.loot_parser_data.versions,

  //item exceptions to rename
  item_exceptions = {
    //these are exceptions on Template:Loot2/List and are not added to the loot parser variable creature_items_name_change (MediaWiki:LootStatistics.js)
    'skull (item)': 'Skull',
    'black skull (item)': 'Black Skull',

    //these are not needed as they shouldn't(?) appear on statistics
    //'gp': 'Gold Coin',

    //these are not needed as they are or will be on the loot parser variable creature_items_name_change (MediaWiki:LootStatistics.js)
    //'blood of the mountain (item)': 'Blood of the Mountain',
    //'heart of the mountain (item)': 'Heart of the Mountain',
    //'ice flower (item)': 'Ice Flower',
    //'rusty armor (common)': 'Rusty Armor',
    //'rusty armor (semi-rare)': 'Rusty Armor',
    //'rusty armor (rare)': 'Rusty Armor',
    //'rusty helmet (common)': 'Rusty Helmet',
    //'rusty helmet (semi-rare)': 'Rusty Helmet',
    //'rusty helmet (rare)': 'Rusty Helmet',
    //'rusty legs (common)': 'Rusty Legs',
    //'rusty legs (semi-rare)': 'Rusty Legs',
    //'rusty legs (rare)': 'Rusty Legs',
    //'rusty shield (common)': 'Rusty Shield',
    //'rusty shield (semi-rare)': 'Rusty Shield',
    //'rusty shield (rare)': 'Rusty Shield',

    //placeholder so all the previous items end can end the same (with a comma)
    '': ''
  },
  droppedby_perc_data = {}, loot_perc_data = {},
  loot_perc_datao = '',
  loot_perc_datap = '',
  loot_perc_dataoa = true,
  droppedby_inaccurate = [],
  droppedby_minimum = 500,
  loot_minimum = 500,
  loot_perc_sort = function (sid) {
    $('#' + sid).each(function () {
      var t = $(this).html().replace(/<img[^>]*id="(?:loot|droppedby)_perc_load"[^>]*>/, ''),
      sp = t.match(/(<span[\s\S]*>[^\d]*?<\/span>)/i),
      prefix = '', postfix = '',
      delim,
      concatstr;
      sp = (sp === null ? '' : sp[1]);
      t = $.trim(t.replace(sp, ''));
      while (t.substr(-1) === '.') {
        t = t.substr(0, t.length - 1);
      }
      if (t.indexOf("<li>") !== -1) {
        delim = "\n";
        concatstr = "\n";
        prefix = "<ul>";
        postfix = "</ul>";
        t = t.replace(prefix, '').replace(postfix, '');
      } else if (t.indexOf(",") !== -1) {
        delim = ",";
        concatstr = ", ";
      }
      t = t.split(delim);
      t.sort(function (a, b) {
        b = (b.match(/\(([\d\.]+)%\)/) || [0, 0])[1];
        a = (a.match(/\(([\d\.]+)%\)/) || [0, 0])[1];
        return parseFloat(b) - parseFloat(a);
      });
      $.each(t, function (i, v) {
        t[i] = $.trim(v);
      });
      $(this).html(prefix + t.join(concatstr) + sp + postfix);
    });
  },
  loot_perc_get_data = function (text, cname) {
    var get_it = function (version) {
      version = version.replace(/\\/g, '').replace(/\./g, '\\.');
      var items, x, r = new RegExp('version[\\s]?=[\\s]?' + version + '[^}\\d]*?kills[\\s]?=[\\s]?(\\d*)([\\s\\S]*?)}' + '}'),
      matches = text.match(r);
      if (matches !== null && matches.length === 3 && parseInt(matches[1], 10) > 0) {
        loot_perc_data.kills = parseInt(matches[1], 10);
        items = matches[2].split('|');
        for (x = 0; x < items.length; x++) {
          if (items[x].match(/times:/)) {
            loot_perc_data[$.trim(items[x].split(',')[0])] = (Math.round((parseInt(items[x].split('times:')[1].split(',')[0], 10) / parseInt(matches[1], 10)) * 10000) / 100) + '%';
          }
        }
      }
    };
    if (text !== false) {
      cname = cname.replace(/_/g, ' ');
      if (lootparser_versions_ex.hasOwnProperty(current_tibia_version) && lootparser_versions_ex[current_tibia_version].combined.hasOwnProperty(cname)) {
        get_it(lootparser_versions_ex[current_tibia_version].combined[cname]);
      } else {
        get_it(current_tibia_version);
      }
    }
  },
  loot_perc_put_data = function () {
    var t, off;
    if (loot_perc_data.kills === undefined) {
      off = $('#loot_perc_text').offset();
      $('body:first').append(
        $('<div>There is no statistics <br />information to show percentages</div>').attr('id', 'loot_perc_not_enough')
        .css({
          'display': 'none',
          'z-index': '999',
          'top': String(off.top - 20) + 'px',
          'left': String(off.left - 35) + 'px',
          'position': 'absolute',
          'background-color': '#0038d8',
          'border-radius': '4px',
          'box-shadow': '0px 0px 5px',
          'color': '#ffffff',
          'margin': '0px',
          'padding': '10px 20px'
        }).fadeIn('slow', function () {
          setTimeout(function () {
            $('#loot_perc_text').hide();
            $('#loot_perc_not_enough').fadeOut('slow');
          }, 4000);
        })
      );
      $('#loot_perc_loot').html(loot_perc_datao);
    }
    else {
      if (loot_perc_data.kills < loot_minimum) {
        if ($('#loot_perc_inaccurate').length === 0) {
          $('#loot_perc_text').after(
            $('<span class="information-icon"></span>').attr('id', 'loot_perc_inaccurate').attr('title', '%s are not accurate because the low amount of kills (' + loot_perc_data.kills + ' kills).').click(function () {
            alert('%s are not accurate because the low amount of kills (' + loot_perc_data.kills + ' kills).');
          })
        );
          $('#loot_perc_text').after('&nbsp;');
        }
        $('#loot_perc_text').show();
      }
      $('#loot_perc_text').attr('title', 'Based on ' + loot_perc_data.kills + ' kills');
      $('#loot_perc_loot a').each(function () {
        t = decodeURI($(this).attr('href').replace(/.*\/(.*?)$.*/, '$1').replace(/_/g, ' '));
        if (item_exceptions.hasOwnProperty(t.toLowerCase())) {
          t = item_exceptions[t.toLowerCase()];
        }
        if (loot_perc_data.hasOwnProperty(t)) {
          $(this).after(' (' + loot_perc_data[t] + ')');
        }
      });
      loot_perc_sort('loot_perc_loot');
      loot_perc_datap = $('#loot_perc_loot').html();
    }
  },
  loot_perc_loaded = function (text, cname) {
    loot_perc_get_data(text, cname);
    $('#loot_perc_load').hide();
    loot_perc_put_data();
    loot_perc_dataoa = false;
  },
  loot_perc_load = function () {
    if (loot_perc_dataoa && loot_perc_datap === '') {
      $('#loot_perc_loot').html($('#loot_perc_loot').html().replace(/[\s]?\((?:(?:semi-|very |extremely )?rare)\)|(?:[\s]?\((?:un)?common)\)[\s]?/g, ''))
      .prepend('<img id="loot_perc_load" src="https://images.wikia.nocookie.net/tibia/en/images/8/87/Ajax_Load_Image.gif" alt="Loading %s" />');
      $.ajax({
        url: '/index.php?title=Loot_Statistics:' + mw.config.get('wgTitle') + '&action=raw',
        dataType: 'text',
        timeout: 15000,
        success: function (text) {
          loot_perc_loaded(text, $.trim(mw.config.get('wgTitle').replace(/\(Creature\)/, '')));
        },
        error: function () {
          loot_perc_loaded(false);
        }
      });
    } else if (loot_perc_dataoa) {
      $('#loot_perc_loot').html(loot_perc_datap);
      $('#loot_perc_inaccurate').show();
      loot_perc_dataoa = false;
    } else {
      $('#loot_perc_loot').html(loot_perc_datao);
      $('#loot_perc_inaccurate').hide();
      loot_perc_dataoa = true;
    }
  },
  droppedby_perc_put_data = function () {
    var t;
    $('#droppedby_perc_creat a').each(function () {
      var d;
      t = $(this).text();
      if (droppedby_perc_data.hasOwnProperty(t)) {
        d = droppedby_perc_data[t];
        if (d[1] < droppedby_minimum) {
          droppedby_inaccurate.push(t);
        }
        $(this).after($('<span> (' + d[0] + ')</span>').attr('title', 'Based on ' + d[1] + ' kills').css('cursor', 'pointer'));
      }
    });
    loot_perc_sort('droppedby_perc_creat');
    $('#droppedby_perc_creat span').css('color', '#0148C2').click(function () {
      window.open('/wiki/Loot_Statistics:' + $(this).prev().text());
    });
    if (droppedby_inaccurate.length > 0) {
      t = 'Some %s are not accurate because the low amount of kills:\n' + droppedby_inaccurate.join('\n');
      $('#droppedby_perc_text').after($('<span class="information-icon"></span>').attr('title', t).click(function () {
        alert(t);
      }));
      $('#droppedby_perc_text').after('&nbsp;');
    }
  },
  droppedby_perc_get_data = function (text, cname, item) {
    if (item === undefined) {
      item = mw.config.get('wgTitle');
    }
    var
    get_it = function (version) {
      version = version.replace(/\\/g, '').replace(/\./g, '\\.');
      var r = new RegExp('version[\\s]?=[\\s]?' + version + '[^}\\d]*?kills[\\s]?=[\\s]?(\\d*)[^}]*?name[\\s]?=[\\s]?(.*)[|\\r\\n][^}]*?[|][\\s]?(' + (item.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")) + ')[\\s]?,[^}\\r\\n]*?times:(\\d*)'),
      matches = text.match(r);
      if (matches !== null && matches.length === 5 && matches[2] && parseInt(matches[1], 10) > 0) {
        droppedby_perc_data[matches[2]] = [(Math.round((parseInt(matches[4], 10) / parseInt(matches[1], 10)) * 10000) / 100) + '%', parseInt(matches[1], 10)];
      }
    };
    if (text !== false) {
      if (item_exceptions.hasOwnProperty(item.toLowerCase())) {
        item = item_exceptions[item.toLowerCase()];
      }
      cname = cname.replace(/_/g, ' ');
      if (lootparser_versions_ex.hasOwnProperty(current_tibia_version) && lootparser_versions_ex[current_tibia_version].combined.hasOwnProperty(cname)) {
        get_it(lootparser_versions_ex[current_tibia_version].combined[cname]);
      } else {
        get_it(current_tibia_version);
      }
    }
  },
  droppedby_perc_loading = 0,
  droppedby_perc_loaded = function (text, cname) {
    droppedby_perc_loading--;
    droppedby_perc_get_data(text, cname);
    if (droppedby_perc_loading < 1) {
      $('#droppedby_perc_load').hide();
      droppedby_perc_put_data();
    }
  },
  droppedby_perc_load = function () {
    $('#droppedby_perc_text').hide();
    var t = [];
    $('#droppedby_perc_creat a').each(function () {
      t.push($(this).attr('title'));
    });
    droppedby_perc_loading = t.length;
    $('#droppedby_perc_creat').prepend('<img id="droppedby_perc_load" src="https://images.wikia.nocookie.net/tibia/en/images/8/87/Ajax_Load_Image.gif" alt="Loading %s" />');
    $.each(t, function (i, v) {
      t[i] = $.trim(v);
      $.ajax({
        url: '/index.php?title=Loot_Statistics:' + t[i] + '&action=raw',
        dataType: 'text',
        timeout: 15000,
        success: function (text) {
          droppedby_perc_loaded(text, $.trim(t[i].replace(/\(Creature\)/, '')));
        },
        error: function () {
          droppedby_perc_loaded(false);
        }
      });
    });

  };
  $('#droppedby_perc_tr>td:eq(0),#item-droppedby>h3:eq(0)')
  .append(
    $('<a id="droppedby_perc_text" href="#">&nbsp;(Load %)</a>')
    .css({fontSize: '75%', verticalAlign: 'bottom'})
    .click(function () {
      droppedby_perc_load();
      return false;
    })
  )
  .next().attr('id', 'droppedby_perc_creat');
  loot_perc_datao = $('#loot_perc_tr>td:eq(0),#creature-loot>h3:eq(0)')
  .append(
    $('<a id="loot_perc_text" href="#"">&nbsp;(Toggle % view)</a>')
    .css({fontSize: '75%', verticalAlign: 'bottom'})
    .click(function () {
      loot_perc_load();
      return false;
    })
  )
  .next().attr('id', 'loot_perc_loot').html();
}());