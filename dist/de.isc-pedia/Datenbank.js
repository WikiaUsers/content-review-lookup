if(document.getElementById('DatenbankVersion') != 'null' || wgUserName == "Suriyaa iSC")
{
  var DB_VerDIV = document.createElement('div');
      DB_VerDIV.style.backgroundColor = 'green';
      DB_VerDIV.style.padding         = '0 5px 0 0';
      DB_VerDIV.style.textAlign       = 'right';
                document.getElementById('WikiaPage').appendChild(DB_VerDIV);
                DB_VerDIV.appendChild(document.createTextNode('Datenbank Version 1.03d'));
}

/****************************\
   Datenbank zusammentragen 

Die Datenbank besteht aus Datensätzen,
die in der Seite eingearbeitet sind
Diese werden im ersten Schritt ausgelesen
und in Arrays umgewandelt.
\****************************/

//Funktion liest Bilder aus und erstellt daraus einen STRING
function GetDataPicture(Element)
{
  var ReturnString ='';
  var Bild = Element.getElementsByTagName('a');
  for ( nxtA=0; nxtA<Bild.length; nxtA++ ) 
  {
    ReturnString += Bild[nxtA].innerHTML + '-' + Bild[nxtA].href + ';';
  }
  return ReturnString;
}

//Datenbank erstellen
var DB_Name  = new Array(); // Namen eintragen
var DB_Daten = new Array(); // Daten eintragen
var DBID     = 0;

var Datensatz = document.getElementById('WikiaMainContent').getElementsByTagName('span');
for ( nxtSPAN=0; nxtSPAN<Datensatz.length; nxtSPAN++ ) 
{
  // Alle SPAN Elemente durchgehen
  if (Datensatz[nxtSPAN].className == 'Datensatz')
  {
    //Ein Datensatz-Element wurde gefunden
    DB_Name.push(Datensatz[nxtSPAN].getAttribute('data-Name'));
    DBID = DB_Name.indexOf(Datensatz[nxtSPAN].getAttribute('data-Name'));
    DB_Daten[DBID] = new Object();
    DB_Daten[DBID]['Spoiler'] = Datensatz[nxtSPAN].getAttribute('data-Spoiler');
    DB_Daten[DBID]['Gruppe']  = Datensatz[nxtSPAN].getAttribute('data-Gruppe');
    DB_Daten[DBID]['Zombie']  = Datensatz[nxtSPAN].getAttribute('data-Zombie');
    DB_Daten[DBID]['Show']    = Datensatz[nxtSPAN].getAttribute('data-Show');
    DB_Daten[DBID]['Bild']    = GetDataPicture(Datensatz[nxtSPAN]);
  }
}

