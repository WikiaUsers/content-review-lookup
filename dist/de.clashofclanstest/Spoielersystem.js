if (wgUserName == "20M61" && false) 
{
alert("Namespace: >"+wgCanonicalNamespace+"<"); //Persönliche Testausgabe
}
/*********************************************************\
    Allgemeine Variablen (Hier ist nur eine Kopiervorlage. Dieser Code ist daher nicht aktiv)
\*********************************************************/
var ZuletztGesehenTVStaffel    = 1; // TV-Serie
var ZuletztGesehenTVFolge      = 0; 
var ZuletztGesehenWebStaffel   = 1; // Webisode
var ZuletztGesehenWebFolge     = 0;
var ZuletztGesehenDRFolge      = 0; // Dead Reckoning
var ZuletztGesehenTWDGameFolge = 0; // TWD: The Game (Telltale)
var ZuletztGesehenFBGameFolge  = 0; // TWD: Facebook
var ZuletztGesehenDixonFolge   = 0; // TWD: The Game (Activision - Dixon)
var ZuletztGesehenComic        = 0; // Comic
var ZuletztGesehenBuch         = 0; // Bücher
var ZuletztMaster              = 0; // Master (0=Ich weiß nicht alles - bitte Spoilerschutz gewähren)
var UserFSK                    = '3 Versuche';
 
var BG_TV                      = 1; //'1§1§1§1'; (TV § COMIC § SPIELE § BUCH)
var BG_COMIC                   = 1;
var BG_SPIELE                  = 1;
var BG_BUCH                    = 1;
var MithelfenBoxen             = false;
 
var n                          = 1; // Zählvariable
 
// ----- Variablen für Spoilerfarbänderungen -----
var Spoiler_WalkerColor = "#992010";
var Spoiler_LurkerColor = "#a9a9C9";
 
// Farben bitte immer mit: http://de.thewalkingdeadtv.wikia.com/wiki/Vorlage:Farbe abgleichen !!
switch(wgCanonicalNamespace)
    {          
      case "Buch":   var FarbDurchsichtigkeit = 1.0;
      case "Spiele": var FarbDurchsichtigkeit = 1.0;
      case "Comic":  var FarbDurchsichtigkeit = 1.0;
      default:       var FarbDurchsichtigkeit = 0.3;
    }
var sME_lebt      = "rgba(000, 153, 000, "+FarbDurchsichtigkeit+")";
var sME_untot     = "rgba(102, 102, 102, "+FarbDurchsichtigkeit+")";     
var sME_tot       = "rgba(153, 000, 000, "+FarbDurchsichtigkeit+")";       
var sME_spezial   = "rgba(139, 010, 080, "+FarbDurchsichtigkeit+")";   
var sME_unbekannt = "rgba(051, 102, 153, "+FarbDurchsichtigkeit+")"; 
var sME_NAN       = "rgba(255, 102, 000, "+FarbDurchsichtigkeit+")";
 
var sME_lebt_d      = "rgba(000, 119, 000, "+FarbDurchsichtigkeit+")";
var sME_untot_d     = "rgba(051, 051, 051, "+FarbDurchsichtigkeit+")";     
var sME_tot_d       = "rgba(119, 000, 000, "+FarbDurchsichtigkeit+")";       
var sME_spezial_d   = "rgba(107, 000, 048, "+FarbDurchsichtigkeit+")";   
var sME_unbekannt_d = "rgba(017, 068, 119, "+FarbDurchsichtigkeit+")"; 
var sME_NAN_d       = "rgba(221, 068, 000, "+FarbDurchsichtigkeit+")";
 
