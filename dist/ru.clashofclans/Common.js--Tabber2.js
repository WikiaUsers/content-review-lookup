/* Any JavaScript here will be loaded for all users on every page load. */

function timeStamp_Tabber2_js() {
  return "2013.11.09 22:38 (UTC-8)";
}

function tabber2() {
  var div = document.getElementsByTagName('div');

  if (div.length < 1)
    return;

  for (var i = 0; i < div.length; i ++) {
    if (div[i].className == 'tabber2')
      createTabber2(div[i], i);
  }
}

addOnloadHook(tabber2);

function createTabber2(div, idx) {
  if (!div || div.tagName != 'DIV' || div.className != 'tabber2')
    return;

  div.id = '_tabber2-idx' + idx;

  var headers    = [];
  var bodies     = [];
  var tabs       = div.innerHTML.split('|-|');
  var defaultTab = 1;

  div.innerHTML = '';

  for (var i = 0; i < tabs.length; i ++) {
    var headerLoc = tabs[i].search('=');

    if (!headerLoc)
      headerLoc = tabs[i].length;

    headers[i] = tabs[i].substr(0, headerLoc);
    bodies[i]  = tabs[i].substr(headerLoc + 1);

    var headerElem = document.createElement('span');
    headerElem.id        = div.id + '-button-' + i;
    headerElem.className = '_tabber2-button';
    headerElem.innerHTML = headers[i];
    headerElem.setAttribute('onClick',
       'clickTabber2("' + div.id + '", ' + i + ');');
    div.appendChild(headerElem);
  }

  var br = document.createElement('br');
  div.appendChild(br);

  for (i = 0; i < tabs.length; i ++) {
    var bodyElem = document.createElement('div');
    bodyElem.id        = div.id + '-div-' + i;
    bodyElem.className = '_tabber2-div';
    bodyElem.innerHTML = bodies[i];
    div.appendChild(bodyElem);
  }

  div.className = 'tabber2a';
  div.numTabs   = tabs.length;

  var def = div.getAttribute('data-id');

  if (def && !isNaN(def) && parseInt(def) > 1 && parseInt(def) <= div.numTabs)
    defaultTab = parseInt(def);

  clickTabber2(div.id, defaultTab - 1);
}

function clickTabber2(divid, idx) {
   // console.log('clickTabber2: divid=' + divid + ', idx=' + idx);
   var div      = document.getElementById(divid);
   var selected = -1;
   var header;
   var body;

   for (var i = 0; i < div.numTabs; i ++) {
      if (document.getElementById(divid + '-button-' + i).className ==
         '_tabber2-button-click') {
         selected = i;
         break;
      }
   }

   if (selected == idx)
      return;

   if (selected > -1) {
      document.getElementById(divid + '-button-' + selected).className =
         '_tabber2-button';
      document.getElementById(divid + '-div-' + selected).className =
         '_tabber2-div';
   }

   document.getElementById(divid + '-button-' + idx).className = '_tabber2-button-click';
   document.getElementById(divid + '-div-' + idx).className = '_tabber2-div-click';
}