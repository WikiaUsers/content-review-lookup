/* Any JavaScript here will be loaded for all users on every page load. */
// Template:Tabs
$(function() {
	// If a sub-tab is 'selected', also make the parent tabs also 'selected'
	$('.at-selected').parents('.article-tabs li').each(function () {
		$(this).addClass('at-selected');
	});

	// Margin fix
	$('.article-tabs .at-selected .article-tabs').each(function () {
		// Get height of subtabsp
		var $TabsHeight = $(this).height();

		// Increase bottom margin of main tabs
		$(this).parents('.article-tabs').last().css('margin-bottom' , '+=' + $TabsHeight);
	});
});
// END of Template:Tabs
// tooltip thing
window.tooltips_config = {
    offsetX: 5,
    offsetY: 10,
    waitForImages: false,
    events: ['CustomEvent'],
    noCSS: false,
};
// end of tooltip thing

//* UserTags *//
window.UserTagsJS = {
	modules: {},
	tags: {
		/* group: { associated tag data } */
		// staff ranks
		'head-of-wiki': {u:'Head of Wiki', order:-1},
		'founder': {u:'Founder', order:-1},
		'bureaucrat': {u:'Bureaucrat', order:1},
		'administrator': {u:'Administrator', order:1},
		'dual-moderator': {u:'Dual Moderator', order:2},
		'threadmoderator': {u:'Discussions Moderator', order:2},
		'content-moderator': {u:'Content Moderator', order:2},
		// non-staff tags
		'wiki-contributor': {u:'Wiki Contributor', order:9e9},
		'retired-staff': {u:'Former Wiki Staff', order:9e9},
		'ron-hos': {u:'RON Head of Staff', order:9e9},
		'ron-senior-administrator': {u:'RON Senior Administrator', order:9e9},
	}
};

UserTagsJS.modules.implode = {
	// Merge sysop/mod ranks into a single tag
	'administrator': ['sysop'],
	'dual-moderator': ['content-moderator', 'threadmoderator'],
};

UserTagsJS.modules.metafilter = {
	// Hide redundant lower ranks when a higher rank is present
	'administrator':     ['bureaucrat'],
	'sysop':             ['bureaucrat', 'ron-hos'],
	'content-moderator': ['administrator', 'dual-moderator'],
	'threadmoderator':   ['administrator', 'dual-moderator'],
	'dual-moderator':    ['administrator'],
};

UserTagsJS.modules.custom = {
	/* 'user': [groups] */
	// Current Staff
	
	// Bureaucrats
	'SuperGlitchyTheo': ['head-of-wiki','bureaucrat'],
	'3meraldKv': ['founder'],
	'Standoffiish': ['bureaucrat'],
	// Administrators
	'Dxrknrg': ['administrator','wiki-contributor'],
	'Antiverta': ['administrator','wiki-contributor'],
	
	// Dual Moderators

	// Content Moderators
	'Mysþıc': ['content-moderator','wiki-contributor'],
	'Sorayaann': ['content-moderator','wiki-contributor'],
	// Junior Content Moderators

	// Discussions Moderators
	'YugoMafia': ['threadmoderator'],
	'Kaiyie': ['threadmoderator'],
	'The Shashophille': ['threadmoderator'],
	'RXRunner27': ['threadmoderator'],
	// Junior Discussion Moderators

	// Retired Wiki Staff
	// Retired Bureaucrats
	'RabbyDevs': ['retired-staff'],
	'Aurawra': ['retired-staff'],
	'TheRichSeries': ['retired-staff'],
	'ZackRoN00': ['retired-staff'],
	'MP1Player': ['retired-staff'],
	'HolyMoa': ['retired-staff'],
	
	// Retired Administrators
	'GrayshaValor': ['retired-staff'],
	'Man with no name or life': ['retired-staff'],
	'RedElephantKing': ['retired-staff'],
	'Arrokotth': ['retired-staff'],
	'Vector Sigma': ['retired-staff'],
	'Zidium': ['retired-staff'],
	'OfficialKhrome': ['retired-staff'],
	'DefoNotSyki': ['retired-staff'],
	'LollipopWut': ['retired-staff'],
	
	// Retired Dual Moderators
	'Awsomemysticcheese': ['retired-staff'],
	'YesIHaveAnAccount': ['retired-staff'],
	'Alvin': ['retired-staff'],
	'Polloloko0o': ['retired-staff'],
	
	// Retired Content Moderators
	'Bazyli123': ['retired-staff'],
	'PenguinTech': ['retired-staff'],
	'Eddy0725': ['retired-staff'],
	'Nikograd': ['retired-staff'],
	'Jjc0308': ['retired-staff'],
	'Piteous': ['retired-staff'],
	'CrusaderRosehip': ['retired-staff'],
	'Pancake1824': ['retired-staff'],
	'imnotacan': ['retired-staff'],
	'JHRacer': ['retired-staff'],
	'NoobINFe': ['retired-staff'],
	'S9 Closing Logo WikiReturnss': ['retired-staff'],
	'TheSeal27': ['retired-staff'],
	'Mylan389': ['retired-staff'],
	'The Ukulele Man': ['retired-staff'],
	'Alan Builder': ['retired-staff'],
	'Kaisergluck': ['retired-staff'],
	'Therealusman': ['retired-staff'],
	'DragooNit': ['retired-staff'],
	'Silkened': ['retired-staff'],
	
	// Retired Discussions Moderators
	'CreeperSPG': ['retired-staff'],
	'CrunchMCMunch': ['retired-staff'],
	'Feepemaster': ['retired-staff'],
	'Adogeeats25': ['retired-staff'],
	'Nexandr': ['retired-staff'],
	'Hisslandia': ['retired-staff'],
	
	// RON Senior Staff
	'FamicomBruv': ['ron-senior-administrator','retired-staff'],
	
	// Wiki Contributors
	'Cipherusxzy': ['wiki-contributor'],
	'HaHaBlah': ['wiki-contributor'],
	'RyeThePies': ['wiki-contributor'],
	'Thethingiforgor': ['wiki-contributor'],
	'Pro10boy2228': ['wiki-contributor'],
	'FourCer5': ['wiki-contributor'],
};

//* LockOldComments.js Configuration *//
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

/* =============================================
   MODIFIER CALCULATOR
   ============================================= */
mw.hook('wikipage.content').add(function() {
  var $calculators = $('.modifier-calculator');
  if ($('#modifier-calculator').length) {
    $calculators = $calculators.add('#modifier-calculator');
  }
  
  $calculators.each(function() {
    var $el = $(this);
    initializeCalculator($el);
  });
});

function initializeCalculator($el) {
  var pageTitle        = $el.data('title')        || null;
  var pageLink         = $el.data('link')         || null;
  var allowMods        = $el.data('allow-mods')   || null;
  var allowCats        = $el.data('allow-cats')   || null;
  var allowModsArr     = allowMods  ? allowMods.split(',').map(function(s){ return s.trim(); })  : null;
  var allowCatsArr     = allowCats  ? allowCats.split(',').map(function(s){ return s.trim(); })  : null;
  var fullCalcLink     = $el.data('full-calc-link') || null;
  var pageDomain       = $el.data('domain')       || null;

  $.get(mw.util.wikiScript('api'), {
    action: 'expandtemplates',
    text: '{{#invoke:ModifierData|getData}}',
    prop: 'wikitext',
    format: 'json'
  }, function(response) {
    var DATA;
    try {
      DATA = JSON.parse(response.expandtemplates.wikitext);
    } catch (e) {
      $el.html('<p style="color:red">Error loading modifier data.</p>');
      return;
    }

    // filter by domain(s) – supports comma-separated list
    if (pageDomain) {
      var allowedDomains = pageDomain.split(',').map(function(d) { return d.trim(); });
      var domainFiltered = {};
      Object.keys(DATA).forEach(function(k) {
        if (allowedDomains.indexOf(DATA[k].tag) !== -1) domainFiltered[k] = DATA[k];
      });
      DATA = domainFiltered;
    }

    if (allowModsArr) {
      var filtered = {};
      allowModsArr.forEach(function(k) { if (DATA[k]) filtered[k] = DATA[k]; });
      DATA = filtered;
    }

    if (allowCatsArr) {
      var catFiltered = {};
      Object.keys(DATA).forEach(function(k) {
        var mod = DATA[k];
        if (mod.categories && mod.categories.some(function(cat) {
          return allowCatsArr.indexOf(cat.name) !== -1;
        })) {
          catFiltered[k] = mod;
        }
      });
      DATA = catFiltered;
    }

    initCalculator($el, DATA, allowCatsArr, allowModsArr, pageTitle, fullCalcLink, pageDomain);
  }).fail(function() {
    $el.html('<p style="color:red">Failed to fetch modifier data.</p>');
  });
}

