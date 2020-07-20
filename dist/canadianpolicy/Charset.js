//<pre>

/* add menu for selecting subsets of secial characters */
/***** must match MediaWiki:Edittools *****/

function addCharSubsetMenu() {
  var specialchars = document.getElementById('specialchars');

  if (specialchars) {
    var menu = "<select id=\"charsetBox\" style=\"display:inline\" onkeyup=\"chooseCharSubset(selectedIndex)\" onChange=\"chooseCharSubset(selectedIndex)\">";
    menu += "<option>More characters</option>";
    menu += "<option>Latin/Roman</option>";
    menu += "<option>Greek</option>";
    menu += "<option>Cyrillic</option>";
    menu += "<option>Arabic</option>";
    menu += "<option>Catalan</option>";
    menu += "<option>Croatian</option>";
    menu += "<option>Czech & Slovak</option>";
    menu += "<option>Dutch/Frisian</option>";
    menu += "<option>Esperanto</option>";
    menu += "<option>Estonian</option>";
    menu += "<option>French</option>";
    menu += "<option>German</option>";
    menu += "<option>Hawaiian</option>";
    menu += "<option>Hebrew</option>";
    menu += "<option>Hieroglyph</option>";
    menu += "<option>Hungarian</option>";
    menu += "<option>Icelandic</option>";
    menu += "<option>Indo-European</option>";
    menu += "<option>Irish</option>";
    menu += "<option>Italian</option>";
    menu += "<option>Latvian</option>";
    menu += "<option>Lithuanian</option>";
    menu += "<option>Maltese</option>";
    menu += "<option>Navajo & Apache</option>";
    menu += "<option>Old English</option>";
    menu += "<option>Pinyin</option>";
    menu += "<option>Polish</option>";
    menu += "<option>Portuguese</option>";
    menu += "<option>Rōmaji</option>";
    menu += "<option>Romanian</option>";
    menu += "<option>Scandinavian</option>";
    menu += "<option>Sorbian</option>";
    menu += "<option>Spanish</option>";
    menu += "<option>Thai</option>";
    menu += "<option>Turkic</option>";
    menu += "<option>Vietnamese</option>";
    menu += "<option>Welsh</option>";
    menu += "<option>Yiddish</option>";
    menu += "<option>IPA</option>";
    menu += "<option>Math/TeX</option>";
    menu += "</select>";
    specialchars.innerHTML = menu + specialchars.innerHTML;

    /* default subset - try to use a cookie some day */
    chooseCharSubset(0);
  }
}

/* select subsection of special characters */
function chooseCharSubset(s) {
  var l = document.getElementById('specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
    l[i].style.visibility = i == s ? 'visible' : 'hidden';
  }
}

addLoadEvent(addCharSubsetMenu);

//</pre>