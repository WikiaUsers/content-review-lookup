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
}

function UserNameReplace() {
  if ( typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace )
    return;
  $('span.insertusername').text(wgUserName);
}
$(UserNameReplace);

/* Quiz */
function Auswertung(id1, id2, id3, id4, id5) {
var richtigeAntwort= "x";
var currentcol= "";
var selectedcol= "";
var cols=document.getElementsByName(id3);

 for (var i = 0; i < cols.length; i++) {
   currentcol = cols[i];
   if (currentcol.value == richtigeAntwort) {
     currentcol.parentElement.style.color = "#0FA90F";
   }
   if (currentcol.checked) {
     selectedcol = currentcol.value;
   }
  }

 if (selectedcol == richtigeAntwort) {
    document.getElementById(id1).style.display = 'block';
  } else {
    document.getElementById(id2).style.display = 'block';
  }
  document.getElementById(id5).style.display = 'block';
  for (var i = 0; i < cols.length; i++) {
    cols[i].disabled = true;
  }
  document.getElementById(id4).style.visibility='hidden';
}

function AuswertungCheckbox(id1, id2, id3, id4, id5) {
var richtigeAntwort= "x";
var currentcol= "";
var selectedcol= "";
var fehler= 0;
var cols=document.getElementsByName(id3);

 for (var i = 0; i < cols.length; i++) {
   currentcol = cols[i];
   if (currentcol.value == richtigeAntwort) {
     currentcol.parentElement.style.color = "#0FA90F";
   }
   if (currentcol.checked) {
     if (currentcol.value == richtigeAntwort) {
        selectedcol = currentcol.value;
     } else {
       fehler = 1;
     } 
   } else {
     if (currentcol.value == richtigeAntwort) {
       fehler = 1;
     }  
   }
 }

 if (selectedcol == richtigeAntwort) {
    if (fehler == 0) {
      document.getElementById(id1).style.display = 'block';
    } else {
      document.getElementById(id2).style.display = 'block';
    }
  } else {
    document.getElementById(id2).style.display = 'block';
  }
  document.getElementById(id5).style.display = 'block';
  for (var i = 0; i < cols.length; i++) {
    cols[i].disabled = true;
  }
  document.getElementById(id4).style.visibility='hidden';
}