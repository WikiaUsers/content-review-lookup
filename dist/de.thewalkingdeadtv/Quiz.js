/*********** QUIZ-JavaScript ***********
Dieses JavaScript wandelt eine POLL-Umfrage in ein Quiz
Dabei müssen verschiedene Vorlagen und CSS verwendet werden,
damit das Quiz auch als solches erkannt wird.

Verwendet wird:
* [[Vorlage:Quiz]]
* [[Vorlage:Quiz/Variable]]
* [[MediaWiki:Quiz.css]]

(c) 2013-2014 by 20M61 - TWD-Wikia
***************************************/

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//Eine einfache Funktion, die aufgerufen werden soll, wenn der Button gedrückt wurde:
function QuizButtonFunktion()
{
  //Nur URL - Falls irgendwelche Sondersachen aufgerufen sind, werden die abgeschnitten
  var MeinWikiURL = location.href.split("?")[0]; 
      MeinWikiURL = location.href.split("#")[0]; 
  window.location.href = MeinWikiURL + "/Quiz";
}
 
//Button einbauen, wenn in einer Unterseite /Quiz vorhanden ist
var Position = document.getElementById("WikiaPageHeader"); 
if (Position != null && document.getElementById("QuizHiddenButton") != null)
{
    
    for ( anz=0; anz<Position.childNodes.length; anz++ )
    {
      if (Position.childNodes[anz].className == "wikia-button comments secondary" ||
          Position.childNodes[anz].className == "wikia-button comments secondary talk"   )
      {
        // Jetzt fügen wir den eigentlichen Button ein:
        var ButtonElement    = document.createElement("span");
        var ButtonTxt        = document.createTextNode("Quiz"); 
        ButtonElement.appendChild(ButtonTxt); 
 
        ButtonElement.className = "twdSpoilerKnopf";
        ButtonElement.id        = "twdQuizButton"; 
        ButtonElement.style.margin = "2px 0px 0px 7px"; 
        ButtonElement.onclick   = function(){          
                                  QuizButtonFunktion();
                                  };
       Position.insertBefore(ButtonElement, Position.childNodes[anz]); 
       break; 
      }
    }
}


