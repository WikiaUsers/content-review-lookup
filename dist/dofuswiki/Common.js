/* Any JavaScript here will be loaded for all users on every page load. */
console.log("Start of Common.JS");

window.highlight = {
    selectAll: true,
    sysop: 'green',
    bot: 'grey',
    users: {
 
    }
};

// Onload stuff
 var firstRun = true;
 function loadFunc() {
    if (firstRun) {
        firstRun = false;
    } else {
        return;
    }
    // DEPRECATED
    if (document.getElementById('infoboxinternal') !== null && document.getElementById('infoboxend') !== null) document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Hide]</a>';
    if (document.getElementById('mp3-navlink') !== null) {
        document.getElementById('mp3-navlink').onclick = onArticleNavClick;
        document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
    }
    if (window.storagePresent) initVisibility();
    fillEditSummaries();
    // fillDeleteReasons();
    fillPreloads();
    // Disable   substUsername();
    // Disable   substUsernameTOC();
    rewriteTitle();
    showEras('title-epicons');
    showEras('title-shortcut');
    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;
    if (!bodyClass || (bodyClass.indexOf('page-') == -1)) {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }
    if (typeof(onPageLoad) != "undefined") onPageLoad();
 }

 function infoboxToggle() {
    var page = window.pageName.replace(/\W/g, '_');
    var nowShown;
    if (document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
        document.getElementById('infoboxinternal').style.display = 'none';
        document.getElementById('infoboxtoggle').innerHTML = '[Show]';
        nowShown = false;
    } else {
        document.getElementById('infoboxinternal').style.display = 'block';
        document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
        nowShown = true;
    }
    if (window.storagePresent) {
        var storage = globalStorage[window.location.hostname];
        storage.setItem('infoboxshow-' + page, nowShown);
    }
 }

// Various preloads menus
 function fillEditSummaries() {
    var label = document.getElementById("wpSummaryLabel");
    if (label === null) return;
    var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
    comboString += "</select><br />";
    label.innerHTML = comboString + label.innerHTML;
    requestComboFill('stdSummaries', 'Template:Stdsummaries');
 }
 
 function onStdSummaryChange() {
    var combo = document.getElementById("stdSummaries");
    var value = combo.options[combo.selectedIndex].value;
    if (value !== "") document.getElementById("wpSummary").value = value;
 }
 
 function fillDeleteReasons() {
    var label = document.getElementById("wpReason");
    if (label === null) return;
    label = document.getElementById("contentSub");
    if (label === null) return;
    var comboString = "<br /><select id='stdReasons' onchange='onStdReasonChange()'>";
    comboString += "</select>";
    label.innerHTML += comboString;
    requestComboFill('stdReasons', "Template:Stdreasons");
 }
 
 function onStdReasonChange() {
    var combo = document.getElementById("stdReasons");
    var value = combo.options[combo.selectedIndex].value;
    if (value !== "") document.getElementById("wpReason").value = value;
 }
 function fillPreloads() {
    var div = document.getElementById("lf-preload");
    if (div === null) return;
    div.style.display = 'block';
    var span = document.getElementById('lf-preload-cbox');
    var comboString = "<select id='stdPreloads' onchange='onPreloadChange()'>";
    comboString += "</select>";
    span.innerHTML = comboString;
    span = document.getElementById('lf-preload-pagename');
    span.innerHTML = '<input type="text" class="textbox" />';
    span = document.getElementById('lf-preload-button');
    span.innerHTML = '<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />';
    requestComboFill('stdPreloads', "Template:Stdpreloads");
 }
 
 function doCustomPreload() {
    doPreload(document.getElementById('lf-preload-pagename').getElementsByTagName('input')[0].value);
 }
 
 function onPreloadChange() {
    var combo = document.getElementById("stdPreloads");
    var value = combo.options[combo.selectedIndex].value;
    if (value === "") return;
    value = "Template:" + value + "/preload";
    value = value.replace(" ", "_");
    doPreload(value);
 }

// BEGIN JavaScript title rewrite
 function rewriteTitle() {
    if (typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) return;
    var titleDiv = document.getElementById('title-meta');
    if (titleDiv === null) return;
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    var node = firstHeading.childNodes[0];
    // new, then old!
    firstHeading.replaceChild(cloneNode, node);
    cloneNode.style.display = "inline";
    var titleAlign = document.getElementById('title-align');
    firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
 }

 function showEras(className) {
    if (typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS) return;
    var titleDiv = document.getElementById(className);
    if (titleDiv === null || titleDiv === undefined) return;
    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
 }
// END JavaScript title rewrite

 function initVisibility() {
    var storage = globalStorage[window.location.hostname];
    var page = window.pageName.replace(/\W/g,'_');
    var show = storage.getItem('infoboxshow-' + page);
    if (show == 'false') infoboxToggle();
 }

 function onArticleNavClick() {
    var div = document.getElementById('mp3-nav');
    if (div.style.display == 'block') {
        div.style.display = 'none';
    } else {
        div.style.display = 'block';
    }
 }

addOnloadHook(loadFunc);

// YAHOO.util.Event.onDOMReady(loadFunc);
 function forcePreview() {
    if (mw.config.values.wgUserName !== null || mw.config.values.wgAction != 'edit') return;
    // (wgAction == 'edit')
    // if (new String(wgUserGroups).indexOf('autoconfirmed') == -1)
    var saveButton = document.getElementById('wpSave');
    if (!saveButton) return;
    saveButton.disabled = true;
    saveButton.value += ' (use preview first)';
    // saveButton.value = 'Save page (use preview first)';
    saveButton.style.fontWeight = 'normal';
    document.getElementById('wpPreview').style.fontWeight = 'bold';
 }
 addOnloadHook(forcePreview);

