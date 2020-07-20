// <pre>
/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */


/* ********************************************************************************** */
 // START - zeigt einen Besucherähler auf jeder Seite diese Wikis
     document.write ("<div style='position:fixed; right:2px; bottom:2px; display:block; height:20px; width:70px'>");

    document.write ("<a href='http://www.counter-kostenlos.net'><img  src='http://www.counter-kostenlos.net/counter.php?id=60981.jpg'></a>");

    document.write ("</div>");
 // ENDE - zeigt einen Besucherähler auf jeder Seite diese Wikis
/* ********************************************************************************** */



/* wird Besucher von www.lachfisch.de hierhergeleitet, Seite ohne Frame neu laden! */

if (parent.document.title.indexOf ("http://www.lachfisch.de/") > -1)
    { 
        parent.document.title="";
        window.open ("http://lachfisch.wikia.com", "_self");
    }



/* *********************************************************************************** */

/* zeigt ab und zu eine Aufforderung zur Mitarbeit an */

function getCookie (name)                              // liest ein Cookie
{ 
   var i=0;
   var suche = name+"=";

   while (i<document.cookie.length) {
      if (document.cookie.substring (i, i+suche.length)==suche) {
         var ende = document.cookie.indexOf (";", i+suche.length);
         ende = (ende>-1) ? ende : document.cookie.length;
         var cook = document.cookie.substring(i+suche.length, ende);
         return unescape (cook);
      }
      i++;
   }
   return null;
}

function Popup()
{
   var c=getCookie ("Lachfisch");
   var Count=0;
   var PopupText="Hai Fisch!\n\nWusstest Du, dass Du hier jeden Artikel auch bearbeiten kannst? Also frisch ans Werk und tipp Deinen Senf dazu.\n\n";

   if (c!=null)
   {
      Count=parseInt (c)+1;
      if ((Count-5)%10==0)
      {
         if (Count>=25)
         {
             PopupText+="Melde Dich an wenn Du diesen Hinweis nicht mehr brauchst.\n\n";
         }
         PopupText+="Es grüßt Dich - Dein Freund Jesus ;-)";
         alert (PopupText);
      }
   }
   document.cookie="Lachfisch="+Count+";";
}

// var wgUserName=null;

if (wgUserName==null) {Popup();}                // nur nötig bei unangemeldeten Usern
 
 //============================================================
 // Original Klick-Kat Funktion stammt von http://kamelopedia.mormo.org/ - lizenziert unter GFDL
 //============================================================
 // Hilfsfunktionen
 
 /** CSS einbinden */
 function addCSS(title) {
     document.write(
                '<style type="text/css">/*<![CDATA[*/ @import "/index.php?title=' + 
                encodeURIComponent(title) + '&action=raw&ctype=text/css"; /*]]>*/</style>');
 }
 
 /** JS einbinden */
 function addJS(title) {
     document.write(
                '<script type="text/javascript" src="/index.php?title=' +
                encodeURIComponent(title) + '&action=raw&ctype=text/javascript"></script>');
 }
 
 // anzeigen & verbergen
 function einaus (inhalt, einblenden, ausblenden) {
    var thisLevel  = document.getElementById(inhalt);
    var otherLevel = document.getElementById(einblenden);
    var linkLevel  = document.getElementById(ausblenden);
    if (thisLevel.style.display == 'none') {
        thisLevel.style.display = 'block';
        otherLevel.style.display = 'none';
        linkLevel.style.display = 'inline';
    } else {
        thisLevel.style.display = 'none';
        otherLevel.style.display = 'inline';
        linkLevel.style.display = 'none';
    }
 }
 
 //================================================================================
 // alles mit class='jstest' ist dragbar
 
 /***********************************************
 * Drag and Drop Script: © Dynamic Drive (http://www.dynamicdrive.com)
 * This notice MUST stay intact for legal use
 * Visit http://www.dynamicdrive.com/ for this script and 100s more.
 ***********************************************/
 
 var dragobject={
 z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0,
 initialize:function(){
 document.onmousedown=this.drag
 document.onmouseup=function(){this.dragapproved=0}
 },
 drag:function(e){
 var evtobj=window.event? window.event : e
 this.targetobj=window.event? event.srcElement : e.target
 if (this.targetobj.className=="jstest"){
 this.dragapproved=1
 if (isNaN(parseInt(this.targetobj.style.left))){this.targetobj.style.left=0}
 if (isNaN(parseInt(this.targetobj.style.top))){this.targetobj.style.top=0}
 this.offsetx=parseInt(this.targetobj.style.left)
 this.offsety=parseInt(this.targetobj.style.top)
 this.x=evtobj.clientX
 this.y=evtobj.clientY
 if (evtobj.preventDefault)
 evtobj.preventDefault()
 document.onmousemove=dragobject.moveit
 }
 },
 moveit:function(e){
 var evtobj=window.event? window.event : e
 if (this.dragapproved==1){
 this.targetobj.style.left=this.offsetx+evtobj.clientX-this.x+"px"
 this.targetobj.style.top=this.offsety+evtobj.clientY-this.y+"px"
 return false
 }
 }
 }
 
 dragobject.initialize();   

 //============================================================
 // lade [[Hilfe:Edittools.js]], wenn Seite bearbeitet wird

 /*if ( (wgAction == 'edit' || wgAction == 'submit') && wgCanonicalNamespace == "Image" ) {
    addJS("MediaWiki:Skin/Spezial:Hochladen.js");
 } */
 if ( (wgAction == 'edit' || wgAction == 'submit') && wgTitle != 'Tomsen/Test2' ) {
    addJS("Hilfe:Edittools.js");
 }

//============================================================
// Original Klick-Kat Funktion stammt von http://kamelopedia.mormo.org/ - lizenziert unter GFDL
//============================================================
// </pre>