function ShowDataSet()
{
  var sdsDS = document.getElementById('WikiaMainContent').getElementsByTagName('div');
  var DB_Bilder;
  for ( nxtDIV=0; nxtDIV<sdsDS.length; nxtDIV++ ) 
  {
    if ( sdsDS[nxtDIV].className == 'ShowDataSet' )
    {
      //Tabellenelement erzeugen
      var DB_ID = DB_Name.indexOf(sdsDS[nxtDIV].getAttribute('data-Name'));

      var TableElement = document.createElement('table');
      TableElement.className = 'ShowDatensatz';
      sdsDS[nxtDIV].appendChild(TableElement);

        TabellenTRElement = document.createElement('tr');
        TableElement.appendChild(TabellenTRElement);
          TabellenTDElement = document.createElement('td');
          TabellenTDElement.rowSpan = 2;
          TabellenTDElement.style.width = '100px';
          TabellenTDElement.style.position = 'relative';
          TabellenTDElement.style.paddingBottom     = '0';
          TabellenTDElement.style.borderBottomColor = 'transparent';
            TabellenTRElement.appendChild(TabellenTDElement);
            var TabellenDIVElement  = document.createElement('div');
              TabellenDIVElement.style.position = 'absolute';
              TabellenDIVElement.style.bottom   = '0px'; // wegen Padding:0px im TD
              TabellenDIVElement.style.backgroundColor= 'rgba(100, 100, 100, 0.5)';
              TabellenDIVElement.style.textAlign= 'center';
              TabellenDIVElement.style.width    = '102px';
                TabellenTDElement.appendChild(TabellenDIVElement);
                TabellenDIVElement.appendChild(document.createTextNode(DB_Daten[DB_ID]['Bild'].split(';')[0].split('-')[0]));
            var TabellenBildElement = document.createElement('img');
                TabellenBildElement.style.width = '100px';
                TabellenBildElement.style.border= '1px solid grey';
                TabellenBildElement.src   = DB_Daten[DB_ID]['Bild'].split(';')[0].split('-')[1];
                TabellenTDElement.appendChild(TabellenBildElement);

          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode('Status'));
            TabellenTRElement.appendChild(TabellenTDElement);
          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode(DB_Daten[DB_ID]['Spoiler']));
            TabellenTRElement.appendChild(TabellenTDElement);

        TabellenTRElement = document.createElement('tr');
        TableElement.appendChild(TabellenTRElement);
          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode('Gruppe'));
            TabellenTRElement.appendChild(TabellenTDElement);
          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode(DB_Daten[DB_ID]['Gruppe']));
            TabellenTRElement.appendChild(TabellenTDElement);

        TabellenTRElement = document.createElement('tr');
        TableElement.appendChild(TabellenTRElement);

          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.style.paddingTop     = '0';
            TabellenTDElement.style.borderTopColor = 'transparent';
            TabellenTRElement.appendChild(TabellenTDElement);
            DB_Bilder = DB_Daten[DB_ID]['Bild'].split(';');
            for (var i=0; i < DB_Bilder.length-1; i ++)
            {
                TabellenBildElement = document.createElement('img');
                TabellenBildElement.style.width = '23px';
                TabellenBildElement.style.height = '23px';
                TabellenBildElement.style.border= '1px solid grey';
                TabellenBildElement.alt   = DB_Bilder[i].split('-')[0];
                 TabellenBildElement.src   = DB_Bilder[i].split('-')[1];
                TabellenBildElement.onmouseover = function(){ 
                  /*Image-TD-TR-Table-TR-TD-IMAGE0-src */
                  this.parentNode.parentNode.parentNode.firstChild.firstChild.childNodes[1].src = this.src;
                  /*Image-TD-TR-Table-TR-TD-DIV-innerHTML */
                  this.parentNode.parentNode.parentNode.firstChild.firstChild.firstChild.innerHTML = this.alt;
                  this.style.borderColor = 'white';
                };
                TabellenBildElement.onmouseout = function(){ 
                  this.style.borderColor = 'grey';
                };          
                TabellenTDElement.appendChild(TabellenBildElement);
            }
          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode('Zombie'));
            TabellenTRElement.appendChild(TabellenTDElement);
          TabellenTDElement = document.createElement('td');
            TabellenTDElement.style.verticalAlign  = 'top';
            TabellenTDElement.appendChild(document.createTextNode(DB_Daten[DB_ID]['Zombie']));
            TabellenTRElement.appendChild(TabellenTDElement);

      var ShowDIVElement = document.createElement('div');
      ShowDIVElement.style.position = 'absolute';
      ShowDIVElement.style.top      = '-10px';
      ShowDIVElement.style.right    = '-10px';
      ShowDIVElement.style.border   = '1px solid grey';
      ShowDIVElement.style.fontSize = '75%';
      ShowDIVElement.style.padding  = '0 5px 0 5px';
      ShowDIVElement.style.backgroundColor = '#474646';
      ShowDIVElement.style.fontSize = '75%';
      sdsDS[nxtDIV].style.position  = 'relative';
      sdsDS[nxtDIV].style.maxWidth  = '95%';
      sdsDS[nxtDIV].appendChild(ShowDIVElement);
      ShowDIVElement.appendChild(document.createTextNode(DB_Daten[DB_ID]['Show']));
    }
  }
}
ShowDataSet();