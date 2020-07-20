/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

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