function initCalculator($el, DATA, allowCatsArr, allowModsArr, pageTitle, fullCalcLink, pageDomain) {
  console.log('[ModifierCalculator] loaded for:', $el.attr('class') || $el.attr('id'));
  var modKeys = Object.keys(DATA);
  var isModRestricted = !!(allowModsArr);
  var domainHtml = '';

  function getDefaultBaseValue(key) {
    var data = DATA[key];
    return (data && typeof data.baseValue === 'number') ? data.baseValue : 0;
  }

  function categoryMatchesAllowed(catName) {
    if (!allowCatsArr) return true;
    return allowCatsArr.indexOf(catName) !== -1;
  }

  function countCatMods(cat) {
    var n = (cat.mods || []).length;
    (cat.subcategories || []).forEach(function(sub) { n += (sub.mods || []).length; });
    return n;
  }

  function collectSubcategories(data, parentCats) {
    var subs = [];
    var limitParents = parentCats && parentCats.length > 0;
    (data.categories || []).forEach(function(cat) {
      if (!categoryMatchesAllowed(cat.name)) return;
      if (limitParents && parentCats.indexOf(cat.name) === -1) return;
      (cat.subcategories || []).forEach(function(sub) {
        subs.push({ name: sub.name, parent: cat.name });
      });
    });
    return subs;
  }

  function forEachModInCat(cat, ci, fn) {
    if (cat.type === 'scaler') return;
    (cat.mods || []).forEach(function(m, mi) {
      fn(m, 'mc_' + ci + '_d_' + mi, null);
    });
    (cat.subcategories || []).forEach(function(sub, si) {
      (sub.mods || []).forEach(function(m, mi) {
        fn(m, 'mc_' + ci + '_s_' + si + '_' + mi, sub.name);
      });
    });
  }

  function getVisibleModIds() {
    var ids = [];
    $el.find('#mc-sections .mc-mod-item:visible').each(function() {
      var id = $(this).find('input[type=checkbox]').attr('id');
      if (id) ids.push(id);
    });
    return ids;
  }

  function getVisibleModIdsInCategory(ci) {
    var ids = [];
    var $section = $el.find('#mc-cat-check-' + ci).closest('.mc-section');
    $section.find('.mc-mod-item:visible').each(function() {
      var id = $(this).find('input[type=checkbox]').attr('id');
      if (id) ids.push(id);
    });
    return ids;
  }

  function getVisibleModIdsInSubcategory(ci, si) {
    var ids = [];
    $el.find('#mc-subcat-check-' + ci + '_' + si).closest('.mc-subsection')
      .find('.mc-mod-item:visible').each(function() {
        var id = $(this).find('input[type=checkbox]').attr('id');
        if (id) ids.push(id);
      });
    return ids;
  }

  /* ── BUILD HTML ── */
  var headerHtml = '';
  if (pageTitle) {
    headerHtml += '<div class="mc-page-header">'
      + '<span class="mc-page-title">' + pageTitle + ' Calculator</span>';
    if (fullCalcLink) {
      headerHtml += '<span class="mc-page-link">For all modifiers, visit the '
        + '<a href="' + fullCalcLink + '">Modifier Calculator</a>.</span>';
    }
    headerHtml += '</div>';
  }

var activeDomain = pageDomain || 'all';
// If multiple domains are specified, treat it as "all" for button highlighting
var highlightDomain = (activeDomain.indexOf(',') !== -1) ? 'all' : activeDomain;

// Build domain filter buttons dynamically based on available tags
(function() {
    var availableTags = {};
    modKeys.forEach(function(k) {
      var t = DATA[k].tag;
      if (t) availableTags[t] = true;
    });
    var tagOrder = ['government','diplomacy','economy','technology','military'];
    var buttons = ['<button type="button" id="mc-browse-btn" class="mc-browse-btn">Browse</button>'];
    buttons.push('<button class="mc-domain-btn' + (highlightDomain === 'all' ? ' mc-filter-active' : '') + '" data-domain="all">All</button>');
    tagOrder.forEach(function(tag) {
      if (availableTags[tag]) {
        buttons.push('<button class="mc-domain-btn mc-domain-' + tag + (highlightDomain === tag ? ' mc-filter-active' : '') + '" data-domain="' + tag + '">' + tag.charAt(0).toUpperCase() + tag.slice(1) + '</button>');
      }
    });
    domainHtml = '<div class="mc-domain-btns" id="mc-domain-filter">' + buttons.join('') + '</div>';
})();

 var modifierRowHtml = '<div class="mc-row">'
  + '<span class="mc-label">Modifier</span>'
  + '<div style="position:relative;flex:1;">'
  + domainHtml
  + '<input class="mc-select-search" id="mc-mod-search" type="search" placeholder="Search modifier type e.g. Tax Income..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" name="mc-mod-type-search">'
  + '<div id="mc-mod-suggestions"></div>'
  + '<div id="mc-browse-panel"></div>'
  + '</div>'
  + '</div>';

  var html = '<div id="mc-wrap">'
    + headerHtml
    + modifierRowHtml

    + '<div class="mc-row">'
    + '<span class="mc-label">Base value <span class="info-icon" title="This is your Base value. All modifiers are applied to this number unless a modifier explicitly changes the Base itself.\n\nExample: If Base Research is 15 and you gain +6 Base from Education Spending, the Base becomes 21. All further modifiers now apply to 21 instead of 15.\n\nThere is a select amount of Base modifiers:\n- Base Political Power Gain: 1.8\n- Base Research Gain: 15\n- Base Stability: 50\n- War Exhaustion Gain: -0.025\n- Corruption Gain: -0.25\n- Base Population Growth: 2\n- Project Capacity: 2\n- Political Leader Cap: 7\n- Develop City Cap: 8\n- Base Unrest Reduction: Unknown, varies\n- Base Political Leader XP Gain: Unknown, varies\n\nThe last two modifiers are currently unknown because they are difficult to calculate due to their unpredictability. However, if you determine the correct values, feel free to contact User:Dxrknrg on their message wall.">ⓘ</span></span>'
    + '<input class="mc-base-input" type="number" id="mc-base" value="0" min="0">'
    + '</div>'

    + '<div class="mc-row">'
    + '<span class="mc-label">Base percentage (%) <span class="info-icon" title="This shows the total modifier effect applied to your Base value.\n\nSome modifiers are added together first (additive stacking), then converted into a single multiplier. Others apply separately as multipliers (multiplicative stacking).\n\nFinal formula:\nBase × (1 + additive modifiers) × multiplicative modifiers">ⓘ</span></span>'
    + '<input class="mc-base-input" type="number" id="mc-base-pct" value="100" min="0">'
    + '</div>'

    // ── Current RP selector (only for Manpower Increase) ──
    + '<div id="mc-current-rp-selector" style="display:none; margin-bottom:1rem;">'
    + '<div class="mc-filter-group">'
    + '<span class="mc-filter-group-label">Current Law RP</span>'
    + '<div class="mc-filter-btns" id="mc-current-rp-btns">'
    + '<button class="mc-filter-btn" data-rp="1">Disarmed 1%</button>'
    + '<button class="mc-filter-btn mc-filter-active" data-rp="2">Volunteer 2%</button>'
    + '<button class="mc-filter-btn" data-rp="5">Limited 5%</button>'
    + '<button class="mc-filter-btn" data-rp="10">Extensive 10%</button>'
    + '<button class="mc-filter-btn" data-rp="25">Required 25%</button>'
    + '</div>'
    + '</div>'
    + '</div>'

    + '<div class="mc-result-card">'
    + '<div class="mc-result-row"><span>Base value</span><span id="mc-r-base">0</span></div>'
    + '<div class="mc-result-row"><span>Active modifiers</span><span id="mc-r-mods" style="text-align:right;max-width:65%">none</span></div>'
    + '<div class="mc-result-divider"></div>'
    + '<div class="mc-result-row mc-result-total"><span>Result</span><span class="mc-result-big" id="mc-r-result">0.00</span></div>'
    + '<div class="mc-formula" id="mc-r-formula">0 × (none) = 0.00</div>'
    + '</div>'

    + '<div class="mc-tabs" id="mc-main-tabs">'
    + '<div class="mc-tab mc-tab-active" data-tab="toggle">Toggle modifiers</div>'
    + '<div class="mc-tab" data-tab="custom">Custom input modifiers</div>'
    + '<div class="mc-tab" id="mc-formula-tab" data-tab="formula" style="display:none">Formula</div>'
    + '</div>'

    + '<div id="mc-panel-toggle">'
    + '<input class="mc-filter-input" id="mc-filter" type="text" placeholder="Search modifiers, categories, or subcategories...">'
    + '<div class="mc-filter-group">'
    + '<span class="mc-filter-group-label">Effect</span>'
    + '<div class="mc-filter-btns" id="mc-filter-effect">'
    + '<button class="mc-filter-btn mc-filter-active" data-filter="all">All</button>'
    + '<button class="mc-filter-btn mc-filter-good" data-filter="good">Good</button>'
    + '<button class="mc-filter-btn mc-filter-bad" data-filter="bad">Bad</button>'
    + '<button class="mc-filter-btn mc-filter-dynamic" data-filter="dynamic">Dynamic</button>'
    + '</div></div>'
    + '<div class="mc-filter-group">'
    + '<span class="mc-filter-group-label">Type</span>'
    + '<div class="mc-filter-btns" id="mc-filter-type">'
    + '<button class="mc-filter-btn mc-filter-active" data-filter="all">All</button>'
    + '<button class="mc-filter-btn" data-filter="additive">Additive</button>'
    + '<button class="mc-filter-btn" data-filter="multiplicative">Multiplicative</button>'
    + '<button class="mc-filter-btn" data-filter="base">Base</button>'
    + '<button class="mc-filter-btn" data-filter="affine">Affine</button>'
    + '</div></div>'
    + '<div class="mc-filter-group">'
    + '<span class="mc-filter-group-label">Range</span>'
    + '<div class="mc-filter-btns" id="mc-filter-range">'
    + '<button class="mc-filter-btn mc-filter-active" data-filter="all">All</button>'
    + '<button class="mc-filter-btn" data-filter="normal">Normal</button>'
    + '<button class="mc-filter-btn" data-filter="scaler">Scaler</button>'
    + '</div></div>'
    + '<div class="mc-filter-group">'
    + '<span class="mc-filter-group-label">Category</span>'
    + '<div class="mc-filter-btns" id="mc-filter-cats"></div>'
    + '</div>'
    + '<div class="mc-filter-group">'
    + '<span class="mc-filter-group-label">Subcategory</span>'
    + '<div class="mc-filter-btns" id="mc-filter-subcats"></div>'
    + '</div>'
    + '<div class="mc-filter-group">'
    + '<span class="mc-filter-group-label">Show</span>'
    + '<div class="mc-filter-btns" id="mc-filter-selected">'
    + '<button class="mc-filter-btn mc-filter-active" data-filter="all">All</button>'
    + '<button class="mc-filter-btn" data-filter="selected">Selected</button>'
    + '<button class="mc-filter-btn" data-filter="unselected">Unselected</button>'
    + '</div></div>'
    + '<div class="mc-global-select">'
    + '<label class="mc-global-select-label"><input type="checkbox" id="mc-select-all"> Select all modifiers</label>'
    + '<div class="mc-select-meta" id="mc-select-meta">'
    + '<span class="mc-meta-pill" id="mc-meta-cats">0 categories</span>'
    + '<span class="mc-meta-pill" id="mc-meta-subs">0 subcategories</span>'
    + '<span class="mc-meta-pill" id="mc-meta-mods">0 modifiers</span>'
    + '</div>'
    + '</div>'
    + '<div id="mc-selected-list"></div>'
    + '<div id="mc-sections"></div>'
    + '</div>'

    + '<div id="mc-panel-custom" style="display:none">'
    + '<div class="mc-section-title">Add a custom modifier</div>'
    + '<div class="mc-custom-row">'
    + '<input class="mc-custom-input" id="mc-c-name" placeholder="Modifier name" type="text">'
    + '<input class="mc-custom-input" id="mc-c-val" placeholder="e.g. +15%, 1.2x, or +5 (base)" type="text">'
    + '<button class="mc-add-btn" id="mc-add-btn">Add</button>'
    + '</div>'
    + '<div id="mc-custom-tags"></div>'
    + '</div>'

    + '<div id="mc-panel-formula" style="display:none">'
    + '<div id="mc-formula-inputs"></div>'
    + '<div class="mc-result-card" style="margin-top:1rem">'
    + '<div class="mc-result-row mc-result-total"><span>Formula Result</span><span class="mc-result-big" id="mc-formula-result">—</span></div>'
    + '<div class="mc-formula" id="mc-formula-expr"></div>'
    + '</div>'
    + '</div>'

    + '</div>';

  $el.html(html);

  /* ── STATE ── */
  var checked      = {};
  var scalerVals   = {};
  var customs      = [];
  var currentMod   = null;
  var filterEffect = 'all';
  var filterType   = 'all';
  var filterRange  = 'all';
  var filterCats    = [];
  var filterSubcats = [];
  var filterShow   = 'all';
  var filterText   = '';

  var activeAffineId = null;
  var currentRP      = 2;   // default Volunteer

  /* ── HELPERS ── */
  function isMultiplicative(label) { return /^\d+(\.\d+)?x$/.test((label || '').trim()); }
  function isBase(label)           { return /^[+-]?\d+(\.\d+)?$/.test((label || '').trim()); }
  function isAffine(mod)           { return !!(mod && mod.affine && typeof mod.affine.slope === 'number'); }

  function setModSearchLabel(key) {
    var d = DATA[key];
    $el.find('#mc-mod-search').parent().find('.mod-tooltip-icon').remove();
    $el.find('#mc-mod-search').val(d.label);
    if (d.tooltip) {
      var $icon = $('<span class="info-icon mod-tooltip-icon" style="margin-left: 8px;" title="' + d.tooltip.replace(/"/g, '&quot;') + '">ⓘ</span>');
      $el.find('#mc-mod-search').after($icon);
    }
    if (d.formula) $el.find('#mc-formula-tab').show();
    else { $el.find('#mc-formula-tab').hide(); if ($el.find('#mc-panel-formula').is(':visible')) switchTab('toggle'); }
  }

  function loadModifier(key) {
    if (!DATA[key]) return;
    currentMod = key;
    checked = {};
    scalerVals = {};
    activeAffineId = null;
    currentRP = 2;
    filterCats = [];
    filterSubcats = [];
    setModSearchLabel(key);
    var defaultBase = getDefaultBaseValue(key);
    $el.find('#mc-base').val(defaultBase);
    renderCategoryFilter();
    renderSubcategoryFilter();
    renderSections();

    if (key === 'manpowerincrease') {
      $el.find('#mc-current-rp-selector').show();
    } else {
      $el.find('#mc-current-rp-selector').hide();
    }
    $el.find('#mc-current-rp-btns .mc-filter-btn').removeClass('mc-filter-active');
    $el.find('#mc-current-rp-btns .mc-filter-btn[data-rp="2"]').addClass('mc-filter-active');

    recalc();
  }

  function clearModifier() {
    currentMod = null;
    checked = {};
    scalerVals = {};
    activeAffineId = null;
    currentRP = 2;
    filterCats = [];
    filterSubcats = [];
    $el.find('#mc-mod-search').val('');
    $el.find('#mc-mod-search').parent().find('.mod-tooltip-icon').remove();
    $el.find('#mc-filter-cats').empty();
    $el.find('#mc-filter-subcats').empty();
    $el.find('#mc-sections').empty();
    $el.find('#mc-selected-list').hide().empty();
    $el.find('#mc-formula-tab').hide();
    $el.find('#mc-current-rp-selector').hide();
    if ($el.find('#mc-panel-formula').is(':visible')) switchTab('toggle');
    $el.find('#mc-base').val(0);
    recalc();
  }

function switchTab(t) {
  $el.find('.mc-tab').removeClass('mc-tab-active');
  $el.find('.mc-tab[data-tab="' + t + '"]').addClass('mc-tab-active');
  $el.find('#mc-panel-toggle').toggle(t === 'toggle');
  $el.find('#mc-panel-custom').toggle(t === 'custom');
  $el.find('#mc-panel-formula').toggle(t === 'formula');
  if (t === 'formula') renderFormulaPanel();

  // Ensure custom panel works even without a loaded modifier
  if (t === 'custom' && !currentMod) {
    // No modifier loaded – still allow custom inputs
    // The custom add button already works independently
  }
}

  /* ── FORMULA PANEL ── */
  function renderFormulaPanel() {
    var data = DATA[currentMod];
    if (!data || !data.formula) return;
    var f = data.formula;
    var $inp = $el.find('#mc-formula-inputs').empty();
    (f.inputs || []).forEach(function(inp) {
      var $row = $('<div class="mc-row">');
      $('<span class="mc-label">').text(inp.label).appendTo($row);
      $('<input class="mc-base-input" type="number">')
        .attr('id', 'mc-finp-' + inp.id)
        .val(inp.default || 0)
        .on('input', calcFormula)
        .appendTo($row);
      $row.appendTo($inp);
    });
    calcFormula();
  }

  function calcFormula() {
    var data = DATA[currentMod];
    if (!data || !data.formula) return;
    var f = data.formula;
    var base = parseFloat($el.find('#mc-base').val()) || 0;
    var basePctVal = parseFloat($el.find('#mc-base-pct').val());
    var basePct = isNaN(basePctVal) ? 1 : (basePctVal / 100);
    var totals = getTotals();
    var ctx = {
      base: base,
      basePct: basePct,
      sumPct: totals.pct,
      sumBase: totals.base,
      sumMul: totals.mul,
      modifiers: totals.pct,
      transformedBase: totals.transformedBase
    };
    (f.inputs || []).forEach(function(inp) { ctx[inp.id] = parseFloat($el.find('#mc-finp-' + inp.id).val()) || 0; });
    var expr = f.expression;
    var result;
    try {
      var evalStr = expr;
      Object.keys(ctx).forEach(function(k) {
        evalStr = evalStr.replace(new RegExp('\\b' + k + '\\b', 'g'), ctx[k]);
      });
      result = Function('"use strict"; return (' + evalStr + ')')();
    } catch (e) { result = NaN; }
    $el.find('#mc-formula-result').text(isNaN(result) ? 'Error' : result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    $el.find('#mc-formula-expr').text(f.label + ': ' + expr);
  }

  /* ── SCALER HELPERS ── */
  function scalerValue(cat, val) {
    if (cat.segments) {
      var seg = null;
      for (var i = 0; i < cat.segments.length; i++) {
        var s = cat.segments[i];
        if (val >= s.from && val <= s.to) { seg = s; break; }
      }
      if (!seg) seg = cat.segments[cat.segments.length - 1];
      var range = seg.to - seg.from;
      if (range === 0) return seg.vMin;
      return seg.vMin + (seg.vMax - seg.vMin) * ((val - seg.from) / range);
    }
    var mn = cat.scaleMin, mx = cat.scaleMax;
    var vmn = cat.vMin, vmx = cat.vMax;
    if (mx === mn) return vmn;
    return vmn + (vmx - vmn) * ((val - mn) / (mx - mn));
  }
  function scalerDisplay(cat, val) {
    var v = scalerValue(cat, val);
    var t = getScalerEffectType(cat);
    if (t === 'multiplicative') {
      var multiplier = 1 + v;
      multiplier = Math.round(multiplier * 100) / 100;
      return multiplier + 'x';
    }
    var pct = Math.round(v * 1000) / 10;
    var unit = cat.unit !== undefined ? cat.unit : '%';
    return (v >= 0 ? '+' : '') + pct + unit;
  }
  function scalerEffectLabel(cat, sv) {
    var t = getScalerEffectType(cat);
    if (t === 'base') return (sv >= 0 ? '+' : '') + sv + ' base';
    if (t === 'multiplicative') {
      var mul = 1 + sv;
      mul = Math.round(mul * 100) / 100;
      return mul + 'x';
    }
    var unit = cat.unit !== undefined ? cat.unit : '%';
    var spct = Math.round(sv * 1000) / 10;
    return (sv >= 0 ? '+' : '') + spct + unit;
  }
  function formatScalerActiveName(cat, val, sv) {
    var inputUnit = cat.unit !== undefined ? cat.unit : '';
    var effect = scalerEffectLabel(cat, sv);
    return cat.name + ': ' + val + inputUnit + ' → ' + effect;
  }
  function getScalerEffectType(cat) {
    var t = (cat.effectType || 'additive').toLowerCase();
    if (t === 'base' || t === 'multiplicative' || t === 'additive') return t;
    return 'additive';
  }
  function applyScalerToTotals(cat, sv, totals) {
    var t = getScalerEffectType(cat);
    if (t === 'base') totals.base += sv;
    else if (t === 'multiplicative') totals.mul *= (1 + sv);
    else totals.pct += sv;
  }
  function scalerMatchesTypeFilter(cat) {
    if (filterType === 'all') return true;
    return getScalerEffectType(cat) === filterType;
  }

  /* ── DOMAIN FILTER (only if buttons exist) ── */
  $el.find('#mc-domain-filter').on('click', '.mc-domain-btn', function() {
    $el.find('.mc-domain-btn').removeClass('mc-filter-active');
    $(this).addClass('mc-filter-active');
    activeDomain = $(this).data('domain');
    $el.find('#mc-mod-search').trigger('input');
    if ($el.find('#mc-browse-panel').is(':visible')) {
      populateBrowsePanel();
    }
  });

  /* ── MOD TYPE SEARCH ── */
  $el.find('#mc-mod-search').on('input', function() {
    var q = $(this).val().toLowerCase().trim();
    $el.find('#mc-mod-suggestions').empty().hide();
    if (!q) { clearModifier(); return; }
    
    // Build allowed domains list (supports comma-separated)
    var allowedDomains = (activeDomain === 'all') ? null : activeDomain.split(',').map(function(d) { return d.trim(); });
    
    var hits = modKeys.filter(function(k) {
      var labelMatch = DATA[k].label.toLowerCase().includes(q);
      var domainMatch = !allowedDomains || allowedDomains.indexOf(DATA[k].tag) !== -1;
      return labelMatch && domainMatch;
    });
    if (!hits.length) return;
    hits.forEach(function(k) {
      var $row = $('<div>').addClass('mc-suggestion-row');
      $('<span>').text(DATA[k].label).appendTo($row);
      if (DATA[k].tag) {
        $row.append(' ');
        $('<span>').addClass('mc-mod-tag mc-tag-' + DATA[k].tag).text(DATA[k].tag).appendTo($row);
      }
      $row.on('click', function() {
        $el.find('#mc-mod-suggestions').hide().empty();
        loadModifier(k);
      }).appendTo($el.find('#mc-mod-suggestions'));
    });
    $el.find('#mc-mod-suggestions').show();
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#mc-mod-search, #mc-mod-suggestions').length) {
      $el.find('#mc-mod-suggestions').hide();
    }
  });

  /* ── TABS ── */
  $(document).on('click', '.mc-tab', function() { switchTab($(this).data('tab')); });

  /* ── SELECT ALL ── */
  $el.find('#mc-select-all').off('change').on('change', function() {
    var val = this.checked;
    getVisibleModIds().forEach(function(id) { checked[id] = val; $el.find('#' + id).prop('checked', val); });
    $el.find('.mc-section:visible').each(function() {
      var ci = $(this).find('.mc-cat-check').data('ci');
      if (ci === undefined) return;
      updateCatCheckbox(ci);
      $(this).find('.mc-subsection:visible .mc-subcat-check').each(function() {
        updateSubcatCheckbox($(this).data('ci'), $(this).data('si'));
      });
    });
    updateGlobalCheckbox(); applyFilters(); recalc();
  });

  // Delegated events
  $el.on('change', '.mc-cat-check', function() {
    var ci = parseInt($(this).data('ci'));
    var val = this.checked;
    getVisibleModIdsInCategory(ci).forEach(function(id) { checked[id] = val; $el.find('#' + id).prop('checked', val); });
    $(this).closest('.mc-section').find('.mc-subsection:visible .mc-subcat-check')
      .each(function() {
        var si = $(this).data('si');
        getVisibleModIdsInSubcategory(ci, si).forEach(function(id) { checked[id] = val; $el.find('#' + id).prop('checked', val); });
        updateSubcatCheckbox(ci, si);
      });
    updateGlobalCheckbox(); applyFilters(); recalc();
  });
  $el.on('change', '.mc-subcat-check', function() {
    var ci = parseInt($(this).data('ci'));
    var si = parseInt($(this).data('si'));
    var val = this.checked;
    getVisibleModIdsInSubcategory(ci, si).forEach(function(id) { checked[id] = val; $el.find('#' + id).prop('checked', val); });
    updateCatCheckbox(ci); updateGlobalCheckbox(); applyFilters(); recalc();
  });

  /* ── FILTERS ── */
  $el.find('#mc-filter-effect').on('click', '.mc-filter-btn', function() {
    $el.find('#mc-filter-effect .mc-filter-btn').removeClass('mc-filter-active');
    $(this).addClass('mc-filter-active'); filterEffect = $(this).data('filter'); applyFilters();
  });
  $el.find('#mc-filter-type').on('click', '.mc-filter-btn', function() {
    $el.find('#mc-filter-type .mc-filter-btn').removeClass('mc-filter-active');
    $(this).addClass('mc-filter-active'); filterType = $(this).data('filter'); applyFilters();
  });
  $el.find('#mc-filter-range').on('click', '.mc-filter-btn', function() {
    $el.find('#mc-filter-range .mc-filter-btn').removeClass('mc-filter-active');
    $(this).addClass('mc-filter-active'); filterRange = $(this).data('filter'); applyFilters();
  });
  $el.find('#mc-filter-selected').on('click', '.mc-filter-btn', function() {
    $el.find('#mc-filter-selected .mc-filter-btn').removeClass('mc-filter-active');
    $(this).addClass('mc-filter-active'); filterShow = $(this).data('filter'); applyFilters();
  });
  $el.find('#mc-filter').on('input', function() { filterText = $(this).val().toLowerCase(); applyFilters(); });

  /* ── CATEGORY/SUBCATEGORY FILTERS ── */
  function renderCategoryFilter() {
    var $cats = $el.find('#mc-filter-cats').empty();
    if (!currentMod || !DATA[currentMod]) return;
    var data = DATA[currentMod];
    $('<button class="mc-filter-btn mc-filter-active" data-cat="all">All</button>').appendTo($cats);
    (data.categories || []).forEach(function(cat) {
      if (!categoryMatchesAllowed(cat.name)) return;
      $('<button class="mc-filter-btn" data-cat="' + cat.name + '">' + cat.name + '</button>').appendTo($cats);
    });
  }
  function renderSubcategoryFilter() {
    var $subs = $el.find('#mc-filter-subcats').empty();
    if (!currentMod || !DATA[currentMod]) return;
    var data = DATA[currentMod];
    var parentCats = filterCats.length ? filterCats : null;
    var visibleSubs = collectSubcategories(data, parentCats);
    $('<button class="mc-filter-btn mc-filter-active" data-subcat="all">All</button>').appendTo($subs);
    visibleSubs.forEach(function(sub) {
      $('<button class="mc-filter-btn" data-subcat="' + sub.name + '">' + sub.name + '</button>').appendTo($subs);
    });
    if (filterSubcats.length) {
      var visibleNames = visibleSubs.map(function(s) { return s.name; });
      filterSubcats = filterSubcats.filter(function(s) { return visibleNames.indexOf(s) !== -1; });
      if (filterSubcats.length) {
        $el.find('#mc-filter-subcats .mc-filter-btn[data-subcat="all"]').removeClass('mc-filter-active');
        filterSubcats.forEach(function(s) {
          $el.find('#mc-filter-subcats .mc-filter-btn[data-subcat="' + s + '"]').addClass('mc-filter-active');
        });
      } else { $el.find('#mc-filter-subcats .mc-filter-btn[data-subcat="all"]').addClass('mc-filter-active'); }
    }
  }
  $(document).on('click', '#mc-filter-cats .mc-filter-btn', function() {
    var cat = $(this).data('cat');
    if (cat === 'all') {
      filterCats = [];
      $el.find('#mc-filter-cats .mc-filter-btn').removeClass('mc-filter-active');
      $el.find('#mc-filter-cats .mc-filter-btn[data-cat="all"]').addClass('mc-filter-active');
    } else {
      $el.find('#mc-filter-cats .mc-filter-btn[data-cat="all"]').removeClass('mc-filter-active');
      $(this).toggleClass('mc-filter-active');
      filterCats = [];
      $el.find('#mc-filter-cats .mc-filter-btn.mc-filter-active').each(function() { filterCats.push($(this).data('cat')); });
      if (!filterCats.length) $el.find('#mc-filter-cats .mc-filter-btn[data-cat="all"]').addClass('mc-filter-active');
    }
    filterSubcats = [];
    renderSubcategoryFilter();
    applyFilters();
  });
  $(document).on('click', '#mc-filter-subcats .mc-filter-btn', function() {
    var subcat = $(this).data('subcat');
    if (subcat === 'all') {
      filterSubcats = [];
      $el.find('#mc-filter-subcats .mc-filter-btn').removeClass('mc-filter-active');
      $el.find('#mc-filter-subcats .mc-filter-btn[data-subcat="all"]').addClass('mc-filter-active');
    } else {
      $el.find('#mc-filter-subcats .mc-filter-btn[data-subcat="all"]').removeClass('mc-filter-active');
      $(this).toggleClass('mc-filter-active');
      filterSubcats = [];
      $el.find('#mc-filter-subcats .mc-filter-btn.mc-filter-active').each(function() { filterSubcats.push($(this).data('subcat')); });
      if (!filterSubcats.length) $el.find('#mc-filter-subcats .mc-filter-btn[data-subcat="all"]').addClass('mc-filter-active');
    }
    applyFilters();
  });

  function filterTextMatches(str) { return !filterText || (str || '').toLowerCase().includes(filterText); }
  function modItemVisible($item, ignoreText) {
    var id = $item.find('input[type=checkbox]').attr('id');
    var name = $item.find('.mc-mod-name').text().toLowerCase();
    var label = $item.find('.mc-mod-val').text().trim();
    var mul = isMultiplicative(label);
    var base = isBase(label);
    var affine = $item.data('affine') === true;
    var isGood = $item.data('good');
    var sel = !!checked[id];
    var textOk = ignoreText || !filterText || name.includes(filterText);
    var effectOk = filterEffect === 'all' || (filterEffect === 'good' && isGood === true) || (filterEffect === 'bad' && isGood === false);
    var typeOk = true;
    if (filterType === 'additive') typeOk = !mul && !base && !affine;
    else if (filterType === 'multiplicative') typeOk = mul;
    else if (filterType === 'base') typeOk = base;
    else if (filterType === 'affine') typeOk = affine;
    var rangeOk = filterRange === 'all' || filterRange === 'normal';
    var showOk = filterShow === 'all' || (filterShow === 'selected' && sel) || (filterShow === 'unselected' && !sel);
    return textOk && effectOk && typeOk && rangeOk && showOk;
  }

  function applyFilters() {
  $el.find('.mc-section').each(function() {
    var catName = $(this).data('cat');
    var catVisible = !filterCats.length || filterCats.indexOf(catName) !== -1;
    if (!catVisible) { $(this).hide(); return; }
    if ($(this).data('scaler')) {
      if (filterSubcats.length > 0) { $(this).hide(); return; }
      if (filterRange === 'normal') { $(this).hide(); return; }
      var ci = $(this).find('.mc-scaler-input').data('ci');
      var cat = DATA[currentMod] && DATA[currentMod].categories[ci];
      if (!cat || !scalerMatchesTypeFilter(cat)) { $(this).hide(); return; }
      var ig = $(this).data('input-good');
      var scalerEffectOk = filterEffect === 'all' || (filterEffect === 'dynamic' && ig === 'dynamic') || (filterEffect === 'good' && ig === true) || (filterEffect === 'bad' && ig === false);
      var catNameLower = (catName || '').toLowerCase();
      var textOk = !filterText || catNameLower.includes(filterText);
      $(this).toggle(scalerEffectOk && textOk);
      return;
    }
    if (filterRange === 'scaler') { $(this).hide(); return; }
    
    // NEW: If subcategory filters are active, hide categories that have NO subcategories
    var hasSubcats = $(this).find('.mc-subsection').length > 0;
    if (filterSubcats.length > 0 && !hasSubcats) {
      $(this).hide();
      return;
    }
    
    var anyVisible = false;
    var catTextOk = filterTextMatches(catName);
    $(this).children('.mc-mod-list').find('.mc-mod-item').each(function() {
      var showDirect = !filterSubcats.length || !hasSubcats;
      var visible = showDirect && modItemVisible($(this), catTextOk);
      $(this).toggle(visible);
      if (visible) anyVisible = true;
    });
    $(this).find('.mc-subsection').each(function() {
      var subName = $(this).data('subcat');
      var subVisible = !filterSubcats.length || filterSubcats.indexOf(subName) !== -1;
      if (!subVisible) { $(this).hide(); return; }
      var subTextOk = filterTextMatches(subName);
      var subAny = false;
      $(this).find('.mc-mod-item').each(function() {
        var visible = modItemVisible($(this), catTextOk || subTextOk);
        $(this).toggle(visible);
        if (visible) subAny = true;
      });
      $(this).toggle(subAny);
      if (subAny) anyVisible = true;
    });
    $(this).toggle(anyVisible);
  });
  renderSelectedList();
  updateGlobalCheckbox();
  updateSelectMeta();
  var data = DATA[currentMod];
  if (data) {
    data.categories.forEach(function(cat, ci) {
      if (cat.type === 'scaler') return;
      updateCatCheckbox(ci);
      (cat.subcategories || []).forEach(function(sub, si) { updateSubcatCheckbox(ci, si); });
    });
  }
}

  /* ── ID HELPERS ── */
  function getAllModIds() {
    var data = DATA[currentMod];
    var ids = [];
    if (!data) return ids;
    data.categories.forEach(function(cat, ci) {
      if (!categoryMatchesAllowed(cat.name)) return;
      forEachModInCat(cat, ci, function(m, id) { ids.push(id); });
    });
    return ids;
  }
  function getCatModIds(ci) {
    var data = DATA[currentMod];
    var ids = [];
    if (!data || !data.categories[ci]) return ids;
    var cat = data.categories[ci];
    if (!categoryMatchesAllowed(cat.name)) return ids;
    forEachModInCat(cat, ci, function(m, id) { ids.push(id); });
    return ids;
  }
  function getSubcatModIds(ci, si) {
    var data = DATA[currentMod];
    var ids = [];
    if (!data || !data.categories[ci]) return ids;
    var sub = (data.categories[ci].subcategories || [])[si];
    if (!sub) return ids;
    (sub.mods || []).forEach(function(m, mi) { ids.push('mc_' + ci + '_s_' + si + '_' + mi); });
    return ids;
  }
  function updateGlobalCheckbox() {
    var visibleIds = getVisibleModIds();
    $el.find('#mc-select-all').prop('checked', visibleIds.length > 0 && visibleIds.every(function(id) { return !!checked[id]; }));
  }
  function updateCatCheckbox(ci) {
    var ids = getVisibleModIdsInCategory(ci);
    $el.find('#mc-cat-check-' + ci).prop('checked', ids.length > 0 && ids.every(function(id) { return !!checked[id]; }));
  }
  function updateSubcatCheckbox(ci, si) {
    var ids = getVisibleModIdsInSubcategory(ci, si);
    $el.find('#mc-subcat-check-' + ci + '_' + si).prop('checked', ids.length > 0 && ids.every(function(id) { return !!checked[id]; }));
  }

  /* ── SCALER COLOR HELPERS ── */
  function scalerInputClass(cat, val) {
    if (cat.inputGood === 'dynamic') {
      var mid = (cat.scaleMin + cat.scaleMax) / 2;
      return val > mid ? 'mc-pos' : val < mid ? 'mc-neg' : 'mc-neu';
    }
    if (cat.inputGood === false) return val === cat.scaleMin ? 'mc-neu' : 'mc-neg';
    if (cat.inputGood === true) return val === cat.scaleMin ? 'mc-neu' : 'mc-pos';
    return 'mc-neu';
  }
  function scalerBoundClass(cat, which) {
    var ig = cat.inputGood !== undefined ? cat.inputGood : 'dynamic';
    if (ig === false) return which === 'min' ? 'mc-neu' : 'mc-neg';
    if (ig === true) return which === 'max' ? 'mc-pos' : 'mc-neu';
    return which === 'min' ? 'mc-neg' : 'mc-pos';
  }
  function scalerEffectClass(sv) { return sv > 0 ? 'mc-pos' : sv < 0 ? 'mc-neg' : 'mc-neu'; }
  function scalerDecimalPlaces(cat) {
    var stepStr = String(cat.step != null ? cat.step : 0.01);
    return stepStr.indexOf('.') >= 0 ? stepStr.split('.')[1].length : 0;
  }
  function formatScalerInputValue(cat, val) {
    var places = scalerDecimalPlaces(cat);
    return places > 0 ? parseFloat(Number(val).toFixed(places)) : val;
  }
  function clampScalerValue(cat, val) {
    val = parseFloat(val);
    if (isNaN(val)) val = (cat.scaleMin + cat.scaleMax) / 2;
    val = formatScalerInputValue(cat, val);
    return Math.min(cat.scaleMax, Math.max(cat.scaleMin, val));
  }
  function setScalerValue(ci, val, active) {
    var data = DATA[currentMod];
    if (!data || !data.categories[ci] || data.categories[ci].type !== 'scaler') return;
    var cat = data.categories[ci];
    if (!categoryMatchesAllowed(cat.name)) return;
    val = clampScalerValue(cat, val);
    if (active === false) delete scalerVals['scaler_' + ci];
    else scalerVals['scaler_' + ci] = val;
    $el.find('#mc-scaler-' + ci).val(val);
    var $num = $el.find('#mc-scaler-val-' + ci);
    if ($num[0] !== document.activeElement) $num.val(formatScalerInputValue(cat, val));
    var sv = scalerValue(cat, val);
    $el.find('#mc-scaler-display-' + ci).text(active === false ? '—' : scalerDisplay(cat, val));
    applyScalerColors(ci, val, sv, active === false);
    renderSelectedList();
    recalc();
  }
  function commitScalerNum(ci) {
    var $num = $el.find('#mc-scaler-val-' + ci);
    var raw = ($num.val() || '').trim();
    var data = DATA[currentMod];
    if (!data || !data.categories[ci] || data.categories[ci].type !== 'scaler') return;
    var cat = data.categories[ci];
    if (!categoryMatchesAllowed(cat.name)) return;
    if (raw === '' || raw === '-' || raw === '.' || raw === '-.') {
      setScalerValue(ci, (cat.scaleMin + cat.scaleMax) / 2, false);
      return;
    }
    setScalerValue(ci, parseFloat(raw), true);
  }
  function applyScalerColors(ci, val, sv, inactive) {
    var cat = DATA[currentMod].categories[ci];
    var inputCls = inactive ? 'mc-neu' : scalerInputClass(cat, val);
    var effectCls = inactive ? 'mc-neu' : scalerEffectClass(sv);
    $el.find('#mc-scaler-val-' + ci).removeClass('mc-pos mc-neg mc-neu').addClass(inputCls);
    $el.find('#mc-scaler-display-' + ci).removeClass('mc-pos mc-neg mc-neu').addClass(effectCls);
    $el.find('#mc-scaler-unit-' + ci).removeClass('mc-pos mc-neg mc-neu').addClass(inactive ? 'mc-neu' : inputCls);
  }

  function buildSelectedTagHtml(label, valueHtml, cls, rmHtml) {
    return '<span class="mc-selected-tag ' + cls + '">' + label + ' <b>' + valueHtml + '</b> ' + rmHtml + '</span>';
  }

  function updateSelectMeta() {
    var catN = 0, subN = 0, modN = 0;
    $el.find('#mc-sections .mc-section:visible').each(function() {
      if ($(this).data('scaler')) { catN += 1; modN += 1; return; }
      catN += 1;
      subN += $(this).find('.mc-subsection:visible').length;
      modN += $(this).find('.mc-mod-item:visible').length;
    });
    $el.find('#mc-meta-cats').text(catN + ' categor' + (catN === 1 ? 'y' : 'ies'));
    $el.find('#mc-meta-subs').text(subN + ' subcategor' + (subN === 1 ? 'y' : 'ies'));
    $el.find('#mc-meta-mods').text(modN + ' modifier' + (modN === 1 ? '' : 's'));
  }

  function clearCategory(ci) {
    var data = DATA[currentMod];
    if (!data || !data.categories[ci]) return;
    var cat = data.categories[ci];
    if (!categoryMatchesAllowed(cat.name)) return;
    if (cat.type === 'scaler') {
      var mid = (cat.scaleMin + cat.scaleMax) / 2;
      setScalerValue(ci, mid, false);
      return;
    }
    getCatModIds(ci).forEach(function(id) { checked[id] = false; $el.find('#' + id).prop('checked', false); });
    updateCatCheckbox(ci);
    (cat.subcategories || []).forEach(function(sub, si) { updateSubcatCheckbox(ci, si); });
    updateGlobalCheckbox(); applyFilters(); recalc();
  }
  function clearSubcategory(ci, si) {
    getSubcatModIds(ci, si).forEach(function(id) { checked[id] = false; $el.find('#' + id).prop('checked', false); });
    updateSubcatCheckbox(ci, si);
    updateCatCheckbox(ci);
    updateGlobalCheckbox(); applyFilters(); recalc();
  }

  /* ── SELECTED LIST ── */
  function renderSelectedList() {
    var data = DATA[currentMod];
    var $list = $el.find('#mc-selected-list');
    if (!data) { $list.hide().empty(); return; }
    var total = 0;
    var groupsHtml = [];
    var curBase = parseFloat($el.find('#mc-base').val()) || 0;

    data.categories.forEach(function(cat, ci) {
      if (!categoryMatchesAllowed(cat.name)) return;
      var groupParts = [], groupCount = 0;
      if (cat.type === 'scaler') {
        var sval = scalerVals['scaler_' + ci];
        if (sval !== undefined) {
          var sv = scalerValue(cat, sval);
          groupCount += 1;
          groupParts.push('<div class="mc-selected-tags">' + buildSelectedTagHtml(cat.name + ':', sval + (cat.unit !== undefined ? cat.unit : '') + ' → ' + scalerEffectLabel(cat, sv), scalerEffectClass(sv), '<span class="mc-selected-rm-scaler" data-ci="' + ci + '">×</span>') + '</div>');
        }
      } else {
        var directTags = [];
        (cat.mods || []).forEach(function(m, mi) {
          var id = 'mc_' + ci + '_d_' + mi;
          if (!checked[id]) return;
          groupCount += 1;
          var goodCls = m.good === true ? 'mc-pos' : m.good === false ? 'mc-neg' : 'mc-neu';
          var label = m.label || m.n;
          if (isAffine(m)) {
            var effectiveSlope = m.affine.slope * (2 / currentRP);
            var transformed = (curBase - 166.6667) * effectiveSlope + 166.6667;
            var transformedStr = Math.round(transformed * 100) / 100;
            var rp = m.rp || (m.affine.slope * 2);
            label = m.n + ' (Base ' + transformedStr + ' / ' + Math.round(effectiveSlope * 100) / 100 + 'x RP ' + rp + '%)';
          }
          directTags.push(buildSelectedTagHtml(m.n, label, goodCls, '<span class="mc-selected-rm" data-id="' + id + '">×</span>'));
        });
        if (directTags.length) groupParts.push('<div class="mc-selected-tags">' + directTags.join('') + '</div>');
        (cat.subcategories || []).forEach(function(sub, si) {
          var subTags = [];
          (sub.mods || []).forEach(function(m, mi) {
            var id = 'mc_' + ci + '_s_' + si + '_' + mi;
            if (!checked[id]) return;
            groupCount += 1;
            var goodCls = m.good === true ? 'mc-pos' : m.good === false ? 'mc-neg' : 'mc-neu';
            var label = m.label || m.n;
            if (isAffine(m)) {
              var effectiveSlope = m.affine.slope * (2 / currentRP);
              var transformed = (curBase - 166.6667) * effectiveSlope + 166.6667;
              var transformedStr = Math.round(transformed * 100) / 100;
              var rp = m.rp || (m.affine.slope * 2);
              label = m.n + ' (Base ' + transformedStr + ' / ' + Math.round(effectiveSlope * 100) / 100 + 'x RP ' + rp + '%)';
            }
            subTags.push(buildSelectedTagHtml(m.n, label, goodCls, '<span class="mc-selected-rm" data-id="' + id + '">×</span>'));
          });
          if (!subTags.length) return;
          groupParts.push('<div class="mc-selected-subgroup">'
            + '<div class="mc-selected-subhead">'
            + '<span class="mc-selected-subtitle">' + sub.name + '</span>'
            + '<span class="mc-selected-count">' + subTags.length + '</span>'
            + '<button type="button" class="mc-clear-sub" data-ci="' + ci + '" data-si="' + si + '">Clear</button>'
            + '</div>'
            + '<div class="mc-selected-tags">' + subTags.join('') + '</div>'
            + '</div>');
        });
      }
      if (!groupCount) return;
      total += groupCount;
      groupsHtml.push('<div class="mc-selected-group">'
        + '<div class="mc-selected-group-head">'
        + '<span class="mc-selected-grouptitle">' + cat.name + '</span>'
        + '<span class="mc-selected-count">' + groupCount + '</span>'
        + '<button type="button" class="mc-clear-cat" data-ci="' + ci + '">Clear</button>'
        + '</div>'
        + groupParts.join('')
        + '</div>');
    });
    if (!total) { $list.hide().empty(); return; }
    $list.html('<div class="mc-selected-header">'
      + '<span class="mc-selected-heading">Selected modifiers <span class="mc-selected-total">(' + total + ')</span></span>'
      + '<button type="button" class="mc-clear-all" id="mc-clear-all">Clear all</button>'
      + '</div>'
      + '<div class="mc-selected-title-divider"></div>'
      + groupsHtml.join('')).show();
  }

  // ---------- FIXED CLEAR BUTTONS (delegated) ----------
  $el.on('click', '#mc-clear-all', function() {
    getAllModIds().forEach(function(id) { checked[id] = false; $el.find('#' + id).prop('checked', false); });
    scalerVals = {};
    activeAffineId = null;
    $el.find('.mc-scaler-input').each(function() {
      var ci = $(this).data('ci');
      var cat = DATA[currentMod] && DATA[currentMod].categories[ci];
      if (!cat) return;
      if (!categoryMatchesAllowed(cat.name)) return;
      var mid = (cat.scaleMin + cat.scaleMax) / 2;
      setScalerValue(ci, mid, false);
    });
    var data = DATA[currentMod];
    if (data) {
      data.categories.forEach(function(cat, ci) {
        if (!categoryMatchesAllowed(cat.name)) return;
        $el.find('#mc-cat-check-' + ci).prop('checked', false);
        (cat.subcategories || []).forEach(function(sub, si) {
          $el.find('#mc-subcat-check-' + ci + '_' + si).prop('checked', false);
        });
      });
    }
    $el.find('#mc-select-all').prop('checked', false);
    applyFilters(); recalc();
  });

  $el.on('click', '.mc-clear-cat', function() {
    clearCategory(parseInt($(this).data('ci')));
  });

  $el.on('click', '.mc-clear-sub', function() {
    clearSubcategory(parseInt($(this).data('ci')), parseInt($(this).data('si')));
  });

  $el.on('click', '.mc-selected-rm', function() {
    var id = $(this).data('id'); checked[id] = false; $el.find('#' + id).prop('checked', false);
    var parts = id.split('_');
    var ci = parseInt(parts[1]);
    if (parts[2] === 's') updateSubcatCheckbox(ci, parseInt(parts[3]));
    updateCatCheckbox(ci); updateGlobalCheckbox(); applyFilters(); recalc();
  });

  $el.on('click', '.mc-selected-rm-scaler', function() {
    var ci = $(this).data('ci');
    delete scalerVals['scaler_' + ci];
    var cat = DATA[currentMod].categories[ci];
    if (cat) {
      var mid = (cat.scaleMin + cat.scaleMax) / 2;
      setScalerValue(ci, mid, false);
    }
    applyFilters(); recalc();
  });
  // ---------- END FIXED CLEAR BUTTONS ----------

  // Current RP selector buttons
  $el.on('click', '#mc-current-rp-btns .mc-filter-btn', function() {
    var rp = parseInt($(this).data('rp'));
    if (rp === currentRP) return;
    currentRP = rp;
    $el.find('#mc-current-rp-btns .mc-filter-btn').removeClass('mc-filter-active');
    $(this).addClass('mc-filter-active');
    recalc();
  });

  /* ── BROWSE BUTTON LOGIC (3‑column grid) ── */
function populateBrowsePanel() {
  var $panel = $el.find('#mc-browse-panel');
  $panel.empty();
  
  // Build list of allowed domains (supports comma-separated)
  var allowedDomains = (activeDomain === 'all') ? null : activeDomain.split(',').map(function(d) { return d.trim(); });
  
  var groups = {};
  var totalCount = 0;
  
  modKeys.forEach(function(k) {
    var tag = DATA[k].tag || 'other';
    // Filter by active domain(s)
    if (allowedDomains && allowedDomains.indexOf(tag) === -1) return;
    if (!groups[tag]) groups[tag] = [];
    groups[tag].push({ key: k, label: DATA[k].label });
    totalCount++;
  });
  
  // Total count header
  $('<div class="mc-browse-total"></div>')
    .text(totalCount + ' modifier' + (totalCount !== 1 ? 's' : '') + ' available')
    .appendTo($panel);
  
  var domainOrder = ['government','diplomacy','economy','technology','military'];
  
  domainOrder.forEach(function(tag) {
    if (!groups[tag] || groups[tag].length === 0) return;
    
    var $group = $('<div class="mc-browse-group" data-domain="' + tag + '"></div>');
    $('<div class="mc-browse-group-title">' +
      tag.charAt(0).toUpperCase() + tag.slice(1) +
      ' <span class="mc-browse-count">(' + groups[tag].length + ')</span>' +
      '</div>').appendTo($group);
    
    var $grid = $('<div class="mc-browse-group-items"></div>');
    groups[tag].forEach(function(item) {
      $('<div class="mc-browse-item"></div>')
        .text(item.label)
        .data('key', item.key)
        .appendTo($grid);
    });
    $grid.appendTo($group);
    $group.appendTo($panel);
  });
  
  if ($panel.children().length === 0) {
    $panel.html('<div style="padding:10px;color:#888;">No modifiers match the current filter.</div>');
  }
}
  // Browse button toggle
  $el.on('click', '#mc-browse-btn', function(e) {
    e.stopPropagation();
    var $panel = $el.find('#mc-browse-panel');
    if ($panel.is(':visible')) {
      $panel.hide();
    } else {
      populateBrowsePanel();
      $panel.show();
    }
  });

  // Click on a browse item loads the modifier
  $el.on('click', '.mc-browse-item', function() {
    var key = $(this).data('key');
    $el.find('#mc-browse-panel').hide();
    loadModifier(key);
  });

  // Hide panel when clicking outside
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#mc-browse-btn, #mc-browse-panel').length) {
      $el.find('#mc-browse-panel').hide();
    }
  });

  /* ── RENDER SECTIONS (affine mods show RP%) ── */
  function renderSections() {
    var data = DATA[currentMod];
    var out = '';
    if (!data) { $el.find('#mc-sections').empty(); return; }
    data.categories.forEach(function(cat, ci) {
      if (!categoryMatchesAllowed(cat.name)) return;

      if (cat.type === 'scaler') {
        var curVal = scalerVals['scaler_' + ci];
        var dispVal = curVal !== undefined ? curVal : cat.scaleMin;
        var dispStr = curVal !== undefined ? scalerDisplay(cat, dispVal) : '—';
        var unitLbl = cat.unit !== undefined ? cat.unit : '';
        var initInputCls = curVal !== undefined ? scalerInputClass(cat, dispVal) : 'mc-neu';
        var initEffectCls = curVal !== undefined ? scalerEffectClass(scalerValue(cat, dispVal)) : 'mc-neu';
        var igood = cat.inputGood !== undefined ? cat.inputGood : 'dynamic';
        var unitCls = curVal !== undefined ? initInputCls : 'mc-neu';

        var scalerTitle = '';
        if (cat.link) {
          scalerTitle = '<a href="' + cat.link + '" target="_blank" class="mc-section-title" style="color: #86abe5; text-decoration: none;">' + cat.name + '</a>';
        } else {
          scalerTitle = '<span class="mc-section-title">' + cat.name + '</span>';
        }
        if (cat.tooltip) {
          scalerTitle += ' <span class="info-icon" title="' + cat.tooltip.replace(/"/g, '&quot;') + '">ⓘ</span>';
        }

        out += '<div class="mc-section mc-scaler-section" data-cat="' + cat.name + '" data-scaler="1" data-input-good="' + igood + '">'
          + '<div class="mc-section-header">'
          + scalerTitle
          + '<span class="mc-scaler-live ' + initEffectCls + '" id="mc-scaler-display-' + ci + '">' + dispStr + '</span>'
          + '</div>'
          + '<div class="mc-scaler-row">'
          + '<span class="mc-scaler-bound ' + scalerBoundClass(cat, 'min') + '">' + cat.scaleMin + unitLbl + '</span>'
          + '<input type="range" class="mc-scaler-input" id="mc-scaler-' + ci + '" data-ci="' + ci + '" min="' + cat.scaleMin + '" max="' + cat.scaleMax + '" step="' + (cat.step || 0.01) + '" value="' + dispVal + '">'
          + '<span class="mc-scaler-bound ' + scalerBoundClass(cat, 'max') + '">' + cat.scaleMax + unitLbl + '</span>'
          + '<input type="number" class="mc-scaler-num ' + initInputCls + '" id="mc-scaler-val-' + ci + '" data-ci="' + ci + '" inputmode="decimal" min="' + cat.scaleMin + '" max="' + cat.scaleMax + '" step="' + (cat.step || 0.01) + '" value="' + dispVal + '">'
          + (unitLbl ? '<span class="mc-scaler-unit ' + unitCls + '" id="mc-scaler-unit-' + ci + '">' + unitLbl + '</span>' : '')
          + '</div>'
          + '</div>';
        return;
      }

      var subcats = cat.subcategories || [];
      var modCount = countCatMods(cat);
      if (modCount === 0 && !subcats.length) return;
      var countBadge = subcats.length ? '<span class="mc-section-count mc-section-count-dual" title="' + subcats.length + ' subcategories, ' + modCount + ' modifiers">' + subcats.length + ' · ' + modCount + '</span>' : '<span class="mc-section-count">' + modCount + '</span>';
      var catTitleHtml = '';
      if (cat.link) catTitleHtml = '<a href="' + cat.link + '" target="_blank" class="mc-section-title" style="color: #86abe5; text-decoration: none;">' + cat.name + '</a>';
      else catTitleHtml = '<span class="mc-section-title">' + cat.name + '</span>';
      if (cat.tooltip) catTitleHtml += ' <span class="info-icon" title="' + cat.tooltip.replace(/"/g, '&quot;') + '">ⓘ</span>';
      out += '<div class="mc-section" data-cat="' + cat.name + '">'
        + '<div class="mc-section-header">'
        + '<label class="mc-cat-check-label"><input type="checkbox" class="mc-cat-check" id="mc-cat-check-' + ci + '" data-ci="' + ci + '"></label>'
        + catTitleHtml + countBadge
        + '</div>';
      if (cat.mods && cat.mods.length) {
        out += '<div class="mc-mod-list">';
        cat.mods.forEach(function(m, mi) {
          var id = 'mc_' + ci + '_d_' + mi;
          var goodAttr = m.good !== undefined ? 'data-good="' + m.good + '"' : '';
          var affineAttr = isAffine(m) ? ' data-affine="true"' : '';
          var valCls = m.good === true ? 'mc-pos' : m.good === false ? 'mc-neg' : 'mc-neu';
          var tooltipHtml = m.tooltip ? ' title="' + m.tooltip.replace(/"/g, '&quot;') + '"' : '';
          var displayValue = m.label || m.n;
          out += '<label class="mc-mod-item" ' + goodAttr + affineAttr + tooltipHtml + '>'
            + '<input type="checkbox" id="' + id + '" ' + (checked[id] ? 'checked' : '') + ' data-affine="' + (isAffine(m) ? 'true' : 'false') + '">'
            + '<span class="mc-mod-name">' + m.n + '</span>'
            + '<span class="mc-mod-val ' + valCls + '">' + displayValue + '</span>'
            + '</label>';
        });
        out += '</div>';
      }
      subcats.forEach(function(sub, si) {
        var subCount = (sub.mods || []).length;
        var subTitleHtml = '';
        if (sub.link) {
          subTitleHtml = '<a href="' + sub.link + '" target="_blank" class="mc-subsection-title" style="color: #86abe5; text-decoration: none;">' + sub.name + '</a>';
        } else {
          subTitleHtml = '<span class="mc-subsection-title">' + sub.name + '</span>';
        }
        if (sub.tooltip) subTitleHtml += ' <span class="info-icon" title="' + sub.tooltip.replace(/"/g, '&quot;') + '">ⓘ</span>';
        out += '<div class="mc-subsection" data-subcat="' + sub.name + '">'
          + '<div class="mc-subsection-header">'
          + '<label class="mc-cat-check-label"><input type="checkbox" class="mc-subcat-check" id="mc-subcat-check-' + ci + '_' + si + '" data-ci="' + ci + '" data-si="' + si + '"></label>'
          + subTitleHtml
          + '<span class="mc-section-count">' + subCount + '</span>'
          + '</div>'
          + '<div class="mc-mod-list">';
        (sub.mods || []).forEach(function(m, mi) {
          var id = 'mc_' + ci + '_s_' + si + '_' + mi;
          var goodAttr = m.good !== undefined ? 'data-good="' + m.good + '"' : '';
          var affineAttr = isAffine(m) ? ' data-affine="true"' : '';
          var valCls = m.good === true ? 'mc-pos' : m.good === false ? 'mc-neg' : 'mc-neu';
          var tooltipHtml = m.tooltip ? ' title="' + m.tooltip.replace(/"/g, '&quot;') + '"' : '';
          var displayValue = m.label || m.n;
          out += '<label class="mc-mod-item" ' + goodAttr + affineAttr + tooltipHtml + '>'
            + '<input type="checkbox" id="' + id + '" ' + (checked[id] ? 'checked' : '') + ' data-affine="' + (isAffine(m) ? 'true' : 'false') + '">'
            + '<span class="mc-mod-name">' + m.n + '</span>'
            + '<span class="mc-mod-val ' + valCls + '">' + displayValue + '</span>'
            + '</label>';
        });
        out += '</div></div>';
      });
      out += '</div>';
    });
    $el.find('#mc-sections').html(out);
    data.categories.forEach(function(cat, ci) {
      if (cat.type === 'scaler') return;
      if (!categoryMatchesAllowed(cat.name)) return;
      updateCatCheckbox(ci);
      (cat.subcategories || []).forEach(function(sub, si) { updateSubcatCheckbox(ci, si); });
    });
    updateGlobalCheckbox();
    $el.find('#mc-sections').off('input', '.mc-scaler-input').on('input', '.mc-scaler-input', function() {
      setScalerValue(parseInt($(this).data('ci')), parseFloat($(this).val()), true);
    });
    $el.find('#mc-sections').off('focus', '.mc-scaler-num').on('focus', '.mc-scaler-num', function() { this.select(); });
    $el.find('#mc-sections').off('blur', '.mc-scaler-num').on('blur', '.mc-scaler-num', function() { commitScalerNum(parseInt($(this).data('ci'))); });
    $el.find('#mc-sections').off('keydown', '.mc-scaler-num').on('keydown', '.mc-scaler-num', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); commitScalerNum(parseInt($(this).data('ci'))); this.blur(); }
    });

    // Conscription law – only one active
    $el.find('#mc-sections').off('change', '.mc-mod-item input[type=checkbox][data-affine="true"]')
      .on('change', '.mc-mod-item input[type=checkbox][data-affine="true"]', function() {
        var $cb = $(this);
        var id = $cb.attr('id');
        var isChecked = $cb.prop('checked');

        if (isChecked) {
          $el.find('#mc-sections .mc-mod-item input[type=checkbox][data-affine="true"]').not(this).each(function() {
            if (this.checked) {
              this.checked = false;
              checked[this.id] = false;
            }
          });
          activeAffineId = id;
        } else {
          if (activeAffineId === id) {
            activeAffineId = null;
          }
        }

        checked[id] = isChecked;
        var parts = id.split('_');
        var ci = parseInt(parts[1]);
        updateCatCheckbox(ci);
        if (parts[2] === 's') updateSubcatCheckbox(ci, parseInt(parts[3]));
        updateGlobalCheckbox();
        applyFilters();
        recalc();
      });

    // Normal mods
    $el.find('#mc-sections').off('change', '.mc-mod-item input[type=checkbox]:not([data-affine="true"])')
      .on('change', '.mc-mod-item input[type=checkbox]:not([data-affine="true"])', function() {
        checked[this.id] = this.checked;
        var parts = this.id.split('_');
        var ci = parseInt(parts[1]);
        if (parts[2] === 's') updateSubcatCheckbox(ci, parseInt(parts[3]));
        updateCatCheckbox(ci); updateGlobalCheckbox(); applyFilters(); recalc();
      });

    applyFilters();
    updateSelectMeta();
  }

  /* ── GET TOTALS ── */
  function getTotals() {
    var base = parseFloat($el.find('#mc-base').val()) || 0;
    var data = DATA[currentMod];
    if (!data) return { transformedBase: base, pct: 0, base: 0, mul: 1 };

    var transformedBase = base;
    if (activeAffineId) {
      var parts = activeAffineId.split('_');
      var ci = parseInt(parts[1]);
      var cat = DATA[currentMod].categories[ci];
      if (cat) {
        var lawMod;
        if (parts[2] === 'd') {
          lawMod = cat.mods[parseInt(parts[3])];
        } else if (parts[2] === 's') {
          var si = parseInt(parts[3]);
          var sub = cat.subcategories[si];
          if (sub) lawMod = sub.mods[parseInt(parts[4])];
        }
        if (lawMod && isAffine(lawMod)) {
          var effectiveSlope = lawMod.affine.slope * (2 / currentRP);
          transformedBase = (base - 166.6667) * effectiveSlope + 166.6667;
        }
      }
    }

    var totalPct = 0, totalBase = 0, totalMul = 1;
    var scalerAcc = { pct: 0, base: 0, mul: 1 };

    data.categories.forEach(function(cat, ci) {
      if (cat.type !== 'scaler') return;
      if (!categoryMatchesAllowed(cat.name)) return;
      var val = scalerVals['scaler_' + ci];
      if (val === undefined) return;
      var sv = scalerValue(cat, val);
      applyScalerToTotals(cat, sv, scalerAcc);
    });
    totalPct += scalerAcc.pct;
    totalBase += scalerAcc.base;
    totalMul *= scalerAcc.mul;

    data.categories.forEach(function(cat, ci) {
      if (!categoryMatchesAllowed(cat.name)) return;
      forEachModInCat(cat, ci, function(m, id) {
        if (!checked[id] || isAffine(m)) return;
        if (m.type === 'base') {
          totalBase += m.v;
        } else if (isMultiplicative(m.label)) {
          totalMul *= (1 + m.v);
        } else {
          totalPct += m.v;
        }
      });
    });

    customs.forEach(function(c) {
      if (c.isBase) totalBase += c.v;
      else if (c.isMul) totalMul *= (1 + c.v);
      else totalPct += c.v;
    });

    return { transformedBase: transformedBase, pct: totalPct, base: totalBase, mul: totalMul };
  }

/* ── RECALC ── */
function recalc() {
  var base = parseFloat($el.find('#mc-base').val()) || 0;
  var data = DATA[currentMod];
  var basePctVal = parseFloat($el.find('#mc-base-pct').val());
  var basePct = isNaN(basePctVal) ? 1 : (basePctVal / 100);

  if (!data) {
    // No modifier loaded, but custom modifiers may still be active
    var cTotalPct = 0, cTotalBase = 0, cTotalMul = 1;
    customs.forEach(function(c) {
      if (c.isBase) cTotalBase += c.v;
      else if (c.isMul) cTotalMul *= (1 + c.v);
      else cTotalPct += c.v;
    });

    var cEffBase = base + cTotalBase;
    var cResult = cEffBase * (basePct + cTotalPct) * cTotalMul;

    var cNames = customs.map(function(c) { return c.label; });

    $el.find('#mc-r-base').text(base.toLocaleString('en-US'));
    $el.find('#mc-r-mods').text(cNames.length ? cNames.join(', ') : 'none');
    $el.find('#mc-r-result').text(cResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

    var cFStr = base.toLocaleString('en-US');
    if (cTotalBase !== 0) cFStr += (cTotalBase >= 0 ? ' + ' : ' - ') + Math.abs(cTotalBase);
    if (cTotalBase !== 0) cFStr = '(' + cFStr + ')';
    var cPctDisplay = (basePct * 100) + '%';
    if (cTotalPct !== 0) cFStr += ' × (' + cPctDisplay + ' + ' + (cTotalPct * 100).toFixed(1) + '%)';
    else cFStr += ' × ' + cPctDisplay;
    if (cTotalMul !== 1) cFStr += ' × ' + cTotalMul;
    cFStr += ' = ' + cResult.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    $el.find('#mc-r-formula').text(cFStr);
    return;
  }

  var totals = getTotals();
  var transformedBase = totals.transformedBase;
  var totalPct = totals.pct, totalBase = totals.base, totalMul = totals.mul;

  var effBase = transformedBase + totalBase;
  var result = effBase * (basePct + totalPct) * totalMul;

  var activeNames = [];
  if (activeAffineId) {
    var parts = activeAffineId.split('_');
    var ci = parseInt(parts[1]);
    var cat = DATA[currentMod].categories[ci];
    if (cat) {
      var lawMod;
      if (parts[2] === 'd') lawMod = cat.mods[parseInt(parts[3])];
      else if (parts[2] === 's') lawMod = cat.subcategories[parseInt(parts[3])].mods[parseInt(parts[4])];
      if (lawMod && isAffine(lawMod)) {
        var effectiveSlope = lawMod.affine.slope * (2 / currentRP);
        var transformedVal = Math.round(((base - 166.6667) * effectiveSlope + 166.6667) * 100) / 100;
        var rp = lawMod.rp || (lawMod.affine.slope * 2);
        activeNames.unshift(lawMod.n + ' (Base ' + transformedVal + ' / ' + Math.round(effectiveSlope * 100) / 100 + 'x RP ' + rp + '%)');
      }
    }
  }

  data.categories.forEach(function(cat, ci) {
    if (cat.type !== 'scaler') return;
    if (!categoryMatchesAllowed(cat.name)) return;
    var val = scalerVals['scaler_' + ci];
    if (val === undefined) return;
    var sv = scalerValue(cat, val);
    activeNames.push(formatScalerActiveName(cat, val, sv));
  });

  data.categories.forEach(function(cat, ci) {
    if (!categoryMatchesAllowed(cat.name)) return;
    forEachModInCat(cat, ci, function(m, id) {
      if (!checked[id] || isAffine(m)) return;
      activeNames.push(m.label || m.n);
    });
  });

  customs.forEach(function(c) { activeNames.push(c.label); });

  $el.find('#mc-r-base').text(base.toLocaleString('en-US'));
  $el.find('#mc-r-mods').text(activeNames.length ? activeNames.join(', ') : 'none');
  $el.find('#mc-r-result').text(result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

  var fStr = base.toLocaleString('en-US');
  if (activeAffineId) {
    fStr += ' → (' + base + ' - 166.67) × ' + Math.round(transformedBase * 100) / 100 + ' + 166.67 = ' + transformedBase.toLocaleString('en-US');
  }
  if (totalBase !== 0) fStr += ' + ' + totalBase;
  if (totalBase !== 0 || activeAffineId) fStr = '(' + fStr + ')';
  var pctDisplay = (basePct * 100) + '%';
  if (totalPct !== 0) fStr += ' × (' + pctDisplay + ' + ' + (totalPct * 100).toFixed(1) + '%)';
  else fStr += ' × ' + pctDisplay;
  if (totalMul !== 1) fStr += ' × ' + totalMul;
  fStr += ' = ' + result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  $el.find('#mc-r-formula').text(fStr);

  if ($el.find('#mc-panel-formula').is(':visible')) calcFormula();
}

  /* ── CUSTOM MODIFIERS ── */
  function renderCustomTags() {
    $el.find('#mc-custom-tags').html(customs.map(function(c, i) {
      return '<span class="mc-custom-tag">' + c.n + ' <b>' + c.label + '</b> <span class="mc-custom-rm" data-i="' + i + '">×</span></span>';
    }).join(''));
    $el.find('.mc-custom-rm').off('click').on('click', function() { customs.splice(parseInt($(this).data('i')), 1); renderCustomTags(); recalc(); });
  }
  $el.find('#mc-add-btn').off('click').on('click', function() {
    var name = $el.find('#mc-c-name').val().trim();
    var val = $el.find('#mc-c-val').val().trim();
    if (!name || !val) return;
    var rawNum = parseFloat(val.replace('%', '').replace('x', ''));
    if (isNaN(rawNum)) return;
    var isBaseMod = isBase(val);
    var isMul = val.toLowerCase().indexOf('x') !== -1;
    var parsed;
    if (isBaseMod) parsed = rawNum;
    else if (isMul) parsed = rawNum - 1;
    else parsed = rawNum / 100;
    customs.push({ n: name, v: parsed, label: val, isBase: isBaseMod, isMul: isMul });
    $el.find('#mc-c-name').val(''); $el.find('#mc-c-val').val('');
    renderCustomTags(); recalc();
  });

  $el.find('#mc-base').on('input', recalc);
  $el.find('#mc-base-pct').on('input', recalc);

  clearModifier();
  updateSelectMeta();
}