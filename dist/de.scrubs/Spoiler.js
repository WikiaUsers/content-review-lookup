if (wgUserName == "20M61" && false) 
{
alert("Namespace: >"+wgCanonicalNamespace+"<"); //Persönliche Testausgabe
}
/*********************************************************\
    Allgemeine Variablen
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

var HintergrundZombies         = 'Girls';
var MithelfenBoxen             = false;

var n                          = 1; // Zählvariable

// ----- Variablen für Spoilerfarbänderungen -----
var Spoiler_WalkerColor = "#992010";
var Spoiler_LurkerColor = "#a9a9C9";

// Farben bitte immer mit: http://de.thewalkingdeadtv.wikia.com/wiki/Vorlage:Farbe abgleichen !!
var sME_lebt      = "#009900";
var sME_untot     = "#666666";     
var sME_tot       = "#990000";       
var sME_spezial   = "#8B0A50";   
var sME_unbekannt = "#336699"; 

var sME_lebt_d      = "#007700";
var sME_untot_d     = "#333333";     
var sME_tot_d       = "#770000";       
var sME_spezial_d   = "#6B0030";   
var sME_unbekannt_d = "#114477"; 

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
        var ThisGameID = (element.id - element.id%100)/100 - 200; 
        switch(ThisGameID)
        {
          case 0: // Dead Reckoning
            ZuletztGesehenDRFolge        = element.id % 100
            break;
          case 1: // TWD: The Game (Telltale)
            ZuletztGesehenTWDGameFolge   = element.id % 100
            break;
          case 2: // TWD: Facebook Game
            ZuletztGesehenFBGameFolge    = element.id % 100     
            break;
          case 3: // TWD: Dixon Game
            ZuletztGesehenDixonFolge     = element.id % 100
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
      var ThisGameID = (DivSpanObjekt-DivSpanObjekt%100)/100-200;
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
              case "lebt":      s[div].parentNode.style.backgroundColor = sME_lebt;      break;
              case "unbekannt": s[div].parentNode.style.backgroundColor = sME_unbekannt; break;
              case "unbewohnbar":
              case "untot":     s[div].parentNode.style.backgroundColor = sME_untot;     break;
              case "aufgelöst":
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
              case "lebt":      s[div].parentNode.style.backgroundColor = sME_lebt_d;      break;
              case "unbekannt": s[div].parentNode.style.backgroundColor = sME_unbekannt_d; break;
              case "unbewohnbar":
              case "untot":     s[div].parentNode.style.backgroundColor = sME_untot_d;     break;
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
   neuerKeks += HintergrundZombies         + "&";
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
     ZuletztGesehenTVStaffel    = keksinhalt[0] * 1;  // TV-Serie
     ZuletztGesehenTVFolge      = keksinhalt[1] * 1; 
     ZuletztGesehenWebStaffel   = keksinhalt[2] * 1;  // Webisode
     ZuletztGesehenWebFolge     = keksinhalt[3] * 1;
     ZuletztGesehenDRFolge      = keksinhalt[4] * 1;  // Dead Reckoning
     ZuletztGesehenTWDGameFolge = keksinhalt[5] * 1;  // TWD: The Game (Telltale)
     ZuletztGesehenFBGameFolge  = keksinhalt[6] * 1;  // TWD: Facebook
     ZuletztGesehenDixonFolge   = keksinhalt[7] * 1;  // TWD: The Game (Activision - Dixon)
     ZuletztGesehenComic        = keksinhalt[8] * 1;  // Comic
     ZuletztGesehenBuch         = keksinhalt[9] * 1;  // Bücher
     ZuletztMaster              = keksinhalt[10] * 1; // Master (0=Ich weiß nicht alles - bitte Spoilerschutz gewähren)
     UserFSK                    = keksinhalt[11];     // User hat Alterstest bestanden (oder nicht)
     HintergrundZombies         = keksinhalt[12];     // Hintergrundbild (Zombie-Mädels, Staffel 3 oder Neutral)
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
    HintergrundZombies = NeuerHintergrund;
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
      switch(HintergrundZombies)
      {
        case "Girls":
          b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/9/9d/BG-Standard.jpg)";
          b[all].style.backgroundAttachment = "fixed"; 
          break;       
        case "Staffel_3":
          b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/c/c0/Hintergrundbild_S3.jpg)";
          b[all].style.backgroundAttachment = "scroll";
          break;       
        case "Neutral":
          b[all].style.backgroundImage ="url(https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/9/9d/BG-Standard.jpg)";
          b[all].style.backgroundAttachment = "fixed";        
          break;       
      }
    }
  }
}

/*********************************************************\
    Funktion erstellt Spoiler und schützt Hintergrund

 * SpoilerAlert
 * documentation at: http://dev.wikia.com/wiki/SpoilerAlert
 * © Peter Coester, 2012 (angepasst: 20M61 in 2012)
 *
 * __NOWYSIWYG__
\*********************************************************/ 
  /********************************************************\
  * SpoilerStaffel                                         *
  * - Erstellt eine Zeile mit 1 Staffel und allen Folgen   *
  \********************************************************/
  function SpoilerStaffel(Headline, Staffel, MaxEpisoden, IDBereich, ZuletztGesehen, MinSpoilerSelection)
  {
    var SpoilerZeile=
      '<tr style="height: 20px">' +
        '<td style="vertical-align: top; padding:0px 3px 0px 10px;">'+
          '<span style="white-space:nowrap;">' +
            Headline +
          '</span>' +
        '</td>' +
        '<td style="vertical-align: top; padding:0px;">' +
          (Staffel != 0 ? '<span style="white-space:nowrap;">Staffel ' + Staffel + ':</span>':'') +
        '</td>';

        SpoilerZeile +=
        '<td style="vertical-align: top; padding:0px 3px 0px 0px;">' +
          '<span '+
            'class="' + ((Staffel * 100) <= ZuletztGesehen? 'spoilerOFF' : 'spoilerON') + '" '+
            'id="' + (IDBereich * 1 + Staffel * 100) +'" '+
            (MinSpoilerSelection == (IDBereich * 1 + Staffel * 100) ? 'style="background-color: #bd5b0e;" ':'') + 
            'onClick="ausklapp(this)">'+
            'X'+
          '</span>';
        for (IDnr = 1; IDnr <= MaxEpisoden; IDnr++ ) 
        {
          SpoilerZeile += 
          '<span '+
            'class="' + ((IDnr + Staffel * 100) <= ZuletztGesehen? 'spoilerOFF' : 'spoilerON') + '" '+
            'id="' + (IDBereich * 1 + Staffel * 100 + IDnr * 1) + '" '+
            (MinSpoilerSelection == (IDBereich * 1 + Staffel * 100 + IDnr * 1) ? 'style="background-color: #bd5b0e;" ':'') + 
            'onClick="ausklapp(this)">'+ 
            (IDnr < 10 ? '0'+IDnr : IDnr) + 
            '</span>';
        }
        SpoilerZeile +=
        '</td>' +
      '</tr>';

    return SpoilerZeile;
  }

  /********************************************************\
  * SpoilerComic                                           *
  * - Erstellt eine Zeile mit 1 Staffel und allen Folgen   *
  \********************************************************/
  function SpoilerComic(Headline, Subtitle, StartEpisode, MaxEpisoden, IDBereich, ZuletztGesehen, MinSpoilerSelection)
  {
    var SpoilerZeile=
      '<tr style="height: 20px">' +
        '<td style="vertical-align: top; padding:0px 3px 0px 10px;">'+
          '<span style="white-space:nowrap;">' +
            Headline +
          '</span>' +
        '</td>' +
        '<td style="vertical-align: top; padding:0px;">' +
          '<span style="white-space:nowrap;">' +
            Subtitle +
          '</span>' +
        '</td>';

        SpoilerZeile +=
        '<td style="vertical-align: top; padding:0px 3px 0px 0px;">';
          for (IDnr = StartEpisode; IDnr < StartEpisode+MaxEpisoden; IDnr++ ) 
          {
            SpoilerZeile += 
            '<span '+
              'class="' + (IDnr <= ZuletztGesehen? 'spoilerOFF' : 'spoilerON') + '" '+
              'id="' + (IDBereich * 1 + IDnr * 1) + '" '+
              (MinSpoilerSelection == (IDBereich * 1 + IDnr * 1) ? 'style="background-color: #bd5b0e;" ':'') + 
              'onClick="ausklapp(this)">'+ 
              (IDnr < 100 ? '0': '') + 
              (IDnr < 10  ? '0': '') +
              IDnr +
              '</span>';
          }
        SpoilerZeile +=
        '</td>' +
      '</tr>';

    return SpoilerZeile;
  }

  /********************************************************\
  * SpoilerMain                                            *
  * - Verbirgt den Artikel                                 *
  * - Blendet Spoilereinstellungen ein                     *
  \********************************************************/
  // Funktion ermittelt Hintergrundfarbe für SpoilerAuswahl
  function getBackgroundColor () 
  {
    // Seitenhintergrund
    color = $('#WikiaPageBackground').css('background-color');         
    if ('transparent' != color) return color;
    // Wikia Hintergrund
    color = $('#WikiaPage').css('background-color');                   
    if ('transparent' != color) return color;
    // Bereichs Hintergrund
    color = $('section.module', '#WikiaRail').css('background-color'); 
    if ('transparent' != color) return color;
    // Farbe kann nicht ermittelt werden
    return color;
  }
  
  // SpoilerAuswahl - Hintergrund grau + rote Box
  function SpoilerMain(ErrorText, MinWissn)
  {
    var dialog = ''
    +  '<table id="dialog" class="spoilerdialog" style="'
    +     'margin:0px; padding: 1px; '
    +     'text-align:left; border: 1px solid; '
    +     'background-color: #880000; '
    +     'border-radius: 10px; '
    +     '-moz-border-radius: 10px; '
    +     '-webkit-border-radius: 10px;'
    +     'width: 80%;">'
    +  '<tbody>'
    +  '<tr style="height: 20px">'
    +    '<td colspan="3" style="vertical-align: middle; '
    +                           'padding:        10px 0px 0px 0px; '
    +                           'text-align:     center; '
    +                           'font-size:      24px">'
    +      'Einstellungen'
    +    '</td>'
    +  '</tr>'
    +  '<tr style="height: 20px">'
    +    '<td colspan="3" style="text-align: left; padding: 0px 5px 4px 10px;">'
    +      'Bitte klick auf die Folgen-Nummern, die du bereits gesehen hast. '
    +      'Der Spoiler schützt dich vor Inhalten, die du noch nicht gesehen hast,  '
    +      'um dir die Spannung nicht zu nehmen.'
    +    '</td>'
    +  '</tr>';

    if (ErrorText != null)
    {
      dialog += ''
      +  '<tr style="height: 20px;">'
      +    '<td colspan="3" style="text-align: left; color: #F86060; padding: 0px 5px 6px 10px; font-weight: bold">'
      +    ErrorText 
      +    '</td>'
      +  '</tr>';
    }
    
    switch(wgCanonicalNamespace)
    {
      case "Comic":
        // SpoilerComic(Headline, StartEpisode, MaxEpisoden, IDBereich, ZuletztGesehen, MinSpoilerSelection)
        n = 1;
        dialog += SpoilerComic('Comic', 'Buch 1:' , n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 2:' , n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 3:' , n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 4:' , n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 5:' , n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 6:' , n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 7:' , n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 8:' , n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 9:' , n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 10:', n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 11:', n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 12:', n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 13:', n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 14:', n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 15:', n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 16:', n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 17:', n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        dialog += SpoilerComic(''     , 'Buch 18:', n, 6, 30000, ZuletztGesehenComic*1, MinWissn); n+=6;
        break;

      default:
        // Verwendung von: SpoilerStaffel(Headline, Staffel, MaxEpisoden, IDBereich, ZuletztGesehen)
        dialog += SpoilerStaffel('Webisoden', 1, 6, 10000, ZuletztGesehenWebStaffel*100+ZuletztGesehenWebFolge*1, MinWissn);
        dialog += SpoilerStaffel('', 2, 4, 10000, ZuletztGesehenWebStaffel*100 + ZuletztGesehenWebFolge*1,MinWissn);
        dialog += SpoilerStaffel('Dead Reckoning', 0, 7, 20000, ZuletztGesehenDRFolge,MinWissn);
        dialog += SpoilerStaffel('TV', 1,  6, 0, ZuletztGesehenTVStaffel*100+ZuletztGesehenTVFolge*1,MinWissn);
        dialog += SpoilerStaffel('',   2, 13, 0, ZuletztGesehenTVStaffel*100+ZuletztGesehenTVFolge*1,MinWissn);
        dialog += SpoilerStaffel('',   3, 16, 0, ZuletztGesehenTVStaffel*100+ZuletztGesehenTVFolge*1,MinWissn);
        break;

    }

    dialog+= ''
    +  '<tr style="height: 19px">'
    +    '<td colspan="2" style="vertical-align: top; padding:0px 10px 0px 10px;">'
    +      'Master-Button'
    +    '</td>'
    +    '<td style="vertical-align: top; padding:0px; text-align:left;">'
    +      (ZuletztMaster == 0?
           '<span class="spoilerON"  id="MasterSpoiler" onClick="ausklapp(this)">Spoiler-System aktiviert</span>' :
           '<span class="spoilerOFF" id="MasterSpoiler" onClick="ausklapp(this)">Spoiler-System deaktiviert</span>')
    +    '</td>'
    +  '</tr>'
    +  '<tr style="height: 20px">'
    +    '<td colspan="2" style="vertical-align: top; padding:0px 10px 0px 10px;">'
    +      ''
    +    '</td>'
    +    '<td style="vertical-align: top; padding:0px; text-align:left;">'
    +      '<code>'
    +        '<small>'
    +          '<span style="border: 1px solid #222222; background-color: #009900; padding: 3px; color:#000000;">'
    +            'GRÜN'
    +          '</span> = gesehen.   '
    +          '<span style="border: 1px solid #222222; background-color: #666666; padding: 3px; color:#000000;">'
    +            'GRAU'
    +          '</span> = nicht gesehen'
    +        '</small>'
    +      '</code>'
    +      '<hr style="width:80%">'
    +    '</td>'
    +  '</tr>';

    switch(wgCanonicalNamespace)
    {
      case "Comic":
        dialog+= ''
        +  '<tr style="height: 20px">'
        +    '<td style="vertical-align: top; padding:0px 3px 0px 10px;">Design</td>'
        +    '<td colspan="2" style="text-align:left; padding:0px 10px 0px 10px;">'
        +      '<input type="radio" name="Hintergrundbild" value="Girls"'              // ( ) Motiv 1
        +        (HintergrundZombies == "Girls"? ' checked ':' ') 
        +        'onClick="ChangeHintergrund(this.value)">Motiv 1'
        +      '<input type="radio" name="Hintergrundbild" value="Staffel_3"'          // ( ) Motiv 2
        +        (HintergrundZombies == "Staffel_3"? ' checked ':' ')  
        +        'onClick="ChangeHintergrund(this.value)">Motiv 2'  
        +      '<input type="radio" name="Hintergrundbild" value="Neutral"'            // ( ) Motiv 3
        +        (HintergrundZombies == "Neutral"? ' checked ':' ')  
        +        'onClick="ChangeHintergrund(this.value)">Motiv 3'      
        +    '</td>'
        +  '</tr>';
        break;

      default:
        dialog+= ''
        +  '<tr style="height: 20px">'
        +    '<td style="vertical-align: top; padding:0px 3px 0px 10px;">Design</td>'
        +    '<td colspan="2" style="text-align:left; padding:0px 10px 0px 10px;">'
        +      '<input type="radio" name="Hintergrundbild" value="Girls"'              // ( ) Zombie-Mädels
        +        (HintergrundZombies == "Girls"? ' checked ':' ') 
        +        'onClick="ChangeHintergrund(this.value)">Zombie-Mädels<br>'
        +      '<input type="radio" name="Hintergrundbild" value="Staffel_3"'          // ( ) Staffel 3
        +        (HintergrundZombies == "Staffel_3"? ' checked ':' ')  
        +        'onClick="ChangeHintergrund(this.value)">Staffel 3<br>'  
        +      '<input type="radio" name="Hintergrundbild" value="Neutral"'            // ( ) Neutral
        +        (HintergrundZombies == "Neutral"? ' checked ':' ')  
        +        'onClick="ChangeHintergrund(this.value)">Neutral<br>'      
        +    '</td>'
        +  '</tr>';
        break;

    }

    dialog+= ''
    +  '<tr style="height: 20px">'
    +    '<td style="vertical-align: top; padding:0px 3px 0px 10px;">Mithelfen</td>'
    +    '<td colspan="2" style="text-align:left; padding:0px 10px 0px 10px;">'
    +      '<input type="checkbox" name="Einstellung" id="HelpBoxAN" value="true"' // [ ] Hinweisboxen für Helfer anz.
    +        (MithelfenBoxen == true? ' checked ':' ')  
    +        'onClick="HideHelpingBoxes(this.checked)">Hinweisboxen für Helfer anzeigen'
    +    '</td>'
    +  '</tr>'
    +  '<tr style="height: 20px">'
    +    '<td colspan="3" style="text-align:right; padding: 0px 10px 10px 10px;">'
    +      '<span class="twdKnopf" id="Abbrechen">'
    +        'Abbrechen'
    +      '</span>   '
    +      '<span class="twdKnopf" id="Speichern">'
    +        'Speichern'
    +      '</span>'
    +    '</td>'
    +  '</tr>'
    +  '</tbody>'
    +'</table>';
   
    var article = $('article#WikiaMainContent');
    var articleHeight = article.height();

    while (document.getElementById("blackout") != null)
    {
      $('#blackout').remove();
    }

    $('<div id="blackout" class="spoilerblackout">' + dialog + '</div>').appendTo(article).css({
      position: 'absolute',
      top: 0, left: 0,
      width: '100%',
      zIndex: 1000,
      backgroundColor: getBackgroundColor(),
      opacity: 0
      });
    $('#blackout').fadeTo(500, 1.0,function () {
        // Hier können Anweisungen hinein, was passieren soll, wenn blackout geladen ist (angezeigt ist)
      });
    var dialogPadding = 100;
    var dialogHeight = $('#dialog').height();
    var topRelativeToWindow  = Math.round(
      ($(window).height() - dialogHeight) / 2 - $('#WikiaArticle').offset().top
    );
    var topRelativeToArticle = Math.round((articleHeight - dialogHeight) / 2);
    $('#blackout').css({
      height: Math.max(articleHeight, dialogHeight + dialogPadding * 2) + 'px'
      });
    $('#dialog').css({
      position: 'absolute',
      left: Math.round(($('#WikiaArticle').width()  - $('#dialog').width() ) / 2) + 'px',
      top:  Math.max(Math.min(topRelativeToWindow, topRelativeToArticle), dialogPadding) + 'px'
      });

    $('#Abbrechen').click(function () {
        $('#dialog').remove();
        $('#blackout').fadeOut(500, function () {
          $('#blackout').remove();
          if (liesCookie() == false)                        // liest Cookie aus und setzt Spoiler zurück
            SetSpoiler();                                   // Falls keine Cookie, dann wird Spoiler gesetzt
        });
      });

    $('#Speichern').click(function () {
        $('#dialog').remove();
        $('#blackout').fadeOut(500, function () {
          $('#blackout').remove();
          SetSpoiler();
        });
        schreibCookie();
      });
  }; // Ende Funktion

/*********************************************************\
   Kein Spoilerschutz für:
 * Seiten, die nicht im Namespace 0 (Artikel) sind
 * Es darf kein ? enthalten sein (deutet auf Zusatzatribute hin)
\*********************************************************/
if ((wgCanonicalNamespace == '' || wgCanonicalNamespace == 'Comic') && window.location.search == "")
{
  /*********************************************************\
    Spoiler-Auswahl Button vor Kommentar-Button (max. 1-Button)
  \*********************************************************/ 
  var ArtikelUeberschrift = document.getElementById("WikiaPageHeader");  
  if (ArtikelUeberschrift != null) 
  {
    for ( anz=0; anz<ArtikelUeberschrift.childNodes.length; anz++ )
    {
      if (ArtikelUeberschrift.childNodes[anz].nodeName == "H1" || ArtikelUeberschrift.childNodes[anz].nodeName == "h1")
        ArtikelUeberschrift.insertBefore(document.createElement("br"), ArtikelUeberschrift.childNodes[anz+1]);    

      if (ArtikelUeberschrift.childNodes[anz].className == "wikia-button comments secondary" ||
          ArtikelUeberschrift.childNodes[anz].className == "wikia-button comments secondary talk"   )
      {
        var SpoilerSpan    = document.createElement("span");
        var SpoilerSpanTxt = document.createTextNode("Einstellungen");
        SpoilerSpan.appendChild(SpoilerSpanTxt);
        SpoilerSpan.className = "twdSpoilerKnopf";
        SpoilerSpan.id        = "SpoilerAuswahl";
        SpoilerSpan.style.margin = "2px 0px 0px 7px"
        SpoilerSpan.onclick   = function(){
                                  SpoilerMain(null,null)
                                };
       ArtikelUeberschrift.insertBefore(SpoilerSpan, ArtikelUeberschrift.childNodes[anz]);    
       break;
      }
    }
  }

  if (liesCookie()==false) // Gibt es den TWD-Spoiler-Cookie?
  {
    // Kein Cookie -> Einstellung abfragen, Cookie setzen
    SetSpoiler();  //Standardeinstellung setzen
    SpoilerMain(null,null); //Spoiler-Einstellung anzeigen
  }
} 
else
  liesCookie(); // setzt trotzdem alle Variablen - nötig für Hintergrundbild.

// Ende: SpoilerFunktion nur für ausgewählte Seiten