/*********************************************************\
    Spoiler-Auswahl Routine (wählt gesehene Folge)
\*********************************************************/
function ausklapp( element )
{
  // Erhält Show (Show*10000 + Staffel * 100 + Folge *1)
  var MyElementID   = (element.id - element.id%10000)/10000;  
 
  // Wird später benötigt um herauszufinden was das für ein Element ist
  var ThisElementID = 0; 
 
  var MasterSpoilerButton = document.getElementById("MasterSpoiler");
 
  // MASTER-Knopf wurde gedrückt
  if (element.id == "MasterSpoiler" && MasterSpoilerButton.className == "spoilerON")
  {
    MasterSpoilerButton.className = "spoilerOFF";
    element.className             = MasterSpoilerButton.className;
    ZuletztGesehenTVStaffel       =  99; // TV-Serie
    ZuletztGesehenTVFolge         =  99; 
    ZuletztGesehenWebStaffel      =  99; // Webisode
    ZuletztGesehenWebFolge        =  99;
    ZuletztGesehenDRFolge         =  99; // Dead Reckoning
    ZuletztGesehenTWDGameFolge    =  99; // TWD: The Game (Telltale)
    ZuletztGesehenFBGameFolge     =  99; // TWD: Facebook
    ZuletztGesehenDixonFolge      =  99; // TWD: The Game (Activision - Dixon)
    ZuletztGesehenComic           = 999; // Comic
    ZuletztGesehenBuch            = 999; // Bücher
    ZuletztMaster                 =   1; // Master: 1= Ich kenn alles (0= Ich hab Lücken)
    MasterSpoilerButton.firstChild.nodeValue  = "Spoiler System deaktiviert";
  }
  //Nur Einstellungselemente dürfen Master beeinflussen
  else if (element.className== "spoilerON" || element.className == "spoilerOFF") 
  {
    ZuletztMaster                 = 0;
    MasterSpoilerButton.className = "spoilerON";
    MasterSpoilerButton.firstChild.nodeValue = "Spoiler System aktiviert";
  }
 
  // MasterSpoiler = OFF bedeutet, dass alles bekannt ist -> alle Felder an
  if (MasterSpoilerButton.className == "spoilerOFF")
  {
    // Alle SPAN-Elemente durchsuchen 
    var s = document.getElementsByTagName("span"); 
    for ( span=0; span<s.length; span++ ) 
    {
      // Alle aktivierten Spoiler ausschalten (User kennt alles!!!)
      if (s[span].className == "spoilerON") 
      {
        s[span].className = "spoilerOFF";
        if (s[span].style.backgroundColor.toLowerCase() == '#bd5b0e' || 
            s[span].style.backgroundColor.toLowerCase() == 'rgb(189, 91, 14)') 
        {
          s[span].style.backgroundColor    = "#096405";
        }
      }
    }
  }
  // MasterSpoiler = ON bedeutet, dass NICHT alles bekannt ist -> einige Felder aus
  else
  {
    // Alle Buttons für Spoiler sind "SPAN" Elemente
    var s = document.getElementsByTagName("span"); 
 
    // Alle Span Elemente durchsuchen
    for ( span=0; span<s.length; span++ ) 
    {
      // Nur Span-Elemente mit speziellem Namen als Spoilerrelevant heraussuchen
      if (s[span].className == "spoilerON" || s[span].className == "spoilerOFF") 
      {    
        // Show aus Span-ID extrahieren
        ThisElementID = (s[span].id-s[span].id%10000)/10000; 
 
        if (ThisElementID == MyElementID)  
        {
          if ( s[span].id <= element.id)
          {
            s[span].className = "spoilerOFF";
            if (s[span].style.backgroundColor.toLowerCase() == '#bd5b0e' || 
                s[span].style.backgroundColor.toLowerCase() == 'rgb(189, 91, 14)') 
            {
              s[span].style.backgroundColor    = "#096405";
            }
          }
          else
          {
            s[span].className = "spoilerON";
            if (s[span].style.backgroundColor.toLowerCase() == '#096405' || 
                s[span].style.backgroundColor.toLowerCase() == 'rgb(9, 100, 5)') 
            {
              s[span].style.backgroundColor    = "#bd5b0e";
            }
          }
        }
      }
    }
 
    // Ermitteln, welche Variable geändert wurde
    switch(MyElementID)
    {
      case 0: // TV-Show
        ZuletztGesehenTVStaffel      = (element.id - element.id%100)/100; 
        ZuletztGesehenTVFolge        = element.id % 100; 
        break;
      case 1: // Webisoden-Show
        ZuletztGesehenWebStaffel     = (element.id - element.id%100)/100-100; 
        ZuletztGesehenWebFolge       = element.id % 100; 
        break;
      case 2: // Games  
        var ThisGameID = (element.id - element.id%1000)/1000 - 20; 
        switch(ThisGameID)
        {
          case 0: // Dead Reckoning
            ZuletztGesehenDRFolge        = element.id % 1000
            break;
          case 1: // TWD: The Game (Telltale)
            ZuletztGesehenTWDGameFolge   = element.id % 1000
            break;
          case 2: // TWD: Facebook Game
            ZuletztGesehenFBGameFolge    = element.id % 1000  
            break;
          case 3: // TWD: Dixon Game
            ZuletztGesehenDixonFolge     = element.id % 1000
            break;
        }
        break;
      case 3: // [Comic] - nach Issues
        ZuletztGesehenComic          = element.id - 30000;
        break;
      case 4: // Rise of The Goveneur
        ZuletztGesehenBuch           = element.id - 40000;
        break;
    } 
 
  }
}
 
