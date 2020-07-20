/*jslint devel: true, browser: true, white: true, indent: 2, plusplus: true, vars: true*/
/*global $, mw*/
(function () {
'use strict';
var ajax_load_bar = new Image();
ajax_load_bar.src = "http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif";

var reward_container_statistics_string = '';
var reward_container_statistics_obj = {};
var reward_container_statistics_basetimestamp, reward_container_statistics_token;
var sysop = false;

var reward_container_statistics_init;
var sort_functions = {
  creature: function (a, b) {
    if (a === b) { return 0; }
    if (a.toLowerCase() > b.toLowerCase()) { return 1; }
    return -1;
  },
  times_desc: function (a, b) {
    return (b[1] - a[1]);
  }
};
var html_e = function (t) {
  var cmap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return String(t).replace(/[&<>"']/g, function (m) { return cmap[m]; });
};
var numcs = function (n) { n = String(n); while ((/\d{4}/).test(n)) { n = n.replace(/(\d{3},|\d{3}$)/, ',$1'); } return n; };
var reward_container_statistics_merge = function (data, sort_by_occurrences) {
  $('#reward_container_statistics_block p').html('Processing<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Processing" />');
  if (sort_by_occurrences === undefined) { sort_by_occurrences = false; }

  var x, t = '', tmp, stats = {};
  var creature, loot, amount;
  data = data.split(/(?:\r\n|\r|\n){1,10}/g);
  for (x = 0; x < data.length; x++) {
    tmp = data[x].split('|');
    creature = tmp[0]; amount = parseFloat(tmp[1]); loot = tmp.slice(2).join('|');
    if (!stats.hasOwnProperty(creature)) { stats[creature] = {}; }
    if (!stats[creature].hasOwnProperty(loot)) { stats[creature][loot] = 0; }
    stats[creature][loot] += amount;
  }
  for (creature in stats) { if (stats.hasOwnProperty(creature)) {
    for (loot in stats[creature]) { if (stats[creature].hasOwnProperty(loot)) {
      t += creature + '|' + stats[creature][loot] + '|' + loot + '\n';
    } }
  } }
  return [$.trim(t), stats];
};

var reward_container_statistics_end = function (msg, action) {
  $('#reward_container_statistics_block').fadeOut(500, function () {
    if (msg) { alert(msg); }
  });
  if (action) {
    if (action === 1) { $('#reward_container_statistics_up').prop({disabled: false}); }
    if (action === 2) { $('#reward_container_statistics_l').prop({disabled: false}); }
  }
};

var reward_container_statistics_table_toggle = function () {
  $(this).html($(this).html().indexOf('Show') === -1 ? 'Show' : 'Hide');
  $(this).nextAll('table:first').add($(this).nextAll('span:first')).toggle();
};
var reward_container_statistics_table_up = function () {
  $('html, body').scrollTop($(this).prevAll('span:first').offset().top);
};
var reward_container_statistics_generator_gen = function () {
  $('#reward_container_statistics_block p').html('Processing<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Processing" />');
  $('#reward_container_statistics_block').fadeTo(400, 0.8, function () {
    var stats = reward_container_statistics_obj;
    var html = '';
    $('#reward_container_statistics_tables').empty();
    $('#reward_container_statistics_generator_sel option:selected').each(function () {
      var creature = $(this).val(), tmp;
      var i, loot_list = [], loot, amount, times;
      for (loot in stats[creature]) { if (stats[creature].hasOwnProperty(loot)) { loot_list.push([loot, stats[creature][loot]]); } }
      loot_list.sort(sort_functions.times_desc);
      times = 0;
      tmp = '<table class="reward_container_statistics wikitable sortable" style="display:none;"><tr><th>Times</th><th>Loot</th></tr>';
      for (i = 0; i < loot_list.length; i++) {
        amount = loot_list[i][1];
        tmp += '<tr><td style="vertical-align: top;">' + amount + '</td><td>' + html_e(loot_list[i][0].replace(/\*/g, ' ').replace(/\|/g, ', ')) + '</td></tr>';
        times += amount;
      }
      tmp += '</table>';
      html += '<br />' + html_e(creature) + ' ' + ' (<b>' + times + '</b> times)' + ' - ' +
        '<span style="cursor:pointer;color:#0148c2;text-decoration:underline;" class="reward_container_statistics_table_toggle">Show</span>' +
        tmp +
        '<span style="display:none;cursor:pointer;color:#0148c2;text-decoration:underline;" class="reward_container_statistics_table_up">up</span>';
    });
    if (html) {
      $('#reward_container_statistics_tables').append(html);
      $('#reward_container_statistics_tables .reward_container_statistics_table_up').click(reward_container_statistics_table_up);
      $('#reward_container_statistics_tables .reward_container_statistics_table_toggle').click(reward_container_statistics_table_toggle);
      try {
        mw.loader.using('jquery.tablesorter', function () {
          $('table.sortable.reward_container_statistics').not('.jquery-tablesorter').tablesorter();
        });
      } catch (ignore) {}
    }
    else { $('#reward_container_statistics_tables').html('<br />Nothing to show with the current selection'); }
    reward_container_statistics_end();
  });
};
var reward_container_statistics_generator_init = function () {
  var creature, creature_list = [];
  var i = 0, options = '';
  var stats = reward_container_statistics_obj;
  for (creature in stats) { if (stats.hasOwnProperty(creature)) { creature_list.push(creature); } }
  creature_list.sort(sort_functions.creature);
  for (i = 0; i < creature_list.length; i++) {
    options += '<option value="' + html_e(creature_list[i]) + '">' + html_e(creature_list[i]) + '</option>';
  }
  $('#reward_container_statistics_generator').empty().append(
    $('<table>', {'class': 'wikitable'}).append($('<tr>').append(
      $('<td>', {style: 'vertical-align:top;padding:5px 20px;'}).append(
        'Creatures to include, use control+click to multi select<br />',
        $('<span></span>', {style: 'cursor:pointer;color:#0148c2;text-decoration:underline;'}).html('Select all')
        .click(function () { $('#reward_container_statistics_generator_sel').find('option').attr('selected', 'selected'); }),
        '<br />',
        $('<select>', {id: 'reward_container_statistics_generator_sel', multiple: 'multiple'}).attr({size: 12})
        .css({width: '100%'}).html(options)
      )
    )),
    '<br />',
    $('<input>', {type: 'button', value: 'Generate tables'}).click(reward_container_statistics_generator_gen),
    '<hr />',
    $('<div></div>', {id: 'reward_container_statistics_tables'})
  );
};

var reward_container_statistics_upload = function () {
  $('#reward_container_statistics_up').prop({disabled: true});
  $('#reward_container_statistics_block p').html('Uploading<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Uploading" />');
  $('#reward_container_statistics_block').fadeTo(400, 0.8);
  var upload_stats = function () {
    var errort = 'There was an error uploading, try again';
    $.ajax({
      url: '/api.php', type: 'POST', dataType: 'json',
      data : {
        action: 'edit', title: 'TibiaWiki:Reward_Container_Statistics/Statistics', format: 'json',
        summary: 'merging', text: reward_container_statistics_string,
        token: reward_container_statistics_token, basetimestamp: reward_container_statistics_basetimestamp, minor: 'minor'
      },
      error: function () { reward_container_statistics_end(errort, 2); },
      success: function (obj) {
        if (obj && obj.edit && obj.edit.result === 'Success') {
          reward_container_statistics_end('Stats uploaded.', 1);
        }
        else { reward_container_statistics_end(errort, 1); }
      }
    });
  };
  upload_stats();
};


var reward_container_statistics_text_to_stats = function (text) {
  var tmp = reward_container_statistics_merge(text);
  reward_container_statistics_string = tmp[0];
  reward_container_statistics_obj = tmp[1];
  reward_container_statistics_generator_init();
  reward_container_statistics_end();
  $('#reward_container_statistics_td_load').empty().append(
    $('<input>', {type: 'button', value: 'Go back'}).click(function () { reward_container_statistics_init(); })
  );
  if (sysop) {
    if (!$('#reward_container_statistics_stats_size').length) {
      $('#reward_container_statistics_td_sysop').append(
        'Size:&nbsp;',
        $('<input />', {id: 'reward_container_statistics_stats_size', type: 'text', size: '30', value: '', readonly: 'readonly', style: 'margin: 10px 0px'}),
        $('<input>', {type: 'button', value: 'Upload merged', id: 'reward_container_statistics_up'}).click(function () { reward_container_statistics_upload(); })
      );
    }
    $('#reward_container_statistics_stats_size').val('Old: ' + numcs(text.length) + ' / Merged: ' + numcs(reward_container_statistics_string.length));
    $('#reward_container_statistics_up').prop({disabled: false});
  }
};

var reward_container_statistics_load = function (from_teaxtarea) {
  $('#reward_container_statistics_l').prop({disabled: true});
  $('#reward_container_statistics_block p').html('Downloading<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Downloading" />');
  $('#reward_container_statistics_block').fadeTo(400, 0.8);
  if (from_teaxtarea) {
    reward_container_statistics_text_to_stats($('#' + from_teaxtarea).val());
    return;
  }
  var errort = 'There was a problem downloading, try again.';
  var get_stats_contents = function () {
    $.ajax({
      url: '/api.php', type: 'GET', dataType: 'json',
      data : {
        action: 'query', titles: 'TibiaWiki:Reward_Container_Statistics/Statistics', format: 'json',
        rvprop: 'content', prop: 'info|revisions', intoken: 'edit'
      },
      error: function () { reward_container_statistics_end(errort, 2); },
      success: function (obj) {
        var x;
        if (obj && obj.query && obj.query.pages) {
          for (x in obj.query.pages) { if (obj.query.pages.hasOwnProperty(x)) {
            if (obj.query.pages[x].missing !== undefined) { reward_container_statistics_end(errort, 2); }
            else {
              reward_container_statistics_text_to_stats($.trim(obj.query.pages[x].revisions[0]['*']));
            }
            break;
          } }
        }
        else { reward_container_statistics_end(errort, 2); }
      }
    });
  };
  var get_edit_info = function () {
    $.ajax({
      url: '/api.php', type: 'GET', dataType: 'json',
      data : {
        action: 'query', titles: 'TibiaWiki:Reward_Container_Statistics/Statistics', format: 'json',
        prop: 'info|revisions', intoken: 'edit'
      },
      error: function () { reward_container_statistics_end(errort, 2); },
      success: function (obj) {
        var x;
        if (obj && obj.query && obj.query.pages) {
          for (x in obj.query.pages) { if (obj.query.pages.hasOwnProperty(x)) {
            reward_container_statistics_token = obj.query.pages[x].edittoken;
            if (obj.query.pages[x].missing !== undefined) { reward_container_statistics_basetimestamp = ''; }
            else { reward_container_statistics_basetimestamp = obj.query.pages[x].revisions[0].timestamp; get_stats_contents(); }
            break;
          } }
        }
        else { reward_container_statistics_end(errort, 2); }
      }
    });
  };
  get_edit_info();
};

reward_container_statistics_init = function () {
  $('#reward_container_statistics_main').empty().css({textAlign: 'center', minHeight: '100px'}).append(
    $('<table>', {style: 'width:100%;'}).append($('<tr>').append(
      $('<td>', {style: 'width:50%;', id: 'reward_container_statistics_td_load'}).append(
        $('<textarea>', {cols: '20', rows: '5', style: 'width:100%;margin-bottom:5px;', id: 'reward_container_statistics_pt'}),
        $('<input>', {type: 'button', id: 'reward_container_statistics_p', value: 'Process your pasted data'}),
        '<br />',
        '(<b>Creature heal and damage statistics</b> from<br />',
        $('<a></a>', {href: '/wiki/Loot_Statistics'}).html('Loot Statistics').click(function () { window.open($(this).attr('href')); }),
        ')',
        '<br /><br />OR<br /><br />',
        $('<input>', {type: 'button', id: 'reward_container_statistics_l', value: 'Load data saved on TibiaWiki'})
      ),
      $('<td>', {style: 'width:50%;', id: 'reward_container_statistics_td_sysop'}).append('&nbsp;')
    )),
    $('<div></div>', {id: 'reward_container_statistics_generator', style: 'text-align:left;'})
  );

  $('#reward_container_statistics_main').append(
    $('<div></div>', {id: 'reward_container_statistics_block'})
      .css({display: 'none', position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', backgroundColor: '#666666', textAlign: 'center'})
      .html('<p style="font-size:xx-large;font-weight:bolder;font-family:Arial;color:white"></p><br />')
  );

  $('#reward_container_statistics_l').on('click', function () { reward_container_statistics_load(); });
  $('#reward_container_statistics_p').on('click', function () { reward_container_statistics_load('reward_container_statistics_pt'); });
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
      reward_container_statistics_init();
      $('#reward_container_statistics_img').hide();
      $('#reward_container_statistics_main').show();
    }
  });
}());
}());