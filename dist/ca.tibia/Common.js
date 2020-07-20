/* Es carregarà per a tots els usuaris, i per a qualsevol pàgina, el codi JavaScript que hi haja després d'aquesta línia. */
/* Javascript copiat del wiki de Tibia en anglès, espero que faci el que jo em penso, ja ho ocmentaré i arreglaré si funciona */
/* Any JavaScript here will be loaded for all users on every page load. */
// Edit page tool selector
//  -> modified from http://commons.wikimedia.org/wiki/MediaWiki:Edittools.js

if(queryString('action')=='edit'||queryString('action')=='submit') addOnloadHook(customCharInsert)
function customCharInsert() {
  if(!window.wgCustomCharInsert||!wgUserName) return;
  var spec = document.getElementById('specialchars');
  var userp = document.createElement('p');
  userp.className = 'specialbasic';
  userp.id = 'Custom_Edittools'
  userp.style.display='none';
 
  for (var i=0;i<wgCustomCharInsert.length;i++) {
    var a = document.createElement('a');
    a.href='#';
    a.setAttribute('onclick', 'insertTags("' + wgCustomCharInsert[i].tagOpen + '","' + wgCustomCharInsert[i].tagClose + '","' + wgCustomCharInsert[i].sampleText + '"); return false;');
    a.appendChild(document.createTextNode(wgCustomCharInsert[i].tagOpen + wgCustomCharInsert[i].tagClose));
    userp.appendChild(a);
    if(i!=wgCustomCharInsert.length-1) userp.appendChild(document.createTextNode(' · '));
  }
  spec.appendChild(userp);
}
 
if(queryString('action')=='edit'||queryString('action')=='submit') addOnloadHook(edittoolsTabs)
function edittoolsTabs() {
  var spec = document.getElementById('specialchars');
  if(!spec) return;
  var sb = getElementsByClassName(spec,'p','specialbasic');
  if(sb.length<=1) return;
 
  var sel = document.createElement('select');
  sel.style.display = 'inline';
  sel.setAttribute('onchange','chooseCharSubset(selectedIndex)');
 
  for(var i=0;i<sb.length;i++) {
    var o = document.createElement('option');
    o.appendChild(document.createTextNode(sb[i].id.replace(/_/g,' ')));
    sel.appendChild(o);
  }
  spec.insertBefore(sel,spec.firstChild.nextSibling);
}
 
function chooseCharSubset(seld) {
 var spec = document.getElementById('specialchars');
 var sb = getElementsByClassName(spec,'p','specialbasic');
 for (var i = 0; i < sb.length ; i++) {
  sb[i].style.display = i == seld ? 'inline' : 'none';
 }
}
 
function queryString(p) {
  var re = RegExp('[&?]' + p + '=([^&]*)');
  var matches;
  if (matches = re.exec(document.location)) {
    try { 
      return decodeURI(matches[1]);
    } catch (e) {
    }
  }
  return null;
}