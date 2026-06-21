/**
 * AddToTable.js
 *
 * Adds a button to weapon/armor/shield pages that inserts the page into the
 * matching "List of X" table on the relevant category page (e.g. One-Handed,
 * Armor, Shields), sorted by Skill/Level (ascending), without disturbing
 * existing row order.
 *
 * Install as MediaWiki:AddToTable.js and load via ImportJS:
 *   importArticles({ type: 'script', articles: ['MediaWiki:AddToTable.js'] });
 */
(function () {
  'use strict';

  // --- configuration ---------------------------------------------------

  // Only show the button to admins/content moderators
  var ALLOWED_GROUPS = ['sysop', 'content-moderator', 'bureaucrat'];

  // Weapon config: {{Weapon|...}} -> "List of X" tables
  // Columns: Weapon Name | Max Skill | Attack Damage | How to Obtain
  var WEAPON_TYPE_TO_PAGE = {
    'One-Handed': 'One-Handed',
    'Two-Handed': 'Two-Handed',
    'Rapier': 'Rapier',
    'Dagger': 'Dagger',
    'Melee': 'Melee'
  };

  // Armor/gear config: {{Armor|...}} -> "List of X" tables
  // equipment_type value -> { page, columns }
  // columns: 'full' = Name|Level|Defense|Dexterity|How to Obtain
  //          'shield' = Name|Level|Defense|How to Obtain (no Dexterity)
  var EQUIP_TYPE_CONFIG = {
    'Armor': { page: 'Armor', columns: 'full' },
    'Armour': { page: 'Armor', columns: 'full' },
    'Upper Headwear': { page: 'Upper Headwear', columns: 'full' },
    'Lower Headwear': { page: 'Lower Headwear', columns: 'full' },
    'Shields': { page: 'Shields', columns: 'shield' },
    'Shield': { page: 'Shields', columns: 'shield' }
  };

  // --- entry point -------------------------------------------------------

  if (mw.config.get('wgNamespaceNumber') !== 0) return; // main namespace only

  var userGroups = mw.config.get('wgUserGroups') || [];
  var isAllowed = userGroups.some(function (g) {
    return ALLOWED_GROUPS.indexOf(g) !== -1;
  });
  if (!isAllowed) return;

  $(function () {
    var pageName = mw.config.get('wgPageName').replace(/_/g, ' ');

    new mw.Api().get({
      action: 'parse',
      page: pageName,
      prop: 'wikitext',
      format: 'json'
    }).done(function (data) {
      if (!data.parse || !data.parse.wikitext) return;
      var wikitext = data.parse.wikitext['*'];

      // Try Weapon template first, then Armor template
      var weaponInfo = tryWeapon(wikitext);
      if (weaponInfo) {
        addButton(weaponInfo.targetPage, pageName, weaponInfo.row, weaponInfo.sortValue);
        return;
      }

      var armorInfo = tryArmor(wikitext);
      if (armorInfo) {
        addButton(armorInfo.targetPage, pageName, armorInfo.row, armorInfo.sortValue);
        return;
      }
    });
  });

  // --- template-specific extraction --------------------------------------

  function tryWeapon(wikitext) {
    var startIndex = wikitext.search(/\{\{\s*Weapon\b/i);
    if (startIndex === -1) return null;

    var block = extractTemplateBlock(wikitext, startIndex, 'Weapon');
    if (block === null) return null;

    var params = parseParams(block);

    var weaponType = getLinkTarget(params.weapon_type || '');
    var targetPage = WEAPON_TYPE_TO_PAGE[weaponType];
    if (!targetPage) return null;

    var skillLevel = extractNumber((params.skill_level || '').trim());
    var damage = extractNumber((params.damage || '').trim());
    var location = (params.location || '').trim();

    if (skillLevel === null || damage === null) return null;

    var row = '|' + skillLevel + '\n' +
              '|' + damage + '\n' +
              '|' + location + '\n';

    return { targetPage: targetPage, row: row, sortValue: parseFloat(skillLevel) };
  }

  function tryArmor(wikitext) {
    var startIndex = wikitext.search(/\{\{\s*Armor\b/i);
    if (startIndex === -1) return null;

    var block = extractTemplateBlock(wikitext, startIndex, 'Armor');
    if (block === null) return null;

    var params = parseParams(block);

    var equipType = getLinkTarget(params.equipment_type || '');
    var config = EQUIP_TYPE_CONFIG[equipType];
    if (!config) return null;

    var level = extractNumber((params.level_req || '').trim());
    var defense = (params.defense || '').trim();
    var dexterity = (params.dexterity || '').trim();
    var howToObtain = (params.how_to_obtain || '').trim();

    if (level === null) return null;

    var row;
    if (config.columns === 'shield') {
      // Shield Name | Level | Defense | How to Obtain
      if (defense === '') return null;
      row = '|' + level + '\n' +
            '|' + defense + '\n' +
            '|' + howToObtain + '\n';
    } else {
      // Equipment Name | Level | Defense Stat | Dexterity Stat | How to Obtain
      var defenseVal = defense === '' ? '0' : defense;
      var dexterityVal = dexterity === '' ? '0' : dexterity;
      row = '|' + level + '\n' +
            '|' + defenseVal + '\n' +
            '|' + dexterityVal + '\n' +
            '|' + howToObtain + '\n';
    }

    return { targetPage: config.page, row: row, sortValue: parseFloat(level) };
  }

  // --- generic wikitext parsing helpers -----------------------------------

  function extractTemplateBlock(wikitext, startIndex, templateName) {
    var depth = 0;
    var i = startIndex;
    var len = wikitext.length;
    var contentStart = -1;

    while (i < len - 1) {
      var two = wikitext.substr(i, 2);
      if (two === '{{') {
        depth++;
        if (depth === 1) {
          contentStart = i + 2;
        }
        i += 2;
        continue;
      }
      if (two === '}}') {
        depth--;
        if (depth === 0) {
          var raw = wikitext.slice(contentStart, i);
          raw = raw.replace(new RegExp('^\\s*' + templateName + '\\b', 'i'), '');
          return raw;
        }
        i += 2;
        continue;
      }
      i++;
    }
    return null;
  }

  function parseParams(block) {
    var params = {};
    var lines = splitTopLevel(block, '|');
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var eq = line.indexOf('=');
      if (eq === -1) continue;
      var key = line.slice(0, eq).trim();
      var val = line.slice(eq + 1).trim();
      params[key] = val;
    }
    return params;
  }

  // Split `str` on `sep` characters that are not inside [[ ]] or {{ }} nesting
  function splitTopLevel(str, sep) {
    var parts = [];
    var depthSquare = 0;
    var depthCurly = 0;
    var current = '';
    var i = 0;
    var len = str.length;

    while (i < len) {
      var two = str.substr(i, 2);
      if (two === '[[') { depthSquare++; current += two; i += 2; continue; }
      if (two === ']]') { depthSquare = Math.max(0, depthSquare - 1); current += two; i += 2; continue; }
      if (two === '{{') { depthCurly++; current += two; i += 2; continue; }
      if (two === '}}') { depthCurly = Math.max(0, depthCurly - 1); current += two; i += 2; continue; }

      var ch = str[i];
      if (ch === sep && depthSquare === 0 && depthCurly === 0) {
        parts.push(current);
        current = '';
        i++;
        continue;
      }
      current += ch;
      i++;
    }
    parts.push(current);
    return parts;
  }

  // Extracts the link TARGET (before |) for matching against config maps.
  // [[One-Handed]] -> One-Handed, [[One-Handed|One Handed]] -> One-Handed
  function getLinkTarget(s) {
    var m = s.match(/\[\[\s*([^\]|]+)/);
    if (m) return m[1].trim();
    return s.trim();
  }

  // Pulls the first numeric value (int or decimal) out of a string like
  // "Skill 255", "1295 ATK", "Level 8" or "60". Returns the number as a
  // string, or null if no number found.
  function extractNumber(s) {
    var m = s.match(/[\d.]+/);
    if (!m) return null;
    return m[0].replace(/\.$/, ''); // trim stray trailing dot
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // --- UI & page update ----------------------------------------------------

  function addButton(targetPage, pageName, row, sortValue) {
    var $btn = $('<button>')
      .text('Add to ' + targetPage + ' table')
      .css({
        margin: '10px 0',
        padding: '6px 12px',
        cursor: 'pointer'
      });

    var $container = $('<div>').append($btn);
    $('#firstHeading').after($container);

    $btn.on('click', function () {
      $btn.prop('disabled', true).text('Working...');
      runUpdate(targetPage, pageName, row, sortValue, $btn);
    });
  }

  function runUpdate(targetPage, pageName, row, sortValue, $btn) {
    var api = new mw.Api();

    api.get({
      action: 'parse',
      page: targetPage,
      prop: 'wikitext',
      format: 'json'
    }).done(function (data) {
      if (!data.parse || !data.parse.wikitext) {
        fail($btn, 'Could not load target page.');
        return;
      }
      var wikitext = data.parse.wikitext['*'];

      // Already listed?
      var linkPattern = new RegExp('\\[\\[\\s*' + escapeRegex(pageName) + '\\s*(\\|[^\\]]*)?\\]\\]');
      if (linkPattern.test(wikitext)) {
        fail($btn, 'Already in table.', true);
        return;
      }

      // Locate the sortable table (handles "wikitable sortable" or "sortable wikitable")
      var tableMatch = wikitext.match(/\{\|\s*class="[^"]*sortable[^"]*"[\s\S]*?\n\|\}/);
      if (!tableMatch) {
        fail($btn, 'Could not find table.');
        return;
      }
      var table = tableMatch[0];
      var tableStart = tableMatch.index;
      var tableEnd = tableStart + table.length;

      // Split into rows on "|-"
      var rows = table.split(/\n\|-\n/);
      // rows[0] = header block including {| ... and !column headers
      // rows[1..] = data rows (last one ends with "\n|}")

      var insertIndex = rows.length; // default: before closing |}

      for (var i = 1; i < rows.length; i++) {
        var rowText = rows[i];
        var cells = rowText.split('\n|');
        // cells[0] starts with "|[[Name]]" (1st col), cells[1] = sort column (Skill/Level), etc.
        if (cells.length < 2) continue;

        var sortCellRaw = cells[1].split('\n')[0].trim();
        var sortVal = parseFloat(sortCellRaw.replace(/'''/g, '').replace(/\[Max\]/i, '').trim());

        if (isNaN(sortVal)) continue;

        if (sortValue < sortVal) {
          insertIndex = i;
          break;
        }
      }

      // Build new row
      var newRow = '|[[' + pageName + ']]\n' + row;

      rows.splice(insertIndex, 0, newRow);

      var newTable = rows.join('\n|-\n');
      var newWikitext = wikitext.slice(0, tableStart) + newTable + wikitext.slice(tableEnd);

      api.postWithToken('csrf', {
        action: 'edit',
        title: targetPage,
        text: newWikitext,
        summary: 'Automatically added [[' + pageName + ']] to table',
        format: 'json'
      }).done(function (editResult) {
        if (editResult.edit && editResult.edit.result === 'Success') {
          $btn.text('Added!').css('background', '#8f8');
        } else {
          fail($btn, 'Edit failed.');
        }
      }).fail(function () {
        fail($btn, 'Edit request failed.');
      });
    }).fail(function () {
      fail($btn, 'Could not load target page.');
    });
  }

  function fail($btn, msg, soft) {
    $btn.prop('disabled', !soft).text(msg);
    if (soft) {
      setTimeout(function () {
        $btn.prop('disabled', false).text('Add to table');
      }, 2000);
    }
  }
})();