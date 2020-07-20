/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/* Staat je toe om sjablonen te maken die je in/uit kan klappen */
importScriptPage('ShowHide/code.js', 'dev');

// ============================================================
// BEGIN Dynamisch inklapbare div
 
// set up the words in your language
var UitklapDivHide = 'Inklappen';
var UitklapDivShow = 'Uitklappen';
 
// shows and hides content of Uitklap divs
// Parameters:
//     indexUitklapDiv: the index of Uitklap div to be toggled
function toggleUitklapDiv(indexUitklapDiv)
{
   var UitklapToggle = document.getElementById("UitklapToggle" + indexUitklapDiv);
   var UitklapFrame = document.getElementById("UitklapFrame" + indexUitklapDiv);
 
   if (!UitklapFrame || !UitklapToggle) {
       return false;
   }
 
   // if shown now
   if (UitklapToggle.firstChild.data == UitklapDivHide) {
       for (
               var UitklapChild = UitklapFrame.firstChild;
               UitklapChild != null;
               UitklapChild = UitklapChild.nextSibling
           ) {
           if (UitklapChild.className == 'UitklapContent') {
               UitklapChild.style.display = 'none';
           }
           if (UitklapChild.className == 'UitklapToggle') {
               UitklapChild.firstChild.data = UitklapDivShow;
           }
       }
 
   // if hidden now
   } else if (UitklapToggle.firstChild.data == UitklapDivShow) {
       for (
               var UitklapChild = UitklapFrame.firstChild;
               UitklapChild != null;
               UitklapChild = UitklapChild.nextSibling
           ) {
           if (UitklapChild.className == 'UitklapContent') {
               UitklapChild.style.display = 'block';
           }
           if (UitklapChild.className == 'UitklapToggle') {
               UitklapChild.firstChild.data = UitklapDivHide;
           }
       }
   }
}
 
// adds show/hide-button to navigation bars
function createUitklapDivToggleButton()
{
   var indexUitklapDiv = 0;
   // iterate over all < div >-elements
   for(
           var i=0; 
           UitklapFrame = document.getElementsByTagName("div")[i]; 
           i++
       ) {
       // if found a navigation bar
       if (UitklapFrame.className == "UitklapFrame" || UitklapFrame.className == "UitklapFrameNoClear") {
 
           indexUitklapDiv++;
           var UitklapToggle = document.createElement("a");
           UitklapToggle.className = 'UitklapToggle';
           UitklapToggle.setAttribute('id', 'UitklapToggle' + indexUitklapDiv);
           UitklapToggle.setAttribute('href', 'javascript:toggleUitklapDiv(' + indexUitklapDiv + ');');
 
           var UitklapToggleText = document.createTextNode(UitklapDivHide);
           UitklapToggle.appendChild(UitklapToggleText);
 
           // add NavToggle-Button as first div-element 
           // in < div class="UitklapFrame" >
           UitklapFrame.insertBefore(
               UitklapToggle,
               UitklapFrame.firstChild
           );
           UitklapFrame.setAttribute('id', 'UitklapFrame' + indexUitklapDiv);
       }
   }
   for(
       var i=1; 
       i<=indexUitklapDiv; 
       i++
   ) {
       toggleUitklapDiv(i);
   }
 
}
 
addOnloadHook( createUitklapDivToggleButton );
 
// EIND Dynamisch inklapbare div
// ============================================================
 

function monacoMainPageFix() {
    var nstab = document.getElementById("ca-nstab-main");
    if (nstab && wgUserLanguage == "en") {
        while (nstab.firstChild) nstab = nstab.firstChild;
        nstab.nodeValue = "Wiki van Dennis";
    }
}
if (wgPageName == "Wiki_van_Dennis" || wgPageName == "Overleg:Wiki_van_Dennis") {
    addOnloadHook(monacoMainPageFix);
}

function loggedOutTalkPage() {
  if (!wgUserName) {
    addPortletLink('p-personal', '', '', 'pt-userpage', '', '', document.getElementById('pt-login'));
    document.getElementById('pt-userpage').innerHTML = '<span style="color: #BC8F8F;">Niet aangemeld</span>';
    addPortletLink('p-personal', 'http://nl.dennis.wikia.com/wiki/Special:MyTalk', 'Overlegpagina IP-adres', 'pt-mytalk', 'Overlegpagina IP-adres [n]', 'n', document.getElementById('pt-login'));
    addPortletLink('p-personal', 'http://nl.dennis.wikia.com/wiki/Special:MyContributions', 'Bijdragen IP-adres', 'pt-mycontris', 'Bijdragen IP-adres [y]', 'y', document.getElementById('pt-login'));
  }
}