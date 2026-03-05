$(function() {

  /********** CSS **********/
  var css = '\
    .filter-section { flex:1 0 30%; min-width:150px; border:1px solid #ccc; padding:5px; margin-bottom:5px; border-radius:4px; }\
    .filter-button { display:inline-block; margin:3px; padding:5px 8px; background:black; color:white; border-radius:4px; cursor:pointer; font-size:13px; }\
    .filter-button.active { background:#007BFF; }\
    #noResults, #fruitNoResults { display:none; text-align:center; color:red; font-weight:bold; margin-top:10px; }';
  $('head').append('<style>'+css+'</style>');

  
  /********** ACCESSORY FILTER **********/
  $('#accessorySearch').html('<input id="accessorySearchInput" placeholder="Search accessories…" style="width:100%; padding:5px; margin-bottom:5px;">');

  var accessorySections = [
      { title: "🗡️ Combat Stats", container:"#combatStatsFilter", options:[
          {label:"✊ Melee Damage", value:"Melee Damage"},
          {label:"⚔️ Sword Damage", value:"Sword Damage"},
          {label:"🍈 Fruit Damage", value:"Fruit Damage"},
          {label:"🔫 Gun Damage", value:"Gun Damage"},
          {label:"🌊 Sea Damage", value:"Sea Damage"},
          {label:"🌎 All Damage", value:"All Damage"},
          {label:"🕒 Skill Cooldown", value:"Skill Cooldown"},
          {label:"🩸 Life Leech", value:"Life Leech"}
      ]},
      { title:"🛡️ Survivability & Defense", container:"#survivabilityDefenseFilter", options:[
          {label:"❤️ Health", value:"Health"},
          {label:"🛡️ Damage Resistance", value:"Damage Resistance"},
          {label:"➕ Health Regeneration", value:"Health Regeneration"},
          {label:"⬅️ Instinct Dodges", value:"Instinct Dodges"},
          {label:"👀 Instinct Vision Range", value:"Instinct Vision Range"}
      ]},
      { title:"⚡ Energy & Movement", container:"#energyMovementFilter", options:[
          {label:"⚡ Energy", value:"Energy"},
          {label:"🔋 Energy Regeneration", value:"Energy Regeneration"},
          {label:"💨 Movement Speed", value:"Movement Speed"},
          {label:"💨 Dash Distance", value:"Dash Distance"},
          {label:"⬆️ Air Jump", value:"Air Jump"}
      ]},
      { title:"🎯 Utility & Exploration", container:"#utilityExplorationFilter", options:[
          {label:"👀🌊 Clear Vision in Dark Sea", value:"Clear Vision in Dark Sea"},
          {label:"🔥 Fruit Meter", value:"Fruit Meter"},
          {label:"💰 Drop Chance", value:"Drop Chance"}
      ]},
      { title:"📈 Progression & Growth", container:"#progressionGrowthFilter", options:[
          {label:"🆙 XP Level Boost", value:"XP Level Boost"},
          {label:"⚙️ XP Mastery Boost", value:"XP Mastery Boost"}
      ]},
      { title:"🌊 Sea", container:"#seaFilter", options:[
          {label:"🌊 Sea 1", value:"Sea:1"},
          {label:"🌊 Sea 2", value:"Sea:2"},
          {label:"🌊 Sea 3", value:"Sea:3"}
      ]}
  ];

  // Create buttons
  accessorySections.forEach(function(section){
      var $c = $(section.container);
      if(!$c.length) return;
      $c.append('<div class="filter-title">'+section.title+'</div>');
      section.options.forEach(function(opt){
          var btn = $('<div class="filter-button"></div>').text(opt.label).attr('data-value', opt.value);
          $c.append(btn);
      });
  });

  function normalize(str) {
      return (str || '').toLowerCase().replace(/[^\w\s]/gi,'').trim();
  }

 function filterAccessories() {
    var search = normalize($('#accessorySearchInput').val());
    var activeFilters = [];

    $('.filter-button.active').each(function() { 
        activeFilters.push($(this).attr('data-value')); 
    });

    var selectedSeas = [];
    var statFilters = [];

    activeFilters.forEach(function(val) {
        if (val.indexOf('Sea:') === 0) selectedSeas.push(val.split(':')[1]);
        else statFilters.push(val);
    });

    var anyVisible = false;

    $('#accessoryList .bfw-filter-wrapper > div').each(function() {
        var $item = $(this);
        if ($item.attr('id') === 'noResults') return;

        var rawAttrs = $item.attr('data-attributes') || '';
        if (!rawAttrs) { $item.hide(); return; }

        // Parse attributes
        var attrs = {};
        rawAttrs.split(',').forEach(function(pair) {
            var parts = pair.split(':');
            if (parts.length === 2) attrs[$.trim(parts[0])] = $.trim(parts[1]);
        });

        var accessoryName = normalize($item.attr('id') || '');
        var matchesSearch = !search || accessoryName.startsWith(search);

        var matchesStats = statFilters.every(function(val) {
            return attrs[val] === 'true';
        });

        var matchesSea = !selectedSeas.length || selectedSeas.every(function(selectedSea) {
            var itemSeas = (attrs['Sea'] || '').split(/\s+/);
            return itemSeas.includes(selectedSea);
        });

        if (matchesSearch && matchesStats && matchesSea) {
            $item.show();
            anyVisible = true;
        } else {
            $item.hide();
        }
    });

    $('#noResults').toggle(!anyVisible);
}



  $(document).on('input','#accessorySearchInput',filterAccessories);
  $(document).on('click','.filter-button',function(){
      $(this).toggleClass('active');
      filterAccessories();
  });

});