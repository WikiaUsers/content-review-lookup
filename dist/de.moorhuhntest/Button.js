//Eine einfache Funktion, die aufgerufen werden soll, wenn der Button gedrückt wurde:
  function MyButtonFunktion()
{
  var MoorhuhnWikiURL = "http://de.moorhuhn.wikia.com/wiki/";
  window.location.href = MoorhuhnWikiURL + "Moorhuhn Wiki:Community Portal/Feedback";
}
 
  //In Position suchen wir ein geeignetes Element, hinter oder vor dem wir unseren Button platzieren
  var Position = document.getElementById("WikiaPageHeader"); 
  //Ausgangspunkt ist die Überschrift (unzwar der gesamte Bereich inkl. Artikel-Titel, Bearbeiten, Zähler ...)
  //Da nicht jede Seite sowas hat (z.B. Profilseiten) muss man überprüfen ob es möglich ist
  if (Position != null) 
  {
    // Nun werden alle Elemente innerhalb der Überschrift durchgegangen (wie gesagt ... gibt mehr als nur den Titel des Artikels
    for ( anz=0; anz<Position.childNodes.length; anz++ )
    {  
 
      // Wir suchen den "Kommentar"-Button, denn VOR diesem wollen wir unseren Button einfügen, damit er hinter dem Bearbeiten-Button liegt.
      // Warum Kommentar und nicht nach Bearbeiten-Button suchen? Ganz einfach: Es gibt min. 2 unterschiedliche Bearbeiten Button: zum einen den einfachen Knopf, zum Anderen das Dropdown-Menü. Beide sind in der Art recht verschieden - so ist es einfach leichter.
      if (Position.childNodes[anz].className == "wikia-button comments secondary" ||
          Position.childNodes[anz].className == "wikia-button comments secondary talk"   )
      {
        // Jetzt fügen wir den eigentlichen Button ein:
        var ButtonElement    = document.createElement("span");  //Erzeugt ein SPAN-Element
        var ButtonTxt        = document.createTextNode("Feedback geben"); //Text des Buttons
        ButtonElement.appendChild(ButtonTxt); //Hier wird dem Button sein Text zugewiesen
 
        ButtonElement.className = "wikia-menu-button MyButton"; // der Button bekommt eine Klasse (dort bestimmen wir das Aussehen)
        ButtonElement.id        = "MyButtonID"; // eine ID, damit wir den Button schneller ansprechen können, wenn wirs brauchen.
ButtonElement.title        = "foobar";
        ButtonElement.style.margin = "2px 0px 0px 7px"; // Die Margin-Werte haben sich als nützlich erwiesen - könnten aber auch in der Klasse definiert werden.
        ButtonElement.onclick   = function(){           // Hier die Funktion, die aufgerufen wird, wenn der Button gedrückt wurde
                                  MyButtonFunktion();
                                  };
       Position.insertBefore(ButtonElement, Position.childNodes[anz+1]); //Jetzt ist der Button fertig und kann VOR dem Kommentarknopf eingesetzt werden   
       break; //Wir sind fertig und brechen die FOR-Schleife ab, denn wir wollen nur 1 Button setzen.
      }
    }
  }