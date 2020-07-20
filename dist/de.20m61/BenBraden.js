/*********************************************************\
            Ben Braden - JavaScript Spielwiese
\*********************************************************/

function CountCheckbox(InputObjekt) {
  var maxCount = 3; //Maximale Anzahl an gleichzeitig aktivierten Checkboxen
  var InputTags = document.getElementById('WikiaArticle').getElementsByTagName('input'); //Alle Checkboxen im Artikel
  for ( nxtINT=0; nxtINT<InputTags.length; nxtINT++ ) { // Geh alle Checkboxen nacheinander durch
    //Wird eine gefunden, deren Klasse mit der Klasse der gedrückten Checkbox gleich ist, 
    if (InputTags[nxtINT].className == InputObjekt.className) { 
      //verringere den Zähler
      maxCount --;
      //Ist der Zähler unter 0 (1. maxCount=2; 2. maxCount=1; 3. maxCount=0 --> danach (ab dem 4.) ist kleiner 0)
    }
  }
  if (maxCount < 0) 
    InputObjekt.checked = false; // Zustand dieser Checkbox auf "nicht geklickt" setzen.
  else 
    InputObjekt.checked = true;  // Checkbox setzen, falls maxCount noch eines zulässt.
}

var NewInput;
var DIVtoINPUT = document.getElementById('WikiaArticle').getElementsByTagName('div');
for ( nxtDIV=0; nxtDIV<DIVtoINPUT.length; nxtDIV++ ) 
{
  if (DIVtoINPUT[nxtDIV].className == "input") 
  {
    NewInput               = document.createElement('input');
    NewInput.className     = DIVtoINPUT[nxtDIV].getAttribute('data-class');
    NewInput.style.cssText = DIVtoINPUT[nxtDIV].getAttribute('data-style');
    NewInput.type          = DIVtoINPUT[nxtDIV].getAttribute('data-type');
    if (DIVtoINPUT[nxtDIV].getAttribute('data-checked') != 'false')
      NewInput.checked       = DIVtoINPUT[nxtDIV].getAttribute('data-checked');
    NewInput.value         = DIVtoINPUT[nxtDIV].getAttribute('data-value');
    NewInput.onclick       = function(){           
                                  // Hier die Funktion, die aufgerufen wird, wenn der Button gedrückt wurde
                                  CountCheckbox(this);
                                  };
    DIVtoINPUT[nxtDIV].insertBefore(NewInput,DIVtoINPUT[nxtDIV].firstChild);
  }
}