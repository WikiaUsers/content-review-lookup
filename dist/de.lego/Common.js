/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 


importScriptPage('ShowHide/code.js', 'dev');

var ShowHideConfig = { 
    autoCollapse: 3, 
    userLang: false, 
    en: {
	show: "anzeigen",
	hide: "ausblenden",
	showAll: "alle anzeigen",
	hideAll: "alle ausblenden"
    }
};

/** Username replace function ([[Template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by User:Splarka
  * New version by User:Spang
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    var n = YAHOO.util.Dom.getElementsByClassName('insertusername', 'span', document.getElementById('bodyContent'));
    for ( var x in n ) {
       n[x].innerHTML = wgUserName;
    }
 }
 addOnloadHook(UserNameReplace);