/*********************************************************\
 Erwartet den zu untersuchenden Spoiler (Klassennamen)
 -> Gibt die dazu passende Spoilernummer, die der User gewählt hat zurück
\*********************************************************/
function GetMYSpoiler(DivSpanObjekt)
{
  var DivSpanObjekt_Offset = (DivSpanObjekt - DivSpanObjekt % 10000) / 10000;
  switch(DivSpanObjekt_Offset )
  {
    case 0: // TV-Show
      return (00000 + ZuletztGesehenTVStaffel * 100 + ZuletztGesehenTVFolge);
      break;
    case 1: // Webisoden-Show
      return (10000 + ZuletztGesehenWebStaffel * 100 + ZuletztGesehenWebFolge);
      break;
    case 2: // Games
      var ThisGameID = (DivSpanObjekt-DivSpanObjekt%1000)/1000-20;
      switch(ThisGameID)
      {
        case 0: // Dead Reckoning
          return (20000 + 000 + ZuletztGesehenDRFolge);
          break;
        case 1: // TWD: The Game (Telltale)
          return (21000 + 000 + ZuletztGesehenTWDGameFolge);
          break;
        case 2: // TWD: Facebook Game
          return (22000 + 000 + ZuletztGesehenFBGameFolge);
          break;
        case 3: // TWD: Dixon Game
          return (23000 + 000 + ZuletztGesehenDixonFolge);
          break;
      }
      break;
    case 3: // [Comic] - nach Issues
      return (30000 + ZuletztGesehenComic);
      break;
    case 4: // Rise of The Goveneur
      return (40000 + ZuletztGesehenBuch);
      break;
  }
  return false;
}
 
