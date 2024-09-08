/************************************************************\
 Diese Funktion stammt von musik.wikia.com/wiki/MediaWiki:Common.js
 Die überarbeitete Version stammt von dem Benutzer "20M61" aus
 de.thewalkingdeadtv.wikia.com/wiki/MediaWiki:Vollbildschirm.js
\************************************************************/
 
/* Seite soll sich merken, wie der User seine Seitenbreite haben will */
 
/*********************************************************\
    Funktion bereinigt ein Zeitproblem bei Cookies (für das Schreiben von Cookies nötig)
\*********************************************************/
function fixedGMTString(datum)
{
   var damals=new Date(1970,0,1,12);
   if (damals.toGMTString().indexOf("02")>0) 
      datum.setTime(datum.getTime()-1000*60*60*24);
   return datum.toGMTString();
}
 
/*********************************************************\
    Funktion liest Cookie aus und gibt Ergebnis zurück
\*********************************************************/
var Vollbildschirm = 'Teilbild';    // Voreinstellung ist Teilbild
 
function schreibFullCookie() {
   neuerVollKeks  = "TWD-Einstellungen="
                     + Vollbildschirm         + "&"
                     + "~";
 
   var jetzt = new Date();
   var verfall = new Date(jetzt.getTime() + 1000*60*60*24*365);
   neuerVollKeks += "; expires=" + fixedGMTString(verfall);
   neuerVollKeks += "; path=/"
   document.cookie = neuerVollKeks;
   return;
}
 
function readFullCookie() {  
   var Voll_keks = document.cookie;
   if (Voll_keks) 
   {
     // Anfangsposition des Name=Wert-Paars suchen
     var Voll_posName = Voll_keks.indexOf("; TWD-Einstellungen=");
     if (Voll_posName == -1) 
     {
        // vielleicht war's der erste Name in der Liste?
        if (Voll_keks.indexOf("TWD-Einstellungen=") == 0) 
          // Der erste Eintrag war dieses Cookie
          Voll_posName = 0;
        else 
        { 
          return false;
        }
     }
 
     // Anfangs- und Endposition des Krümelwerts suchen
     var Voll_wertAnfang = Voll_keks.indexOf("=", Voll_posName)+1;
     var Voll_wertEnde = Voll_keks.indexOf(";", Voll_posName+1);
     if (Voll_wertEnde == -1) Voll_wertEnde = Voll_keks.length;
 
     // Krümelwert auslesen und zurückgeben
     var Voll_wert = Voll_keks.substring(Voll_wertAnfang, Voll_wertEnde);
     var Voll_keksinhalt = Voll_wert .split("&");
     Vollbildschirm = Voll_keksinhalt[0];  // TV-Serie
  }
  return true;
}
 
if ( readFullCookie() == false ) { schreibFullCookie(); }
 
/* add a button that increases the content size and hides the rail - 2/1/11 */
function CreateContentResizeButton() {
	var headerWidth = $('header#WikiaPageHeader.WikiaPageHeader details').width();
	var contentWidth = $('article#WikiaMainContent.WikiaMainContent').width();
	var catlinksWidth = $('div#catlinks.catlinks').width();
 
	var FullScreenButton = '<span '
                             + 'class  ="Plusknopf" '
                             + 'id     ="resizeButton" '
                             + 'style  ="margin:  2px 10px 0px 0px; '
                             +          'display: inline-block;" '
                             + 'onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ');" '
                             + 'data-id="resizeButton">'
                             + '</span>';
 
	if(contentWidth < 1000) {
		$('section article header ul.wikia-menu-button').before(FullScreenButton);
		$('section article header a.wikia-button').before(FullScreenButton);
		$('section article header a.view-source').before(FullScreenButton);
		if(wgCanonicalNamespace == 'User_blog') {
			$('section article div#WikiaUserPagesHeader a.wikia-button').before(FullScreenButton);
		}
		// Setzt den Startzustand
		if (Vollbildschirm == 'Teilbild')
		  CompressContent(headerWidth, contentWidth, catlinksWidth, false)
		else
		  ExpandContent(headerWidth, contentWidth, catlinksWidth, false);
	}
}
addOnloadHook(CreateContentResizeButton);
 
function ExpandContent(headerWidth, contentWidth, catlinksWidth, chgCookie) {
  var ExpandStyle = "";
  if (chgCookie == true)
  {
    Vollbildschirm = 'Vollbild';
    schreibFullCookie();
  }
  $('header#WikiaPageHeader.WikiaPageHeader details').css({"width": '980px'});
  $('article#WikiaMainContent.WikiaMainContent').css({"width": '1000px'});
  $('div#catlinks.catlinks').css({"width": '1000px'});
  $('div#WikiaRail.WikiaRail').css({"display": 'none'});
  if(wgCanonicalNamespace == 'Benutzer_Blog') 
    ExpandStyle = "margin: 0px 0px 0px 10px; display: inline-block; float: right;";
  else 
    ExpandStyle = "margin: 2px 0px 0px 10px; display: inline-block;";
 
  $('span#resizeButton').replaceWith('<span class="Plusknopf" id="resizeButton" style="'+ExpandStyle+'" onclick="CompressContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ', true);" data-id="resizeButton" title="Rechte Leiste wieder einblenden."> - </span>');
 
}
 
function CompressContent(headerWidth, contentWidth, catlinksWidth, chgCookie) {
  var ExpandStyle = "";
  if (chgCookie == true)
  {
    Vollbildschirm = 'Teilbild';
    schreibFullCookie();
  }
  $('header#WikiaPageHeader.WikiaPageHeader details').css({"width": headerWidth});
  $('article#WikiaMainContent.WikiaMainContent').css({"width": contentWidth});
  $('div#catlinks.catlinks').css({"width": catlinksWidth});
  $('div#WikiaRail.WikiaRail').css({"display": 'block'});
  if(wgCanonicalNamespace == 'Benutzer_Blog') 
    ExpandStyle = "margin: 0px 0px 0px 10px; display: inline-block; float: right;";
  else 
    ExpandStyle = "margin: 2px 0px 0px 10px; display: inline-block;";
 
  $('span#resizeButton').replaceWith('<span class="Plusknopf" id="resizeButton" style="'+ExpandStyle+'"  onclick="ExpandContent(' + headerWidth + ', ' + contentWidth + ', ' + catlinksWidth + ', true);" data-id="resizeButton" title="Volle Artikelbreite zur besseren Darstellung der Artikel."> + </span>');
}