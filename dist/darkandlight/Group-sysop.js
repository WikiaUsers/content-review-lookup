/* Any JavaScript here will be loaded for sysops only */
/**
 * jJsonViewer
 * @link https://github.com/Shridhad/jjsonviewer
 * @license MIT
 * the original was improved a lot
 */
!function($) {
  'use strict';
  $.fn.jJsonViewer = function(jjson, options) {
    return this.each(function() {
      var $this = $(this);
      var json, error = null;
      if (typeof jjson == 'string') {
        try {
          json = JSON.parse(jjson);
        } catch (e) {
          json = jjson;
          error = e.toString();
        }
      } else if (typeof jjson == 'object') {
        json = jjson;
      } else {
        json = null;
      }
      JJsonViewer($this, json, options, error);
    });
  };
  function JJsonViewer($this, json, options, error) {
    var defaults = {
      expanded: true
    };
    var $container = $('<ul class="jjson-container">');
    $this.empty().append($container);
    try {
      if (error)
        throw error;
      options = $.extend({}, defaults, options);
      $container.append(json2html([json], options.expanded ? 'expanded' : 'expanded collapsed hidden'));
    } catch (e) {
      $this.prepend($('<div class="jjson-error">').text(e.toString()));
      $container.append(JSON.stringify(json));
    }
  }
  function json2html(json, expanderClasses) {
    var elements = [];
    for (var key in json) {
      if (!json.hasOwnProperty(key)) {
        continue;
      }
      elements.push(createElement(key, json[key], expanderClasses));
    }
    return elements;
  }
  function createKey(key) {
    return $('<span class="key">').text('"' + key + '": ');
  }
  function createElement(key, value, expanderClasses) {
    var klass = 'object', open = '{', close = '}';
    if ($.isArray(value)) {
      klass = 'array';
      open = '[';
      close = ']';
    }
    var type = typeof value;
    if (value === null) {
      return $('<li>').append(
          createKey(key),
          $('<span class="null">').text('null')
        );
    }
    if (type == 'object') {
      var $li = $('<li>').append(
          $('<span>').addClass(expanderClasses),
          createKey(key),
          $('<span class="open">').text(open),
          $('<ul class="content">').addClass(klass).append(json2html(value, expanderClasses))
        );
      if (value && value.name) {
        $li.append(
          $('<span class="name">').text(' (' + (value.quantity ? value.quantity + '× ' : '') + value.name + (value.class ? ' - ' + value.class : '') + ') ')
        );
      }
      $li.append(
        $('<span class="close">').text(close)
      );
      return $li;
    }
    if (type == 'number' || type == 'boolean') {
      return $('<li>').append(
          createKey(key),
          $('<span>').addClass(type).text(value));
    }
    if (typeof value == 'string' && value.length > 200) {
      return $('<li>').append(
          $('<span>').addClass(expanderClasses),
          createKey(key),
          $('<span class="open">').text('"'),
          $('<span class="content string">').text(value),
          $('<span class="close">').text('"')
        );
    }
    return $('<li>').append(
        createKey(key),
        $('<span>').addClass(type).text('"' + value + '"')
      );
  }
  $(document).on('click', '.jjson-container .expanded', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).addClass('collapsed'); //.parent().find('>.content').hide();
      });
  $(document).on('click', '.jjson-container .expanded.collapsed', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).removeClass('collapsed hidden'); //.parent().find('>.content').show();
      });
}(window.jQuery);
$(function () {
  var pageTitle = mw.config.get('wgTitle');
  var mod = 'core';
  var mods = {
    'core': 'Core'
  };
  var types = {
    'items': 'Item',
    'creatures': 'Creature'
  };
  // Find and remove DLC from page title
  $.each(mods,
    function (type, name) {
      var index = pageTitle.indexOf('(' + name + ')');
      if (index > -1) {
        mod = type;
        pageTitle = pageTitle.substr(0, index).trim();
        return false;
      }
      return null;
    });
  var dataType = '';
  if (mw.config.get('wgAction') === 'edit') {
    var $textbox = $('#wpTextbox1');
    var textboxContent = $textbox.val().toLowerCase();
    if (textboxContent.indexOf('{{infobox creature') > -1) {
      dataType = 'creatures';
      // Find DLC name
      $.each(mods, function (type, name) {
        if (textboxContent.indexOf('{{dlc|' + name.toLowerCase() + '}}') > -1) {
          mod = type;
          return false;
        }
        return null;
      });
    } else if (textboxContent.indexOf('{{infobox') > -1) {
      dataType = 'items';
    }
  } else {
    var categories = mw.config.get('wgCategories') || [];
    if (categories.indexOf('Creatures') > -1) {
      dataType = 'creatures';
      // Find DLC name
      $.each(mods, function (type, name) {
        if (categories.indexOf(name) > -1) {
          mod = type;
          return false;
        }
        return null;
      });
    } else if (categories.indexOf('Items') > -1) {
      dataType = 'items';
    }
  }
  var $container, $output;
  var output = [];
  var $jsonLink = $('<a title="' + mod + '/' + dataType + '">JSON</a>').click(function (event) {
    event.preventDefault();
    initializeUI();
    if (dataType) {
      addData(dataType, mod, pageTitle);
    }
    $('#itemName').val(pageTitle);
    $('#typeName').val(dataType);
    $('#modName').val(mod);
  });
  $('#p-views ul').prepend(
    $('<li>').append($('<span>').append($jsonLink))
  );
  function initializeUI() {
    if ($container) {
      return;
    }
    $container = $('<div id="q-helper">');
    $output = $('<div>');
    $container.append($('<div>')
      .append(
        '<label for="itemName">Name</label>',
        '<input type="text" id="itemName">',
        '<label for="typeName">Type</label>',
        $('<select id="typeName">')
        .append(
          $.map(types,
            function (name, type) {
              return $('<option>').val(type).text(name);
            })
        ),
        '<label for="modName">Mod</label>',
        $('<select id="modName">')
        .append(
          '<option value="">-</option>',
          $.map(mods,
            function (name, type) {
              return $('<option>').val(type).text(name);
            })
        ),
        $('<button type="button">Fetch more data</button>')
        .click(function () {
          var typeName = $('#typeName').val();
          var modName = $('#modName').val();
          if (typeName && modName) {
            addData(typeName, modName, $('#itemName').val());
          } else {
            alert("Data type (item/creature) or Mod name not found. Can't fetch data.");
          }
        }),
        $('<button type="button">Clear output</button>')
        .click(function () {
          output = [];
          $output.jJsonViewer(output, { expanded: false });
        })
      ),
      $output);
    $('#mw-content-text').prepend($container);
  }
  var cache = {};
  function addData(type, mod, item) {
    if (cache[type] && cache[type][mod]) {
      processResult(cache[type][mod], item, type);
      return;
    }
    fetch('https://dnl-data.seen-von-ragan.de/data/mods/' + mod + '/' + type + '.json')
      .then(function (response) {
        return response.json(); // parse JSON
      })
      //.catch(function (error) {
      //  alert(JSON.stringify(error));
      //})
      .then(function (data) {
        if (!cache[type]) {
          cache[type] = {};
        }
        if (!cache[type][mod]) {
          cache[type][mod] = data;
        }
        processResult(data, item, type);
      });
  }
  function processResult(data, item, type) {
    var items = findItems(data, item);
    items = createTemplates(items, type);
    Array.prototype.push.apply(output, items);
    $output.jJsonViewer(output, { expanded: false });
  }
  function findItems(data, itemName) {
    return data.filter(function (obj) {
      var re = new RegExp(itemName, 'i');
      return re.test(obj['dossierName']) || re.test(obj['name']);
    });
  }
  function createTemplates(items, type) {
    var statNames = {
      'health': 'health',
      'stamina': 'stamina',
      'oxygen': 'oxygen',
      'food': 'food',
      'weight': 'weight',
      'melee': 'damage',
      'speed': 'speed',
      'torpor': 'torpor'
    };
    var nameFixing = {
      'Ankylo': 'Ankylosaurus',
      'Bronto': 'Brontosaurus',
      'Carno': 'Carnotaurus',
      'Ichthyosaurus': 'Ichthy',
      'Paraceratherium': 'Paracer',
      'Pulminoscorpius': 'Scorpion',
      'Pulmonoscorpius': 'Scorpion',
      'Quetzalcoatlus': 'Quetzal',
      'Beezlebufo': 'Beelzebufo',
      'Spider': 'Araneo',
      'Compsognathus': 'Compy',
      'Dilophosaurus': 'Dilophosaur',
      'Dire Wolf': 'Direwolf',
      'Dire Bear': 'Direbear',
      'Tyranosaurus Rex': 'Rex',
      'Woolly Rhinoceros': 'Wooly Rhino',
      'Spinosaurus': 'Spinosaur',
      'Stego': 'Stegosaurus',
      'Trike': 'Triceratops'
    };
    return items.map(function (s) {
      s.WikiTemplates = {}
      if (type == 'creatures') {
        if (s.stats) {
          // CreatureStats
          var baseStats = '{{CreatureStats\n';
          // damage
          var melee1 = 0;
          if (s.attacks && s.attacks.length > 0 && s.attacks[0].melee) {
            melee1 = s.attacks[0].melee.damage;
          }
          $.each(statNames,
            function (qstat, wikistat) {
              if (qstat === 'oxygen' && !s.stats.canSuffocate && s.name !== 'Castoroides') {
                baseStats += '| oxygen1 = N/A\n';
              } else {
                var statBaseValue = formatValue(s.stats, qstat);
                if (qstat === 'speed') {
                  statBaseValue = 100;
                } else if (qstat === 'melee') {
                  statBaseValue = melee1;
                }
                var statIncWildValue = formatValue(s.stats, qstat + 'WildLevel');
                var statIncTamedValue = formatValue(s.stats, qstat + 'TamedLevel');
                var statTamedAddValue = formatValue(s.stats, qstat + 'TamedAdd');
                var statTamedMultValue = formatValue(s.stats, qstat + 'TamedMult');
                baseStats += '| ' +
                  wikistat +
                  '1 = ' +
                  statBaseValue +
                  '\n' +
                  ((qstat !== 'speed' || qstat !== 'torpor')
                      ? '| ' + wikistat + 'IncW = ' + statIncWildValue + '\n'
                      : ''
                  ) +
                  (qstat !== 'torpor' ? '| ' + wikistat + 'IncD = ' + statIncTamedValue + '\n' : '') +
                  (statTamedAddValue ? '| ' + wikistat + 'TamingBonusAdd = ' + statTamedAddValue + '\n' : '') +
                  (statTamedMultValue ? '| ' + wikistat + 'TamingBonusMult = ' + statTamedMultValue + '\n' : '');
              }
            });
          baseStats += (s.stats.walkSpeed ? '| walkBase = ' + formatValue(s.stats, 'walkSpeed') + '\n' : '') +
          (s.stats.walkingStaminaConsumptionRate ? '| walkStamina = ' + formatValue(s.stats, 'walkingStaminaConsumptionRate') + '\n' : '') +
          (s.stats.untamedRunSpeed ? '| walkSprintW = ' + formatValue(s.stats, 'untamedRunSpeed') + '\n' : '') +
          (s.stats.tamedRunSpeed ? '| walkSprintD = ' + formatValue(s.stats, 'tamedRunSpeed') + '\n' : '') +
          (s.stats.runningStaminaConsumptionRate ? '| runStamina = ' + formatValue(s.stats, 'runningStaminaConsumptionRate') + '\n' : '') +
          (s.stats.swimSpeed ? '| swimBase = ' + formatValue(s.stats, 'swimSpeed') + '\n' : '') +
          (s.stats.swimmingStaminaConsumptionRate ? '| swimStamina = ' + formatValue(s.stats, 'swimmingStaminaConsumptionRate') + '\n' : '') +
          (s.stats.untamedRunSwimSpeed ? '| swimSprintW = ' + formatValue(s.stats, 'untamedRunSwimSpeed') + '\n' : '') +
          (s.stats.tamedRunSwimSpeed ? '| swimSprintD = ' + formatValue(s.stats, 'tamedRunSwimSpeed') + '\n' : '') +
          (s.stats.flySpeed ? '| flyBase = ' + formatValue(s.stats, 'flySpeed') + '\n' : '') +
          (s.stats.flyingStaminaConsumptionRate ? '| flyStamina = ' + formatValue(s.stats, 'flyingStaminaConsumptionRate') + '\n' : '') +
          (s.stats.untamedRunFlySpeed ? '| flySprintW = ' + formatValue(s.stats, 'untamedRunFlySpeed') + '\n' : '') +
          (s.stats.tamedRunFlySpeed ? '| flySprintD = ' + formatValue(s.stats, 'tamedRunFlySpeed') + '\n' : '');
          baseStats += '}}';
          if (s.taming && s.taming.canBeTamed) {
            baseStats += '\n{{wildStats}}';
          }
          if (baseStats.length > 0) {
          }
          s.WikiTemplates.BaseStatsTemplate = baseStats;
        }
        // PaintRegions
        if (s.name && s.colorization) {
          var name = nameFixing[s.name] ? nameFixing[s.name] : s.name;
          if (s.class && s.class.match(/minion/i)) {
            name += ' (Minion)';
          }
          var paintRegions = '{{PaintRegions\n| name = ' + name + '\n| type = creature\n';
          $.each(s.colorization,
            function (cr, region) {
              paintRegions += '| region' + cr + ' = ' + (region.name ? region.name : '') + '\n';
              paintRegions += '| colors' + cr + ' = ' + (region.colors ? region.colors.join(',') : '') + '\n';
            });
          paintRegions += '}}';
          s.WikiTemplates.PaintRegionsTemplate = paintRegions;
        }
      }
      return s;
    });
  }
  function formatValue(stats, statName) {
    return stats[statName] ? (+(stats[statName]).toFixed(4)) : 0;
  }
});