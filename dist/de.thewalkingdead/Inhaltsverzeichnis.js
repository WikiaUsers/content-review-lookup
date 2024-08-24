// Variablen zum Ver�ndern der Einstellungen
var Listentiefe    = 4; // Variable bis zu welcher �berschrift (z.B. 3 = h3) ins Inhaltsverzeichnis aufgenommen werden soll.
var Anzahl_Zeichen = 0; // Beschr�nkt die angezeigten Zeichen (0 = unendlich lang, >0 = maximale Anz. Zeichen)

// Eigentlicher Code
var h = document.getElementsByClassName("mw-headline"); // Liste anlegen mit allen �berschriftselementen (von Wikia-Artikeln)
for ( element=0; element<h.length; element++ )  // Alle gefundenen Eintr�ge einzeln aus der Liste auswerten
{
  AddEntryToTOC(element);
  AddNavigationItems(element);
}

// Funktionen, die von der Hauptroutine verwendet werden 
// (Ist �bersichtlicher sie auszulagern - und werden h�ufig gebraucht - zumindest auf dieser Seite)

function AddEntryToTOC(Element)
{
  return (0);
}

function AddNavigationItems(Element)
{
  // Bild erstellen
  var NavigationsObjekt             = document.createElement("img");
  NavigationsObjekt.src             = "https://images.wikia.nocookie.net/thewalkingdeadtv/de/images/0/09/TWD_Hand.png";
  NavigationsObjekt.height          = "100%";
  NavigationsObjekt.data-image-name = "TWD Hand.png";
  NavigationsObjekt.data-image-key  = "TWD_Hand.png";
  NavigationsObjekt.alt             = "TWD Hand";
  NavigationsObjekt.float           = "right";

  // Link erstellen und mit Bild verkn�pfen
  var NavigationsLink               = document.createElement("a");
  NavigationsLink.href              = document.URL + "#" + Element.id;
  NavigationsLink.appendChild(NavigationsObjekt);

  // Verkn�pftes Linkbild ans Ende der �berschrift setzen (rechts)
  Element.insertAfter(NavigationsLink, Element.lastChild);

  return true;
}