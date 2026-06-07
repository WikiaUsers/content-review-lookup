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
	'The Dimensional Doctor': ['wiki-contributor'],
};

//* LockOldComments.js Configuration *//
window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;

/* =============================================
   MODIFIER CALCULATOR
   ============================================= */
mw.hook('wikipage.content').add(function () {
  const $calculators = $('.modifier-calculator');
  const $allCalculators = $('#modifier-calculator').length
    ? $calculators.add('#modifier-calculator')
    : $calculators;

  $allCalculators.each(function () {
    initializeCalculator($(this));
  });
});

function initializeCalculator($el) {
  const pageTitle    = $el.data('title')          || null;
  const pageLink     = $el.data('link')           || null;
  const allowMods    = $el.data('allow-mods')     || null;
  const allowCats    = $el.data('allow-cats')     || null;
  const allowModsArr = allowMods ? allowMods.split(',').map(s => s.trim()) : null;
  const allowCatsArr = allowCats ? allowCats.split(',').map(s => s.trim()) : null;
  const fullCalcLink = $el.data('full-calc-link') || null;
  const pageDomain   = $el.data('domain')         || null;
  const pageKeyword  = $el.data('keyword')        || null;  

  $.get(mw.util.wikiScript('api'), {
    action: 'expandtemplates',
    text: '{{#invoke:ModifierData|getData}}',
    prop: 'wikitext',
    format: 'json'
  }).done(function (response) {
    let DATA;
    try {
      DATA = JSON.parse(response.expandtemplates.wikitext);
    } catch (e) {
      $el.html('<p style="color:red">Error loading modifier data.</p>');
      return;
    }

    if (pageDomain) {
      const allowedDomains = pageDomain.split(',').map(d => d.trim());
      const domainFiltered = {};
      Object.keys(DATA).forEach(k => {
        if (allowedDomains.indexOf(DATA[k].tag) !== -1) {
          domainFiltered[k] = DATA[k];
        }
      });
      DATA = domainFiltered;
    }

    if (allowModsArr) {
      const filtered = {};
      allowModsArr.forEach(k => {
        if (DATA[k]) filtered[k] = DATA[k];
      });
      DATA = filtered;
    }

    if (allowCatsArr) {
      const catFiltered = {};
      Object.keys(DATA).forEach(k => {
        const mod = DATA[k];
        if (
          mod.categories &&
          mod.categories.some(cat => allowCatsArr.indexOf(cat.name) !== -1)
        ) {
          catFiltered[k] = mod;
        }
      });
      DATA = catFiltered;
    }

    if (pageKeyword) {
        const keywords = pageKeyword.split(',').map(k => k.trim().toLowerCase());
        const kwFiltered = {};
        Object.keys(DATA).forEach(k => {
            const label = DATA[k].label.toLowerCase();
            if (keywords.some(kw => label.includes(kw))) {
                kwFiltered[k] = DATA[k];
            }
        });
        DATA = kwFiltered;
    }
    initCalculator($el, DATA, allowCatsArr, allowModsArr, pageTitle, fullCalcLink, pageDomain);
  }).fail(function () {
    $el.html('<p style="color:red">Failed to fetch modifier data.</p>');
  });
}

