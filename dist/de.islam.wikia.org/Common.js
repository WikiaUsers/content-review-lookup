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

// Originalskript von: http://de.wikipedia.org/wiki/Benutzer:PDD/markAdmins.js

jQuery(document).ready(function() {
 
   // Jede der folgenden Variablen kann in der eigenen monobook.js/vector.js/common.js vorbelegt werden.
   // Getestet wird jeweils die Ausnahme, Standard ist jeweils das Gegenteil davon.
   var markadmins       = true;
   var markcomadmins    = true;
   var markexadmins     = true;
   var markarbcom       = true;
   var markoversight    = true;
   var markcheckuser    = true;
   var marksubpages     = true;
   var dontmarkmyself   = true;
 
   // Die Markierungen dürfen nie leer sein, das wird hier sichergestellt.
   var markatxt         = 'A';
   var markbureautxt    = 'B';
   var markstewtxt      = 'S';
   var markrenatxt      = 'A-Ren';
   var markcomatxt      = 'Com-A';
   var markexatxt       = 'Ex-A';
   var markexbureautxt  = 'Ex-B';
   var markoversighttxt = 'OS';
   var markcheckusertxt = 'CU';
   var markombudsmantxt = 'Omb';
   var markarbcomtxt    = 'SG';
 
   // Liste der besonderen User
   var admins        = new Array("Supermohamed","Saadia_b);
   var bureaucrats   = new Array("Supermohamed");
   var stewards      = new Array("");
   var renadmins     = new Array("");
   var comadmins     = new Array("");
   var exadmins      = new Array("");
   var exbureaucrats = new Array("");
   var oversight     = new Array("");
   var checkuser     = new Array("");
   var ombudsman     = new Array("");
   var arbcom        = new Array("");
   var admarbcom     = new Array("");
 
   var isSpecial        = mw.config.get('wgCanonicalNamespace') == "Special";
   var isHistory        = mw.config.get('wgAction') == 'history';
   var isUserpage       = mw.config.get('wgCanonicalNamespace') == "User";
   var isUserpage       = isUserpage || mw.config.get('wgCanonicalNamespace') == "User_talk";
   var isTalk           = mw.config.get('wgNamespaceNumber') % 2 == 1;
   var isProject        = mw.config.get('wgCanonicalNamespace') == "Project";
   var isFile           = mw.config.get('wgCanonicalNamespace') == "File";
   var isHelp           = mw.config.get('wgCanonicalNamespace') == "Help";
   var isDiff           = mw.util.getParamValue('diff') !== null;
  
   var admins_str        = '|'+admins.join('|')+'|'; 
   var bureaucrats_str   = '|'+bureaucrats.join('|')+'|';
   var stewards_str      = '|'+stewards.join('|')+'|';
   var renadmins_str     = '|'+renadmins.join('|')+'|';
   var comadmins_str     = '|'+comadmins.join('|')+'|';
   var exadmins_str      = '|'+exadmins.join('|')+'|';
   var exbureaucrats_str = '|'+exbureaucrats.join('|')+'|';
   var oversight_str     = '|'+oversight.join('|')+'|';
   var checkuser_str     = '|'+checkuser.join('|')+'|';
   var ombudsman_str     = '|'+ombudsman.join('|')+'|';
   var arbcom_str        = '|'+arbcom.join('|')+'|';
   var admarbcom_str     = '|'+admarbcom.join('|')+'|';
  
   if (isSpecial || isHistory || isUserpage || isTalk || isProject || isFile || isHelp || isDiff) {
      var i;
      var aNode;
      var allanchors = document.getElementsByTagName("A");
      var allanchorsuser = new Array();
      var followupmark;
      var searchExp = /\/wiki\/Benutzer(in)?([ _]Diskussion)?:(.+)/;
      var searchExpTalk = /[ _]Diskussion:/;
      var marker;
      var mainpageanchor;
      var SGSpecial;
 
      mw.util.addCSS('span.adminMark { font-weight: bold; }');
 
      for (i=0; i < allanchors.length; i++) {
         aNode = allanchors[i];
         mainpageanchor = true;
         talkpageanchor = false;
         SGSpecial = false;
         // if it's a link to a user
         if ((href = aNode.getAttribute("href")) && (searchExp.exec(href) != null)) {
             currUser = searchExp.exec(href)[3];
             /* if (isUserpage) */ currUserClean = currUser.replace(/\/.*/,'');
             if (currUserClean != currUser) mainpageanchor = false;
             if (searchExpTalk.exec(href) != null) talkpageanchor = true;
 
             if (mainpageanchor) allanchorsuser[i] = currUserClean;
             else allanchorsuser[i] = "";
 
             followupmark = false;
             if (i>0)
                   if ((currUserClean == allanchorsuser[i-1]) && talkpageanchor)
                         followupmark = true;
 
             currUser= "|" + currUserClean + "|";
             marker = new Array();
 
             if (admarbcom_str.indexOf(currUser) != -1) {
                 SGSpecial = true;
                 if (markarbcom || markadmins) marker.push(markarbcomtxt + "-" + markatxt);
             }
 
             if (markadmins && !SGSpecial) {
                // don't mark SG-only Adm twice
                if (!(admarbcom_str.indexOf(currUser) != -1)) {
                   // is this user an admin?
                   if (admins_str.indexOf(currUser) != -1) marker.push(markatxt);
                }
                // is this user a renamed admin?
                if (renadmins_str.indexOf(currUser) != -1) marker.push(markrenatxt);
                // is this user a steward?
                if (stewards_str.indexOf(currUser) != -1) marker.push(markstewtxt);
                // is this user an ombudsman?
                if (ombudsman_str.indexOf(currUser) != -1) marker.push(markombudsmantxt);
                // is this user a bureaucrat?
                if (bureaucrats_str.indexOf(currUser) != -1) marker.push(markbureautxt);
             }
 
             if (markoversight) {
                // does this user have oversight rights?
                if (oversight_str.indexOf(currUser) != -1) marker.push(markoversighttxt);
             }
 
             if (markcheckuser) {
                // does this user have checkuser rights?
                if (checkuser_str.indexOf(currUser) != -1) marker.push(markcheckusertxt);
             }
 
             if (markarbcom && !SGSpecial) {
                // is this user an arbcom member?
                if (arbcom_str.indexOf(currUser) != -1) marker.push(markarbcomtxt);
             }
 
             if (markcomadmins) {
                // is this user a commons admin?
                if (comadmins_str.indexOf(currUser) != -1) marker.push(markcomatxt);
             }
 
             if (markexadmins) {
                // was this user an admin?
                if (exadmins_str.indexOf(currUser) != -1) marker.push(markexatxt);
                // was this user a bureaucrat?
                if (exbureaucrats_str.indexOf(currUser) != -1) marker.push(markexbureautxt);
             }
 
             // don't mark followups
             if (!followupmark)
             // don't mark certain pages, except link to user main page
             if (mainpageanchor ||
                 (marksubpages && (mw.config.get('wgCanonicalSpecialPageName') != "Prefixindex")
                               && (mw.config.get('wgCanonicalSpecialPageName') != "Allpages")) )
             // check finished, now append node
             if ((marker.length > 0) && !(dontmarkmyself && (currUserClean == mw.config.get('wgUserName')))) {
                var aMark = document.createElement("span");
                aMark.className = "adminMark";
 
                var aMarkText = document.createTextNode(" (" + marker.join("/") + ")");
                aMark.appendChild(aMarkText);
                aNode.appendChild(aMark);
             }
         }
      }
   }
 });