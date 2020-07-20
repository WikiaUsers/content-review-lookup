//================================================================================
//*** Dynamic Navigation Bars (Orginal von Wikipedia)
 
// set up the words in your language
var NavigationBarHide = 'Einklappen';
var NavigationBarShow = 'Ausklappen';
 
// set up max count of Navigation Bars on page,
// if there are more, all will be hidden
// NavigationBarShowDefault = 0; // all bars will be hidden
// NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
if (typeof NavigationBarShowDefault == 'undefined' ) {
    var NavigationBarShowDefault = 1;
}
 
// adds show/hide-button to navigation bars
addOnloadHook(function() {
	// shows and hides content and picture (if available) of navigation bars
	// Parameters:
	//     indexNavigationBar: the index of navigation bar to be toggled
	function toggleNavigationBar(indexNavigationBar)
	{
	   var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
	   var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
	   if (!NavFrame || !NavToggle) {
		   return false;
	   }
 
	   // if shown now
	   if (NavToggle.firstChild.data == NavigationBarHide) {
		   for (
				   var NavChild = NavFrame.firstChild;
				   NavChild != null;
				   NavChild = NavChild.nextSibling
			   ) {
			   if (NavChild.className == 'NavPic') {
				   NavChild.style.display = 'none';
			   }
			   if (NavChild.className == 'NavContent') {
				   NavChild.style.display = 'none';
			   }
			   if (NavChild.className == 'NavToggle') {
				   NavChild.firstChild.data = NavigationBarShow;
			   }
		   }
 
	   // if hidden now
	   } else if (NavToggle.firstChild.data == NavigationBarShow) {
		   for (
				   var NavChild = NavFrame.firstChild;
				   NavChild != null;
				   NavChild = NavChild.nextSibling
			   ) {
			   if (NavChild.className == 'NavPic') {
				   NavChild.style.display = 'block';
			   }
			   if (NavChild.className == 'NavContent') {
				   NavChild.style.display = 'block';
			   }
			   if (NavChild.className == 'NavToggle') {
				   NavChild.firstChild.data = NavigationBarHide;
			   }
		   }
	   }
	}
 
	function toggleNavigationBarFunction(indexNavigationBar) {
		return function() {
			toggleNavigationBar(indexNavigationBar);
			return false;
		};
	}
 
   var indexNavigationBar = 0;
   // iterate over all < div >-elements
   var divs = document.getElementsByTagName("div");
   for (var i=0;  i<divs.length; i++) {
       var NavFrame = divs[i];
       // if found a navigation bar
       if (NavFrame.className == "NavFrame") {
 
           indexNavigationBar++;
           var NavToggle = document.createElement("a");
           NavToggle.className = 'NavToggle';
           NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
           NavToggle.setAttribute('href', '#');
		   NavToggle.onclick = toggleNavigationBarFunction(indexNavigationBar);
 
           var NavToggleText = document.createTextNode(NavigationBarHide);
           NavToggle.appendChild(NavToggleText);
 
           // add NavToggle-Button as first div-element
           // in < div class="NavFrame" >
           NavFrame.insertBefore(
               NavToggle,
               NavFrame.firstChild
           );
           NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
       }
   }
   // if more Navigation Bars found than Default: hide all
   if (NavigationBarShowDefault < indexNavigationBar) {
       for(
               var i=1;
               i<=indexNavigationBar;
               i++
       ) {
           toggleNavigationBar(i);
       }
   }
});

//================================================================================
//*** Vorlagen einfügen mit Editbutton

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/2/29/Button_user.png",
     "speedTip": "Vorlage Char einfügen",
     "tagOpen": "\{\{Char\r| Charaktername = ",
     "tagClose": "\r| Primärklasse = \r| Sekundärklasse = \r| Stufe = \r| Geburtstag = \r| Prophecies = \r| Factions = \r| Nightfall = \r| Eye of the North = \r| Waffe1 = \r| Waffe1Name = \r| Schild1 = \r| Schild1Name = \r| Schild1Typ = \r| Waffe2 = \r| Waffe2Name = \r| Schild2 = \r| Schild2Name = \r| Schild2Typ = \r| Waffe3 = \r| Waffe3Name = \r| Schild3 = \r| Schild3Name = \r| Schild3Typ = \r| Rüstung = \r| Rüstung2 = \r| Bild = \r| Bild2 = \r| Navileiste = \r| Benutzer = \r| Account = \r\}\}",
     "sampleText": "<!---Erklärungen findet ihr unter Vorlage:Char-->"}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://www.guildwiki.de/gwiki/skins/common/images/button_gwiki2-attrib.png",
     "speedTip": "Attribute-Box einfügen",
     "tagOpen": "\{\{Attributebox Attributebox | Primärklasse | Zweitklasse<!--jeweils mit Kürzel oder ausgeschrieben (das Wort Zweitklasse löschen, wenn egal)--> ",
     "tagClose": "\r | Attributname1 | 12 + 1 + 2<!-- Attribut mit Kopfteilbonus als erstes, danach nach Attributsrang absteigend! Nicht benötigte Zeilen entfernen! Erste Zahl=Normalrang; Zweite Zahl=Kopfteilbonus; Dritte Zahl=Rune -->\r| Attributname2 | 8 + 1 \r| Attributname3 | 7 + 1 \r| Attributname4 | 6 \r| Attributname5 | 5 \r| Attributname6 | 4 \r| Attributname7 | 3 \r| Attributname8 | 2\r| Attributname9 | 1 \r\}\}",
     "sampleText": ""}

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://www.guildwiki.de/gwiki/skins/common/images/button_gwiki2-build.png",
     "speedTip": "Fertigkeiten-Leiste einfügen",
     "tagOpen": "\{\{Fertigkeitenleistebox",
     "tagClose": "|1|2|3|4|5|6|7|8\}\}",
     "sampleText": ""}

//
// Entfernt die Auswahl "Keine Lizenz" aus dem Hochladen-Menü
//
addOnloadHook(function() {
   if ( wgTitle != 'Hochladen' || wgNamespaceNumber != -1)    return;
 
   try {
       var node = document.getElementById("wpLicense");
       node.remove(0);
    } catch(e) {
       
    }
});