//Ist dieser Artikel ein Quiz??
if (document.getElementById("Quiz-Start") != null)
{
    var QuizVersion = "Version: Beta 1.03";

    /*************************\
         Globale Variablen
    \*************************/
    var Antwort = new Array();
        Antwort[0] = "";
        Antwort[1] = "";
        Antwort[2] = "";
        Antwort[3] = "";
        Antwort[4] = "";

    var AntwortPunkte= new Array();
        AntwortPunkte[0] = 0;
        AntwortPunkte[1] = 0;
        AntwortPunkte[2] = 0;
        AntwortPunkte[3] = 0;
        AntwortPunkte[4] = 0;

    var MaxAntwort = 0;
    var LeserAntwort = new Array();
    var LeserPunkte  = new Array();
    var Punkte = 0;
    var AnzFragen = 0;

    /*************************\
            Funktionen
    \*************************/
    // Hintergrundbild ändern
    var Img_Nr = 0;
    function NextBackgroundPicture() 
    {

        if (document.getElementById("Quiz-Start").getElementsByTagName("img").length == Img_Nr*1) 
         document.QuizBG.src = "https://images.wikia.nocookie.net/__cb20140210165558/thewalkingdeadtv/de/images/1/19/QuizStartbild.jpg";
        else 
        {
            document.getElementById("Quiz-Start").getElementsByTagName("img")[Img_Nr].setAttribute('data-angezeigt','ja');
            document.QuizBG.src = document.getElementById("Quiz-Start").getElementsByTagName("img")[Img_Nr].src;
            Img_Nr += 1;
        }

        var Faktor = document.QuizBG.height / document.QuizBG.width;
        var FaktorBreite = document.getElementById("QuizRahmen").offsetWidth * Faktor;
        // 630 * Faktor < 408 -> Faktor reduziert Breite zu stark, sodass Rand entsteht 
        // - Es muss sich an Höhe orientiert werden
        // Höhe / Breite = Faktor ==> Höhe = Breite * Faktor wenn Faktor = 1 | H < B für k<1 | H > B für k>1
        if (FaktorBreite < document.getElementById("QuizRahmen").offsetHeight) 
        {
            document.QuizBG.style.height = "100%";
            document.QuizBG.style.width  = "auto";
        }
        else 
        {
            document.QuizBG.style.height = "auto";
            document.QuizBG.style.width  = "100%";
        }

        return true;
        }  // Ende NextBackgroundPicture

        //Nächstes Poll heraus suchen und auslesen
        function GetNextPoll() 
        {
            // Vor jedem Poll soll ein (neues) Hintergrundbild stehen
            NextBackgroundPicture(); // (Bild abfragen - gibt es keins, wird ein Standardbild verwendet.)

        var Elemente = document.getElementById('Quiz-Start').getElementsByTagName("table"); 
        for ( qdiv=0; qdiv<Elemente.length; qdiv++ ) 
        {
            if (Elemente[qdiv].className == 'QuizAntworten wikitable' 
                && Elemente[qdiv].getAttribute('data-Tabelle-gelesen') != 'ja')
            {
                // unbearbeitetes POLL gefunden    && d[qdiv].getAttribute('data-Tabelle-gelesen') !='ja'
                Elemente[qdiv].setAttribute('data-Tabelle-gelesen', 'ja');
                Elemente[qdiv].getAttribute('data-Tabelle-gelesen', 'ja');

                Antwort[1] = Elemente[qdiv].getAttribute('data-antwort1');
                Antwort[2] = Elemente[qdiv].getAttribute('data-antwort2');
                Antwort[3] = Elemente[qdiv].getAttribute('data-antwort3');
                Antwort[4] = Elemente[qdiv].getAttribute('data-antwort4');
                Antwort[0] = Elemente[qdiv].getAttribute('data-antwort0');

                AntwortPunkte[1] = Elemente[qdiv].getAttribute('data-punkte1');
                AntwortPunkte[2] = Elemente[qdiv].getAttribute('data-punkte2');
                AntwortPunkte[3] = Elemente[qdiv].getAttribute('data-punkte3');
                AntwortPunkte[4] = Elemente[qdiv].getAttribute('data-punkte4');
                AntwortPunkte[0] = Elemente[qdiv].getAttribute('data-punkte0');

                break; //Alle nachfolgenden Tabellen (noch) nicht beachten.
            }
        }

        Elemente = document.getElementById('Quiz-Start').getElementsByTagName("div"); 
        for ( qdiv=0; qdiv<Elemente.length; qdiv++ ) 
        {
            if (Elemente[qdiv].className == 'ajax-poll' 
                && Elemente[qdiv].getAttribute('data-Frage-gelesen') != 'ja')
            {
                // unbearbeitetes POLL gefunden    
                Elemente[qdiv].setAttribute('data-Frage-gelesen', 'ja');
                return Elemente[qdiv];
            }
        }

        return false;  // Es gibt kein weiteres DIV - also abbrechen.
    }
 
    //Die Funktion gibt die jeweiligen Antworten oder Votes zurück
    function GetAnswer(element, Erwartung, Nummer)
    {   
        switch (Erwartung) {
          case "Text":
            return element.getElementsByTagName("label")[Nummer].lastChild.data;
            break;
          case "Votes":
            return element.getElementsByTagName("div")[0].getElementsByTagName("span")[Nummer].lastChild.data;
            break;
          case "Gesamtvotes":
            element = element.getElementsByTagName("div")[0].getElementsByTagName("span");
            return element[element.length-1].lastChild.data;
            break;
        }
        return false;
    }

    // ReadPoll liest ein Poll aus und setzt Fragen / Antworten ein.
    function ReadPoll() {
        var QuizElement = GetNextPoll();
        if (! QuizElement) { return false; }

        //Wenn Frage gefunden, dann Zähler erhöhen
        AnzFragen += 1; 

        var FormElement = null;
        for (var i=0; i<QuizElement.childNodes.length; i++) 
        {
            // Frage auslesen und einsetzen.
            if (QuizElement.childNodes[i].tagName == 'DIV' && 
                QuizElement.childNodes[i].className == 'header') 
                document.getElementById('QuizFrage').innerHTML = QuizElement.childNodes[i].innerHTML;

            // Form-Element herausfinden
            if (QuizElement.childNodes[i].tagName == "FORM")
                FormElement = QuizElement.childNodes[i];
        }

        // Abbruch, wenn kein Form-Element gefunden wurde.
        if (FormElement == null) 
        {
            if (wgUserName == "20M61") 
            { 
                alert ("Quiz.js - ReadPoll() meldet:\n"+
                        "\n"+
                        "Kein FormElement gefunden.\n"+
                        "Vermutung, dass das Poll-Element defekt ist.\n"+
                        "Abbruch der Quizerstellung.\n"+
                        "\n"+
                        "Nachricht nur für 20M61, anderen wird sie nicht angezeigt."); 
            }
            return false; 
        }
            
        //Fragen einsetzen
        document.getElementById('Antwort1').innerHTML = GetAnswer(FormElement, 'Text',0);
        document.getElementById('Antwort2').innerHTML = GetAnswer(FormElement, 'Text',1);
        document.getElementById('Antwort3').innerHTML = GetAnswer(FormElement, 'Text',2);
        document.getElementById('Antwort4').innerHTML = GetAnswer(FormElement, 'Text',3); 
        return true;         
    }// Ende READPOLL()

        
    function ControllQuestion(ButtonNr)
    {
        //Wenn ein Button-Element deaktiviert ist, dann wird abgebrochen
        if (document.getElementById("Antwort1").getAttribute('data-disabled') == 'true') return;

        LeserAntwort[MaxAntwort] = Antwort[ButtonNr*1];
        LeserPunkte[MaxAntwort]  = AntwortPunkte[ButtonNr*1];
        MaxAntwort += 1;

        //Nur die richtigen Antworten einfärben
        if (AntwortPunkte[1] > 0 || AntwortPunkte[1] == true || AntwortPunkte[1] == "wahr")
            document.getElementById("Antwort1").className = "AnswerCorrect";
        if (AntwortPunkte[2] > 0 || AntwortPunkte[2] == true || AntwortPunkte[2] == "wahr")
            document.getElementById("Antwort2").className = "AnswerCorrect";
        if (AntwortPunkte[3] > 0 || AntwortPunkte[3] == true || AntwortPunkte[3] == "wahr")
            document.getElementById("Antwort3").className = "AnswerCorrect";
        if (AntwortPunkte[4] > 0 || AntwortPunkte[4] == true || AntwortPunkte[4] == "wahr")
            document.getElementById("Antwort4").className = "AnswerCorrect";

        //Überprüfen, ob Antwort richtig oder falsch war
        if (AntwortPunkte[ButtonNr*1] > 0 || AntwortPunkte[ButtonNr*1] == true || AntwortPunkte[ButtonNr*1] == "wahr")
            document.getElementById("Antwort"+ButtonNr).className = "AnswerCorrect";
        else 
            document.getElementById("Antwort"+ButtonNr).className = "AnswerWrong";        

        //Punkte werden immer gegeben. So gibt es MINUS-Punkte und MEHRFACH-Punkte
        Punkte += AntwortPunkte[ButtonNr*1]*1;

        document.getElementById("Antwort1").setAttribute('data-disabled','true');
        document.getElementById("Antwort2").setAttribute('data-disabled','true');
        document.getElementById("Antwort3").setAttribute('data-disabled','true');
        document.getElementById("Antwort4").setAttribute('data-disabled','true');

        document.getElementById("QuizWeiter").style.display = "";        

        return;
    }// Ende ControllQuestion()

    function NextQuestion() 
    {
        document.getElementById("Antwort1").className = "QuizButton";        
        document.getElementById("Antwort2").className = "QuizButton";        
        document.getElementById("Antwort3").className = "QuizButton";        
        document.getElementById("Antwort4").className = "QuizButton";        
        document.getElementById("Antwort1").setAttribute('data-disabled','');
        document.getElementById("Antwort2").setAttribute('data-disabled','');
        document.getElementById("Antwort3").setAttribute('data-disabled','');
        document.getElementById("Antwort4").setAttribute('data-disabled','');
        document.getElementById("QuizWeiter").style.display = "none";        
        if (ReadPoll()) 
            return;
        else             //Es gibt keine weiteren Fragen mehr
        {
            // Antworten-Block unsichtbar machen.
            document.getElementById("QuizInteraktionsbox").style.display = "none";

            //Abschlussbild laden (sonst Standardbild)
            //NextBackgroundPicture(); ReadPoll() liest bereits das nächste Bild aus.
                
            //DIV mit Abschluss-Darstellung einbinden
            var EndDIV = document.getElementById("EndDIV");
            document.getElementById("QuizRahmen").appendChild(EndDIV);
                
            //In dem AbschlussDIV sämtliche Spezialelemente mit Variablen bestücken
            var Element_EndDIV = EndDIV.getElementsByTagName("span"); 
            for (i=0; i < Element_EndDIV.length; i++)
            {
                if(Element_EndDIV[i].className == "QuizInfo") 
                {
                    switch(Element_EndDIV[i].getAttribute('data-Variable'))
                    {
                        case "Punkte":
                            Element_EndDIV[i].innerHTML = Punkte;
                            break;
                        case "Fragenanzahl":
                            Element_EndDIV[i].innerHTML = AnzFragen;
                            break;
                        case "Prozent":
                            //Runden methode: leider nur auf ganze INTEGER - also mit Trick auf 2 Nachkommastellen.
                            Element_EndDIV[i].innerHTML = Math.round(Punkte/AnzFragen*10000)/100;
                            break;
                        default:
                            Element_EndDIV[i].innerHTML = "Variable / Anweisung unbekannt";
                            break;
                    }                        
                }
            }
        }
        return;
    }

    function StartQuiz()
    {
        document.getElementById('QuizStartDiv').style.display = 'none';
        document.getElementById('QuizHeadline').style.display = 'none';
        document.getElementById('QuizInteraktionsbox').style.display = '';
        ReadPoll();
    }

    /*************************\
           Umgestaltung
    \*************************/
    // Ausblenden des normalen Artikels wenn nicht mit Eigenschaften aufgerufen. (?action=history etc. wird angezeigt)
    if (location.href.split("?")[1] == null)
      document.getElementById("WikiaArticle").style.display = "none"; 
    
    // Neuen Artikel-Body erstellen
    var QuizBody       = document.createElement("div");
    QuizBody.className = "WikiaArticle";
    QuizBody.id        = "Quiz";
    insertAfter(document.getElementById("WikiaArticle"), QuizBody);    

    //Quiz-Rahmen
    var QuizElement       = document.createElement("div");
    QuizElement.className = "QuizRahmen";
    QuizElement.id        = "QuizRahmen";
    QuizBody.appendChild(QuizElement);
    QuizBody              = QuizElement;    

    //Hintergrundbild DIV-Box
    var QuizBildDIV       = document.createElement("div");
    QuizBildDIV.style.cssText = "position:relative; height:100%;";
    QuizBildDIV.name       = "QuizBG";
    QuizBody.appendChild(QuizBildDIV);

      //Hintergrundbild Image
      var QuizBGBild        = document.createElement("img");
      QuizBGBild.style.cssText = "width: 100%; height: 100%;";
      QuizBGBild.name       = "QuizBG";
      QuizBGBild.src        = "https://images.wikia.nocookie.net/__cb20120319013007/thewalkingdeadtv/de/images/3/3d/Fragezeichen.jpg";
      for (i = 0; i < document.images.length; ++i) 
      {
          if (document.images[i].parentNode.parentNode.id == "Startbild") 
          {
              QuizBGBild.src        =  document.images[i].src;
              break;
          }
      }
      QuizBildDIV.appendChild(QuizBGBild);

    //Überschrift
    QuizElement           = document.createElement("div");
    QuizElement.className = "QuizHeadline";
    QuizElement.id        = "QuizHeadline"; 
    QuizBody.appendChild(QuizElement);
      var QuizElementTxt;
      var Headline          = document.getElementById('Quiz-Headline')
      if(Headline == null)
        QuizElementTxt    = document.createTextNode("The Walking Dead - Extreme Survival Hardcore Quiz");
      else
        QuizElementTxt    = document.createTextNode(Headline.firstChild.innerHTML);
 
      QuizElement.appendChild(QuizElementTxt);

    //Start-Button
    QuizElement           = document.createElement("div");
    QuizElement.className = "QuizStartDiv";
    QuizElement.id        = "QuizStartDiv"; 
    QuizElement.addEventListener( 'click', function(){StartQuiz();} );
    QuizBody.appendChild(QuizElement);
      QuizElement.appendChild(document.createTextNode("Quiz starten"));

    //InteraktionsBox (unten)
    var AntwortElement       = document.createElement("div");
    AntwortElement.className = "QuizInteraktionsbox";
    AntwortElement.id        = "QuizInteraktionsbox";
    AntwortElement.style.display = "none";
    QuizBody.appendChild(AntwortElement);

      //Weiter-Button
      QuizElement           = document.createElement("div");
      QuizElement.className = "QuizStartDiv";
      QuizElement.id        = "QuizWeiter"; 
      QuizElement.style.display   = "none"; 
      QuizElement.style.width     = "100px"; 
      QuizElement.style.height    = "25px"; 
      QuizElement.style.top       = "-40px"; 
      QuizElement.style.right     = "5px"; 
      QuizElement.style.float     = "right"; 
      QuizElement.style.fontSize  = "100%"; 

      QuizElement.addEventListener( 'click', function(){NextQuestion();} );
      AntwortElement.appendChild(QuizElement);
        QuizElement.appendChild(document.createTextNode("Weiter"));

      //Frage
      QuizElement           = document.createElement("div");
      QuizElement.className = "QuizFrage";
      QuizElement.id        = "QuizFrage";
      AntwortElement.appendChild(QuizElement);
        QuizElementTxt        = document.createTextNode("Hier kommt die Frage hinein.");
        QuizElement.appendChild(QuizElementTxt);

      //Antwortbuttons
      for (var i=1;i<5;i++)
      { 
        QuizElement           = document.createElement("div");
        QuizElement.className = "QuizButton";
        QuizElement.id        = "Antwort"+i;
        QuizElement.name      = "Antwort"+i;
        AntwortElement.appendChild(QuizElement);
        QuizElementTxt        = document.createTextNode("Button"+i);
        QuizElement.appendChild(QuizElementTxt);
        if (i==1) QuizElement.addEventListener( 'click', function(){ControllQuestion(1);} );
        if (i==2) QuizElement.addEventListener( 'click', function(){ControllQuestion(2);} );
        if (i==3) QuizElement.addEventListener( 'click', function(){ControllQuestion(3);} );
        if (i==4) QuizElement.addEventListener( 'click', function(){ControllQuestion(4);} );
      }

      //Versionsnotiz
      var QuizVersionElement = document.createElement("span");
      QuizVersionElement.style.float = "right";
      QuizVersionElement.style.fontSize = "70%";
      document.getElementById("Quiz").appendChild(QuizVersionElement);
        QuizElementTxt        = document.createTextNode(QuizVersion);
        QuizVersionElement.appendChild(QuizElementTxt);

    /*************************\
         Ausführbarer Code
    \*************************/
    NextBackgroundPicture(); // Setzt das erste Hintergrundbild ein.

} // Ende Abfrage ob Quiz im Artikel