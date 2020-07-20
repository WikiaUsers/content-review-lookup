/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

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

/***** Konfiguriert von Benutzer SVG *****/
 
// Entferne beim Hochladen die Lizenzauswahl „keine Vorauswahl“
 function remove_no_license() {
   if (wgPageName != "Spezial:Hochladen")
     return;
   var license = document.getElementById("wpLicense");
   if (!license)
     return;
   var options = license.getElementsByTagName("option");
   if (!options)
     return;
   license.removeChild(options[0]);
 }
 
 addOnloadHook(remove_no_license);

/* Nutzen von sysoponly, bureaucratonly und confirmedonly */

if ( wgUserGroups ) {
  for ( var g = 0; g < wgUserGroups.length; ++g ) {
    if ( wgUserGroups[g] == "sysop" ) {
      importStylesheet("MediaWiki:Sysop.css");
      addOnloadHook( function() {
        if ( !window.disableSysopJS ) {
          importScript("MediaWiki:Sysop.js");
        }
      } );
    } 
    else if ( wgUserGroups[g] == "bureaucrat" ) {
      importStylesheet("MediaWiki:Bureaucrat.css");
    }
  }
}

if( window.wgUserGroups ) {
  for(var i = 0; i < wgUserGroups.length; ++i) {
    if(wgUserGroups[i] === "autoconfirmed") {
  // importScript("MediaWiki:Confirmed.js");
      importStylesheet("MediaWiki:Confirmed.css");
      break;
    }
  }
}

/* Vorlage:USERNAME */

// Import [[MediaWiki:Onlyifuploading.js]] 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
      document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }

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