/*********************************************************\
    Haupt-Anti-Spoiler Routine (klappt alle Spoiler weg)
    <div class="spoiler_info" style="display:none;">
      00101-lebt,
      00103-unbekannt,
      00104-lebt,
      00106-untot,
      00108-tot
      :background
      :text
      :background_dark
      ~Charakter
    </div>
\*********************************************************/
function SetSpoiler( )
{
  SpoilerMinArtikel = document.getElementById("Spoiler_Minimum");
  if (SpoilerMinArtikel != null)
  {
    if (SpoilerMinArtikel.className > GetMYSpoiler(SpoilerMinArtikel.className))
    {
      SpoilerMain("Diese Seite enthält Informationen, die erst in späteren Folgen gezeigt werden. "
                  +"Falls du den Inhalt dennoch sehen möchtest, so ändere bitte deine Spoiler-Einstellungen", 
                  SpoilerMinArtikel.className);
      return false; 
    }
  }
  // Span-Elemente (un)sichtbar machen (alles in den Span-Abschnitt wird unsichtbar (keine Bilder))
  var s = document.getElementsByTagName("span");
  for ( span=0; span<s.length; span++ )
  {
    var AnzeigenAB  = s[span].className.split("~")[0];
    var AnzeigenBIS = s[span].className.split("~")[1];
    if (isNaN(AnzeigenAB) || s[span].className == "") continue; //Nur Zahlen-Klassen analysieren
 
    if (AnzeigenAB > GetMYSpoiler(AnzeigenAB))
      s[span].style.display = "none";
    else 
      s[span].style.display = "";
 
    if ((AnzeigenBIS % 1000) <= (GetMYSpoiler(AnzeigenBIS) % 1000) && (AnzeigenBIS % 1000) != 999)
      s[span].style.display = "none";
 
  }
 
  // Tabellen-Elemente (un)sichtbar machen (alles in einer Tabellen ZEILE (horizontal) wird unsichtbar)
  var tr = document.getElementsByTagName("tr");
  for ( tab=0; tab<tr.length; tab++ )
  {
    var AnzeigenAB  = tr[tab].className.split("~")[0];
    var AnzeigenBIS = tr[tab].className.split("~")[1];
    if (isNaN(AnzeigenAB) || tr[tab].className == "") continue; //Nur Zahlen-Klassen analysieren
 
    if (AnzeigenAB > GetMYSpoiler(AnzeigenAB))
      tr[tab].style.display = "none";
    else 
      tr[tab].style.display = "";
 
    if ((AnzeigenBIS % 1000) <= (GetMYSpoiler(AnzeigenBIS) % 1000) && (AnzeigenBIS % 1000) != 999)
      tr[tab].style.display = "none";
 
  }
 
  // Div-Elemente (un)sichtbar machen (alles in den Div-Boxen wird unsichtbar - allerdings nach DIV wird umgebrochen)
  var s = document.getElementsByTagName("div");
  for ( div=0; div<s.length; div++ )
  {
    var AnzeigenAB  = s[div].className.split("~")[0]*1;
    var AnzeigenBIS = s[div].className.split("~")[1]*1;
    if (isNaN(AnzeigenAB) && s[div].className != "spoiler_info") continue;        //Nur Zahlen-Klassen analysieren
                                                                                  //spoiler_info darf nicht übersprungen werden
    if (AnzeigenAB > GetMYSpoiler(AnzeigenAB) || s[div].className == "spoiler_info") //spoiler_info aber nicht anzeigen
      s[div].style.display = "none"; 
    else 
      s[div].style.display = "";
 
    if ((AnzeigenBIS % 1000) <= (GetMYSpoiler(AnzeigenBIS) % 1000) && (AnzeigenBIS % 1000) != 999)
      s[div].style.display = "none";
 
    if (s[div].className == "spoiler_info")
    {
      var spoilerMiniIDelement  = s[div].firstChild.nodeValue.split("~")[0];
      var spoilerMiniElement    = spoilerMiniIDelement.split(":");
          spoilerMiniElement[0] = spoilerMiniElement[0].replace(/-/g,",");
      var sME_array_status      = spoilerMiniElement[0].split(",");
 
      for (n=0; n<sME_array_status.length; n=n+2)
      {
        if (sME_array_status[n] > GetMYSpoiler(sME_array_status[n]))  // Wenn Spoiler (Inhalt unbekannt) dann
          break;                                  // abbrechen (Zustand ist unbekannt)
        else                                      // sonst:
          continue;                               // weiter (Zustand ist bekannt)
      }
 
      if (n>0 && sME_array_status[n-1] != null)
      {
        var element_status = sME_array_status[n-1].split("+")[0];
        var element_zombie = sME_array_status[n-1].split("+")[1];
 
        //Dreieck, das anzeigt ob Walker oder Lurker
        switch (element_zombie)  
        {
          case "walker":
            for (m=0; m<s[div].parentNode.childNodes.length;m++)
              if (s[div].parentNode.childNodes[m].className == "SpoilerZombieDreieck")
                s[div].parentNode.childNodes[m].style.borderBottomColor = Spoiler_WalkerColor;
            break;
          case "lurker":
            for (m=0; m<s[div].parentNode.childNodes.length;m++)
              if (s[div].parentNode.childNodes[m].className == "SpoilerZombieDreieck")
                s[div].parentNode.childNodes[m].style.borderBottomColor = Spoiler_LurkerColor;
            break;
          default:
            for (m=0; m<s[div].parentNode.childNodes.length;m++)
              if (s[div].parentNode.childNodes[m].className == "SpoilerZombieDreieck")
                s[div].parentNode.childNodes[m].style.borderBottomColor = "transparent";
            break;
        }
 
        // Farbliche und Textliche Veränderung
        for (i=1; i<spoilerMiniElement.length; i++)
        {
          if(spoilerMiniElement[i] == "background")
          {
            switch (element_status)
            {
              case "normal":
              case "in Gebrauch":
              case "lebt":      s[div].parentNode.style.backgroundColor = sME_lebt;      break;
              case "unbekannt": s[div].parentNode.style.backgroundColor = sME_unbekannt; break;
              case "unbewohnbar":
              case "untot":     s[div].parentNode.style.backgroundColor = sME_untot;     break;
              case "na":
              case "nicht definierbar": s[div].parentNode.style.backgroundColor = sME_NAN; break;
              case "aufgelöst":
              case "aufgegeben":
              case "zurück gelassen":
              case "zerstört":
              case "tot":       s[div].parentNode.style.backgroundColor = sME_tot;       break;
              default:          s[div].parentNode.style.backgroundColor = sME_spezial;   break;
            }
          }
          else if(spoilerMiniElement[i] == "background_dark")
          {
            switch (element_status)
            {
              case "normal":
              case "in Gebrauch":
              case "lebt":      s[div].parentNode.style.backgroundColor = sME_lebt_d;      break;
              case "unbekannt": s[div].parentNode.style.backgroundColor = sME_unbekannt_d; break;
              case "unbewohnbar":
              case "untot":     s[div].parentNode.style.backgroundColor = sME_untot_d;     break;
              case "na":
              case "nicht definierbar": s[div].parentNode.style.backgroundColor = sME_NAN_d; break;
              case "aufgegeben":
              case "zurück gelassen":
              case "aufgelöst":
              case "zerstört":
              case "tot":       s[div].parentNode.style.backgroundColor = sME_tot_d;       break;
              default:          s[div].parentNode.style.backgroundColor = sME_spezial_d;   break;
            }
          }
          else if(spoilerMiniElement[i] == "text")
          {
            s[div].parentNode.firstChild.firstChild.nodeValue =  element_status;            
          }
        }
      }      
    }
  }
 
/*
  if (ZuletztGesehenTVStaffel == 99) 
    document.getElementById("LatestPhotosModule").style.display = "none"; 
  else 
    document.getElementById("LatestPhotosModule").style.display = "block";
*/
 
  return;
}
 