/* Filter Buttons Logic*/
var questFilterButton = document.querySelector('.filterButton.questFilter');
if (questFilterButton) questFilterButton.addEventListener('click', toggleQuestDrops);

function toggleQuestDrops() {
  const table = document.querySelector('.monsterDropsTable');
  const allRows = table.getElementsByTagName('tr');
  const button = document.querySelector('.filterButton.questFilter');
  let nonQuestVisible = false;

  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    if (!row.classList.contains('header') && !row.classList.contains('questDrop') && !row.classList.contains('dnone')) {
      nonQuestVisible = true;
      break;
    }
  }

  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    if (row.classList.contains('header')) {
      continue;
    }
    if (nonQuestVisible) {
      if (!row.classList.contains('questDrop')) {
        row.classList.add('dnone');
      } else {
        row.classList.remove('dnone');
      }
      button.classList.add('filterEnabled');
    } else {
      if (row.classList.contains('dnone')) {
        row.classList.remove('dnone');
        row.classList.add('highlight');
        setTimeout(() => row.classList.remove('highlight'), 1000);
      }
      button.classList.remove('filterEnabled');
    }
  }
}
/* Collapsible menu clickable anywhere */
console.log("Starting with registering a Collapsible Element Listeners");
console.log(document.querySelectorAll('.mw-collapsible'));
registerCollapsibleListeners();

function registerCollapsibleListeners() {
    var bound = new WeakSet();

    function bind(container) {
        if (bound.has(container)) return;

        var toggle = container.querySelector('.mw-collapsible-toggle');
        if (!toggle) return;

        var th = toggle.closest('th');
        var content = th ? th : toggle.nextElementSibling;
        if (!content) return;

        if (content.getAttribute('data-collapsible-bound') === '1') return;
        content.setAttribute('data-collapsible-bound', '1');

        content.style.cursor = 'pointer';

        content.addEventListener('click', function (e) {
            if (e.target.closest('a')) return;
            if (e.target.closest('.copy-to-clipboard-button')) return;
            var sel = window.getSelection();
            if (sel && sel.toString().trim() !== "") return;
            toggle.click();
        });

        bound.add(container);
        console.log('Collapsible button registered');
    }

    function scan() {
        document.querySelectorAll('.mw-collapsible').forEach(bind);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scan);
    } else {
        scan();
    }

    if ('MutationObserver' in window) {
        var mo = new MutationObserver(scan);
        mo.observe(document.documentElement, { childList: true, subtree: true });
    } else {
        var tries = 0;
        var id = setInterval(function () {
            scan();
            if (++tries > 20) clearInterval(id);
        }, 250);
    }
}

/******************/
/* Dynamic levels */
/******************/

registerEffectLevelDropdowns();
function registerEffectLevelDropdowns() {
  var bound = new WeakSet();

  function parseMaxLevel(th) {
    for (var i = 0; i < th.classList.length; i++) {
      var m = th.classList[i].match(/^maxLevel-(\d+)$/);
      if (m) return parseInt(m[1], 10);
    }
    return null;
  }

  function setDisplay(el, show) {
    if (show) {
      el.style.display = 'revert';
      if (el.style.display === '') el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  }

  function showLevelInTable(table, level) {
    var levelElems = table.querySelectorAll('[class*="level-"]');
    levelElems.forEach(function (el) {
      var nums = Array.from(el.classList)
        .map(function (c) { return c.startsWith('level-') ? parseInt(c.slice(6), 10) : NaN; })
        .filter(function (n) { return Number.isInteger(n); });
      if (nums.length === 0) return;
      setDisplay(el, nums.includes(level));
    });
  }

  function buildDropdown(max, onChange) {
    var wrap = document.createElement('span');
    wrap.style.marginLeft = '0.5em';
    var label = document.createElement('label');
    label.textContent = 'Level: ';
    label.style.fontWeight = 'normal';
    label.style.marginRight = '0.25em';
    var sel = document.createElement('select');
    for (var i = max; i >= 1; i--) {
      var opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = String(i);
      sel.appendChild(opt);
    }
    sel.value = String(max);
    sel.addEventListener('change', function () { onChange(parseInt(sel.value, 10)); });
    wrap.appendChild(label);
    wrap.appendChild(sel);
    return { wrap: wrap, sel: sel };
  }

  function bind(th) {
    if (bound.has(th)) return;
    var max = parseMaxLevel(th);
    if (!max) return;
    var table = th.closest('.infobox-subtable') || th.closest('table') || th.parentElement;
    if (!table) return;
    var built = buildDropdown(max, function (lvl) { showLevelInTable(table, lvl); });
    th.appendChild(built.wrap);
    showLevelInTable(table, max);
    bound.add(th);
  }

  function scan() {
    document.querySelectorAll('th.effectLevel').forEach(bind);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
  } else {
    scan();
  }

  if ('MutationObserver' in window) {
    var mo = new MutationObserver(scan);
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } else {
    var tries = 0;
    var id = setInterval(function () {
      scan();
      if (++tries > 20) clearInterval(id);
    }, 250);
  }
}


console.log("END of Common.JS");