function initCalculator($el, DATA, allowCatsArr, allowModsArr, pageTitle, fullCalcLink, pageDomain) {
  const dom = {};

  const state = {
    loadedModifiers: [],
    perModState: {},
    activeModIndex: 0,
    multiSelectMode: false,
    customs: [],
    activeDomain: pageDomain || 'all',
    filters: {
      effect: 'all',
      type: 'all',
      range: 'all',
      show: 'all',
      text: '',
      cats: [],
      subcats: []
    }
  };

  const modKeys = Object.keys(DATA);
  const highlightDomain = state.activeDomain.indexOf(',') !== -1 ? 'all' : state.activeDomain;

  const getDefaultBaseValue = (key) => {
    const d = DATA[key];
    return (d && typeof d.baseValue === 'number') ? d.baseValue : 0;
  };

  const computeAvailableFilters = (key) => {
    const result = {
      type: new Set(['all']),
      effect: new Set(['all']),
      range: new Set(['all'])
    };
    if (!key || !DATA[key]) return result;
    const data = DATA[key];

    data.categories.forEach(cat => {
      if (!categoryMatchesAllowed(cat.name)) return;

      // Plain mods
      (cat.mods || []).forEach(m => {
        if (isAffine(m)) result.type.add('affine');
        else if (isBase(m.label)) result.type.add('base');
        else if (isMultiplicative(m.label)) result.type.add('multiplicative');
        else result.type.add('additive');
        if (m.good === true) result.effect.add('good');
        else if (m.good === false) result.effect.add('bad');
      });
      if ((cat.mods || []).length > 0) result.range.add('normal');

      // Scaler categories
      if (cat.type === 'scaler') {
        result.range.add('scaler');
        result.type.add(getScalerEffectType(cat));
        const ig = cat.inputGood !== undefined ? cat.inputGood : 'dynamic';
        result.effect.add(ig === true ? 'good' : ig === false ? 'bad' : 'dynamic');
      }

      // User‑input categories - UPDATED
      if (cat.type === 'user_input') {
        result.range.add('randomized');
        const inputs = cat.user_inputs || (cat.user_input ? [cat.user_input] : []);
        inputs.forEach(input => {
          result.type.add(getScalerEffectType(input));
          const ig = input.inputGood !== undefined ? input.inputGood : (cat.inputGood !== undefined ? cat.inputGood : 'dynamic');
          result.effect.add(ig === true ? 'good' : ig === false ? 'bad' : 'dynamic');
        });
      }

      // Subcategories
      (cat.subcategories || []).forEach(sub => {
        if (sub.type === 'scaler') {
          result.range.add('scaler');
          result.type.add(getScalerEffectType(sub));
          const sig = sub.inputGood !== undefined ? sub.inputGood : 'dynamic';
          result.effect.add(sig === true ? 'good' : sig === false ? 'bad' : 'dynamic');
        } else if (sub.type === 'user_input') {
          result.range.add('randomized');
          const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
          inputs.forEach(input => {
            result.type.add(getScalerEffectType(input));
            const ig = input.inputGood !== undefined ? input.inputGood : (sub.inputGood !== undefined ? sub.inputGood : 'dynamic');
            result.effect.add(ig === true ? 'good' : ig === false ? 'bad' : 'dynamic');
          });
          (sub.mods || []).forEach(m => {
            if (isAffine(m)) result.type.add('affine');
            else if (isBase(m.label)) result.type.add('base');
            else if (isMultiplicative(m.label)) result.type.add('multiplicative');
            else result.type.add('additive');
            if (m.good === true) result.effect.add('good');
            else if (m.good === false) result.effect.add('bad');
          });
          if ((sub.mods || []).length > 0) result.range.add('normal');
        } else if (sub.mods && sub.mods.length > 0) {
          result.range.add('normal');
          (sub.mods || []).forEach(m => {
            if (isAffine(m)) result.type.add('affine');
            else if (isBase(m.label)) result.type.add('base');
            else if (isMultiplicative(m.label)) result.type.add('multiplicative');
            else result.type.add('additive');
            if (m.good === true) result.effect.add('good');
            else if (m.good === false) result.effect.add('bad');
          });
        }
      });
    });
    
    return result;
  };

  // ----- Show/hide type filter buttons based on availability -----
  const updateTypeFilterAvailability = () => {
    const available = computeAvailableFilters(activeKey());

    // Show/hide each type button
    dom.$typeBtns.each(function () {
      const filterVal = $(this).data('filter');
      $(this).toggle(available.type.has(filterVal));
    });

    // If the currently selected type is no longer available, reset to "All"
    if (!available.type.has(state.filters.type)) {
      state.filters.type = 'all';
      dom.$typeBtns.removeClass('mc-filter-active');
      dom.$typeBtns.filter('[data-filter="all"]').addClass('mc-filter-active');
    }

    // Show/hide each effect button
    dom.$effectBtns.each(function () {
      const filterVal = $(this).data('filter');
      $(this).toggle(available.effect.has(filterVal));
    });

    // If the currently selected effect is no longer available, reset to "All"
    if (!available.effect.has(state.filters.effect)) {
      state.filters.effect = 'all';
      dom.$effectBtns.removeClass('mc-filter-active');
      dom.$effectBtns.filter('[data-filter="all"]').addClass('mc-filter-active');
    }

    // Show/hide each range button
    dom.$rangeBtns.each(function () {
      const filterVal = $(this).data('filter');
      $(this).toggle(available.range.has(filterVal));
    });

    // If the currently selected range is no longer available, reset to "All"
    if (!available.range.has(state.filters.range)) {
      state.filters.range = 'all';
      dom.$rangeBtns.removeClass('mc-filter-active');
      dom.$rangeBtns.filter('[data-filter="all"]').addClass('mc-filter-active');
    }
  };

  const categoryMatchesAllowed = (catName) => {
    if (!allowCatsArr) return true;
    return allowCatsArr.indexOf(catName) !== -1;
  };

  const countCatMods = (cat) => {
    let n = (cat.mods || []).length;
    (cat.subcategories || []).forEach(sub => {
      n += (sub.mods || []).length;
    });
    return n;
  };

  const collectSubcategories = (data, parentCats) => {
    const subs = [];
    const limitParents = parentCats && parentCats.length > 0;
    (data.categories || []).forEach(cat => {
      if (!categoryMatchesAllowed(cat.name)) return;
      if (limitParents && parentCats.indexOf(cat.name) === -1) return;
      (cat.subcategories || []).forEach(sub => {
        subs.push({ name: sub.name, parent: cat.name });
      });
    });
    return subs;
  };

  const forEachModInCat = (cat, ci, fn) => {
    if (cat.type === 'scaler') return;
    if (cat.type === 'user_input') return;
    (cat.mods || []).forEach((m, mi) => fn(m, `mc_${ci}_d_${mi}`, null));
    (cat.subcategories || []).forEach((sub, si) => {
      (sub.mods || []).forEach((m, mi) => fn(m, `mc_${ci}_s_${si}_${mi}`, sub.name));
    });
  };

  const isMultiplicative = (label) => /^\d+(\.\d+)?x$/.test((label || '').trim());
  const isBase            = (label) => /^[+-]?\d+(\.\d+)?$/.test((label || '').trim());
  const isAffine          = (mod) => !!(mod && mod.affine && typeof mod.affine.slope === 'number');

  const initModState = (key) => {
    if (!state.perModState[key]) {
      state.perModState[key] = {
        checked: {},
        scalerVals: {},
        userInputVals: {},
        activeAffineId: null,
        currentRP: 2,
        filterCats: [],
        filterSubcats: []
      };
    }
    return state.perModState[key];
  };

  const getModState = (key) => state.perModState[key] || initModState(key);
  const activeKey    = () => state.loadedModifiers[state.activeModIndex] || null;
  const activeState  = () => {
    const k = activeKey();
    return k ? getModState(k) : null;
  };

  const userInputToSv = (cat, rawVal) => {
    const v = parseFloat(rawVal);
    if (isNaN(v)) return 0;
    const t = getScalerEffectType(cat);
    if (t === 'base') return v;
    if (t === 'multiplicative') return v - 1;
    return v / 100;
  };

  const scalerValue = (cat, val) => {
    if (cat.segments) {
      let seg = null;
      for (let i = 0; i < cat.segments.length; i++) {
        const s = cat.segments[i];
        if (val >= s.from && val <= s.to) {
          seg = s;
          break;
        }
      }
      if (!seg) seg = cat.segments[cat.segments.length - 1];
      const range = seg.to - seg.from;
      if (range === 0) return seg.vMin;
      return seg.vMin + (seg.vMax - seg.vMin) * ((val - seg.from) / range);
    }
    const { scaleMin, scaleMax, vMin, vMax } = cat;
    if (scaleMax === scaleMin) return vMin;
    return vMin + (vMax - vMin) * ((val - scaleMin) / (scaleMax - scaleMin));
  };

  const scalerInverse = (cat, targetSv) => {
    if (cat.segments) {
      for (let i = 0; i < cat.segments.length; i++) {
        const seg = cat.segments[i];
        const minV = Math.min(seg.vMin, seg.vMax);
        const maxV = Math.max(seg.vMin, seg.vMax);
        if (targetSv >= minV && targetSv <= maxV) {
          if (seg.vMax === seg.vMin) return seg.from;
          const raw = seg.from + (targetSv - seg.vMin) * (seg.to - seg.from) / (seg.vMax - seg.vMin);
          return clampScalerValue(cat, raw);
        }
      }
      const firstSeg = cat.segments[0];
      const lastSeg = cat.segments[cat.segments.length - 1];
      const minSv = Math.min(firstSeg.vMin, firstSeg.vMax);
      const maxSv = Math.max(lastSeg.vMin, lastSeg.vMax);
      if (targetSv <= minSv) return firstSeg.from;
      else return lastSeg.to;
    } else {
      const { scaleMin, scaleMax, vMin, vMax } = cat;
      if (vMax === vMin) return scaleMin;
      const raw = scaleMin + (targetSv - vMin) * (scaleMax - scaleMin) / (vMax - vMin);
      return clampScalerValue(cat, raw);
    }
  };

  const parseScalerDisplayInput = (str, effectType) => {
    if (!str) return NaN;
    str = str.trim();
    const lower = str.toLowerCase();
    if (lower.endsWith('x')) {
      const m = parseFloat(str.slice(0, -1));
      if (isNaN(m)) return NaN;
      return m - 1;
    }
    if (lower.endsWith('base')) {
      const v = parseFloat(str.slice(0, -4));
      return isNaN(v) ? NaN : v;
    }
    if (lower.endsWith('%')) {
      const p = parseFloat(str.slice(0, -1));
      if (isNaN(p)) return NaN;
      return p / 100;
    }
    return parseFloat(str);
  };

  const scalerDisplay = (cat, val) => {
    const v = scalerValue(cat, val);
    const t = getScalerEffectType(cat);
    if (t === 'multiplicative') {
      const m = Math.round((1 + v) * 100) / 100;
      return `${m}x`;
    }
    const pct = Math.round(v * 1000) / 10;
    const unit = cat.unit !== undefined ? cat.unit : '%';
    return `${v >= 0 ? '+' : ''}${pct}${unit}`;
  };

  const scalerEffectLabel = (cat, sv) => {
    const t = getScalerEffectType(cat);
    if (t === 'base') return `${sv >= 0 ? '+' : ''}${sv} base`;
    if (t === 'multiplicative') {
      const m = Math.round((1 + sv) * 100) / 100;
      return `${m}x`;
    }
    const unit = cat.unit !== undefined ? cat.unit : '%';
    const spct = Math.round(sv * 1000) / 10;
    return `${sv >= 0 ? '+' : ''}${spct}${unit}`;
  };

  const formatScalerActiveName = (cat, val, sv) => {
    const unit = cat.unit !== undefined ? cat.unit : '';
    return `${cat.name}: ${val}${unit} → ${scalerEffectLabel(cat, sv)}`;
  };

  const getScalerEffectType = (cat) => {
    const t = (cat.effectType || 'additive').toLowerCase();
    return (t === 'base' || t === 'multiplicative' || t === 'additive') ? t : 'additive';
  };

  const applyScalerToTotals = (cat, sv, totals) => {
    const t = getScalerEffectType(cat);
    if (t === 'base') totals.base += sv;
    else if (t === 'multiplicative') totals.mul *= (1 + sv);
    else totals.pct += sv;
  };

  const scalerMatchesTypeFilter = (cat) => {
    if (state.filters.type === 'all') return true;
    return getScalerEffectType(cat) === state.filters.type;
  };

  const scalerBoundClass = (cat, which) => {
    const ig = cat.inputGood !== undefined ? cat.inputGood : 'dynamic';
    if (ig === false) return which === 'min' ? 'mc-neu' : 'mc-neg';
    if (ig === true) return which === 'max' ? 'mc-pos' : 'mc-neu';
    return which === 'min' ? 'mc-neg' : 'mc-pos';
  };

  const scalerEffectClass = (sv) => sv > 0 ? 'mc-pos' : sv < 0 ? 'mc-neg' : 'mc-neu';

  const scalerDecimalPlaces = (cat) => {
    const stepStr = String(cat.step != null ? cat.step : 0.01);
    return stepStr.indexOf('.') >= 0 ? stepStr.split('.')[1].length : 0;
  };
  const formatScalerInputValue = (cat, val) => {
    const places = scalerDecimalPlaces(cat);
    return places > 0 ? parseFloat(Number(val).toFixed(places)) : val;
  };
  const clampScalerValue = (cat, val) => {
    val = parseFloat(val);
    if (isNaN(val)) val = cat.scaleMin;
    val = formatScalerInputValue(cat, val);
    return Math.min(cat.scaleMax, Math.max(cat.scaleMin, val));
  };

  const setScalerValue = (ci, val, active) => {
    const key = activeKey();
    if (!key) return;
    const data = DATA[key];
    if (!data || !data.categories[ci] || data.categories[ci].type !== 'scaler') return;
    const cat = data.categories[ci];
    if (!categoryMatchesAllowed(cat.name)) return;
    const st = getModState(key);
    val = clampScalerValue(cat, val);
    if (active === false) {
      delete st.scalerVals[ci];
    } else {
      st.scalerVals[ci] = val;
    }
    dom.$sections.find(`#mc-scaler-${ci}`).val(val);
    const $num = dom.$sections.find(`#mc-scaler-val-${ci}`);
    if ($num[0] !== document.activeElement) $num.val(formatScalerInputValue(cat, val));
    const sv = scalerValue(cat, val);
    dom.$sections.find(`#mc-scaler-display-${ci}`).val(active === false ? '—' : scalerDisplay(cat, val));
    applyScalerColors(ci, val, sv, active === false);
    renderSelectedList();
    recalc();
  };

  const commitScalerNum = (ci) => {
    const key = activeKey();
    if (!key) return;
    const data = DATA[key];
    if (!data || !data.categories[ci] || data.categories[ci].type !== 'scaler') return;
    const cat = data.categories[ci];
    if (!categoryMatchesAllowed(cat.name)) return;
    const raw = (dom.$sections.find(`#mc-scaler-val-${ci}`).val() || '').trim();
    if (raw === '' || raw === '-' || raw === '.' || raw === '-.') {
      setScalerValue(ci, cat.scaleMin, false);
      return;
    }
    setScalerValue(ci, parseFloat(raw), true);
  };

  const applyScalerColors = (ci, val, sv, inactive) => {
    const key = activeKey();
    if (!key) return;
    const inputCls = inactive ? 'mc-neu' : scalerEffectClass(sv);
    const effectCls = inactive ? 'mc-neu' : scalerEffectClass(sv);
    dom.$sections.find(`#mc-scaler-val-${ci}`).removeClass('mc-pos mc-neg mc-neu').addClass(inputCls);
    dom.$sections.find(`#mc-scaler-display-${ci}`).removeClass('mc-pos mc-neg mc-neu').addClass(effectCls);
    dom.$sections.find(`#mc-scaler-unit-${ci}`).removeClass('mc-pos mc-neg mc-neu').addClass(inactive ? 'mc-neu' : inputCls);
  };

  const setScalerSubValue = (ci, si, val, active) => {
    const key = activeKey();
    if (!key) return;
    const data = DATA[key];
    if (!data || !data.categories[ci]) return;
    let cat;
    if (si !== undefined) {
      cat = (data.categories[ci].subcategories || [])[parseInt(si)];
    } else {
      cat = data.categories[ci];
    }
    if (!cat || cat.type !== 'scaler') return;
    if (!categoryMatchesAllowed(cat.name)) return;
    const st = getModState(key);
    val = clampScalerValue(cat, val);
    const storeKey = si !== undefined ? `${ci}_${si}` : `${ci}`;
    if (active === false) {
      delete st.scalerVals[storeKey];
    } else {
      st.scalerVals[storeKey] = val;
    }
    const idSuffix = si !== undefined ? `${ci}_${si}` : `${ci}`;
    dom.$sections.find(`#mc-scaler-${idSuffix}`).val(val);
    const $num = dom.$sections.find(`#mc-scaler-val-${idSuffix}`);
    if ($num[0] !== document.activeElement) $num.val(formatScalerInputValue(cat, val));
    const sv = scalerValue(cat, val);
    dom.$sections.find(`#mc-scaler-display-${idSuffix}`).val(active === false ? '—' : scalerDisplay(cat, val));
    applyScalerColorsSub(ci, si, val, sv, active === false);
    renderSelectedList();
    recalc();
  };

  const commitScalerSubNum = (ci, si) => {
    const key = activeKey();
    if (!key) return;
    const data = DATA[key];
    if (!data || !data.categories[ci]) return;
    let cat;
    if (si !== undefined) {
      cat = (data.categories[ci].subcategories || [])[parseInt(si)];
    } else {
      cat = data.categories[ci];
    }
    if (!cat || cat.type !== 'scaler') return;
    if (!categoryMatchesAllowed(cat.name)) return;
    const idSuffix = si !== undefined ? `${ci}_${si}` : `${ci}`;
    const raw = (dom.$sections.find(`#mc-scaler-val-${idSuffix}`).val() || '').trim();
    if (raw === '' || raw === '-' || raw === '.' || raw === '-.') {
      setScalerSubValue(ci, si, cat.scaleMin, false);
      return;
    }
    setScalerSubValue(ci, si, parseFloat(raw), true);
  };

  const applyScalerColorsSub = (ci, si, val, sv, inactive) => {
    const key = activeKey();
    if (!key) return;
    const inputCls = inactive ? 'mc-neu' : scalerEffectClass(sv);
    const effectCls = inactive ? 'mc-neu' : scalerEffectClass(sv);
    const idSuffix = si !== undefined ? `${ci}_${si}` : `${ci}`;
    dom.$sections.find(`#mc-scaler-val-${idSuffix}`).removeClass('mc-pos mc-neg mc-neu').addClass(inputCls);
    dom.$sections.find(`#mc-scaler-display-${idSuffix}`).removeClass('mc-pos mc-neg mc-neu').addClass(effectCls);
    dom.$sections.find(`#mc-scaler-unit-${idSuffix}`).removeClass('mc-pos mc-neg mc-neu').addClass(inactive ? 'mc-neu' : inputCls);
  };

  const handleDisplayInputBlurSub = (input, ci, si) => {
    const $input = $(input);
    const key = activeKey();
    if (!key) return;
    const data = DATA[key];
    if (!data || !data.categories[ci]) return;
    let cat;
    if (si !== undefined) {
      cat = (data.categories[ci].subcategories || [])[parseInt(si)];
    } else {
      cat = data.categories[ci];
    }
    if (!cat || cat.type !== 'scaler') return;

    const rawStr = $input.val().trim();
    if (!rawStr) {
      const storeKey = si !== undefined ? `${ci}_${si}` : `${ci}`;
      const curVal = getModState(key).scalerVals[storeKey];
      const dispVal = curVal !== undefined ? curVal : (cat.scaleMin || 0);
      $input.val(scalerDisplay(cat, dispVal));
      return;
    }

    const parsedSv = parseScalerDisplayInput(rawStr, getScalerEffectType(cat));
    if (isNaN(parsedSv)) {
      const storeKey = si !== undefined ? `${ci}_${si}` : `${ci}`;
      const curVal = getModState(key).scalerVals[storeKey];
      const dispVal = curVal !== undefined ? curVal : (cat.scaleMin || 0);
      $input.val(scalerDisplay(cat, dispVal));
      return;
    }

    const raw = scalerInverse(cat, parsedSv);
    setScalerSubValue(ci, si, raw, true);
  };

  const getVisibleModIds = () => {
    const ids = [];
    dom.$sections.find('.mc-mod-item:visible').each(function () {
      const id = $(this).find('input[type=checkbox]').attr('id');
      if (id) ids.push(id);
    });
    return ids;
  };
  const getVisibleModIdsInCategory = (ci) => {
    const ids = [];
    dom.$sections.find(`#mc-cat-check-${ci}`).closest('.mc-section')
      .find('.mc-mod-item:visible').each(function () {
        const id = $(this).find('input[type=checkbox]').attr('id');
        if (id) ids.push(id);
      });
    return ids;
  };
  const getVisibleModIdsInSubcategory = (ci, si) => {
    const ids = [];
    dom.$sections.find(`#mc-subcat-check-${ci}_${si}`).closest('.mc-subsection')
      .find('.mc-mod-item:visible').each(function () {
        const id = $(this).find('input[type=checkbox]').attr('id');
        if (id) ids.push(id);
      });
    return ids;
  };

  const switchMainTab = (tab) => {
    dom.$tabs.removeClass('mc-tab-active');
    dom.$tabs.filter(`[data-tab="${tab}"]`).addClass('mc-tab-active');
    dom.$panelToggle.toggle(tab === 'toggle');
    dom.$panelCustom.toggle(tab === 'custom');
    dom.$panelFormula.toggle(tab === 'formula');
    if (tab === 'formula') renderFormulaPanel();
  };

  const renderFormulaPanel = () => {
    const key = activeKey();
    const data = key ? DATA[key] : null;
    if (!data || !data.formula) return;
    const f = data.formula;
    dom.$formulaInputs.empty();
    (f.inputs || []).forEach(inp => {
      const $row = $('<div class="mc-row">');
      $('<span class="mc-label">').text(inp.label).appendTo($row);
      $(`<input class="mc-base-input" type="number" id="mc-finp-${mw.html.escape(inp.id)}">`)
        .val(inp.default || 0)
        .on('input', calcFormula)
        .appendTo($row);
      $row.appendTo(dom.$formulaInputs);
    });
    calcFormula();
  };

  const calcFormula = () => {
    const key = activeKey();
    const data = key ? DATA[key] : null;
    if (!data || !data.formula) return;
    const f = data.formula;
    const base = parseFloat(dom.$base.val()) || 0;
    const basePctVal = parseFloat(dom.$basePct.val());
    const basePct = isNaN(basePctVal) ? 1 : (basePctVal / 100);
    const totals = getTotals();
    const ctx = {
      base,
      basePct,
      sumPct: totals.pct,
      sumBase: totals.base,
      sumMul: totals.mul,
      modifiers: totals.pct,
      transformedBase: totals.transformedBase
    };
    (f.inputs || []).forEach(inp => {
      ctx[inp.id] = parseFloat($(`#mc-finp-${inp.id}`).val()) || 0;
    });
    let result = NaN;
    dom.$formulaResult.text(isNaN(result) ? 'Error' : formatNumber(result));
    dom.$formulaExpr.text(`${f.label}: ${f.expression}`);
  };

  const switchModTab = (idx) => {
    state.activeModIndex = idx;
    renderLoadedChips();
    const key = activeKey();
    const d = key ? DATA[key] : null;
    if (d && d.formula) {
      dom.$formulaTab.show();
    } else {
      dom.$formulaTab.hide();
      if (dom.$panelFormula.is(':visible')) switchMainTab('toggle');
    }
    dom.$rpSelector.toggle(key === 'manpowerincrease');
    if (key) {
      const rp = getModState(key).currentRP;
      dom.$rpBtns.removeClass('mc-filter-active');
      dom.$rpBtns.filter(`[data-rp="${rp}"]`).addClass('mc-filter-active');
    }
    renderCategoryFilter();
    renderSubcategoryFilter();
    renderSections();
    renderSelectedList();
    recalc();
  };

  const renderLoadedChips = () => {
    dom.$loadedChips.empty();
    if (!state.loadedModifiers.length) {
      dom.$loadedChips.hide();
      return;
    }
    dom.$loadedChips.show();

    state.loadedModifiers.forEach((key, idx) => {
      const d = DATA[key];
      const isActive = idx === state.activeModIndex;
      const $chip = $('<span>')
        .addClass('mc-selected-tag' + (isActive ? ' mc-pos' : ''))
        .css({ cursor: 'pointer', fontSize: '12px' })
        .html(
          `<span class="mc-chip-label">${mw.html.escape(d.label)}</span>` +
          ` <span class="mc-selected-rm mc-chip-rm" data-idx="${idx}" title="Remove">×</span>`
        )
        .on('click', function (e) {
          if ($(e.target).hasClass('mc-chip-rm')) return;
          switchModTab(idx);
        });
      dom.$loadedChips.append($chip);
    });

    $('<button type="button" class="mc-browse-btn" style="margin-left:8px; border-color:#f44336; color:#f44336;">Clear all</button>')
      .on('click', () => {
        state.loadedModifiers = [];
        state.perModState = {};
        state.activeModIndex = 0;
        fullClearUI();
      })
      .appendTo(dom.$loadedChips);
  };

  $el.on('click', '.mc-chip-rm', function (e) {
    e.stopPropagation();
    const idx = parseInt($(this).data('idx'));
    removeModifier(idx);
  });

  const loadModifier = (key) => {
    if (!DATA[key]) return;
    if (!state.multiSelectMode) {
      if (state.loadedModifiers.length > 0) {
        if (state.loadedModifiers[0] === key && state.loadedModifiers.length === 1) {
          return;
        }
        state.loadedModifiers = [];
        state.perModState = {};
        state.activeModIndex = 0;
      }
    } else {
      const pos = state.loadedModifiers.indexOf(key);
      if (pos !== -1) {
        removeModifier(pos);
        return;
      }
    }
    initModState(key);
    state.loadedModifiers.push(key);
    state.activeModIndex = state.loadedModifiers.length - 1;
    const st = getModState(key);
    st.checked = {};
    st.scalerVals = {};
    st.userInputVals = {};
    st.activeAffineId = null;
    st.currentRP = 2;
    st.filterCats = [];
    st.filterSubcats = [];
    setModSearchLabel(key);
    renderLoadedChips();
    renderCategoryFilter();
    renderSubcategoryFilter();
    renderSections();
    if (key === 'manpowerincrease') dom.$rpSelector.show();
    else if (!state.loadedModifiers.some(k => k === 'manpowerincrease')) dom.$rpSelector.hide();
    dom.$rpBtns.removeClass('mc-filter-active');
    dom.$rpBtns.filter('[data-rp="2"]').addClass('mc-filter-active');
    recalc();
  };

  const removeModifier = (idx) => {
    const key = state.loadedModifiers[idx];
    state.loadedModifiers.splice(idx, 1);
    delete state.perModState[key];
    if (!state.loadedModifiers.length) {
      state.activeModIndex = 0;
      fullClearUI();
      return;
    }
    state.activeModIndex = Math.min(state.activeModIndex, state.loadedModifiers.length - 1);
    if (!state.loadedModifiers.some(k => k === 'manpowerincrease')) dom.$rpSelector.hide();
    renderLoadedChips();
    renderCategoryFilter();
    renderSubcategoryFilter();
    renderSections();
    recalc();
  };

  const fullClearUI = () => {
    state.loadedModifiers = [];
    state.perModState = {};
    state.activeModIndex = 0;
    dom.$modSearch.val('');
    dom.$modSearch.parent().find('.mod-tooltip-icon').remove();
    dom.$filterCats.empty();
    dom.$filterSubcats.empty();
    dom.$sections.empty();
    dom.$selectedList.hide().empty();
    dom.$formulaTab.hide();
    dom.$rpSelector.hide();
    dom.$loadedChips.hide().empty();
    if (dom.$panelFormula.is(':visible')) switchMainTab('toggle');
    dom.$base.val(0);
    recalc();
  };

  const setModSearchLabel = (key) => {
    const d = DATA[key];
    dom.$modSearch.parent().find('.mod-tooltip-icon').remove();
    dom.$modSearch.val(d.label);
    if (d.tooltip) {
      const $icon = $('<span class="info-icon mod-tooltip-icon" style="margin-left:8px;">ⓘ</span>')
        .attr('title', d.tooltip);
      dom.$modSearch.after($icon);
    }
    if (d.formula) dom.$formulaTab.show();
    else {
      dom.$formulaTab.hide();
      if (dom.$panelFormula.is(':visible')) switchMainTab('toggle');
    }
  };

  const handleDomainClick = function () {
    dom.$domainBtns.removeClass('mc-filter-active');
    $(this).addClass('mc-filter-active');
    state.activeDomain = $(this).data('domain');
    const q = dom.$modSearch.val().trim();
    if (q) dom.$modSearch.trigger('input');
    if (dom.$browsePanel.is(':visible')) populateBrowsePanel();
  };

  const handleModSearch = function () {
    const q = $(this).val().toLowerCase().trim();
    dom.$modSuggestions.empty().hide();
    if (!q) {
      if (!state.loadedModifiers.length) fullClearUI();
      return;
    }
    const allowedDomains = state.activeDomain === 'all'
      ? null
      : state.activeDomain.split(',').map(d => d.trim());
    let hits = modKeys.filter(k => {
      return DATA[k].label.toLowerCase().includes(q) &&
        (!allowedDomains || allowedDomains.indexOf(DATA[k].tag) !== -1);
    });

    hits = hits.filter(k => !state.loadedModifiers.includes(k));

    if (!hits.length) return;
    hits.sort((a, b) => {
      const aL = DATA[a].label.toLowerCase();
      const bL = DATA[b].label.toLowerCase();
      if (aL.startsWith(q) !== bL.startsWith(q)) return aL.startsWith(q) ? -1 : 1;
      const aW = aL.split(/\s+/).some(w => w.startsWith(q));
      const bW = bL.split(/\s+/).some(w => w.startsWith(q));
      if (aW !== bW) return aW ? -1 : 1;
      return aL.localeCompare(bL);
    });
    hits = hits.slice(0, 25);
    hits.forEach(k => {
      const $row = $('<div>').addClass('mc-suggestion-row');
      if (state.multiSelectMode) {
        const isLoaded = state.loadedModifiers.indexOf(k) !== -1;
        $('<input type="checkbox">')
          .css({ width: '14px', height: '14px', cursor: 'pointer', flexShrink: 0 })
          .prop('checked', isLoaded)
          .on('change', function (e) {
            e.stopPropagation();
            loadModifier(k);
            $(this).prop('checked', state.loadedModifiers.indexOf(k) !== -1);
          })
          .appendTo($row);
      }
      $('<span>').text(DATA[k].label).appendTo($row);
      if (DATA[k].tag) {
        $row.append(' ');
        $(`<span class="mc-mod-tag mc-tag-${mw.html.escape(DATA[k].tag)}">`).text(DATA[k].tag).appendTo($row);
      }
      if (!state.multiSelectMode) {
        $row.on('click', () => {
          dom.$modSuggestions.hide().empty();
          loadModifier(k);
        });
      } else {
        $row.on('click', function (e) {
          if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') return;
          loadModifier(k);
          $(this).find('input[type=checkbox]').prop('checked', state.loadedModifiers.indexOf(k) !== -1);
        });
      }
      $row.appendTo(dom.$modSuggestions);
    });
    dom.$modSuggestions.show();
  };

  $(document).on('click', function (e) {
    if (!$(e.target).closest('#mc-mod-search, #mc-mod-suggestions').length) {
      dom.$modSuggestions.hide();
    }
  });

  const populateBrowsePanel = () => {
    dom.$browsePanel.empty();
    const allowedDomains = state.activeDomain === 'all'
      ? null
      : state.activeDomain.split(',').map(d => d.trim());
    const groups = {};
    let totalCount = 0;
    modKeys.forEach(k => {
      const tag = DATA[k].tag || 'other';
      if (allowedDomains && allowedDomains.indexOf(tag) === -1) return;
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push({ key: k, label: DATA[k].label });
      totalCount++;
    });
    $('<div class="mc-browse-total">')
      .text(`${totalCount} modifier${totalCount !== 1 ? 's' : ''} available`)
      .appendTo(dom.$browsePanel);
    const domainOrder = ['government', 'diplomacy', 'economy', 'technology', 'military'];
    domainOrder.forEach(tag => {
      if (!groups[tag] || !groups[tag].length) return;
      groups[tag].sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
      const $group = $(`<div class="mc-browse-group" data-domain="${tag}">`);
      $(`<div class="mc-browse-group-title">${mw.html.escape(tag.charAt(0).toUpperCase() + tag.slice(1))} <span class="mc-browse-count">(${groups[tag].length})</span></div>`).appendTo($group);
      const $grid = $('<div class="mc-browse-group-items">');
      groups[tag].forEach(item => {
        const isLoaded = state.loadedModifiers.indexOf(item.key) !== -1;
        const $item = $('<div class="mc-browse-item">')
          .css({ position: 'relative' })
          .text(item.label)
          .data('key', item.key);
        if (state.multiSelectMode && isLoaded) $item.css({ color: '#4caf50', fontWeight: 'bold' });
        $grid.append($item);
      });
      $grid.appendTo($group);
      $group.appendTo(dom.$browsePanel);
    });
    if (!dom.$browsePanel.children().length) {
      dom.$browsePanel.html('<div style="padding:10px;color:#888;">No modifiers match the current filter.</div>');
    }
  };

  $el.on('click', '#mc-browse-btn', function (e) {
    e.stopPropagation();
    if (dom.$browsePanel.is(':visible')) {
      dom.$browsePanel.hide();
      return;
    }
    populateBrowsePanel();
    dom.$browsePanel.show();
  });

  $el.on('click', '.mc-browse-item', function () {
    const key = $(this).data('key');
    dom.$browsePanel.hide();
    loadModifier(key);
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('#mc-browse-btn, #mc-browse-panel').length) {
      dom.$browsePanel.hide();
    }
  });

  const renderCategoryFilter = () => {
    dom.$filterCats.empty();
    const key = activeKey();
    if (!key || !DATA[key]) return;
    $('<button class="mc-filter-btn mc-filter-active" data-cat="all">All</button>').appendTo(dom.$filterCats);
    (DATA[key].categories || []).forEach(cat => {
      if (!categoryMatchesAllowed(cat.name)) return;
      $(`<button class="mc-filter-btn" data-cat="${mw.html.escape(cat.name)}">${mw.html.escape(cat.name)}</button>`).appendTo(dom.$filterCats);
    });
  };

  const renderSubcategoryFilter = () => {
    dom.$filterSubcats.empty();
    const key = activeKey();
    if (!key || !DATA[key]) return;
    const data = DATA[key];
    const st = getModState(key);
    const parentCats = st.filterCats.length ? st.filterCats : null;
    const visibleSubs = collectSubcategories(data, parentCats);
    $('<button class="mc-filter-btn mc-filter-active" data-subcat="all">All</button>').appendTo(dom.$filterSubcats);
    visibleSubs.forEach(sub => {
      $(`<button class="mc-filter-btn" data-subcat="${mw.html.escape(sub.name)}">${mw.html.escape(sub.name)}</button>`).appendTo(dom.$filterSubcats);
    });
    if (st.filterSubcats.length) {
      const visibleNames = visibleSubs.map(s => s.name);
      st.filterSubcats = st.filterSubcats.filter(s => visibleNames.indexOf(s) !== -1);
      if (st.filterSubcats.length) {
        dom.$filterSubcats.find('.mc-filter-btn[data-subcat="all"]').removeClass('mc-filter-active');
        st.filterSubcats.forEach(s => {
          dom.$filterSubcats.find(`.mc-filter-btn[data-subcat="${s}"]`).addClass('mc-filter-active');
        });
      } else {
        dom.$filterSubcats.find('.mc-filter-btn[data-subcat="all"]').addClass('mc-filter-active');
      }
    }
  };

  $(document).on('click', '#mc-filter-cats .mc-filter-btn', function () {
    const key = activeKey();
    if (!key) return;
    const st = getModState(key);
    const cat = $(this).data('cat');
    if (cat === 'all') {
      st.filterCats = [];
      dom.$filterCats.find('.mc-filter-btn').removeClass('mc-filter-active');
      dom.$filterCats.find('.mc-filter-btn[data-cat="all"]').addClass('mc-filter-active');
    } else {
      dom.$filterCats.find('.mc-filter-btn[data-cat="all"]').removeClass('mc-filter-active');
      $(this).toggleClass('mc-filter-active');
      st.filterCats = [];
      dom.$filterCats.find('.mc-filter-btn.mc-filter-active').each(function () {
        st.filterCats.push($(this).data('cat'));
      });
      if (!st.filterCats.length) {
        dom.$filterCats.find('.mc-filter-btn[data-cat="all"]').addClass('mc-filter-active');
      }
    }
    st.filterSubcats = [];
    renderSubcategoryFilter();
    applyFilters();
  });

  $(document).on('click', '#mc-filter-subcats .mc-filter-btn', function () {
    const key = activeKey();
    if (!key) return;
    const st = getModState(key);
    const subcat = $(this).data('subcat');
    if (subcat === 'all') {
      st.filterSubcats = [];
      dom.$filterSubcats.find('.mc-filter-btn').removeClass('mc-filter-active');
      dom.$filterSubcats.find('.mc-filter-btn[data-subcat="all"]').addClass('mc-filter-active');
    } else {
      dom.$filterSubcats.find('.mc-filter-btn[data-subcat="all"]').removeClass('mc-filter-active');
      $(this).toggleClass('mc-filter-active');
      st.filterSubcats = [];
      dom.$filterSubcats.find('.mc-filter-btn.mc-filter-active').each(function () {
        st.filterSubcats.push($(this).data('subcat'));
      });
      if (!st.filterSubcats.length) {
        dom.$filterSubcats.find('.mc-filter-btn[data-subcat="all"]').addClass('mc-filter-active');
      }
    }
    applyFilters();
  });

  const bindFilterGroup = (groupSelector, filterKey) => {
    $el.find(groupSelector).on('click', '.mc-filter-btn', function () {
      $el.find(`${groupSelector} .mc-filter-btn`).removeClass('mc-filter-active');
      $(this).addClass('mc-filter-active');
      state.filters[filterKey] = $(this).data('filter');
      applyFilters();
    });
  };

  const handleSelectAll = function () {
    const val = this.checked;
    const key = activeKey();
    if (!key) return;
    const st = getModState(key);
    getVisibleModIds().forEach(id => {
      st.checked[id] = val;
      $(`#${id}`).prop('checked', val);
    });
    const data = DATA[key];
    data.categories.forEach((cat, ci) => {
      if (cat.type === 'scaler') return;
      if (cat.type === 'user_input') return;
      if (!categoryMatchesAllowed(cat.name)) return;
      updateCatCheckbox(ci);
      (cat.subcategories || []).forEach((sub, si) => updateSubcatCheckbox(ci, si));
    });
    updateGlobalCheckbox();
    applyFilters();
    recalc();
  };

  const getAllModIds = () => {
    const key = activeKey();
    if (!key) return [];
    const data = DATA[key];
    const ids = [];
    data.categories.forEach((cat, ci) => {
      if (!categoryMatchesAllowed(cat.name)) return;
      forEachModInCat(cat, ci, (m, id) => ids.push(id));
    });
    return ids;
  };

  const getCatModIds = (ci) => {
    const key = activeKey();
    if (!key) return [];
    const data = DATA[key];
    const ids = [];
    if (!data || !data.categories[ci]) return ids;
    const cat = data.categories[ci];
    if (!categoryMatchesAllowed(cat.name)) return ids;
    forEachModInCat(cat, ci, (m, id) => ids.push(id));
    return ids;
  };

  const getSubcatModIds = (ci, si) => {
    const key = activeKey();
    if (!key) return [];
    const data = DATA[key];
    const ids = [];
    if (!data || !data.categories[ci]) return ids;
    const sub = (data.categories[ci].subcategories || [])[si];
    if (!sub) return ids;
    (sub.mods || []).forEach((m, mi) => ids.push(`mc_${ci}_s_${si}_${mi}`));
    return ids;
  };

  const updateGlobalCheckbox = () => {
    const visIds = getVisibleModIds();
    const st = activeState();
    dom.$selectAllCheckbox.prop('checked', visIds.length > 0 && visIds.every(id => st && !!st.checked[id]));
  };

  const updateCatCheckbox = (ci) => {
    const ids = getVisibleModIdsInCategory(ci);
    const st = activeState();
    dom.$sections.find(`#mc-cat-check-${ci}`).prop('checked', ids.length > 0 && ids.every(id => st && !!st.checked[id]));
  };

  const updateSubcatCheckbox = (ci, si) => {
    const ids = getVisibleModIdsInSubcategory(ci, si);
    const st = activeState();
    dom.$sections.find(`#mc-subcat-check-${ci}_${si}`).prop('checked', ids.length > 0 && ids.every(id => st && !!st.checked[id]));
  };

  const updateSelectMeta = () => {
    let catN = 0, subN = 0, modN = 0;
    dom.$sections.find('.mc-section:visible').each(function () {
      if ($(this).data('scaler') || $(this).data('type') === 'user_input') {
        catN++;
        modN++;
        return;
      }
      catN++;
      subN += $(this).find('.mc-subsection:visible').length;
      modN += $(this).find('.mc-mod-item:visible').length;
    });
    dom.$metaCats.text(`${catN} categor${catN === 1 ? 'y' : 'ies'}`);
    dom.$metaSubs.text(`${subN} subcategor${subN === 1 ? 'y' : 'ies'}`);
    dom.$metaMods.text(`${modN} modifier${modN === 1 ? '' : 's'}`);
  };

  const clearCategory = (ci) => {
    const key = activeKey();
    if (!key) return;
    const data = DATA[key];
    if (!data || !data.categories[ci]) return;
    const cat = data.categories[ci];
    if (!categoryMatchesAllowed(cat.name)) return;
    const st = getModState(key);
    
    if (cat.type === 'scaler') {
      setScalerValue(ci, cat.scaleMin, false);
      applyFilters();
      recalc();
      return;
    }
    
   if (cat.type === 'user_input') {
      const inputs = cat.user_inputs || (cat.user_input ? [cat.user_input] : []);
      inputs.forEach((input, idx) => {
        const storeKey = inputs.length > 1 ? `${ci}_${idx}` : `${ci}`;
        delete st.userInputVals[storeKey];
        const $input = dom.$sections.find(`#mc-user-input-${storeKey}`);
        if ($input.length) {
          $input.val('');
          $input.removeClass('mc-pos mc-neg mc-neu').addClass('mc-neu');
        }
        const $unit = dom.$sections.find(`#mc-user-input-unit-${storeKey}`);
        if ($unit.length) {
          $unit.removeClass('mc-pos mc-neg mc-neu').addClass('mc-neu');
        }
      });
      (cat.subcategories || []).forEach((sub, si) => {
        if (sub.type !== 'user_input') return;
        const subInputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
        subInputs.forEach((input, idx) => {
          const storeKey = subInputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
          delete st.userInputVals[storeKey];
          const $input = dom.$sections.find(`#mc-user-input-${storeKey}`);
          if ($input.length) {
            $input.val('');
            $input.removeClass('mc-pos mc-neg mc-neu').addClass('mc-neu');
          }
        });
      });
      renderSelectedList();
      recalc();
      return;
    }
    
    (cat.subcategories || []).forEach((sub, si) => {
      if (sub.type === 'scaler') {
        const storeKey = `${ci}_${si}`;
        delete st.scalerVals[storeKey];
        setScalerSubValue(ci, si, sub.scaleMin || 0, false);
      } else if (sub.type === 'user_input') {
        const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
        inputs.forEach((input, idx) => {
          const storeKey = inputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
          delete st.userInputVals[storeKey];
          const $input = dom.$sections.find(`#mc-user-input-${storeKey}`);
          if ($input.length) {
            $input.val('');
            $input.removeClass('mc-pos mc-neg mc-neu').addClass('mc-neu');
          }
        });
      }
    });
    
    getCatModIds(ci).forEach(id => {
      st.checked[id] = false;
      $(`#${id}`).prop('checked', false);
    });
    updateCatCheckbox(ci);
    (cat.subcategories || []).forEach((sub, si) => updateSubcatCheckbox(ci, si));
    updateGlobalCheckbox();
    renderSelectedList();
    applyFilters();
    recalc();
  };

  const clearSubcategory = (ci, si) => {
    const key = activeKey();
    if (!key) return;
    const data = DATA[key];
    if (!data || !data.categories[ci]) return;
    const sub = (data.categories[ci].subcategories || [])[si];
    if (!sub) return;
    const st = getModState(key);
    
    if (sub.type === 'scaler') {
      const storeKey = `${ci}_${si}`;
      delete st.scalerVals[storeKey];
      setScalerSubValue(ci, si, sub.scaleMin || 0, false);
    } else if (sub.type === 'user_input') {
      const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
      inputs.forEach((input, idx) => {
        const storeKey = inputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
        delete st.userInputVals[storeKey];
        const $input = dom.$sections.find(`#mc-user-input-${storeKey}`);
        if ($input.length) {
          $input.val('');
          $input.removeClass('mc-pos mc-neg mc-neu').addClass('mc-neu');
        }
      });
    } else {
      getSubcatModIds(ci, si).forEach(id => {
        st.checked[id] = false;
        $(`#${id}`).prop('checked', false);
      });
    }
    updateSubcatCheckbox(ci, si);
    updateCatCheckbox(ci);
    updateGlobalCheckbox();
    renderSelectedList();
    applyFilters();
    recalc();
  };

  const buildSelectedTagHtml = (label, value, cls, rmHtml) => {
    return `<span class="mc-selected-tag ${mw.html.escape(cls)}">${mw.html.escape(label)} <b>${mw.html.escape(value)}</b> ${rmHtml}</span>`;
  };

  const renderSelectedList = () => {
    const key = activeKey();
    const data = key ? DATA[key] : null;
    if (!data) {
      dom.$selectedList.hide().empty();
      return;
    }
    const st = getModState(key);
    let total = 0;
    const groupsHtml = [];
    const curBase = parseFloat(dom.$base.val()) || 0;

    data.categories.forEach((cat, ci) => {
      if (!categoryMatchesAllowed(cat.name)) return;
      const groupParts = [];
      let groupCount = 0;

      if (cat.type === 'scaler') {
        const sval = st.scalerVals[ci];
        if (sval !== undefined) {
          const sv = scalerValue(cat, sval);
          groupCount++;
          groupParts.push(
            `<div class="mc-selected-tags">` +
            buildSelectedTagHtml(
              `${cat.name}:`,
              `${sval}${cat.unit !== undefined ? cat.unit : ''} → ${scalerEffectLabel(cat, sv)}`,
              scalerEffectClass(sv),
              `<span class="mc-selected-rm-scaler" data-ci="${ci}">×</span>`
            ) +
            `</div>`
          );
        }
      } else if (cat.type === 'user_input') {
        const inputs = cat.user_inputs || (cat.user_input ? [cat.user_input] : []);
        const tags = [];
        inputs.forEach((input, idx) => {
          const storeKey = inputs.length > 1 ? `${ci}_${idx}` : `${ci}`;
          const val = st.userInputVals[storeKey];
          if (val !== undefined) {
            const sv = userInputToSv(input, val);
            groupCount++;
            const label = input.label || 'Value';
            tags.push(
              buildSelectedTagHtml(
                `${label}:`,
                scalerEffectLabel(input, sv),
                scalerEffectClass(sv),
                `<span class="mc-selected-rm-scaler" data-storekey="${mw.html.escape(storeKey)}">×</span>`
              )
            );
          }
        });
        if (tags.length) {
          groupParts.push(`<div class="mc-selected-tags">${tags.join('')}</div>`);
        }
        (cat.subcategories || []).forEach((sub, si) => {
          if (sub.type !== 'user_input') return;
          const subInputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
          const subTags = [];
          subInputs.forEach((input, idx) => {
            const storeKey = subInputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
            const val = st.userInputVals[storeKey];
            if (val !== undefined) {
              groupCount++;
              const sv = userInputToSv(input, val);
              const label = input.label || 'Value';
              subTags.push(
                buildSelectedTagHtml(
                  `${label}:`,
                  scalerEffectLabel(input, sv),
                  scalerEffectClass(sv),
                  `<span class="mc-selected-rm-scaler" data-storekey="${mw.html.escape(storeKey)}">×</span>`
                )
              );
            }
          });
          if (subTags.length) {
            groupParts.push(
              `<div class="mc-selected-subgroup">` +
              `<div class="mc-selected-subhead">` +
              `<span class="mc-selected-subtitle">${mw.html.escape(sub.name)}</span>` +
              `<span class="mc-selected-count">${subTags.length}</span>` +
              `<button type="button" class="mc-clear-sub" data-ci="${ci}" data-si="${si}">Clear</button>` +
              `</div>` +
              `<div class="mc-selected-tags">${subTags.join('')}</div>` +
              `</div>`
            );
          }
        });
      } else {
        const directTags = [];
        (cat.mods || []).forEach((m, mi) => {
          const id = `mc_${ci}_d_${mi}`;
          if (!st.checked[id]) return;
          groupCount++;
          const goodCls = m.good === true ? 'mc-pos' : m.good === false ? 'mc-neg' : 'mc-neu';
          let label = m.label || m.n;
          if (isAffine(m)) {
            const rp = st.currentRP;
            const effectiveSlope = m.affine.slope * (2 / rp);
            const transformed = (curBase - 166.6667) * effectiveSlope + 166.6667;
            const transformedStr = Math.round(transformed * 100) / 100;
            const rpVal = m.rp || (m.affine.slope * 2);
            label = `${m.n} (Base ${transformedStr} / ${Math.round(effectiveSlope * 100) / 100}x RP ${rpVal}%)`;
          }
          directTags.push(buildSelectedTagHtml(
            m.n, label, goodCls, `<span class="mc-selected-rm" data-id="${id}">×</span>`
          ));
        });
        if (directTags.length) {
          groupParts.push(`<div class="mc-selected-tags">${directTags.join('')}</div>`);
        }

        (cat.subcategories || []).forEach((sub, si) => {
          if (sub.type === 'scaler') {
            const storeKey = `${ci}_${si}`;
            const sval = st.scalerVals[storeKey];
            if (sval !== undefined) {
              groupCount++;
              const sv = scalerValue(sub, sval);
              const tagHtml = buildSelectedTagHtml(
                `${sub.name}:`,
                `${sval}${sub.unit !== undefined ? sub.unit : ''} → ${scalerEffectLabel(sub, sv)}`,
                scalerEffectClass(sv),
                `<span class="mc-selected-rm-scaler" data-ci="${ci}" data-si="${si}">×</span>`
              );
              groupParts.push(
                `<div class="mc-selected-subgroup">` +
                `<div class="mc-selected-subhead">` +
                `<span class="mc-selected-subtitle">${mw.html.escape(sub.name)}</span>` +
                `<span class="mc-selected-count">1</span>` +
                `<button type="button" class="mc-clear-sub" data-ci="${ci}" data-si="${si}">Clear</button>` +
                `</div>` +
                `<div class="mc-selected-tags">${tagHtml}</div>` +
                `</div>`
              );
            }
            return;
          }
          
          if (sub.type === 'user_input') {
            const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
            const tags = [];
            inputs.forEach((input, idx) => {
              const storeKey = inputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
              const val = st.userInputVals[storeKey];
              if (val !== undefined) {
                groupCount++;
                const sv = userInputToSv(input, val);
                const label = input.label || 'Value';
                tags.push(
                  buildSelectedTagHtml(
                    `${label}:`,
                    scalerEffectLabel(input, sv),
                    scalerEffectClass(sv),
                    `<span class="mc-selected-rm-scaler" data-storekey="${mw.html.escape(storeKey)}">×</span>`
                  )
                );
              }
            });
            if (tags.length) {
              groupParts.push(
                `<div class="mc-selected-subgroup">` +
                `<div class="mc-selected-subhead">` +
                `<span class="mc-selected-subtitle">${mw.html.escape(sub.name)}</span>` +
                `<span class="mc-selected-count">${tags.length}</span>` +
                `<button type="button" class="mc-clear-sub" data-ci="${ci}" data-si="${si}">Clear</button>` +
                `</div>` +
                `<div class="mc-selected-tags">${tags.join('')}</div>` +
                `</div>`
              );
            }
            return; 
          }
          
          const subTags = [];
          (sub.mods || []).forEach((m, mi) => {
            const id = `mc_${ci}_s_${si}_${mi}`;
            if (!st.checked[id]) return;
            groupCount++;
            const goodCls = m.good === true ? 'mc-pos' : m.good === false ? 'mc-neg' : 'mc-neu';
            let label = m.label || m.n;
            if (isAffine(m)) {
              const rp = st.currentRP;
              const effectiveSlope = m.affine.slope * (2 / rp);
              const transformed = (curBase - 166.6667) * effectiveSlope + 166.6667;
              const transformedStr = Math.round(transformed * 100) / 100;
              const rpVal = m.rp || (m.affine.slope * 2);
              label = `${m.n} (Base ${transformedStr} / ${Math.round(effectiveSlope * 100) / 100}x RP ${rpVal}%)`;
            }
            subTags.push(buildSelectedTagHtml(
              m.n, label, goodCls, `<span class="mc-selected-rm" data-id="${id}">×</span>`
            ));
          });
          if (!subTags.length) return;
          groupParts.push(
            `<div class="mc-selected-subgroup">` +
            `<div class="mc-selected-subhead">` +
            `<span class="mc-selected-subtitle">${mw.html.escape(sub.name)}</span>` +
            `<span class="mc-selected-count">${subTags.length}</span>` +
            `<button type="button" class="mc-clear-sub" data-ci="${ci}" data-si="${si}">Clear</button>` +
            `</div>` +
            `<div class="mc-selected-tags">${subTags.join('')}</div>` +
            `</div>`
          );
        });
      }

      if (!groupCount) return;
      total += groupCount;
      groupsHtml.push(
        `<div class="mc-selected-group">` +
        `<div class="mc-selected-group-head">` +
        `<span class="mc-selected-grouptitle">${mw.html.escape(cat.name)}</span>` +
        `<span class="mc-selected-count">${groupCount}</span>` +
        `<button type="button" class="mc-clear-cat" data-ci="${ci}">Clear</button>` +
        `</div>` +
        groupParts.join('') +
        `</div>`
      );
    });

    if (!total) {
      dom.$selectedList.hide().empty();
      return;
    }
    dom.$selectedList.html(
      `<div class="mc-selected-header">` +
      `<span class="mc-selected-heading">Selected modifiers <span class="mc-selected-total">(${total})</span></span>` +
      `<button type="button" class="mc-clear-all" id="mc-clear-all">Clear all</button>` +
      `</div>` +
      `<div class="mc-selected-title-divider"></div>` +
      groupsHtml.join('')
    ).show();
  };
  
  const filterTextMatches = (str) => !state.filters.text || (str || '').toLowerCase().includes(state.filters.text);

  const modItemVisible = ($item, ignoreText) => {
    const key = activeKey();
    if (!key) return false;
    const st = getModState(key);
    const id = $item.find('input[type=checkbox]').attr('id');
    const name = $item.find('.mc-mod-name').text().toLowerCase();
    const label = $item.find('.mc-mod-val').text().trim();
    const mul = isMultiplicative(label);
    const base = isBase(label);
    const affine = $item.data('affine') === true;
    const isGood = $item.data('good');
    const sel = !!st.checked[id];

    const textOk = ignoreText || !state.filters.text || name.includes(state.filters.text);
    const effectOk = state.filters.effect === 'all' ||
      (state.filters.effect === 'good' && isGood === true) ||
      (state.filters.effect === 'bad' && isGood === false);

    let typeOk = true;
    if (state.filters.type === 'additive') typeOk = !mul && !base && !affine;
    else if (state.filters.type === 'multiplicative') typeOk = mul;
    else if (state.filters.type === 'base') typeOk = base;
    else if (state.filters.type === 'affine') typeOk = affine;

    const rangeOk = state.filters.range === 'all' || state.filters.range === 'normal';
    const showOk = state.filters.show === 'all' ||
      (state.filters.show === 'selected' && sel) ||
      (state.filters.show === 'unselected' && !sel);

    return textOk && effectOk && typeOk && rangeOk && showOk;
  };

  const applyFilters = () => {
    const key = activeKey();
    const st = key ? getModState(key) : null;
    const fCats = st ? st.filterCats : [];
    const fSubcats = st ? st.filterSubcats : [];
    const rangeFilter = state.filters.range;

    dom.$sections.find('.mc-section').each(function () {
      const $section = $(this);
      const catName = $section.data('cat');
      const catVisible = !fCats.length || fCats.indexOf(catName) !== -1;

      if (!catVisible) {
        $section.hide();
        return;
      }

      if ($section.data('scaler')) {
        if (rangeFilter === 'normal' || rangeFilter === 'randomized') {
          $section.hide();
          return;
        }
        if (fSubcats.length > 0) {
          $section.hide();
          return;
        }
        const ci = $section.find('.mc-scaler-input').data('ci');
        const cat = key && DATA[key] && DATA[key].categories[ci];
        if (!cat || !scalerMatchesTypeFilter(cat)) {
          $section.hide();
          return;
        }
        const ig = $section.data('input-good');
        const scalerEffOk = state.filters.effect === 'all' ||
          (state.filters.effect === 'dynamic' && ig === 'dynamic') ||
          (state.filters.effect === 'good' && ig === true) ||
          (state.filters.effect === 'bad' && ig === false);
        const textOk2 = !state.filters.text || (catName || '').toLowerCase().includes(state.filters.text);
        $section.toggle(scalerEffOk && textOk2);
        return;
      }

      // UPDATED: user_input section filtering - now filters individual rows
      if ($section.data('type') === 'user_input') {
        if (rangeFilter === 'normal' || rangeFilter === 'scaler') {
          $section.hide();
          return;
        }
        const typeOk = state.filters.type === 'all' || state.filters.type === 'additive';
        if (!typeOk) { $section.hide(); return; }

        let anyVisible = false;
        $section.find('.mc-scaler-row').each(function() {
          const rowIg = $(this).data('input-good');
          const rowEffectOk = state.filters.effect === 'all' ||
            (state.filters.effect === 'dynamic' && rowIg === 'dynamic') ||
            (state.filters.effect === 'good' && rowIg === true) ||
            (state.filters.effect === 'bad' && rowIg === false);
          const rowTextOk = !state.filters.text || (catName || '').toLowerCase().includes(state.filters.text) ||
            $(this).find('.mc-scaler-bound').text().toLowerCase().includes(state.filters.text);
          const vis = rowEffectOk && rowTextOk;
          $(this).toggle(vis);
          if (vis) anyVisible = true;
        });
        $section.toggle(anyVisible);
        return;
      }

      if (rangeFilter === 'scaler' || rangeFilter === 'randomized') {
        $section.hide();
        return;
      }

      const hasSubcats = $section.find('.mc-subsection').length > 0;
      if (fSubcats.length > 0 && !hasSubcats) {
        $section.hide();
        return;
      }

      let anyVisible = false;
      const catTextOk = filterTextMatches(catName);

      $section.children('.mc-mod-list').find('.mc-mod-item').each(function () {
        const showDirect = !fSubcats.length || !hasSubcats;
        const visible = showDirect && modItemVisible($(this), catTextOk);
        $(this).toggle(visible);
        if (visible) anyVisible = true;
      });

      $section.find('.mc-subsection').each(function () {
        const $sub = $(this);
        const subName = $sub.data('subcat');
        const subVisible = !fSubcats.length || fSubcats.indexOf(subName) !== -1;
        if (!subVisible) {
          $sub.hide();
          return;
        }

        if ($sub.data('scaler')) {
          const ci = $sub.find('.mc-scaler-input').data('ci');
          const si = $sub.find('.mc-scaler-input').data('si');
          const subCat = key && DATA[key] && DATA[key].categories[ci] && (DATA[key].categories[ci].subcategories || [])[si];
          if (rangeFilter === 'normal' || rangeFilter === 'randomized') {
            $sub.hide();
            return;
          }
          if (!subCat || !scalerMatchesTypeFilter(subCat)) {
            $sub.hide();
            return;
          }
          const ig = subCat.inputGood !== undefined ? subCat.inputGood : 'dynamic';
          const scalerEffOk = state.filters.effect === 'all' ||
            (state.filters.effect === 'dynamic' && ig === 'dynamic') ||
            (state.filters.effect === 'good' && ig === true) ||
            (state.filters.effect === 'bad' && ig === false);
          const textOk = !state.filters.text || (subName || '').toLowerCase().includes(state.filters.text);
          const vis = scalerEffOk && textOk;
          $sub.toggle(vis);
          if (vis) anyVisible = true;
          return;
        }

        // UPDATED: user_input subcategory filtering - now filters individual rows
        if ($sub.data('type') === 'user_input') {
          if (rangeFilter === 'normal' || rangeFilter === 'scaler') {
            $sub.hide();
            return;
          }
          const typeOk = state.filters.type === 'all' || state.filters.type === 'additive';
          if (!typeOk) { $sub.hide(); return; }

          let subAnyVisible = false;
          $sub.find('.mc-scaler-row').each(function() {
            const rowIg = $(this).data('input-good');
            const rowEffectOk = state.filters.effect === 'all' ||
              (state.filters.effect === 'dynamic' && rowIg === 'dynamic') ||
              (state.filters.effect === 'good' && rowIg === true) ||
              (state.filters.effect === 'bad' && rowIg === false);
            const rowTextOk = !state.filters.text || (subName || '').toLowerCase().includes(state.filters.text) ||
              $(this).find('.mc-scaler-bound').text().toLowerCase().includes(state.filters.text);
            const vis = rowEffectOk && rowTextOk;
            $(this).toggle(vis);
            if (vis) subAnyVisible = true;
          });
          $sub.toggle(subAnyVisible);
          if (subAnyVisible) anyVisible = true;
          return;
        }

        const subTextOk = filterTextMatches(subName);
        let subAny = false;
        $sub.find('.mc-mod-item').each(function () {
          const visible = modItemVisible($(this), catTextOk || subTextOk);
          $(this).toggle(visible);
          if (visible) subAny = true;
        });
        $sub.toggle(subAny);
        if (subAny) anyVisible = true;
      });

      $section.toggle(anyVisible);
    });

    renderSelectedList();
    updateGlobalCheckbox();
    updateSelectMeta();

    if (key && DATA[key]) {
      DATA[key].categories.forEach((cat, ci) => {
        if (cat.type === 'scaler') return;
        if (cat.type === 'user_input') return;
        updateCatCheckbox(ci);
        (cat.subcategories || []).forEach((sub, si) => updateSubcatCheckbox(ci, si));
      });
    }
  };

  const renderSections = () => {
    const key = activeKey();
    const data = key ? DATA[key] : null;
    if (!data) {
      dom.$sections.empty();
      return;
    }
    const st = getModState(key);
    let out = '';

    data.categories.forEach((cat, ci) => {
      if (!categoryMatchesAllowed(cat.name)) return;

      if (cat.type === 'scaler') {
        const curVal = st.scalerVals[ci];
        const dispVal = curVal !== undefined ? curVal : cat.scaleMin;
        const dispStr = curVal !== undefined ? scalerDisplay(cat, dispVal) : '—';
        const unitLbl = cat.unit !== undefined ? cat.unit : '';
        const initEffectCls = curVal !== undefined ? scalerEffectClass(scalerValue(cat, dispVal)) : 'mc-neu';
        const igood = cat.inputGood !== undefined ? cat.inputGood : 'dynamic';
        const unitCls = curVal !== undefined ? initEffectCls : 'mc-neu';
        let scalerTitle = cat.link
          ? `<a href="${mw.html.escape(cat.link)}" target="_blank" class="mc-section-title" style="color:#86abe5;text-decoration:none;">${mw.html.escape(cat.name)}</a>`
          : `<span class="mc-section-title">${mw.html.escape(cat.name)}</span>`;
        if (cat.tooltip) scalerTitle += ` <span class="info-icon" title="${mw.html.escape(cat.tooltip)}">ⓘ</span>`;

        out += `<div class="mc-section mc-scaler-section" data-cat="${mw.html.escape(cat.name)}" data-scaler="1" data-input-good="${igood}">`;
        out += `<div class="mc-section-header">${scalerTitle}<input type="text" class="mc-scaler-live ${mw.html.escape(initEffectCls)}" id="mc-scaler-display-${ci}" value="${mw.html.escape(dispStr)}" size="4"></div>`;
        out += `<div class="mc-scaler-row">`;
        out += `<span class="mc-scaler-bound ${mw.html.escape(scalerBoundClass(cat, 'min'))}">${Number(cat.scaleMin)}${mw.html.escape(unitLbl)}</span>`;
        out += `<input type="range" class="mc-scaler-input" id="mc-scaler-${ci}" data-ci="${ci}" min="${Number(cat.scaleMin)}" max="${Number(cat.scaleMax)}" step="${Number(cat.step || 0.01)}" value="${Number(dispVal)}">`;
        out += `<span class="mc-scaler-bound ${mw.html.escape(scalerBoundClass(cat, 'max'))}">${Number(cat.scaleMax)}${mw.html.escape(unitLbl)}</span>`;
        out += `<input type="number" class="mc-scaler-num ${initEffectCls}" id="mc-scaler-val-${ci}" data-ci="${ci}" inputmode="decimal" min="${Number(cat.scaleMin)}" max="${Number(cat.scaleMax)}" step="${Number(cat.step || 0.01)}" value="${Number(dispVal)}">`;
        if (unitLbl) out += `<span class="mc-scaler-unit ${mw.html.escape(unitCls)}" id="mc-scaler-unit-${ci}">${mw.html.escape(unitLbl)}</span>`;
        out += `</div>`;
        out += `</div>`;
        return;
      }

      if (cat.type === 'user_input') {
        const inputs = cat.user_inputs || (cat.user_input ? [cat.user_input] : []);
        let catTitleHtml = cat.link
          ? `<a href="${mw.html.escape(cat.link)}" target="_blank" class="mc-section-title" style="color:#86abe5;text-decoration:none;">${mw.html.escape(cat.name)}</a>`
          : `<span class="mc-section-title">${mw.html.escape(cat.name)}</span>`;
        if (cat.tooltip) catTitleHtml += ` <span class="info-icon" title="${mw.html.escape(cat.tooltip)}">ⓘ</span>`;

        out += `<div class="mc-section mc-user-input-section" data-cat="${mw.html.escape(cat.name)}" data-type="user_input" data-input-good="${cat.inputGood !== undefined ? cat.inputGood : 'dynamic'}">`;
        out += `<div class="mc-section-header">${catTitleHtml}</div>`;

        inputs.forEach((input, idx) => {
          const storeKey = inputs.length > 1 ? `${ci}_${idx}` : `${ci}`;
          const curInputVal = st.userInputVals[storeKey] !== undefined ? st.userInputVals[storeKey] : (input.default || 0);
          const unitLbl = input.unit !== undefined ? input.unit : '';
          const sv = userInputToSv(input, curInputVal);
          const effectCls = scalerEffectClass(sv);
          const label = input.label || 'Value';
          
          // UPDATED: Added data-input-good to row for filtering
          const rowInputGood = input.inputGood !== undefined ? input.inputGood : (cat.inputGood !== undefined ? cat.inputGood : 'dynamic');

          out += `<div class="mc-scaler-row" data-input-good="${rowInputGood}">`;
          out += `<span class="mc-scaler-bound">${mw.html.escape(label)}:</span>`;
          out += `<input type="number" class="mc-scaler-num mc-user-input-val ${effectCls}" id="mc-user-input-${storeKey}" data-ci="${ci}" ${inputs.length > 1 ? `data-idx="${idx}"` : ''} value="${Number(curInputVal)}" step="${Number(input.step) || 'any'}" min="${input.min != null ? Number(input.min) : ''}" max="${input.max != null ? Number(input.max) : ''}">`;
          if (unitLbl) out += `<span class="mc-scaler-unit ${effectCls}" id="mc-user-input-unit-${storeKey}">${mw.html.escape(unitLbl)}</span>`;
          out += `</div>`;
        });

        const subcats = cat.subcategories || [];
        subcats.forEach((sub, si) => {
          if (sub.type === 'scaler') {
            const curVal = st.scalerVals[`${ci}_${si}`];
            const dispVal = curVal !== undefined ? curVal : (sub.scaleMin || 0);
            const dispStr = curVal !== undefined ? scalerDisplay(sub, dispVal) : '—';
            const unitLbl = sub.unit !== undefined ? sub.unit : '';
            const initEffectCls = curVal !== undefined ? scalerEffectClass(scalerValue(sub, dispVal)) : 'mc-neu';
            const igood = sub.inputGood !== undefined ? sub.inputGood : 'dynamic';
            const unitCls = curVal !== undefined ? initEffectCls : 'mc-neu';
            let subTitleHtml = sub.link
              ? `<a href="${mw.html.escape(sub.link)}" target="_blank" class="mc-subsection-title" style="color:#86abe5;text-decoration:none;">${mw.html.escape(sub.name)}</a>`
              : `<span class="mc-subsection-title">${mw.html.escape(sub.name)}</span>`;
            if (sub.tooltip) subTitleHtml += ` <span class="info-icon" title="${mw.html.escape(sub.tooltip)}">ⓘ</span>`;

            out += `<div class="mc-subsection" data-subcat="${mw.html.escape(sub.name)}" data-scaler="1" data-input-good="${igood}">`;
            out += `<div class="mc-subsection-header">`;
            out += subTitleHtml + `<input type="text" class="mc-scaler-live ${mw.html.escape(initEffectCls)}" id="mc-scaler-display-${ci}_${si}" value="${mw.html.escape(dispStr)}" size="4">`;
            out += `</div>`;
            out += `<div class="mc-scaler-row" style="margin-left:0;">`;
            out += `<span class="mc-scaler-bound ${mw.html.escape(scalerBoundClass(sub, 'min'))}">${Number(sub.scaleMin)}${mw.html.escape(unitLbl)}</span>`;
            out += `<input type="range" class="mc-scaler-input" id="mc-scaler-${ci}_${si}" data-ci="${ci}" data-si="${si}" min="${Number(sub.scaleMin)}" max="${Number(sub.scaleMax)}" step="${Number(sub.step || 0.01)}" value="${Number(dispVal)}">`;
            out += `<span class="mc-scaler-bound ${mw.html.escape(scalerBoundClass(sub, 'max'))}">${Number(sub.scaleMax)}${mw.html.escape(unitLbl)}</span>`;
            out += `<input type="number" class="mc-scaler-num ${initEffectCls}" id="mc-scaler-val-${ci}_${si}" data-ci="${ci}" data-si="${si}" inputmode="decimal" min="${Number(sub.scaleMin)}" max="${Number(sub.scaleMax)}" step="${Number(sub.step || 0.01)}" value="${Number(dispVal)}">`;
            if (unitLbl) out += `<span class="mc-scaler-unit ${mw.html.escape(unitCls)}" id="mc-scaler-unit-${ci}_${si}">${mw.html.escape(unitLbl)}</span>`;
            out += `</div>`;
            out += `</div>`;
          }

          if (sub.type === 'user_input') {
            const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
            let subTitleHtml = sub.link
              ? `<a href="${mw.html.escape(sub.link)}" target="_blank" class="mc-subsection-title" style="color:#86abe5;text-decoration:none;">${mw.html.escape(sub.name)}</a>`
              : `<span class="mc-subsection-title">${mw.html.escape(sub.name)}</span>`;
            if (sub.tooltip) subTitleHtml += ` <span class="info-icon" title="${mw.html.escape(sub.tooltip)}">ⓘ</span>`;

            out += `<div class="mc-subsection" data-subcat="${mw.html.escape(sub.name)}" data-type="user_input" data-input-good="${sub.inputGood !== undefined ? sub.inputGood : 'dynamic'}">`;
            out += `<div class="mc-subsection-header">`;
            out += subTitleHtml;
            out += `</div>`;

            inputs.forEach((input, idx) => {
              const storeKey = inputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
              const curVal = st.userInputVals[storeKey] !== undefined ? st.userInputVals[storeKey] : (input.default || 0);
              const sv = userInputToSv(input, curVal);
              const effectCls = scalerEffectClass(sv);
              const unitLbl = input.unit !== undefined ? input.unit : '';
              const label = input.label || 'Value';
              
              // UPDATED: Added data-input-good to row for filtering
              const rowInputGood = input.inputGood !== undefined ? input.inputGood : (sub.inputGood !== undefined ? sub.inputGood : 'dynamic');

              out += `<div class="mc-scaler-row" style="margin-left:0;" data-input-good="${rowInputGood}">`;
              out += `<span class="mc-scaler-bound">${mw.html.escape(label)}:</span>`;
              out += `<input type="number" class="mc-scaler-num mc-user-input-val ${effectCls}" id="mc-user-input-${storeKey}" data-ci="${ci}" data-si="${si}" data-idx="${idx}" value="${curVal}" step="${input.step || 'any'}" min="${input.min != null ? input.min : ''}" max="${input.max != null ? input.max : ''}">`;
              if (unitLbl) out += `<span class="mc-scaler-unit ${effectCls}">${mw.html.escape(unitLbl)}</span>`;
              out += `</div>`;
            });

            out += `</div>`;
          }
        });

        out += `</div>`;
        return;
      }

      const subcats = cat.subcategories || [];
      const modCount = countCatMods(cat);
      if (modCount === 0 && !subcats.length) return;

      const countBadge = subcats.length
        ? `<span class="mc-section-count mc-section-count-dual" title="${Number(subcats.length)} subcategories, ${modCount} modifiers">${Number(subcats.length)} · ${Number(modCount)}</span>`
        : `<span class="mc-section-count">${Number(modCount)}</span>`;

      let catTitleHtml = cat.link
        ? `<a href="${mw.html.escape(cat.link)}" target="_blank" class="mc-section-title" style="color:#86abe5;text-decoration:none;">${mw.html.escape(cat.name)}</a>`
        : `<span class="mc-section-title">${mw.html.escape(cat.name)}</span>`;
      if (cat.tooltip) catTitleHtml += ` <span class="info-icon" title="${mw.html.escape(cat.tooltip)}">ⓘ</span>`;

      out += `<div class="mc-section" data-cat="${mw.html.escape(cat.name)}">`;
      out += `<div class="mc-section-header">`;
      out += `<label class="mc-cat-check-label"><input type="checkbox" class="mc-cat-check" id="mc-cat-check-${ci}" data-ci="${ci}"></label>`;
      out += catTitleHtml + countBadge;
      out += `</div>`;

      if (cat.mods && cat.mods.length) {
        out += `<div class="mc-mod-list">`;
        cat.mods.forEach((m, mi) => {
          const id = `mc_${ci}_d_${mi}`;
          const goodAttr = m.good !== undefined ? `data-good="${Boolean(m.good)}"` : '';
          const affineAttr = isAffine(m) ? ' data-affine="true"' : '';
          const valCls = m.good === true ? 'mc-pos' : m.good === false ? 'mc-neg' : 'mc-neu';
          const tooltipHtml = m.tooltip ? ` title="${mw.html.escape(m.tooltip)}"` : '';
          const displayVal = m.label || m.n;
          out += `<label class="mc-mod-item" ${goodAttr} ${affineAttr} ${tooltipHtml}>`;
          out += `<input type="checkbox" id="${id}" ${st.checked[id] ? 'checked' : ''} data-affine="${isAffine(m) ? 'true' : 'false'}">`;
          out += `<span class="mc-mod-name">${mw.html.escape(m.n)}</span>`;
          out += `<span class="mc-mod-val ${valCls}">${mw.html.escape(displayVal)}</span>`;
          out += `</label>`;
        });
        out += `</div>`;
      }

      subcats.forEach((sub, si) => {
        if (sub.type === 'scaler') {
          const curVal = st.scalerVals[`${ci}_${si}`];
          const dispVal = curVal !== undefined ? curVal : (sub.scaleMin || 0);
          const dispStr = curVal !== undefined ? scalerDisplay(sub, dispVal) : '—';
          const unitLbl = sub.unit !== undefined ? sub.unit : '';
          const initEffectCls = curVal !== undefined ? scalerEffectClass(scalerValue(sub, dispVal)) : 'mc-neu';
          const igood = sub.inputGood !== undefined ? sub.inputGood : 'dynamic';
          const unitCls = curVal !== undefined ? initEffectCls : 'mc-neu';
          let subTitleHtml = sub.link
            ? `<a href="${mw.html.escape(sub.link)}" target="_blank" class="mc-subsection-title" style="color:#86abe5;text-decoration:none;">${mw.html.escape(sub.name)}</a>`
            : `<span class="mc-subsection-title">${mw.html.escape(sub.name)}</span>`;
          if (sub.tooltip) subTitleHtml += ` <span class="info-icon" title="${mw.html.escape(sub.tooltip)}">ⓘ</span>`;

          out += `<div class="mc-subsection" data-subcat="${mw.html.escape(sub.name)}" data-scaler="1" data-input-good="${igood}">`;
          out += `<div class="mc-subsection-header">`;
          out += subTitleHtml + `<input type="text" class="mc-scaler-live ${mw.html.escape(initEffectCls)}" id="mc-scaler-display-${ci}_${si}" value="${mw.html.escape(dispStr)}" size="4">`;
          out += `</div>`;
          out += `<div class="mc-scaler-row" style="margin-left:0;">`;
          out += `<span class="mc-scaler-bound ${mw.html.escape(scalerBoundClass(sub, 'min'))}">${Number(sub.scaleMin)}${mw.html.escape(unitLbl)}</span>`;
          out += `<input type="range" class="mc-scaler-input" id="mc-scaler-${ci}_${si}" data-ci="${ci}" data-si="${si}" min="${Number(sub.scaleMin)}" max="${Number(sub.scaleMax)}" step="${Number(sub.step || 0.01)}" value="${Number(dispVal)}">`;
          out += `<span class="mc-scaler-bound ${mw.html.escape(scalerBoundClass(sub, 'max'))}">${Number(sub.scaleMax)}${mw.html.escape(unitLbl)}</span>`;
          out += `<input type="number" class="mc-scaler-num ${initEffectCls}" id="mc-scaler-val-${ci}_${si}" data-ci="${ci}" data-si="${si}" inputmode="decimal" min="${Number(sub.scaleMin)}" max="${Number(sub.scaleMax)}" step="${Number(sub.step || 0.01)}" value="${Number(dispVal)}">`;
          if (unitLbl) out += `<span class="mc-scaler-unit ${mw.html.escape(unitCls)}" id="mc-scaler-unit-${ci}_${si}">${mw.html.escape(unitLbl)}</span>`;
          out += `</div>`;
          out += `</div>`;
          return;
        }

        if (sub.type === 'user_input') {
          const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
          let subTitleHtml = sub.link
            ? `<a href="${mw.html.escape(sub.link)}" target="_blank" class="mc-subsection-title" style="color:#86abe5;text-decoration:none;">${mw.html.escape(sub.name)}</a>`
            : `<span class="mc-subsection-title">${mw.html.escape(sub.name)}</span>`;
          if (sub.tooltip) subTitleHtml += ` <span class="info-icon" title="${mw.html.escape(sub.tooltip)}">ⓘ</span>`;

          out += `<div class="mc-subsection" data-subcat="${mw.html.escape(sub.name)}" data-type="user_input" data-input-good="${sub.inputGood !== undefined ? sub.inputGood : 'dynamic'}">`;
          out += `<div class="mc-subsection-header">`;
          out += subTitleHtml;
          out += `</div>`;

          inputs.forEach((input, idx) => {
            const storeKey = inputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
            if (st.userInputVals[storeKey] === undefined) st.userInputVals[storeKey] = input.default || 0;
            const curVal = st.userInputVals[storeKey] !== undefined ? st.userInputVals[storeKey] : (input.default || 0);
            const sv = userInputToSv(input, curVal);
            const effectCls = scalerEffectClass(sv);
            const unitLbl = input.unit !== undefined ? input.unit : '';
            const label = input.label || 'Value';
            
            // UPDATED: Added data-input-good to row for filtering
            const rowInputGood = input.inputGood !== undefined ? input.inputGood : (sub.inputGood !== undefined ? sub.inputGood : 'dynamic');

            out += `<div class="mc-scaler-row" style="margin-left:0;" data-input-good="${rowInputGood}">`;
            out += `<span class="mc-scaler-bound">${mw.html.escape(label)}:</span>`;
            out += `<input type="number" class="mc-scaler-num mc-user-input-val ${effectCls}" id="mc-user-input-${storeKey}" data-ci="${ci}" data-si="${si}" ${inputs.length > 1 ? `data-idx="${idx}"` : ''} value="${curVal}" step="${input.step || 'any'}" min="${input.min != null ? input.min : ''}" max="${input.max != null ? input.max : ''}">`;
            if (unitLbl) out += `<span class="mc-scaler-unit ${effectCls}">${mw.html.escape(unitLbl)}</span>`;
            out += `</div>`;
          });

          out += `</div>`;
          return;
        }

        const subCount = (sub.mods || []).length;
        let subTitleHtml = sub.link
          ? `<a href="${mw.html.escape(sub.link)}" target="_blank" class="mc-subsection-title" style="color:#86abe5;text-decoration:none;">${mw.html.escape(sub.name)}</a>`
          : `<span class="mc-subsection-title">${mw.html.escape(sub.name)}</span>`;
        if (sub.tooltip) subTitleHtml += ` <span class="info-icon" title="${mw.html.escape(sub.tooltip)}">ⓘ</span>`;

        out += `<div class="mc-subsection" data-subcat="${mw.html.escape(sub.name)}">`;
        out += `<div class="mc-subsection-header">`;
        out += `<label class="mc-cat-check-label"><input type="checkbox" class="mc-subcat-check" id="mc-subcat-check-${ci}_${si}" data-ci="${ci}" data-si="${si}"></label>`;
        out += subTitleHtml + `<span class="mc-section-count">${Number(subCount)}</span>`;
        out += `</div>`;
        out += `<div class="mc-mod-list">`;
        (sub.mods || []).forEach((m, mi) => {
          const id = `mc_${ci}_s_${si}_${mi}`;
          const goodAttr = m.good !== undefined ? `data-good="${Boolean(m.good)}"` : '';
          const affineAttr = isAffine(m) ? ' data-affine="true"' : '';
          const valCls = m.good === true ? 'mc-pos' : m.good === false ? 'mc-neg' : 'mc-neu';
          const tooltipHtml = m.tooltip ? ` title="${mw.html.escape(m.tooltip)}"` : '';
          const displayVal = m.label || m.n;
          out += `<label class="mc-mod-item" ${goodAttr} ${affineAttr} ${tooltipHtml}>`;
          out += `<input type="checkbox" id="${id}" ${st.checked[id] ? 'checked' : ''} data-affine="${isAffine(m) ? 'true' : 'false'}">`;
          out += `<span class="mc-mod-name">${mw.html.escape(m.n)}</span>`;
          out += `<span class="mc-mod-val ${valCls}">${mw.html.escape(displayVal)}</span>`;
          out += `</label>`;
        });
        out += `</div></div>`;
      });

      out += `</div>`;
    });

    dom.$sections.html(out);

    data.categories.forEach((cat, ci) => {
      if (cat.type === 'scaler') return;
      if (cat.type === 'user_input') return;
      if (!categoryMatchesAllowed(cat.name)) return;
      updateCatCheckbox(ci);
      (cat.subcategories || []).forEach((sub, si) => updateSubcatCheckbox(ci, si));
    });
    updateGlobalCheckbox();

    dom.$sections.off('input', '.mc-scaler-input').on('input', '.mc-scaler-input', function () {
      const ci = parseInt($(this).data('ci'));
      const si = $(this).data('si');
      const key2 = activeKey();
      if (!key2) return;
      const data2 = DATA[key2];
      if (!data2) return;
      let cat2;
      if (si !== undefined) {
        cat2 = (data2.categories[ci].subcategories || [])[parseInt(si)];
      } else {
        cat2 = data2.categories[ci];
      }
      if (!cat2 || cat2.type !== 'scaler') return;
      setScalerSubValue(ci, si, parseFloat($(this).val()), true);
    });
    dom.$sections.off('focus', '.mc-scaler-num').on('focus', '.mc-scaler-num', function () {
      this.select();
    });
    dom.$sections.off('blur', '.mc-scaler-num').on('blur', '.mc-scaler-num', function () {
      const ci = parseInt($(this).data('ci'));
      const si = $(this).data('si');
      commitScalerSubNum(ci, si);
    });
    dom.$sections.off('keydown', '.mc-scaler-num').on('keydown', '.mc-scaler-num', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const ci = parseInt($(this).data('ci'));
        const si = $(this).data('si');
        commitScalerSubNum(ci, si);
        this.blur();
      }
    });

    // UPDATED: User input value handler with min/max clamping
    dom.$sections.off('input', '.mc-user-input-val').on('input', '.mc-user-input-val', function() {
      const key2 = activeKey();
      if (!key2) return;
      const data2 = DATA[key2];
      if (!data2) return;
      
      const storeKey = this.id.replace('mc-user-input-', '');
      const parts = storeKey.split('_');
      const ci = parseInt(parts[0], 10);
      const si = parts.length >= 2 ? parseInt(parts[1], 10) : undefined;
      const idx = parts.length >= 3 ? parseInt(parts[2], 10) : undefined;

      const st2 = getModState(key2);
      const $input = $(this);
      const raw = $input.val().trim();
      const minAttr = $input.attr('min');
      const maxAttr = $input.attr('max');
      const min = minAttr !== undefined ? parseFloat(minAttr) : NaN;
      const max = maxAttr !== undefined ? parseFloat(maxAttr) : NaN;
      let num = parseFloat(raw);
      if (!isNaN(num)) {
        if (!isNaN(min) && num < min) { num = min; $input.val(min); }
        if (!isNaN(max) && num > max) { num = max; $input.val(max); }
      } else {
        num = NaN;
      }

      if (raw === '' || isNaN(num)) {
        delete st2.userInputVals[storeKey];
        $(this).removeClass('mc-pos mc-neg mc-neu').addClass('mc-neu');
        const unitId = 'mc-user-input-unit-' + storeKey;
        dom.$sections.find(`#${unitId}`).removeClass('mc-pos mc-neg mc-neu').addClass('mc-neu');
      } else {
        st2.userInputVals[storeKey] = num;
        let cat2, inputObj;
        if (si !== undefined) {
          cat2 = data2 && data2.categories[ci] && (data2.categories[ci].subcategories || [])[si];
          if (cat2) {
            const inputs = cat2.user_inputs || (cat2.user_input ? [cat2.user_input] : []);
            inputObj = idx !== undefined ? inputs[idx] : inputs[0];
          }
        } else {
          cat2 = data2 && data2.categories[ci];
          if (cat2) {
            const inputs = cat2.user_inputs || (cat2.user_input ? [cat2.user_input] : []);
            inputObj = idx !== undefined ? inputs[idx] : inputs[0];
          }
        }
        if (cat2 && inputObj) {
          const sv = userInputToSv(inputObj, num);
          const cls = scalerEffectClass(sv);
          $(this).removeClass('mc-pos mc-neg mc-neu').addClass(cls);
          const unitId = 'mc-user-input-unit-' + storeKey;
          dom.$sections.find(`#${unitId}`).removeClass('mc-pos mc-neg mc-neu').addClass(cls);
        } else {
          const cls = scalerEffectClass(userInputToSv({effectType: 'additive'}, num));
          $(this).removeClass('mc-pos mc-neg mc-neu').addClass(cls);
          const unitId = 'mc-user-input-unit-' + storeKey;
          dom.$sections.find(`#${unitId}`).removeClass('mc-pos mc-neg mc-neu').addClass(cls);
        }
      }
      renderSelectedList();
      recalc();
    });

    dom.$sections.off('focus', '.mc-scaler-live').on('focus', '.mc-scaler-live', function () {
      this.select();
    });
    dom.$sections.off('blur', '.mc-scaler-live').on('blur', '.mc-scaler-live', function () {
      const id = $(this).attr('id').replace('mc-scaler-display-', '');
      const parts = id.split('_');
      const ci = parseInt(parts[0]);
      const si = parts.length > 1 ? parts[1] : undefined;
      handleDisplayInputBlurSub(this, ci, si);
    });
    dom.$sections.off('keydown', '.mc-scaler-live').on('keydown', '.mc-scaler-live', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const id = $(this).attr('id').replace('mc-scaler-display-', '');
        const parts = id.split('_');
        const ci = parseInt(parts[0]);
        const si = parts.length > 1 ? parts[1] : undefined;
        handleDisplayInputBlurSub(this, ci, si);
        this.blur();
      }
    });

    dom.$sections.off('change', '.mc-mod-item input[type=checkbox][data-affine="true"]')
      .on('change', '.mc-mod-item input[type=checkbox][data-affine="true"]', function () {
        const $cb = $(this);
        const id = $cb.attr('id');
        const st2 = activeState();
        if (!st2) return;
        if ($cb.prop('checked')) {
          dom.$sections.find('.mc-mod-item input[type=checkbox][data-affine="true"]').not(this).each(function () {
            if (this.checked) {
              this.checked = false;
              st2.checked[this.id] = false;
            }
          });
          st2.activeAffineId = id;
        } else {
          if (st2.activeAffineId === id) st2.activeAffineId = null;
        }
        st2.checked[id] = $cb.prop('checked');
        const parts = id.split('_');
        const ci = parseInt(parts[1]);
        updateCatCheckbox(ci);
        if (parts[2] === 's') updateSubcatCheckbox(ci, parseInt(parts[3]));
        updateGlobalCheckbox();
        applyFilters();
        recalc();
      });

    dom.$sections.off('change', '.mc-mod-item input[type=checkbox]:not([data-affine="true"])')
      .on('change', '.mc-mod-item input[type=checkbox]:not([data-affine="true"])', function () {
        const st2 = activeState();
        if (!st2) return;
        st2.checked[this.id] = this.checked;
        const parts = this.id.split('_');
        const ci = parseInt(parts[1]);
        if (parts[2] === 's') updateSubcatCheckbox(ci, parseInt(parts[3]));
        updateCatCheckbox(ci);
        updateGlobalCheckbox();
        applyFilters();
        recalc();
      });

    // Bold/unbold modifier value on selection
    dom.$sections.off('change', '.mc-mod-item input[type=checkbox]')
      .on('change', '.mc-mod-item input[type=checkbox]', function() {
        const $item = $(this).closest('.mc-mod-item');
        const $val = $item.find('.mc-mod-val');
        if ($(this).is(':checked')) {
          $val.css('font-weight', 'bold');
        } else {
          $val.css('font-weight', 'normal');
        }
      });
      
    updateTypeFilterAvailability();
    applyFilters();
    updateSelectMeta();
  };

  const getTotals = () => {
    const base = parseFloat(dom.$base.val()) || 0;
    let totalPct = 0, totalBase = 0, totalMul = 1;
    let transformedBase = base;

    state.loadedModifiers.forEach(key => {
      const data = DATA[key];
      if (!data) return;
      const st = getModState(key);

      if (st.activeAffineId) {
        const parts = st.activeAffineId.split('_');
        const ci = parseInt(parts[1]);
        const cat = data.categories[ci];
        if (cat) {
          let lawMod;
          if (parts[2] === 'd') {
            lawMod = cat.mods[parseInt(parts[3])];
          } else if (parts[2] === 's') {
            const sub = (cat.subcategories || [])[parseInt(parts[3])];
            if (sub) lawMod = (sub.mods || [])[parseInt(parts[4])];
          }
          if (lawMod && isAffine(lawMod)) {
            const effectiveSlope = lawMod.affine.slope * (2 / st.currentRP);
            transformedBase = (base - 166.6667) * effectiveSlope + 166.6667;
          }
        }
      }

      data.categories.forEach((cat, ci) => {
        if (!categoryMatchesAllowed(cat.name)) return;

        if (cat.type === 'scaler') {
          const val = st.scalerVals[ci];
          if (val !== undefined) {
            const sv = scalerValue(cat, val);
            const t = getScalerEffectType(cat);
            if (t === 'base') totalBase += sv;
            else if (t === 'multiplicative') totalMul *= (1 + sv);
            else totalPct += sv;
          }
        }

        if (cat.type === 'user_input') {
          const inputs = cat.user_inputs || (cat.user_input ? [cat.user_input] : []);
          inputs.forEach((input, idx) => {
            const storeKey = inputs.length > 1 ? `${ci}_${idx}` : `${ci}`;
            const val = st.userInputVals[storeKey];
            if (val !== undefined) {
              const sv = userInputToSv(input, val);
              const t = getScalerEffectType(input);
              if (t === 'base') totalBase += sv;
              else if (t === 'multiplicative') totalMul *= (1 + sv);
              else totalPct += sv;
            }
          });
          (cat.subcategories || []).forEach((sub, si) => {
            if (sub.type === 'scaler') {
              const storeKey = `${ci}_${si}`;
              const val = st.scalerVals[storeKey];
              if (val !== undefined) {
                const sv = scalerValue(sub, val);
                const t = getScalerEffectType(sub);
                if (t === 'base') totalBase += sv;
                else if (t === 'multiplicative') totalMul *= (1 + sv);
                else totalPct += sv;
              }
            } else if (sub.type === 'user_input') {
              const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
              inputs.forEach((input, idx) => {
                const storeKey = inputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
                const val = st.userInputVals[storeKey];
                if (val !== undefined) {
                  const sv = userInputToSv(input, val);
                  const t = getScalerEffectType(input);
                  if (t === 'base') totalBase += sv;
                  else if (t === 'multiplicative') totalMul *= (1 + sv);
                  else totalPct += sv;
                }
              });
            }
          });
          return;
        }

        if (cat.type === 'scaler') {
          (cat.subcategories || []).forEach((sub, si) => {
            if (sub.type === 'scaler') {
              const storeKey = `${ci}_${si}`;
              const val = st.scalerVals[storeKey];
              if (val !== undefined) {
                const sv = scalerValue(sub, val);
                const t = getScalerEffectType(sub);
                if (t === 'base') totalBase += sv;
                else if (t === 'multiplicative') totalMul *= (1 + sv);
                else totalPct += sv;
              }
            } else if (sub.type === 'user_input') {
              const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
              inputs.forEach((input, idx) => {
                const storeKey = inputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
                const val = st.userInputVals[storeKey];
                if (val !== undefined) {
                  const sv = userInputToSv(input, val);
                  const t = getScalerEffectType(input);
                  if (t === 'base') totalBase += sv;
                  else if (t === 'multiplicative') totalMul *= (1 + sv);
                  else totalPct += sv;
                }
              });
            }
          });
          return;
        }

        (cat.subcategories || []).forEach((sub, si) => {
          if (sub.type === 'scaler') {
            const storeKey = `${ci}_${si}`;
            const val = st.scalerVals[storeKey];
            if (val !== undefined) {
              const sv = scalerValue(sub, val);
              const t = getScalerEffectType(sub);
              if (t === 'base') totalBase += sv;
              else if (t === 'multiplicative') totalMul *= (1 + sv);
              else totalPct += sv;
            }
          } else if (sub.type === 'user_input') {
            const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
            inputs.forEach((input, idx) => {
              const storeKey = inputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
              const val = st.userInputVals[storeKey];
              if (val !== undefined) {
                const sv = userInputToSv(input, val);
                const t = getScalerEffectType(input);
                if (t === 'base') totalBase += sv;
                else if (t === 'multiplicative') totalMul *= (1 + sv);
                else totalPct += sv;
              }
            });
          }
        });

        forEachModInCat(cat, ci, (m, id) => {
          if (!st.checked[id] || isAffine(m)) return;
          if (m.type === 'base') totalBase += m.v;
          else if (isMultiplicative(m.label)) totalMul *= (1 + m.v);
          else totalPct += m.v;
        });
      });
    });

    state.customs.forEach(c => {
      if (c.isBase) totalBase += c.v;
      else if (c.isMul) totalMul *= (1 + c.v);
      else totalPct += c.v;
    });

    return { transformedBase, pct: totalPct, base: totalBase, mul: totalMul };
  };

  const formatNumber = (num) => {
    if (!isFinite(num)) return '∞';
    const parts = num.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };
  
  const recalc = () => {
    const base = parseFloat(dom.$base.val()) || 0;
    const basePctVal = parseFloat(dom.$basePct.val());
    const basePct = isNaN(basePctVal) ? 1 : (basePctVal / 100);

    const totals = getTotals();
    const { transformedBase, pct: totalPct, base: totalBase, mul: totalMul } = totals;
    const effBase = transformedBase + totalBase;
    const result = effBase * (basePct + totalPct) * totalMul;

    const activeNames = [];
    state.loadedModifiers.forEach(key => {
      const data = DATA[key];
      if (!data) return;
      const st = getModState(key);

      data.categories.forEach((cat, ci) => {
        if (!categoryMatchesAllowed(cat.name)) return;

        if (cat.type === 'scaler') {
          const val = st.scalerVals[ci];
          if (val !== undefined) {
            const sv = scalerValue(cat, val);
            activeNames.push(`${formatScalerActiveName(cat, val, sv)} [${data.label}]`);
          }
        }
        if (cat.type === 'user_input') {
          const inputs = cat.user_inputs || (cat.user_input ? [cat.user_input] : []);
          inputs.forEach((input, idx) => {
            const storeKey = inputs.length > 1 ? `${ci}_${idx}` : `${ci}`;
            const val = st.userInputVals[storeKey];
            if (val !== undefined) {
              const sv = userInputToSv(input, val);
              const label = input.label || 'Value';
              activeNames.push(`${label}: ${scalerEffectLabel(input, sv)} [${data.label}]`);
            }
          });
        }

        (cat.subcategories || []).forEach((sub, si) => {
          if (sub.type === 'scaler') {
            const storeKey = `${ci}_${si}`;
            const val = st.scalerVals[storeKey];
            if (val !== undefined) {
              const sv = scalerValue(sub, val);
              activeNames.push(`${sub.name}: ${val}${sub.unit || ''} → ${scalerEffectLabel(sub, sv)} [${data.label}]`);
            }
          } else if (sub.type === 'user_input') {
            const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
            inputs.forEach((input, idx) => {
              const storeKey = inputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
              const val = st.userInputVals[storeKey];
              if (val !== undefined) {
                const sv = userInputToSv(input, val);
                const label = input.label || 'Value';
                activeNames.push(`${label}: ${scalerEffectLabel(input, sv)} [${data.label}]`);
              }
            });
          }
        });

        forEachModInCat(cat, ci, (m, id) => {
          if (!st.checked[id] || isAffine(m)) return;
          activeNames.push((m.label || m.n) + ` [${data.label}]`);
        });
      });
    });

    state.customs.forEach(c => activeNames.push(c.label + ' [Custom Modifier]'));

    dom.$rBase.text(formatNumber(base));   
    dom.$rMods.text(activeNames.length ? activeNames.join(', ') : 'none');
    dom.$rResult.text(formatNumber(result));
    const basePctDisplay = isNaN(basePctVal) ? 1 : (basePctVal / 100);
    dom.$rFormula.text(`${formatNumber(totals.transformedBase)} × (${((basePctDisplay + totals.pct) * 100).toFixed(1)}%) × ${totals.mul.toFixed(2)}x = ${formatNumber(result)}`);
    
    if (dom.$panelFormula.is(':visible')) calcFormula();
  };

  const renderCustomTags = () => {
    dom.$customTags.html(
      state.customs.map((c, i) =>
        `<span class="mc-custom-tag">${mw.html.escape(c.n)} <b>${mw.html.escape(c.label)}</b> <span class="mc-custom-rm" data-i="${i}">×</span></span>`
      ).join('')
    );
    dom.$customTags.find('.mc-custom-rm').off('click').on('click', function () {
      state.customs.splice(parseInt($(this).data('i')), 1);
      renderCustomTags();
      recalc();
    });
  };

  const addCustomModifier = () => {
    const name = dom.$customName.val().trim();
    const val = dom.$customVal.val().trim();
    if (!name || !val) return;
    const rawNum = parseFloat(val.replace('%', '').replace('x', ''));
    if (isNaN(rawNum)) return;
    const isBaseMod = isBase(val);
    const isMul = val.toLowerCase().indexOf('x') !== -1;
    let parsed;
    if (isBaseMod) parsed = rawNum;
    else if (isMul) parsed = rawNum - 1;
    else parsed = rawNum / 100;
    state.customs.push({ n: name, v: parsed, label: val, isBase: isBaseMod, isMul });
    dom.$customName.val('');
    dom.$customVal.val('');
    renderCustomTags();
    recalc();
  };

  (function buildUI() {
    const headerHtml = pageTitle
      ? `<div class="mc-page-header"><span class="mc-page-title">${mw.html.escape(pageTitle)} Calculator</span>` +
        (fullCalcLink ? `<span class="mc-page-link">For all modifiers, visit the <a href="${mw.html.escape(fullCalcLink)}">Modifier Calculator</a>.</span>` : '') +
        `</div>`
      : '';

    const availableTags = {};
    modKeys.forEach(k => { const t = DATA[k].tag; if (t) availableTags[t] = true; });
    const tagOrder = ['government', 'diplomacy', 'economy', 'technology', 'military'];
    const buttons = ['<button type="button" id="mc-browse-btn" class="mc-browse-btn">Browse</button>'];
    buttons.push(`<button class="mc-domain-btn${highlightDomain === 'all' ? ' mc-filter-active' : ''}" data-domain="all">All</button>`);
    tagOrder.forEach(tag => {
      if (availableTags[tag]) {
        buttons.push(`<button class="mc-domain-btn mc-domain-${tag}${highlightDomain === tag ? ' mc-filter-active' : ''}" data-domain="${tag}">${mw.html.escape(tag.charAt(0).toUpperCase() + tag.slice(1))}</button>`);
      }
    });
    const domainHtml = `<div class="mc-domain-btns" id="mc-domain-filter">${buttons.join('')}</div>`;

    const html = `
      <div id="mc-wrap">
        ${headerHtml}
        <div class="mc-row">
          <span class="mc-label">Modifier</span>
          <div style="position:relative;flex:1;">
            ${domainHtml}
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <label class="mc-global-select-label" id="mc-multiselect-label" style="font-size:12px;color:#888;cursor:pointer;">
                <input type="checkbox" id="mc-multiselect-toggle" style="width:13px;height:13px;cursor:pointer;"> Multi-select mode
              </label>
            </div>
            <input class="mc-select-search" id="mc-mod-search" type="search" placeholder="Search modifier type e.g. Infantry Attack..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            <div id="mc-mod-suggestions"></div>
            <div id="mc-browse-panel"></div>
          </div>
        </div>
        <div id="mc-loaded-chips" style="display:none;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:10px;"></div>

        <div class="mc-row">
          <span class="mc-label">Base value <span class="info-icon" title="This is your Base value. All modifiers are applied to this number unless a modifier explicitly changes the Base itself.\n\nExample: If Base Research is 15 and you gain +6 Base from Education Spending, the Base becomes 21.\nAll further modifiers now apply to 21 instead of 15.\n\nThere is a select amount of Base modifiers:\n- Base Political Power Gain: 1.8\n- Base Research Gain: 15\n- Base Stability: 50\n- War Exhaustion Gain: -0.025\n- Corruption Gain: -0.25\n- Base Population Growth: 2\n- Project Capacity: 2\n- Political Leader Cap: 7\n- Develop City Cap: 8\n- Diplomatic Actions: 2\n- Base Unrest Reduction: Unknown, varies\n- Base Political Leader XP Gain: Unknown, varies\n\nThe last two modifiers are currently unknown because they are difficult to calculate due to their unpredictability.\nHowever, if you determine the correct values, feel free to contact User:Dxrknrg on their message wall.">ⓘ</span></span>
          <input class="mc-base-input" type="number" id="mc-base" value="0" min="0" step="any">
        </div>
        <div class="mc-row">
          <span class="mc-label">Base percentage (%) <span class="info-icon" title="This shows the total modifier effect applied to your Base value.\n\nSome modifiers are added together first (additive stacking), then converted into a single multiplier.\nOthers apply separately as multipliers (multiplicative stacking).\n\nFinal formula:\nBase × (1 + additive modifiers) × multiplicative modifiers.">ⓘ</span></span>
          <input class="mc-base-input" type="number" id="mc-base-pct" value="100" min="0">
        </div>

        <div id="mc-current-rp-selector" style="display:none; margin-bottom:1rem;">
          <div class="mc-filter-group">
            <span class="mc-filter-group-label">Current Law RP</span>
            <div class="mc-filter-btns" id="mc-current-rp-btns">
              <button class="mc-filter-btn" data-rp="1">Disarmed 1%</button>
              <button class="mc-filter-btn mc-filter-active" data-rp="2">Volunteer 2%</button>
              <button class="mc-filter-btn" data-rp="5">Limited 5%</button>
              <button class="mc-filter-btn" data-rp="10">Extensive 10%</button>
              <button class="mc-filter-btn" data-rp="25">Required 25%</button>
            </div>
          </div>
        </div>

        <div class="mc-result-card">
          <div class="mc-result-row"><span>Base value</span><span id="mc-r-base">0</span></div>
          <div class="mc-result-row"><span>Active modifiers</span><span id="mc-r-mods" style="text-align:right;max-width:65%">none</span></div>
          <div class="mc-result-divider"></div>
          <div class="mc-result-row mc-result-total"><span>Result</span><span class="mc-result-big" id="mc-r-result">0.00</span></div>
          <div class="mc-formula" id="mc-r-formula">0 × (none) = 0.00</div>
        </div>

        <div class="mc-tabs" id="mc-main-tabs">
          <div class="mc-tab mc-tab-active" data-tab="toggle">Toggle modifiers</div>
          <div class="mc-tab" data-tab="custom">Custom input modifiers</div>
          <div class="mc-tab" id="mc-formula-tab" data-tab="formula" style="display:none">Formula</div>
        </div>

        <div id="mc-panel-toggle">
          <input class="mc-filter-input" id="mc-filter" type="text" placeholder="Search modifiers, categories, or subcategories...">
          <div class="mc-filter-group"><span class="mc-filter-group-label">Effect</span><div class="mc-filter-btns" id="mc-filter-effect"><button class="mc-filter-btn mc-filter-active" data-filter="all">All</button><button class="mc-filter-btn mc-filter-good" data-filter="good">Good</button><button class="mc-filter-btn mc-filter-bad" data-filter="bad">Bad</button><button class="mc-filter-btn mc-filter-dynamic" data-filter="dynamic">Dynamic</button></div></div>
          <div class="mc-filter-group"><span class="mc-filter-group-label">Type</span><div class="mc-filter-btns" id="mc-filter-type"><button class="mc-filter-btn mc-filter-active" data-filter="all">All</button><button class="mc-filter-btn" data-filter="additive">Additive</button><button class="mc-filter-btn" data-filter="multiplicative">Multiplicative</button><button class="mc-filter-btn" data-filter="base">Base</button><button class="mc-filter-btn" data-filter="affine">Affine</button></div></div>
          <div class="mc-filter-group"><span class="mc-filter-group-label">Range</span><div class="mc-filter-btns" id="mc-filter-range"><button class="mc-filter-btn mc-filter-active" data-filter="all">All</button><button class="mc-filter-btn" data-filter="normal">Normal</button><button class="mc-filter-btn" data-filter="scaler">Scaler</button><button class="mc-filter-btn" data-filter="randomized">Randomized</button></div></div>
          <div class="mc-filter-group"><span class="mc-filter-group-label">Category</span><div class="mc-filter-btns" id="mc-filter-cats"></div></div>
          <div class="mc-filter-group"><span class="mc-filter-group-label">Subcategory</span><div class="mc-filter-btns" id="mc-filter-subcats"></div></div>
          <div class="mc-filter-group"><span class="mc-filter-group-label">Show</span><div class="mc-filter-btns" id="mc-filter-selected"><button class="mc-filter-btn mc-filter-active" data-filter="all">All</button><button class="mc-filter-btn" data-filter="selected">Selected</button><button class="mc-filter-btn" data-filter="unselected">Unselected</button></div></div>
          <div class="mc-global-select"><label class="mc-global-select-label"><input type="checkbox" id="mc-select-all"> Select all modifiers</label><div class="mc-select-meta" id="mc-select-meta"><span class="mc-meta-pill" id="mc-meta-cats">0 categories</span><span class="mc-meta-pill" id="mc-meta-subs">0 subcategories</span><span class="mc-meta-pill" id="mc-meta-mods">0 modifiers</span></div></div>
          <div id="mc-selected-list"></div>
          <div id="mc-sections"></div>
        </div>

        <div id="mc-panel-custom" style="display:none">
          <div class="mc-section-title">Add a custom modifier</div>
          <div class="mc-custom-row">
            <input class="mc-custom-input" id="mc-c-name" placeholder="Modifier name" type="text">
            <input class="mc-custom-input" id="mc-c-val" placeholder="e.g. +15%, 1.2x, or +5 (base)" type="text">
            <button class="mc-add-btn" id="mc-add-btn">Add</button>
            <button class="mc-add-btn" id="mc-clear-custom-btn" style="border-color:#f44336;color:#f44336;">Clear All</button>
          </div>
          <div id="mc-custom-tags"></div>
        </div>

        <div id="mc-panel-formula" style="display:none">
          <div id="mc-formula-inputs"></div>
          <div class="mc-result-card" style="margin-top:1rem">
            <div class="mc-result-row mc-result-total"><span>Formula Result</span><span class="mc-result-big" id="mc-formula-result">—</span></div>
            <div class="mc-formula" id="mc-formula-expr"></div>
          </div>
        </div>
      </div>`;

    $el.html(html);

    dom.$wrap            = $el.find('#mc-wrap');
    dom.$modSearch       = $el.find('#mc-mod-search');
    dom.$modSuggestions  = $el.find('#mc-mod-suggestions');
    dom.$browsePanel     = $el.find('#mc-browse-panel');
    dom.$loadedChips     = $el.find('#mc-loaded-chips');
    dom.$base            = $el.find('#mc-base');
    dom.$basePct         = $el.find('#mc-base-pct');
    dom.$rpSelector      = $el.find('#mc-current-rp-selector');
    dom.$rpBtns          = $el.find('#mc-current-rp-btns .mc-filter-btn');
    dom.$rBase           = $el.find('#mc-r-base');
    dom.$rMods           = $el.find('#mc-r-mods');
    dom.$rResult         = $el.find('#mc-r-result');
    dom.$rFormula        = $el.find('#mc-r-formula');
    dom.$tabs            = $el.find('#mc-main-tabs .mc-tab');
    dom.$panelToggle     = $el.find('#mc-panel-toggle');
    dom.$panelCustom     = $el.find('#mc-panel-custom');
    dom.$panelFormula    = $el.find('#mc-panel-formula');
    dom.$formulaTab      = $el.find('#mc-formula-tab');
    dom.$filter          = $el.find('#mc-filter');
    dom.$filterCats      = $el.find('#mc-filter-cats');
    dom.$filterSubcats   = $el.find('#mc-filter-subcats');
    dom.$sections        = $el.find('#mc-sections');
    dom.$selectedList    = $el.find('#mc-selected-list');
    dom.$selectAllCheckbox = $el.find('#mc-select-all');
    dom.$metaCats        = $el.find('#mc-meta-cats');
    dom.$metaSubs        = $el.find('#mc-meta-subs');
    dom.$metaMods        = $el.find('#mc-meta-mods');
    dom.$formulaInputs   = $el.find('#mc-formula-inputs');
    dom.$formulaResult   = $el.find('#mc-formula-result');
    dom.$formulaExpr     = $el.find('#mc-formula-expr');
    dom.$customName      = $el.find('#mc-c-name');
    dom.$customVal       = $el.find('#mc-c-val');
    dom.$customTags      = $el.find('#mc-custom-tags');
    dom.$domainBtns      = $el.find('#mc-domain-filter .mc-domain-btn');
    dom.$typeBtns        = $el.find('#mc-filter-type .mc-filter-btn');
    dom.$effectBtns = $el.find('#mc-filter-effect .mc-filter-btn');
    dom.$rangeBtns  = $el.find('#mc-filter-range .mc-filter-btn');
  })();

  (function bindEvents() {
    $el.find('#mc-multiselect-toggle').on('change', function () {
      state.multiSelectMode = this.checked;
      const q = dom.$modSearch.val().trim();
      if (q) dom.$modSearch.trigger('input');
      if (dom.$browsePanel.is(':visible')) populateBrowsePanel();
    });

    dom.$domainBtns.on('click', handleDomainClick);
    dom.$modSearch.on('input', handleModSearch);

    bindFilterGroup('#mc-filter-effect', 'effect');
    bindFilterGroup('#mc-filter-type', 'type');
    bindFilterGroup('#mc-filter-range', 'range');
    bindFilterGroup('#mc-filter-selected', 'show');

    dom.$filter.on('input', function () {
      state.filters.text = $(this).val().toLowerCase();
      applyFilters();
    });

    dom.$selectAllCheckbox.on('change', handleSelectAll);

    $el.on('change', '.mc-cat-check', function () {
      const key = activeKey();
      if (!key) return;
      const st = getModState(key);
      const ci = parseInt($(this).data('ci'));
      const val = this.checked;
      getVisibleModIdsInCategory(ci).forEach(id => {
        st.checked[id] = val;
        $(`#${id}`).prop('checked', val);
      });
      updateCatCheckbox(ci);
      const data = DATA[key];
      (data.categories[ci].subcategories || []).forEach((sub, si) => updateSubcatCheckbox(ci, si));
      updateGlobalCheckbox();
      applyFilters();
      recalc();
    });

    $el.on('change', '.mc-subcat-check', function () {
      const key = activeKey();
      if (!key) return;
      const st = getModState(key);
      const ci = parseInt($(this).data('ci'));
      const si = parseInt($(this).data('si'));
      const val = this.checked;
      getVisibleModIdsInSubcategory(ci, si).forEach(id => {
        st.checked[id] = val;
        $(`#${id}`).prop('checked', val);
      });
      updateSubcatCheckbox(ci, si);
      updateCatCheckbox(ci);
      updateGlobalCheckbox();
      applyFilters();
      recalc();
    });

    $el.on('click', '#mc-clear-all', function () {
      const key = activeKey();
      if (!key) return;
      const data = DATA[key];
      const st = getModState(key);
      getAllModIds().forEach(id => {
        st.checked[id] = false;
        $(`#${id}`).prop('checked', false);
      });
      st.scalerVals = {};
      st.userInputVals = {};
      st.activeAffineId = null;
      dom.$sections.find('.mc-scaler-input').each(function () {
        const ci = $(this).data('ci');
        const si = $(this).data('si');
        const cat = data && data.categories[ci];
        if (!cat || !categoryMatchesAllowed(cat.name)) return;
        if (si !== undefined) {
          const sub = (cat.subcategories || [])[si];
          if (sub && sub.type === 'scaler') setScalerSubValue(ci, si, sub.scaleMin || 0, false);
        } else if (cat.type === 'scaler') {
          setScalerValue(ci, cat.scaleMin, false);
        }
      });
      dom.$sections.find('.mc-user-input-val').each(function () {
        const ci = parseInt($(this).data('ci'));
        const si = $(this).data('si') !== undefined ? parseInt($(this).data('si')) : undefined;
        const idx = $(this).data('idx') !== undefined ? parseInt($(this).data('idx')) : undefined;
        const cat = data && data.categories[ci];
        if (!cat) return;
        let storeKey;
        if (si !== undefined) {
          const sub = (cat.subcategories || [])[si];
          if (sub && sub.type === 'user_input') {
            const inputs = sub.user_inputs || (sub.user_input ? [sub.user_input] : []);
            storeKey = inputs.length > 1 ? `${ci}_${si}_${idx}` : `${ci}_${si}`;
          }
        } else {
          const inputs = cat.user_inputs || (cat.user_input ? [cat.user_input] : []);
          storeKey = inputs.length > 1 ? `${ci}_${idx}` : `${ci}`;
        }
        delete st.userInputVals[storeKey];
        $(this).val('');
        $(this).removeClass('mc-pos mc-neg mc-neu').addClass('mc-neu');
      });
      if (data) {
        data.categories.forEach((cat, ci) => {
          if (!categoryMatchesAllowed(cat.name)) return;
          $(`#mc-cat-check-${ci}`).prop('checked', false);
          (cat.subcategories || []).forEach((sub, si) => {
            $(`#mc-subcat-check-${ci}_${si}`).prop('checked', false);
          });
        });
      }
      dom.$selectAllCheckbox.prop('checked', false);
      applyFilters();
      recalc();
    });

    $el.on('click', '.mc-clear-cat', function () {
      clearCategory(parseInt($(this).data('ci')));
    });
    $el.on('click', '.mc-clear-sub', function () {
      clearSubcategory(parseInt($(this).data('ci')), parseInt($(this).data('si')));
    });

    $el.on('click', '.mc-selected-rm', function () {
      const key = activeKey();
      if (!key) return;
      const st = getModState(key);
      const id = $(this).data('id');
      st.checked[id] = false;
      $(`#${id}`).prop('checked', false);
      const parts = id.split('_');
      const ci = parseInt(parts[1]);
      if (parts[2] === 's') updateSubcatCheckbox(ci, parseInt(parts[3]));
      updateCatCheckbox(ci);
      updateGlobalCheckbox();
      applyFilters();
      recalc();
    });

    $el.on('click', '.mc-selected-rm-scaler', function () {
      const key = activeKey();
      if (!key) return;
      const st = getModState(key);
      const storeKey = $(this).data('storekey');
      if (storeKey) {
        delete st.userInputVals[storeKey];
        const $input = dom.$sections.find(`#mc-user-input-${storeKey}`);
        if ($input.length) {
          $input.val('');
          $input.removeClass('mc-pos mc-neg mc-neu').addClass('mc-neu');
        }
        const unitId = 'mc-user-input-unit-' + storeKey;
        dom.$sections.find(`#${unitId}`).removeClass('mc-pos mc-neg mc-neu').addClass('mc-neu');
      } else {
        const ci = parseInt($(this).data('ci'));
        const si = $(this).data('si') !== undefined ? parseInt($(this).data('si')) : undefined;
        const cat = DATA[key] && DATA[key].categories[ci];
        if (cat && cat.type === 'scaler') {
          setScalerValue(ci, cat.scaleMin || 0, false);
        }
      }
      applyFilters();
      recalc();
    });

    dom.$tabs.on('click', function () {
      const tab = $(this).data('tab');
      if (tab) switchMainTab(tab);
    });

    $el.find('#mc-add-btn').on('click', addCustomModifier);

    $el.find('#mc-clear-custom-btn').on('click', function() {
      state.customs = [];
      renderCustomTags();
      recalc();
    });
    
    dom.$base.on('input', recalc);
    dom.$basePct.on('input', recalc);
  })();

dom.$rpBtns.on('click', function () {
  const key = activeKey();
  if (!key) return;
  const rp = parseInt($(this).data('rp'));
  getModState(key).currentRP = rp;
  dom.$rpBtns.removeClass('mc-filter-active');
  $(this).addClass('mc-filter-active');
  renderSelectedList();
  recalc();
});

  fullClearUI();
  updateSelectMeta();
}