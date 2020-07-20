/*jslint devel: true, browser: true, white: true, indent: 2, plusplus: true, vars: true*/
/*global $, mw*/
(function () {
'use strict';
var ajax_load_bar = new Image();
ajax_load_bar.src = "http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif";

var creature_statistics_string = '';
var creature_statistics_obj = {};
var creature_statistics_basetimestamp, creature_statistics_token;
var sysop = false;

var creature_statistics_init;
var array_sort = function (inputArr, numeric, by_key, reverse, sub_key) {
  var tmp_arr = {}, valArr = [], keyArr = [], keys = [], sorter, i, k, populateArr = [];
  if (numeric === undefined) { numeric = false; }
  if (by_key === undefined) { by_key = false; }
  if (reverse === undefined) { reverse = false; }
  if (sub_key === undefined) { sub_key = ''; }
  var is_numeric = function (v) { v = parseFloat(String(v).replace('|', '')); return (typeof v === 'number' && !isNaN(v)); };
  if (numeric) { sorter = function (a, b) {
    a = parseFloat(String(a).replace('|', '')) || 0; b = parseFloat(String(b).replace('|', '')) || 0;
    return (reverse ? b - a : a - b);
  }; }
  else {
    sorter = function (a, b) {
      var x = a, y = b, tmp;
      if (!is_numeric(a) && !is_numeric(b)) {
        tmp = (function (a, b) { a = a.search(/[a-z]/); b = b.search(/[a-z]/); if ((a !== 0 && b !== 0) || a === b) { return 0; } if (a === 0) { return -1; } if (b === 0) { return 1; } }(x, y));
        if (tmp !== 0) { return tmp * (reverse ? -1 : 1); }
        if (a.search(/a[n]? /i) === 0) { a = a.substr(a.indexOf(' ') + 1); }
        if (b.search(/a[n]? /i) === 0) { b = b.substr(b.indexOf(' ') + 1); }
        if (a === b) { return 0; }
        if (a > b) { return (reverse ? -1 : 1); }
        return (reverse ? 1 : -1);
      }
      a = parseFloat(a) || 0; b = parseFloat(a) || 0;
      return (reverse ? b - a : a - b);
    };
  }
  if (by_key) {
/*Make a list of key names*/
    for (k in inputArr) { if (inputArr.hasOwnProperty(k)) { keys.push(k); } }
    keys.sort(sorter);
/*Rebuild array with sorted key names*/
    for (i = 0; i < keys.length; i++) { k = keys[i]; tmp_arr[k] = inputArr[k]; }
    for (i in tmp_arr) { if (tmp_arr.hasOwnProperty(i)) { populateArr[i] = tmp_arr[i]; } }
  }
  else {
    var bubbleSort = function (keyArr, inputArr, sub_key) {
      var i2, j, tempValue, tempKeyVal, ret;
      for (i2 = inputArr.length - 2; i2 >= 0; i2--) {
        for (j = 0; j <= i2; j++) {
          ret = (sub_key === '') ? sorter(inputArr[j + 1], inputArr[j]) : sorter(inputArr[j + 1][sub_key], inputArr[j][sub_key]);
          if (ret < 0) {
            tempValue = inputArr[j];
            inputArr[j] = inputArr[j + 1];
            inputArr[j + 1] = tempValue;
            tempKeyVal = keyArr[j];
            keyArr[j] = keyArr[j + 1];
            keyArr[j + 1] = tempKeyVal;
          }
        }
      }
    };
/*Get key and value*/
    for (k in inputArr) { if (inputArr.hasOwnProperty(k)) { valArr.push(inputArr[k]); keyArr.push(k); } }
/*Sort our new temporary arrays*/
    try { bubbleSort(keyArr, valArr, sub_key); } catch (e) { return false; }
/*Repopulate the old array*/
    for (i = 0; i < valArr.length; i++) { populateArr[keyArr[i]] = valArr[i]; }
  }
  return populateArr;
};
var numcs = function (n) { n = String(n); while ((/\d{4}/).test(n)) { n = n.replace(/(\d{3},|\d{3}$)/, ',$1'); } return n; };
var creature_statistics_merge = function (data, sort_by_occurrences) {
  $('#creature_statistics_block p').html('Processing<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Processing" />');
  if (sort_by_occurrences === undefined) { sort_by_occurrences = false; }
  var x, y, t = '', tmp, stats = {heal: {}, damage: {}};
  var action, origin, target, amount;
  data = data.split(/(?:\r\n|\r|\n){1,10}/g);
  for (x = 0; x < data.length; x++) {
    tmp = data[x].split('|');
    origin = tmp[0]; action = tmp[1]; target = (tmp[2] === '' ? '-' : tmp[2]);
    if (tmp.length > 3) {
      if (stats[action][origin] === undefined) { stats[action][origin] = {}; }
      if (stats[action][origin][target] === undefined) { stats[action][origin][target] = {}; }
      for (y = 3; y < tmp.length; y++) {
        if (tmp[y] !== '') {
          amount = tmp[y].split(',');
          if (stats[action][origin][target][amount[0]] === undefined) { stats[action][origin][target][amount[0]] = 0; }
          stats[action][origin][target][amount[0]] += parseInt(amount[1], 10);
        }
      }
    }
  }
  for (action in stats) { if (stats.hasOwnProperty(action)) {
    stats[action] = array_sort(stats[action], false, true);
    for (origin in stats[action]) { if (stats[action].hasOwnProperty(origin)) {
      stats[action][origin] = array_sort(stats[action][origin], false, true);
      for (target in stats[action][origin]) { if (stats[action][origin].hasOwnProperty(target)) {
        t += origin + '|' + action + '|' + (target === '-' ? '' : target);
        for (amount in stats[action][origin][target]) { if (stats[action][origin][target].hasOwnProperty(amount) && amount.substr(0, 1) !== '|') {
          stats[action][origin][target]['|' + amount] = stats[action][origin][target][amount];
          delete stats[action][origin][target][amount];
        } }
        stats[action][origin][target] = array_sort(stats[action][origin][target], true, !sort_by_occurrences);
        for (amount in stats[action][origin][target]) { if (stats[action][origin][target].hasOwnProperty(amount)) {
          t += amount + ',' + stats[action][origin][target][amount];
        } }
        t += '|\n';
      } }
    } }
  } }
  return [$.trim(t), stats];
};

var creature_statistics_end = function (msg, action) {
  $('#creature_statistics_block').fadeOut(500, function () {
    if (msg) { alert(msg); }
  });
  if (action) {
    if (action === 1) { $('#creature_statistics_up').prop({disabled: false}); }
    if (action === 2) { $('#creature_statistics_l').prop({disabled: false}); }
  }
};

var creature_statistics_table_toggle = function () {
  $(this).html($(this).html().indexOf('Show') === -1 ? 'Show' : 'Hide');
  $(this).nextAll('table:first').add($(this).nextAll('span:first')).toggle();
};
var creature_statistics_table_up = function () {
  $('html, body').scrollTop($(this).prevAll('span:first').offset().top);
};
var creature_statistics_generator_gen = function () {
  $('#creature_statistics_block p').html('Processing<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Processing" />');
  $('#creature_statistics_block').fadeTo(400, 0.8, function () {
    var include = {heal: $('#creature_statistics_generator_ch').is(':checked'), damage: $('#creature_statistics_generator_cd').is(':checked')};
    var i = 0, times, tmp;
    var stats = creature_statistics_obj;
    $('#creature_statistics_tables').empty();
    $('#creature_statistics_generator_sel option:selected').each(function () {
      var this_origin = $(this).val();
      var action, target, amount;
      for (action in stats) { if (stats.hasOwnProperty(action) && include[action]) {
        if (stats[action][this_origin] !== undefined) {
          for (target in stats[action][this_origin]) { if (stats[action][this_origin].hasOwnProperty(target)) {
            times = 0;
            tmp = '<table class="creature_statistics wikitable sortable" style="display:none;"><tr><th>Value</th><th>Ocurrences</th></tr>';
            for (amount in stats[action][this_origin][target]) { if (stats[action][this_origin][target].hasOwnProperty(amount)) {
              tmp += '<tr><td>' + (amount.replace('|', '')) + '</td><td>' + stats[action][this_origin][target][amount] + '</td></tr>';
              times += stats[action][this_origin][target][amount];
            } }
            tmp += '</table>';
            $('#creature_statistics_tables').append(
              '<br />' + this_origin + ' ' + action + ' ' + (target === '-' ? 'self' : target) + ' (<b>' + times + '</b> times)' + ' - ',
              $('<span>', {style: 'cursor:pointer;color:#0148c2;text-decoration:underline;'}).html('Show').click(creature_statistics_table_toggle),
              tmp,
              $('<span>', {style: 'display:none;cursor:pointer;color:#0148c2;text-decoration:underline;'}).html('up').click(creature_statistics_table_up)
            );
            i++;
          } }
        }
      } }
    });
    if (i > 0) {
      try {
        mw.loader.using('jquery.tablesorter', function () {
          $('table.sortable.creature_statistics').not('.jquery-tablesorter').tablesorter();
        });
      } catch (ignore) {}
    }
    else { $('#creature_statistics_tables').html('<br />Nothing to show with the current selection'); }
    creature_statistics_end();
  });
};
var creature_statistics_generator_init = function () {
  var action, origin, tmp = {};
  var options = '';
  for (action in creature_statistics_obj) { if (creature_statistics_obj.hasOwnProperty(action)) {
    for (origin in creature_statistics_obj[action]) { if (creature_statistics_obj[action].hasOwnProperty(origin)) {
      tmp[origin] = 0;
    } }
  } }
  tmp = array_sort(tmp, false, true);
  for (origin in tmp) { if (tmp.hasOwnProperty(origin)) {
    options += '<option value="' + origin + '">' + origin + '</option>';
  } }
  $('#creature_statistics_generator').empty().append(
    $('<table>', {'class': 'wikitable'}).append($('<tr>').append(
      $('<td>', {style: 'vertical-align:top;padding:5px 20px;'}).append(
        $('<input>', {type: 'checkbox', id: 'creature_statistics_generator_ch', checked: 'checked'}),
        'Include heal<br />',
        $('<input>', {type: 'checkbox', id: 'creature_statistics_generator_cd', checked: 'checked'}),
        'Include damage'
      ),
      $('<td>', {style: 'vertical-align:top;padding:5px 20px;'}).append(
        'Creatures to include, use control+click to multi select<br />',
        $('<span></span>', {style: 'cursor:pointer;color:#0148c2;text-decoration:underline;'}).html('Select all')
        .click(function () { $('#creature_statistics_generator_sel').find('option').attr('selected', 'selected'); }),
        '<br />',
        $('<select>', {id: 'creature_statistics_generator_sel', multiple: 'multiple'}).attr({size: 12})
        .css({width: '100%'}).html(options)
      )
    )),
    '<br />',
    $('<input>', {type: 'button', value: 'Generate tables'}).click(creature_statistics_generator_gen),
    '<hr />',
    $('<div></div>', {id: 'creature_statistics_tables'})
  );
};

var creature_statistics_upload = function () {
  $('#creature_statistics_up').prop({disabled: true});
  $('#creature_statistics_block p').html('Uploading<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Uploading" />');
  $('#creature_statistics_block').fadeTo(400, 0.8);
  var upload_stats = function () {
    var errort = 'There was an error uploading, try again';
    $.ajax({
      url: '/api.php', type: 'POST', dataType: 'json',
      data : {
        action: 'edit', title: 'TibiaWiki:Creature_Statistics/Statistics', format: 'json',
        summary: 'merging', text: creature_statistics_string,
        token: creature_statistics_token, basetimestamp: creature_statistics_basetimestamp, minor: 'minor'
      },
      error: function () { creature_statistics_end(errort, 2); },
      success: function (obj) {
        if (obj && obj.edit && obj.edit.result === 'Success') {
          creature_statistics_end('Stats uploaded.', 1);
        }
        else { creature_statistics_end(errort, 1); }
      }
    });
  };
  upload_stats();
};


var creature_statistics_text_to_stats = function (text) {
  var tmp = creature_statistics_merge(text);
  creature_statistics_string = tmp[0];
  creature_statistics_obj = tmp[1];
  creature_statistics_generator_init();
  creature_statistics_end();
  $('#creature_statistics_td_load').empty().append(
    $('<input>', {type: 'button', value: 'Go back'}).click(function () { creature_statistics_init(); })
  );
  if (sysop) {
    if (!$('#creature_statistics_stats_size').length) {
      $('#creature_statistics_td_sysop').append(
        'Size:&nbsp;',
        $('<input />', {id: 'creature_statistics_stats_size', type: 'text', size: '30', value: '', readonly: 'readonly', style: 'margin: 10px 0px'}),
        $('<input>', {type: 'button', value: 'Upload merged', id: 'creature_statistics_up'}).click(function () { creature_statistics_upload(); })
      );
    }
    $('#creature_statistics_stats_size').val('Old: ' + numcs(text.length) + ' / Merged: ' + numcs(creature_statistics_string.length));
    $('#creature_statistics_up').prop({disabled: false});
  }
};

var creature_statistics_load = function (from_teaxtarea) {
  $('#creature_statistics_l').prop({disabled: true});
  $('#creature_statistics_block p').html('Downloading<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Downloading" />');
  $('#creature_statistics_block').fadeTo(400, 0.8);
  if (from_teaxtarea) {
    creature_statistics_text_to_stats($('#' + from_teaxtarea).val());
    return;
  }
  var errort = 'There was a problem downloading, try again.';
  var get_stats_contents = function () {
    $.ajax({
      url: '/api.php', type: 'GET', dataType: 'json',
      data : {
        action: 'query', titles: 'TibiaWiki:Creature_Statistics/Statistics', format: 'json',
        rvprop: 'content', prop: 'info|revisions', intoken: 'edit'
      },
      error: function () { creature_statistics_end(errort, 2); },
      success: function (obj) {
        var x;
        if (obj && obj.query && obj.query.pages) {
          for (x in obj.query.pages) { if (obj.query.pages.hasOwnProperty(x)) {
            if (obj.query.pages[x].missing !== undefined) { creature_statistics_end(errort, 2); }
            else {
              creature_statistics_text_to_stats($.trim(obj.query.pages[x].revisions[0]['*']));
            }
            break;
          } }
        }
        else { creature_statistics_end(errort, 2); }
      }
    });
  };
  var get_edit_info = function () {
    $.ajax({
      url: '/api.php', type: 'GET', dataType: 'json',
      data : {
        action: 'query', titles: 'TibiaWiki:Creature_Statistics/Statistics', format: 'json',
        prop: 'info|revisions', intoken: 'edit'
      },
      error: function () { creature_statistics_end(errort, 2); },
      success: function (obj) {
        var x;
        if (obj && obj.query && obj.query.pages) {
          for (x in obj.query.pages) { if (obj.query.pages.hasOwnProperty(x)) {
            creature_statistics_token = obj.query.pages[x].edittoken;
            if (obj.query.pages[x].missing !== undefined) { creature_statistics_basetimestamp = ''; }
            else { creature_statistics_basetimestamp = obj.query.pages[x].revisions[0].timestamp; get_stats_contents(); }
            break;
          } }
        }
        else { creature_statistics_end(errort, 2); }
      }
    });
  };
  get_edit_info();
};

creature_statistics_init = function () {
  $('#creature_statistics_main').empty().css({textAlign: 'center', minHeight: '100px'}).append(
    $('<table>', {style: 'width:100%;'}).append($('<tr>').append(
      $('<td>', {style: 'width:50%;', id: 'creature_statistics_td_load'}).append(
        $('<textarea>', {cols: '20', rows: '5', style: 'width:100%;margin-bottom:5px;', id: 'creature_statistics_pt'}),
        $('<input>', {type: 'button', id: 'creature_statistics_p', value: 'Process your pasted data'}),
        '<br />',
        '(<b>Creature heal and damage statistics</b> from<br />',
        $('<a></a>', {href: '/wiki/Loot_Statistics'}).html('Loot Statistics').click(function () { window.open($(this).attr('href')); }),
        ')',
        '<br /><br />OR<br /><br />',
        $('<input>', {type: 'button', id: 'creature_statistics_l', value: 'Load data saved on TibiaWiki'})
      ),
      $('<td>', {style: 'width:50%;', id: 'creature_statistics_td_sysop'}).append('&nbsp;')
    )),
    $('<div></div>', {id: 'creature_statistics_generator', style: 'text-align:left;'})
  );

  $('#creature_statistics_main').append(
    $('<div></div>', {id: 'creature_statistics_block'})
      .css({display: 'none', position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', backgroundColor: '#666666', textAlign: 'center'})
      .html('<p style="font-size:xx-large;font-weight:bolder;font-family:Arial;color:white"></p><br />')
  );

  $('#creature_statistics_l').on('click', function () { creature_statistics_load(); });
  $('#creature_statistics_p').on('click', function () { creature_statistics_load('creature_statistics_pt'); });
};

(function () {
  $.ajax({
    url: '/api.php', type: 'GET', dataType: 'json',
    data : {
      action: 'query', format: 'json',
      meta: 'userinfo', uiprop: 'groups'
    },
    success: function (obj) {
      var x;
      if (obj && obj.query && obj.query.userinfo && obj.query.userinfo.groups) {
        for (x in obj.query.userinfo.groups) { if (obj.query.userinfo.groups.hasOwnProperty(x)) {
          if ((obj.query.userinfo.groups[x]) === 'sysop') { sysop = true; break; }
        } }
      }
      creature_statistics_init();
      $('#creature_statistics_img').hide();
      $('#creature_statistics_main').show();
    }
  });
}());
}());