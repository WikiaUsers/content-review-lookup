/* <pre> */
/* tooltips and access keys */
var ta = new Object();
ta['pt-userpage'] = new Array('.','Eigene Benutzerseite');
ta['pt-anonuserpage'] = new Array('.','Benutzerseite der IP-Adresse von der aus Sie Änderungen durchführen');
ta['pt-mytalk'] = new Array('n','Eigene Diskussionsseite');
ta['pt-anontalk'] = new Array('n','Diskussion über Änderungen von dieser IP-Adresse');
ta['pt-preferences'] = new Array('','Eigene Einstellungen');
ta['pt-watchlist'] = new Array('l','Liste der beobachteten Seiten');
ta['pt-mycontris'] = new Array('y','Liste eigener Beiträge');
ta['pt-login'] = new Array('o','Sich einzuloggen wird zwar gerne gesehen, ist aber keine Pflicht.');
ta['pt-anonlogin'] = new Array('o','Sich einzuloggen wird zwar gerne gesehen, ist aber keine Pflicht.');
ta['pt-logout'] = new Array('o','Abmelden');
ta['ca-talk'] = new Array('t','Diskussion zum Artikelinhalt');
ta['ca-edit'] = new Array('e','Artikel bearbeiten. Bitte benutzen Sie vor dem Speichern die Vorschaufunktion.');
ta['ca-addsection'] = new Array('+','Einen Kommentar zu dieser Diskussion hinzufügen.');
ta['ca-viewsource'] = new Array('e','Diese Seite ist geschützt. Sie können sich den Quelltext ansehen.');
ta['ca-history'] = new Array('h','Frühere Versionen dieser Seite');
ta['ca-protect'] = new Array('=','Diese Seite schützen');
ta['ca-delete'] = new Array('d','Diese Seite löschen');
ta['ca-undelete'] = new Array('d','Einträge wiederherstellen, bevor diese Seite gelöscht wurde');
ta['ca-move'] = new Array('m','Diese Seite verschieben');
ta['ca-watch'] = new Array('w','Diese Seite zu Ihrer Beobachtungsliste hinzufügen');
ta['ca-unwatch'] = new Array('w','Diese Seite von Ihrer Beobachtungsliste entfernen');
ta['search'] = new Array('f','Dieses Wiki durchsuchen');
ta['p-logo'] = new Array('','Hauptseite');
ta['n-mainpage'] = new Array('z','Hauptseite anzeigen');
ta['n-portal'] = new Array('','Über das Portal, was Sie tun können, wo was zu finden ist');
ta['n-currentevents'] = new Array('','Hintergrundinformationen zu aktuellen Ereignissen');
ta['n-recentchanges'] = new Array('r','Liste der letzten Änderungen in diesem Wiki.');
ta['n-randompage'] = new Array('x','Zufällige Seite');
ta['n-help'] = new Array('','Hilfeseite anzeigen');
ta['n-sitesupport'] = new Array('','Unterstützen Sie uns');
ta['t-whatlinkshere'] = new Array('j','Liste aller Seiten, die hierher zeigen');
ta['t-recentchangeslinked'] = new Array('k','Letzte Änderungen an Seiten, die von hier verlinkt sind');
ta['feed-rss'] = new Array('','RSS-Feed für diese Seite');
ta['feed-atom'] = new Array('','Atom-Feed für diese Seite');
ta['t-contributions'] = new Array('','Liste der Beiträge von diesem Benutzer ansehen');
ta['t-emailuser'] = new Array('','Eine E-Mail an diesen Benutzer senden');
ta['t-upload'] = new Array('u','Dateien hochladen');
ta['t-specialpages'] = new Array('q','Liste aller Spezialseiten');
ta['ca-nstab-main'] = new Array('c','Artikelinhalt anzeigen');
ta['ca-nstab-user'] = new Array('c','Benutzerseite anzeigen');
ta['ca-nstab-media'] = new Array('c','Mediendateienseite anzeigen');
ta['ca-nstab-special'] = new Array('','Dies ist eine Spezialseite. Sie können diese nicht ändern.');
ta['ca-nstab-project'] = new Array('a','Portalseite anzeigen');
ta['ca-nstab-image'] = new Array('c','Bilderseite anzeigen');
ta['ca-nstab-mediawiki'] = new Array('c','Systemmeldungen anzeigen');
ta['ca-nstab-template'] = new Array('c','Vorlage anzeigen');
ta['ca-nstab-help'] = new Array('c','Hilfeseite anzeigen');
ta['ca-nstab-category'] = new Array('c','Kategorieseite anzeigen');

 if (!window.aOnloadFunctions) {
   var aOnloadFunctions = new Array();
 }
 
 window.onload = function() {
   if (window.aOnloadFunctions) {
     for (var _i=0; _i<aOnloadFunctions.length; _i++) {
       aOnloadFunctions[_i]();
     }
   }
 }
 
 
 var NavigationBarHide = 'ausblenden';
 var NavigationBarShow = 'einblenden';
 

 if (typeof NavigationBarShowDefault == 'undefined' ) {
     var NavigationBarShowDefault = 0;
 }
 

 function toggleNavigationBar(indexNavigationBar)
 {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
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
 
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    var divs = document.getElementsByTagName("div");
    for (var i=0;  i<divs.length; i++) {
        var NavFrame = divs[i];
        if (NavFrame.className == "NavFrame") {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
 
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
 
 }
 
 aOnloadFunctions[aOnloadFunctions.length] = createNavigationBarToggleButton;
 

 function moveEditsection() {
     if (typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false) {
         var spans = document.getElementsByTagName("span");
         for(var i = 0; i < spans.length; i++) {
             if(spans[i].className == "editsection") {
                 spans[i].style.fontSize = "x-small";
                 spans[i].style.fontWeight = "normal";
                 spans[i].style.cssFloat = "none";
                 spans[i].style.marginLeft = "0px";
                 spans[i].parentNode.appendChild(document.createTextNode(" "));
                 spans[i].parentNode.appendChild(spans[i]);
             }
         }
     }
 }

 addOnloadHook(moveEditsection);
 
 
 if (document.URL.indexOf("action=edit") > 0 || document.URL.indexOf("action=submit") > 0) {
     document.write('<script type="text/javascript" src="/w/index.php?title=MediaWiki:Onlyifediting.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 
 
 if ( wgCanonicalSpecialPageName == "Upload" ) {
     document.write('<script type="text/javascript" src="/w/index.php?title=MediaWiki:Onlyifuploading.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
 }
 

 var disable_counter = 0; 
 
 document.write('<script type="text/javascript" src="/w/index.php?title=MediaWiki:Pagecounter.js&action=raw&ctype=text/javascript&dontcountme=s&smaxage=3600"></script>');</pre>