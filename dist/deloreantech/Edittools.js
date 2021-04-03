/* <source lang="javascript"><nowiki> Top of Javascript */
// Drop down box for the Special character menu in [[MediaWiki:Edittools]]
// will be called from [[MediaWiki:Common.js]].
// Adapted from:
// http://commons.wikimedia.org/wiki/MediaWiki:Edittools.js

// Switch for people that don't want it
if (load_edittools == true)
{

function addCharSubsetMenu() {
 var specialchars = document.getElementById('specialchars');
 
 if (specialchars) {
  var menu = "<select style=\"display:inline\" onChange=\"chooseCharSubset(selectedIndex)\">";
  menu += "<option>Standard</option>";
  menu += "<option>Latin</option>";
  menu += "<option>Greek</option>";
  menu += "<option>Cyrillic</option>";
  menu += "<option>IPA</option>";
  menu += "<option>Arabic</option>";
  menu += "<option>Catalan</option>";
  menu += "<option>Czech</option>";
  menu += "<option>Devanāgarī</option>";
  menu += "<option>Esperanto</option>";
  menu += "<option>Estonian</option>";
  menu += "<option>French</option>";
  menu += "<option>German</option>";
  menu += "<option>Hawaiian</option>";
  menu += "<option>Hebrew</option>";
  menu += "<option>Hungarian</option>";
  menu += "<option>Icelandic</option>";
  menu += "<option>Italian</option>";
  menu += "<option>Latvian</option>";
  menu += "<option>Lithuanian</option>";
  menu += "<option>Maltese</option>";
  menu += "<option>Old English</option>";
  menu += "<option>Pinyin</option>";
  menu += "<option>Polish</option>";
  menu += "<option>Portuguese</option>";
  menu += "<option>Romaji</option>";
  menu += "<option>Romanian</option>";
  menu += "<option>Scandinavian</option>";
  menu += "<option>Serbian</option>";
  menu += "<option>Spanish</option>";
  menu += "<option>Turkish</option>";
  menu += "<option>Vietnamese</option>";
  menu += "<option>Welsh</option>";
  menu += "<option>Yiddish</option>";
  menu += "</select>";
  specialchars.innerHTML = menu + specialchars.innerHTML;
 
  // Standard-CharSubset
  chooseCharSubset(0);
 }
}
 
// CharSubset selection
function chooseCharSubset(s) {
 var l = document.getElementById('specialchars').getElementsByTagName('p');
 for (var i = 0; i < l.length ; i++) {
  l[i].style.display = i == s ? 'inline' : 'none';
  // l[i].style.visibility = i == s ? 'visible' : 'hidden';
 }
}
 
// Menu insertion
if (window.addEventListener) 
  window.addEventListener("load", addCharSubsetMenu, false);
else if (window.attachEvent) 
  window.attachEvent("onload", addCharSubsetMenu);

}
/* Bottom of Javascript </nowiki></source>*/