/*********************************************************\
    Funktion schreibt Cookie 
\*********************************************************/
// Bereinigt ein Zeitproblem mit einem der Browser
function fixedGMTString(datum)
{
   var damals=new Date(1970,0,1,12);
   if (damals.toGMTString().indexOf("02")>0) 
      datum.setTime(datum.getTime()-1000*60*60*24);
   return datum.toGMTString();
}
 
function schreibCookie() {
   neuerKeks  = "TWDSpoiler=";
   neuerKeks += ZuletztGesehenTVStaffel    + "&";
   neuerKeks += ZuletztGesehenTVFolge      + "&";
   neuerKeks += ZuletztGesehenWebStaffel   + "&";
   neuerKeks += ZuletztGesehenWebFolge     + "&";
   neuerKeks += ZuletztGesehenDRFolge      + "&";
   neuerKeks += ZuletztGesehenTWDGameFolge + "&";
   neuerKeks += ZuletztGesehenFBGameFolge  + "&";
   neuerKeks += ZuletztGesehenDixonFolge   + "&";
   neuerKeks += ZuletztGesehenComic        + "&";
   neuerKeks += ZuletztGesehenBuch         + "&";
   neuerKeks += ZuletztMaster              + "&";
   neuerKeks += UserFSK                    + "&";
   neuerKeks += BG_TV + "§"+ 
                BG_COMIC + "§"+ 
                BG_SPIELE + "§"+ 
                BG_BUCH                    + "&";
   neuerKeks += MithelfenBoxen             + "&";
   neuerKeks += "~";
 
   var jetzt = new Date();
   var verfall = new Date(jetzt.getTime() + 1000*60*60*24*365);
   neuerKeks += "; expires=" + fixedGMTString(verfall);
   neuerKeks += "; path=/"
   document.cookie = neuerKeks;
   return;
}
 
