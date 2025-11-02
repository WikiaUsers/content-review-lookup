$(function() {

  /********** CSS **********/
  var css = '\
    .filter-section { flex:1 0 30%; min-width:150px; border:1px solid #ccc; padding:5px; margin-bottom:5px; border-radius:4px; }\
    .filter-button { display:inline-block; margin:3px; padding:5px 8px; background:black; color:white; border-radius:4px; cursor:pointer; font-size:13px; }\
    .filter-button.active { background:#007BFF; }\
    #accessoryList > .bfw-filter-wrapper > div, #itemList > div { padding:5px; border:1px solid gray; margin:3px 0; }\
    #noResults, #fruitNoResults { display:none; text-align:center; color:red; font-weight:bold; margin-top:10px; }';
  $('head').append('<style>'+css+'</style>');

  /********** FRUIT FILTER (UNCHANGED) **********/
  $('#search').html('<input type="text" id="searchInput" placeholder="Filter fruit name" style="width:100%; margin-bottom:5px;">');

  var fruitDropdowns = [
    { id:'filter-type', options:[
        {label:'All Types', value:''},
        {label:'Natural', value:'fruit-type-natural'},
        {label:'Beast', value:'fruit-type-beast'},
        {label:'Elemental', value:'fruit-type-elemental'}
    ]},
    { id:'filter-rarity', options:[
        {label:'All Rarities', value:''},
        {label:'Common', value:'rarity-common'},
        {label:'Uncommon', value:'rarity-uncommon'},
        {label:'Rare', value:'rarity-rare'},
        {label:'Legendary', value:'rarity-legendary'},
        {label:'Mythical', value:'rarity-mythical'},
        {label:'Premium', value:'rarity-premium'}
    ]},
    { id:'filter-sea', options:[
        {label:'All Seas', value:''},
        {label:'First Sea', value:'sea-1'},
        {label:'Second Sea', value:'sea-2'},
        {label:'Third Sea', value:'sea-3'},
        {label:'Events', value:'sea-events'},
        {label:'Admin-Exclusive', value:'sea-admins'}
    ]}
  ];

  fruitDropdowns.forEach(function(dd){
      var $sel = $('<select style="width:100%; margin-bottom:5px;"></select>').attr('id', dd.id+'Select');
      dd.options.forEach(function(opt){
          $sel.append('<option value="'+opt.value+'">'+opt.label+'</option>');
      });
      $('#'+dd.id).empty().append($sel);
  });

  if (!$('#fruitNoResults').length) {
      $('#itemList').after('<div id="fruitNoResults">No fruits match your filters</div>');
  }

  function filterFruits() {
      var searchTerm = $('#searchInput').val().toLowerCase();
      var type = $('#filter-typeSelect').val();
      var rarity = $('#filter-raritySelect').val();
      var effect = $('#filter-effectSelect').val();
      var sea = $('#filter-seaSelect').val();
      var anyVisible = false;

      $('#itemList > div').each(function(){
          var $item = $(this);
          var id = ($item.attr('id')||'').toLowerCase();
          var text = $item.text().toLowerCase();
          var itemType = $item.data('type');
          var itemRarity = $item.data('rarity');
          var itemEffect = $item.data('effect');
          var itemSea = $item.data('sea');

          var matchesSearch = !searchTerm || id.startsWith(searchTerm) || text.startsWith(searchTerm);
          var matchesType = !type || itemType===type;
          var matchesRarity = !rarity || itemRarity===rarity;
          var matchesEffect = !effect || itemEffect===effect;
          var matchesSea = !sea || itemSea===sea;

          if(matchesSearch && matchesType && matchesRarity && matchesEffect && matchesSea){
              $item.show();
              anyVisible = true;
          } else $item.hide();
      });

      $('#fruitNoResults').toggle(!anyVisible);
  }

  $(document).on('input change','#searchInput,#filter-typeSelect,#filter-raritySelect,#filter-effectSelect,#filter-seaSelect',filterFruits);

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
        activeFilters.push($(this).data('value')); 
    });
    var anyVisible = false;

    $('#accessoryList .bfw-filter-wrapper > div').each(function() {
        var $item = $(this);
        if ($item.attr('id') === 'noResults') return; // ignore "no results"

        var rawAttrs = $item.attr('data-attributes') || '';
        if (!rawAttrs) { $item.hide(); return; }

        // Parse attributes
        var attrs = {};
        rawAttrs.split(',').forEach(function(pair) {
            var parts = pair.split(':');
            if (parts.length === 2) attrs[$.trim(parts[0])] = $.trim(parts[1]);
        });

        // Extract accessory name
        var accessoryName = normalize($item.attr('id') || '');
        

        // Match search
        var matchesSearch = !search || accessoryName.startsWith(search);

        // Match filters
        var matchesFilters = activeFilters.every(function(val) {
            if (val.indexOf('Sea:') === 0) {
                var seas = (attrs['Sea'] || '').split('/');
                return seas.includes(val.split(':')[1]);
            } else {
                return attrs[val] === 'true';
            }
        });

        if (matchesSearch && matchesFilters) {
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