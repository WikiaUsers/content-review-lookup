 // Optionen für das Sonderzeichenmenü in [[MediaWiki:Edittools]]
 // wird in [[MediaWiki:Monobook.js]] ganz unten eingebunden
 
 function addCharSubsetMenu() {
  var specialchars = document.getElementById('specialchars');
 
  if (specialchars) {
   var menu = "<select style=\"display:inline\" onChange=\"chooseCharSubset(selectedIndex)\">";
   menu += "<option>Standard</option>";
   menu += "<option>Smilies</option>";
   menu += "<option>IPA-Lautschrift</option>";
   menu += "<option>Lateinisch</option>";
   menu += "<option>AHD</option>";
   menu += "<option>Altenglisch</option>";
   menu += "<option>Altgriechisch</option>";
   menu += "<option>Arabisch</option>";
   menu += "<option>DMG-Umschrift</option>";
   menu += "<option>Esperanto</option>";
   menu += "<option>Estnisch</option>";
   menu += "<option>Französisch</option>";
   menu += "<option>Galicisch</option>";
   menu += "<option>Griechisch</option>";
   menu += "<option>Hawaiianisch</option>";
   menu += "<option>Isländisch</option>";
   menu += "<option>Italienisch</option>";
   menu += "<option>Jiddisch</option>";
   menu += "<option>Katalanisch</option>";
   menu += "<option>Kroatisch</option>";
   menu += "<option>Kyrillisch</option>";
   menu += "<option>Lettisch</option>";
   menu += "<option>Litauisch</option>";
   menu += "<option>Maltesisch</option>";
   menu += "<option>Pinyin</option>";
   menu += "<option>Polnisch</option>";
   menu += "<option>Portugiesisch</option>";
   menu += "<option>Romanisch</option>";
   menu += "<option>Rumänisch</option>";
   menu += "<option>Serbisch</option>";
   menu += "<option>Skandinavisch</option>";
   menu += "<option>Slowakisch</option>";
   menu += "<option>Spanisch</option>";
   menu += "<option>Tschechisch</option>";
   menu += "<option>Türkisch</option>";
   menu += "<option>Ungarisch</option>";
   menu += "<option>Vietnamesisch</option>";
   menu += "</select>";
   specialchars.innerHTML = menu + specialchars.innerHTML;
 
 // Standard-CharSubset
    chooseCharSubset(0);
   }
 }
 
 // CharSubset-Auswahl
 function chooseCharSubset(s) {
  var l = document.getElementById('specialchars').getElementsByTagName('p');
  for (var i = 0; i < l.length ; i++) {
    l[i].style.display = i == s ? 'inline' : 'none';
 //    l[i].style.visibility = i == s ? 'visible' : 'hidden';
   }
 }
 
 // Menü-Einfügung
 function customizeJedipedia() {
  addCharSubsetMenu();
 }
 
 addOnloadHook(customizeJedipedia);