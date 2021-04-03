/*jslint devel: true, browser: true, plusplus: true, white: true */
/*global $ */

(function () {
  'use strict';
  var
  //from MediaWiki:LootStatistics-Data.js
  current_tibia_version = window.loot_parser_data.current_tibia_version,
  //from MediaWiki:LootStatistics-Data.js
  lootparser_versions_ex = window.loot_parser_data.versions,
  //name of the page for creatures (same as in MediaWiki:LootStatistics.js)
  lootparser_creature_special_names = {
    'Arkhothep': 'Arkhothep (Creature)',
    'Armenius': 'Armenius (Creature)',
    'Avalanche': 'Avalanche (Creature)',
    'Fish': 'Fish (Creature)',
    'Gamemaster': 'Gamemaster (Creature)',
    'Hacker': 'Hacker (Creature)',
    'Mooh\'tah Warrior': 'Mooh\'Tah Warrior',
    'Nomad': 'Nomad (Basic)',
    'Northern Pike': 'Northern Pike (Creature)',
    'Owin': 'Owin (Creature)',
    'Pythius the Rotten': 'Pythius the Rotten (Creature)',
    'Thief': 'Thief (Creature)',
    'The Sinister Hermit': 'The Sinister Hermit (Blue)',
    'Yalahari': 'Yalahari (Creature)'
  },
  //exceptions for items that are dropped by specific creatures (same as in MediaWiki:LootStatistics.js)
  creature_items_name_change = {
    'Acolyte of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (Second Verse)'},
    'Adept of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (Third Verse)'},
    'Barbarian Brutetamer': {'Book': 'Book (Grey)'},
    'Blightwalker': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Blue Djinn': {'Book': 'Book (Blue)'},
    'Bragrumol': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Brain Squid': {'Inkwell': 'Inkwell (Black)'},
    'Chopper': {'Dung Ball': 'Dung Ball (Quest)'},
    'Crazed Summer Rearguard': {'Egg With Dream Essence': 'Egg with Dream Essence'},
    'Crazed Summer Vanguard': {'Egg With Dream Essence': 'Egg with Dream Essence'},
    'Crazed Winter Rearguard': {'Egg With Dream Essence': 'Egg with Dream Essence', 'Ice Flower': 'Ice Flower (Item)'},
    'Crazed Winter Vanguard': {'Egg With Dream Essence': 'Egg with Dream Essence', 'Ice Flower': 'Ice Flower (Item)'},
    'Deepworm': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Demodras': {'Book': 'Book (Gemmed)'},
    'Dharalion': {'Parchment': 'Parchment (Rewritable)'},
    'Diremaw': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Dragon Lord': {'Book': 'Book (Gemmed)'},
    'Enlightened of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (Fourth Verse)'},
    'Falcon Knight': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Falcon Paladin': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Ferumbras Mortal Shell': {'Ferumbras\' Staff': 'Ferumbras\' Staff (Blunt)'},
    'Fleshslicer': {'Dung Ball': 'Dung Ball (Quest)'},
    'Flimsy Lost Soul': {'Lost Soul': 'Lost Soul (Item)'},
    'Freakish Lost Soul': {'Lost Soul': 'Lost Soul (Item)'},
    'Frost Dragon': {'Book': 'Book (Gemmed)'},
    'Fury': {'Jalapeño Pepper': 'Jalapeno Pepper', 'Jalapeńo Pepper': 'Jalapeno Pepper', 'Jalape\uFFFDo Pepper': 'Jalapeno Pepper'},
    'Furyosa': {'Jalapeño Pepper': 'Jalapeno Pepper', 'Jalapeńo Pepper': 'Jalapeno Pepper', 'Jalape\uFFFDo Pepper': 'Jalapeno Pepper'},
    'Ghost': {'Book': 'Book (Orange)'},
    'Glooth Brigand': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Green Djinn': {'Book': 'Book (Green)'},
    'Grynch Clan Goblin': {'Picture': 'Picture (Landscape)'},
    'Hand of Cursed Fate': {'Book': 'Book (Orange)'},
    'Hellflayer': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Hive Overseer': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Ink Blob': {'Inkwell': 'Inkwell (Black)', 'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Insane Siren': {'Egg With Dream Essence': 'Egg with Dream Essence'},
    'Juggernaut': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Killer Caiman': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Kollos': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Lumbering Carnivor': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Maw': {'Dung Ball': 'Dung Ball (Quest)'},
    'Mean Lost Soul': {'Lost Soul': 'Lost Soul (Item)'},
    'Mindmasher': {'Dung Ball': 'Dung Ball (Quest)'},
    'Novice of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (First Verse)'},
    'Ogre Savage': {'Jalapeño Pepper': 'Jalapeno Pepper', 'Jalapeńo Pepper': 'Jalapeno Pepper', 'Jalape\uFFFDo Pepper': 'Jalapeno Pepper'},
    'Orc Shaman': {'Book': 'Book (Grey)'},
    'Piñata Dragon': {'Costume Bag': 'Costume Bag (Retro)'},
    'Pirate Buccaneer': {'Treasure Map': 'Treasure Map (Pirate)'},
    'Pirate Cutthroat': {'Treasure Map': 'Treasure Map (Pirate)'},
    'Pirate Ghost': {'Parchment': 'Parchment (Rewritable)'},
    'Pirate Marauder': {'Treasure Map': 'Treasure Map (Pirate)'},
    'Priestess': {'Book': 'Book (Orange)'},
    'Prince Drazzak': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Rage Squid': {'Inkwell': 'Inkwell (Black)'},
    'Renegade Quara Pincher': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Rotten Golem': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Rotspit': {'Dung Ball': 'Dung Ball (Quest)'},
    'Seacrest Serpent': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Shadowpelt': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Shadowstalker': {'Dung Ball': 'Dung Ball (Quest)'},
    'Shark': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Soul-Broken Harbinger': {'Egg With Dream Essence': 'Egg with Dream Essence', 'Ice Flower': 'Ice Flower (Item)'},
    'Spidris': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Spidris Elite': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Squid Warden': {'Inkwell': 'Inkwell (Black)'},
    'Tarnished Spirit': {'Book': 'Book (Orange)'},
    'Thawing Dragon Lord': {'Ice Cream Cone': 'Ice Cream Cone (Blue-Barian)'},
    'The Enraged Thorn Knight': {'Part of a Rune': 'Part of a Rune (One)'},
    'The False God': {'Blood of the Mountain': 'Blood of the Mountain (Item)'},
    'The Fear Feaster': {'Amber': 'Amber (Item)'},
    'The Many': {'Egg of the Many': 'Egg of The Many'},
    'The Percht Queen': {'Icicle': 'Icicle (Percht)', 'Fly Agaric': 'Fly Agaric (Item)'},
    'The Sandking': {'Heart of the Mountain': 'Heart of the Mountain (Item)'},
    'The Unwelcome': {'Amber With A Dragonfly': 'Amber with a Dragonfly'},
    'Thieving Squirrel': {'Flask With Beaver Bait': 'Flask with Beaver Bait'}
  },

  sysop = false,
  main_function = function () {
    var
    html_e = function (t) {
      var cmap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
      return String(t).replace(/[&<>"']/g, function (m) { return cmap[m]; });
    },
    creature_items_name_paren = {},
    requests_to_do, total_requests, x, y,
    requests_to_do_minus = function () {
      $('#stats_doing1').text('Checking');
      $('#stats_doing2').text(String(Math.abs(requests_to_do - total_requests)) + '/' + String(total_requests));
      requests_to_do--;
      if (requests_to_do <= 0) {
        $('#stats_data').parents('div:first').find('input').removeAttr('disabled');
        $('#stats_doing2').text('Complete');
      }
    },
    check_all = function (filter_function) {
      var dook = function ($a) {
        $a.parent().remove();
      },
      doajax = function (id, redirect_amount) {
        if (typeof redirect_amount !== 'number') { redirect_amount = 0; }
        var $this = $(this), page_name = $this.text().replace('Loot Statistics:', ''), t = $.trim(page_name.replace(/ /g, '_'));
        $.ajax({cache: false, async: true, url: '/index.php?title=Loot_Statistics:' + t + '&action=raw', success: function (r) {
          if (r === '') { window.setTimeout(function () { doajax.call($this[0], id, redirect_amount); }, 3000); }
          else {
            var error_list = [], creature, is_redirect;
/*jslint regexp: true*/
            is_redirect = r.match(/#REDIRECT \[\[Loot Statistics:(.*?)\]\]/);
/*jslint regexp: false*/
            if (is_redirect) {
              redirect_amount++;
              if (redirect_amount > 1) {
                error_list.push('Too many redirects');
              }
              else {
                $this.text('Loot Statistics:' + is_redirect[1]);
                doajax.call($this[0], id, redirect_amount);
                return;
              }
            }
            else {
/*jslint regexp: true*/
              creature = r.match(/name\s*=([^|{}]*)/);
/*jslint regexp: false*/
              creature = (creature ? $.trim(creature[1]).replace(/_/g, ' ') : '');
              creature = $.trim(creature.replace(/\(Creature\)/, ''));
              if (!creature) { error_list.push('Could not find creature name'); }
              else if (creature !== page_name && page_name !== lootparser_creature_special_names[creature]) {
                error_list.push(
                  'Possible incorrect name: ' + html_e(creature) + '/' + html_e(lootparser_creature_special_names[creature] || creature)
                );
              }
              error_list.push.apply(error_list, filter_function(r, creature));
            }
            if (error_list.length) {
              $this.parent().append('<br />');
/*jslint unparam: true*/
              $.each(error_list, function (i, v) { $this.parent().append(v + '<br />'); });
/*jslint unparam: false*/
            }
            else {
              dook($this);
            }
            requests_to_do_minus();
          }
        }, error: function (a, b, c) {
          if (a.status !== 404) {
            alert('Error loading Loot_Statistics:' + t + '\n' + [a.status, b, c].join(', ')); window.setTimeout(function () { doajax.call($this[0], id, redirect_amount); }, 3000); }
          else { requests_to_do_minus(); }
        }
        });
      };
      $('#stats_data').parents('div:first').find('input').attr('disabled', 'disabled');
      $('#stats_result').html($('#stats_data').html());
      $('#stats_result').find('a.new').parent().remove();
      total_requests = requests_to_do = $('#stats_result').find('a').each(doajax).length;
    };

    for (x in creature_items_name_change) { if (creature_items_name_change.hasOwnProperty(x)) {
      for (y in creature_items_name_change[x]) { if (creature_items_name_change[x].hasOwnProperty(y)) {
        if (creature_items_name_change[x][y].match(/\(/) !== null) {
          if (!creature_items_name_paren.hasOwnProperty(x)) { creature_items_name_paren[x] = {}; }
          creature_items_name_paren[x][creature_items_name_change[x][y]] = 0;
        }
      } }
    } }

    $('#stats_data').closest('table').prev().remove();

    $('#stats_data').closest('table').before(
      $('<table>').append(
        $('<tr>').append(
          $('<td>').html('List pages that have wrong parameters or versions<br /><span style="font-size:xx-small;">Please note this only does some checks</span>'),
          $('<td>').append(
            $('<input />', {'value': 'Check', 'type': 'button'}).click(function () {
              check_all(function (r, creature) {
/*jslint regexp: true*/
                var tt, item, times, amount, total, x2, y2, ret = [], tmpt, tmps,
                tmp = r.match(/\{\{\s*Loot2[\s\|]*version\s*=\s*(?:\d+\.\d+)[\s\|]*[^}]*/g), tmpa = [],
                versions = r.match(/\{\{\s*Loot2[\s\|]*version\s*=\s*\d+\.\d+/g), versions_n = [], tmpv;
/*jslint regexp: false*/
                if (versions !== null) {
                  for (x2 = 0; x2 < versions.length; x2++) {
                    y2 = 0;
                    while (versions[x2].substr(y2 - 1, 1).match(/\d|\./)) { y2--; }
                    versions_n[x2] = parseFloat(versions[x2].substr(y2), 10);
                  }
                  //possible incorrect version
                  for (x2 = 0; x2 < versions_n.length; x2++) {
                    for (y2 = 0; y2 < versions_n.length; y2++) {
                      if (x2 !== y2 && versions_n[x2] === versions_n[y2]) {
                        ret.push('Repeated template version:' + versions_n[x2]);
                      }
                    }
                  }
                  if (lootparser_versions_ex[current_tibia_version].changed.hasOwnProperty(creature)) {
                    tmpv = parseFloat(lootparser_versions_ex[current_tibia_version].changed[creature], 10);
                    for (x2 = 0; x2 < versions_n.length; x2++) {
                      if (versions_n[x2] > tmpv) { ret.push('Possible incorrect version:' + versions_n[x2]); }
                    }
                  }
                  if (lootparser_versions_ex[current_tibia_version]['new'].hasOwnProperty(creature)) {
                    tmpv = parseFloat(lootparser_versions_ex[current_tibia_version]['new'][creature], 10);
                    for (x2 = 0; x2 < versions_n.length; x2++) {
                      if (versions_n[x2] !== tmpv) { ret.push('Possible incorrect version:' + versions_n[x2]); }
                    }
                  }
                  //possible non existing version
                  for (x2 = 0; x2 < versions_n.length; x2++) {
                    if (
                      versions_n[x2] > current_tibia_version &&
                      !lootparser_versions_ex[current_tibia_version]['new'].hasOwnProperty(creature) &&
                      !lootparser_versions_ex[current_tibia_version].changed.hasOwnProperty(creature)
                    ) { ret.push('Possible non existing version:' + versions_n[x2]); }
                  }
                  //repeated template version
                  for (x2 = 0; x2 < versions_n.length; x2++) {
                    for (y2 = 0; y2 < versions_n.length; y2++) {
                    if (x2 !== y2 && versions_n[x2] === versions_n[y2]) {
                      ret.push('Repeated template version:' + versions_n[x2]);
                    }
                  }
                }
                }
                //wrong parameters
                if (tmp !== null) {
                  for (x2 = 0; x2 < tmp.length; x2++) {
                    tmpa[x2] = tmp[x2].split(/[\r\n|]+/);
                    for (y2 = 0; y2 < tmpa[x2].length; y2++) {
                      tmpt = $.trim(tmpa[x2][y2]);
                      if (tmpt.indexOf(',') !== -1) {
/*jslint regexp: true*/
                        tt = tmpt.match(/(.*?\(.*?)\s*,/);
/*jslint regexp: false*/
                        if (tt !== null) {
                          item = tt[1];
                          if (
                            !creature_items_name_paren.hasOwnProperty(creature) ||
                            !creature_items_name_paren[creature].hasOwnProperty(item)
                          ) { ret.push(tmpt + ' - (non listed item with parenthesis)'); }
                        }

                        if (tmpt.match(/,/g).length !== 1 && tmpt.match(/,/g).length !== 3) { ret.push(tmpt + ' - (wrong number of parameters )'); }
                        else if (tmpt.match(/,/g).length === 3) {
/*jslint regexp: true*/
                          tt = tmpt.match(/(.*?)\s*,\s*times\s*:\s*(\d*)\s*,\s*amount\s*:\s*([\d\-]*)\s*,\s*total\s*:\s*(\d*)/);
/*jslint regexp: false*/
                          if (tt !== null) {
                            item = tt[1];
                            if (item === 'Empty') { ret.push(tmpt + ' - (wrong "Empty")'); }
                            else {
                              tmps = item.match(/\s+(?:boots|legs)$/i);
                              if (tmps !== null) {
                                ret.push(tmpt + ' - (wrong "' + tmps + '", non countable)');
                              }
                              else {
                                times = (parseInt(tt[2], 10) || 0);
                                amount = tt[3];
                                total = (parseInt(tt[4], 10) || 0);
                                if (times > total) { ret.push(tmpt + ' - (wrong "times" or "total")'); }
                                else if (amount.indexOf('-') === -1 && ((parseInt(amount, 10) || 0) * times) !== total) {
                                  ret.push(tmpt + ' - (wrong "times" or "total")');
                                }
                                if (amount.indexOf('-') > -1 && times === total) {
                                  ret.push(tmpt + ' - (wrong "times", "amount" or "total")');
                                }
                              }
                            }
                          }
                        }
                      }
                      else if (tmpt.indexOf('=') === -1 && tmpt.indexOf('Loot2') === -1 && tmpt !== '') {
                        ret.push(tmpt + ' - (missing parameters)');
                      }
                    }
                  }
                }

                return ret;
              });
            })
          )
        ),
        $('<tr>').append(
          $('<td>', {'id': 'stats_doing1'}).html('&nbsp;'),
          $('<td>', {'id': 'stats_doing2'}).html('&nbsp;')
        )
      )
    );
  };
  $.ajax({
    url: '/api.php', type: 'GET', dataType: 'json',
    data : {
      'action': 'query', 'format': 'json',
      'meta': 'userinfo', 'uiprop': 'groups'
    },
    success: function (obj) {
      var x;
      if (obj && obj.query && obj.query.userinfo && obj.query.userinfo.groups) {
        for (x in obj.query.userinfo.groups) { if (obj.query.userinfo.groups.hasOwnProperty(x)) {
          if ((obj.query.userinfo.groups[x]) === 'sysop') { sysop = true; break; }
        } }
      }
      if (sysop) { main_function(); }
    }
  });
}());