/*********************************************************\
    Funktion liest Cookie aus und gibt Ergebnis zurück
\*********************************************************/
function liesCookie() {
   var keks = document.cookie;
   if (keks) 
   {
     // Anfangsposition des Name=Wert-Paars suchen
     var posName = keks.indexOf("; TWDSpoiler=");
     if (posName == -1) 
     {
        // vielleicht war's der erste Name in der Liste?
        if (keks.indexOf("TWDSpoiler=") == 0) posName = 0;
        // nein? dann abbrechen mit Rückgabewert false
        else 
        { 
          ChangeHintergrund();
          HideHelpingBoxes();
          return false;
        }
     }
 
     // Anfangs- und Endposition des Krümelwerts suchen
     var wertAnfang = keks.indexOf("=", posName)+1;
     var wertEnde = keks.indexOf(";", posName+1);
     if (wertEnde == -1) wertEnde = keks.length;
 
     // Krümelwert auslesen und zurückgeben
     var wert = keks.substring(wertAnfang, wertEnde);
     var keksinhalt = wert .split("&");
     ZuletztGesehenTVStaffel    = keksinhalt[0]  * 1; // TV-Serie
     ZuletztGesehenTVFolge      = keksinhalt[1]  * 1; 
     ZuletztGesehenWebStaffel   = keksinhalt[2]  * 1; // Webisode
     ZuletztGesehenWebFolge     = keksinhalt[3]  * 1;
     ZuletztGesehenDRFolge      = keksinhalt[4]  * 1; // Dead Reckoning
     ZuletztGesehenTWDGameFolge = keksinhalt[5]  * 1; // TWD: The Game (Telltale)
     ZuletztGesehenFBGameFolge  = keksinhalt[6]  * 1; // TWD: Facebook
     ZuletztGesehenDixonFolge   = keksinhalt[7]  * 1; // TWD: The Game (Activision - Dixon)
     ZuletztGesehenComic        = keksinhalt[8]  * 1; // Comic
     ZuletztGesehenBuch         = keksinhalt[9]  * 1; // Bücher
     ZuletztMaster              = keksinhalt[10] * 1; // Master (0=Ich weiß nicht alles - bitte Spoilerschutz gewähren)
     UserFSK                    = keksinhalt[11];     // User hat Alterstest bestanden (oder nicht)
     var BG_Bild                = keksinhalt[12].split("§"); // Hintergrundbild (Zombie-Mädels, Staffel 3 oder Neutral)
       BG_TV     = BG_Bild[0]; 
       BG_COMIC  = BG_Bild[1];
       BG_SPIELE = BG_Bild[2];
       BG_BUCH   = BG_Bild[3];         
     MithelfenBoxen             = keksinhalt[13];     // Hilfeboxen (vor einem Artikel)
       (MithelfenBoxen == "true" ? MithelfenBoxen = true: MithelfenBoxen = false)
     SetSpoiler();                                    // Den gelesenen Keks auch umsetzen
     ChangeHintergrund();
     HideHelpingBoxes();
  }
  return true;
}
 
