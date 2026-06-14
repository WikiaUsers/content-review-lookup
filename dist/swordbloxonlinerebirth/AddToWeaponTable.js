/**
 * AddToWeaponTable.js
 *
 * Adds a button to weapon pages (pages using {{Weapon|...}} with a
 * weapon_type=[[X]] tag) that inserts the page into the matching
 * "List of X" table on the category page (e.g. One-Handed), sorted
 * by Max Skill (ascending), without disturbing existing row order.
 *
 * Install as MediaWiki:AddToWeaponTable.js and load via common.js:
 *   importArticle({ type: 'script', article: 'MediaWiki:AddToWeaponTable.js' });
 */
(function () {
  'use strict';

  // Map weapon_type value -> category list page name
  var TYPE_TO_PAGE = {
    'One-Handed': 'One-Handed',
    'Two-Handed': 'Two-Handed',
    'Rapier': 'Rapier',
    'Dagger': 'Dagger',
    'Melee': 'Melee'
    // add more weapon types/pages here as needed
  };

  // Only show the button to admins/content moderators
  var ALLOWED_GROUPS = ['sysop', 'content-moderator', 'bureaucrat'];

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

      var weaponStart = wikitext.search(/\{\{\s*Weapon\b/i);
      if (weaponStart === -1) return;

      var block = extractTemplateBlock(wikitext, weaponStart);
      if (block === null) return;

      var params = parseParams(block);

      var weaponType = stripLinks(params.weapon_type || '');
      var targetPage = TYPE_TO_PAGE[weaponType];
      if (!targetPage) return; // unknown / unmapped type, do nothing

      var skillLevel = (params.skill_level || '').trim();
      var damage = (params.damage || '').trim();
      var location = (params.location || '').trim();

      if (!skillLevel || !damage) return; // not enough data to build a row

      addButton(targetPage, pageName, skillLevel, damage, location);
    });
  });

  // --- helpers -------------------------------------------------------

  function extractTemplateBlock(wikitext, startIndex) {
    // wikitext[startIndex..] begins with "{{Weapon"
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
          // content is between contentStart and i, minus the leading "Weapon"
          var raw = wikitext.slice(contentStart, i);
          // strip leading "Weapon" name token
          raw = raw.replace(/^\s*Weapon\b/i, '');
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

  function stripLinks(s) {
    // [[One-Handed]] -> One-Handed, [[A|B]] -> B
    return s.replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1').trim();
  }

  function addButton(targetPage, pageName, skillLevel, damage, location) {
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
      runUpdate(targetPage, pageName, skillLevel, damage, location, $btn);
    });
  }

  function runUpdate(targetPage, pageName, skillLevel, damage, location, $btn) {
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

      // Locate the sortable weapon table (first "wikitable sortable" table)
      var tableMatch = wikitext.match(/\{\|\s*class="wikitable sortable[\s\S]*?\n\|\}/);
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

      var newSkill = parseFloat(skillLevel);
      var insertIndex = rows.length; // default: before closing |}

      for (var i = 1; i < rows.length; i++) {
        var rowText = rows[i];
        var firstLineEnd = rowText.indexOf('\n');
        var firstCell = (firstLineEnd === -1 ? rowText : rowText.slice(0, firstLineEnd)).trim();
        // Skip cell marker
        firstCell = firstCell.replace(/^\|/, '').trim();

        // Find Max Skill cell - it's the 2nd cell in the row
        var cells = rowText.split('\n|');
        // cells[0] starts with "|[[Weapon]]" (1st col), cells[1] = Max Skill, etc.
        if (cells.length < 2) continue;

        var skillCellRaw = cells[1].split('\n')[0].trim();
        var skillVal = parseFloat(skillCellRaw.replace(/'''/g, '').replace(/\[Max\]/i, '').trim());

        if (isNaN(skillVal)) continue;

        if (newSkill < skillVal) {
          insertIndex = i;
          break;
        }
      }

      // Build new row
      var newRow = '|[[' + pageName + ']]\n' +
                    '|' + skillLevel + '\n' +
                    '|' + damage + '\n' +
                    '|' + location + '\n';

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

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
})();