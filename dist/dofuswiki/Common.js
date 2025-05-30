/* Any JavaScript here will be loaded for all users on every page load. */

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