function HideHelpingBoxes(NeueBoxenEigenschaft)
{
  if (NeueBoxenEigenschaft != null)
    MithelfenBoxen = NeueBoxenEigenschaft;
  var div = document.getElementsByTagName('div');
  for ( all=0; all<div.length; all++ )
  {
    if (div[all].className == "Helferbox" && MithelfenBoxen==false)
      div[all].style.display = "none";
    else if (div[all].className == "Helferbox")
      div[all].style.display = "";
  }
}
 
/*********************************************************\
    Funktion ändert Hintergrundbild
\*********************************************************/ 
function ChangeHintergrund(NeuerHintergrund)
{
  if (NeuerHintergrund != null)
  {
    switch(wgCanonicalNamespace)
    {          
      case "Buch":   BG_BUCH   = NeuerHintergrund; break;
      case "Spiele": BG_SPIELE = NeuerHintergrund; break;
      case "Comic":  BG_COMIC  = NeuerHintergrund; break;
      default:       BG_TV     = NeuerHintergrund; break;
    }
  }
  var b = document.getElementsByTagName('body');
  for ( all=0; all<b.length; all++ )
  {
    // HINTERGRUNDBILD (Individuell - fixiert (man sieht es immer) )
    if (document.getElementById("Wikia-Hintergrund-Bild") != null)
    {
      b[all].style.backgroundImage ="url("+document.getElementById("Wikia-Hintergrund-Bild").className+")";
      b[all].style.backgroundAttachment = "fixed";
    }
    // HINTERGRUNDBILD (Individuell - scrollt mit (man kann es hoch und runter scrollen) )
    else if (document.getElementById("Wikia-Hintergrund-Bild-scroll") != null)
    {
      b[all].style.backgroundImage ="url("+document.getElementById("Wikia-Hintergrund-Bild-scroll").className+")";
      b[all].style.backgroundAttachment = "scroll";
    }
    // HINTERGRUNDBILD (Allgemein - Standardbild)
    else
    {
    b[all].style.backgroundAttachment = "scroll";
      switch(wgCanonicalNamespace)
      {          
        case "Buch":
          switch(BG_BUCH)
          {
            case "3":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/__cb20130315171921/clashofclans/de/images/5/50/Wiki-background)";
              break;       
            case "2":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/__cb20130315171921/clashofclans/de/images/5/50/Wiki-background)";
              break;       
            case "1":
            default:
              b[all].style.backgroundImage ="urlhttps://images.wikia.nocookie.net/__cb20130315171921/clashofclans/de/images/5/50/Wiki-background)";
              b[all].style.backgroundAttachment = "fixed";
              break;       
          }
          break;
 
        case "Spiele":
          b[all].style.backgroundAttachment = "fixed";
          switch(BG_SPIELE)
          {
            case "6":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/b/b2/Spiele_2.jpg)";
              break;       
            case "5":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/2/29/Spiele_1.jpg)";
              break;       
            case "4":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/1/1b/Spiele_1b.jpg)";
              break;       
            case "3":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/a/a3/Spiele_2b.jpg)";
              break;       
            case "2":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/3/3b/Spiele_4b.jpg)";
              break;       
            case "1":
            default:
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/f/f1/Spiele_3b.jpg)";
              break;       
          }
          break;
 
        case "Comic":
          b[all].style.backgroundAttachment = "fixed";
          switch(BG_COMIC)
          {
            case "3":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/5/50/Motiv_3.jpg)";
              break;       
            case "2":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/8/85/Hintergrund_Comic_1.jpg)";
              break;       
            case "1":
            default:
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/3/35/Hintergrund_Comic_2.jpg)";
              break;       
          }
          break;
 
        case "TV":
        default:
          switch(BG_TV)
          {
            case "3":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/8/8a/Hintergrund_Atlanta.jpg)";
              break;       
            case "2":
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/c/c0/Hintergrundbild_S3.jpg)";
              break;       
            case "1":
            default:
              b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/9/9d/BG-Standard.jpg)";
              b[all].style.backgroundAttachment = "fixed";
              break;       
          }
          break;
      }
    }
  }
}
 
 
 
// Ende: SpoilerFunktion nur für ausgewählte Seiten