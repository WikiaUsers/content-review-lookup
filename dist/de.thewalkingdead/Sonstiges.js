function commentPreText()
{
  // ****************************************
  //  Nur wenn JS an ist darf editiert werden
  // ****************************************
  if (document.getElementById('JavaScript_deaktiviert') != null)
    //***Warnung ausblenden***
    // document.getElementById('JavaScript_deaktiviert').style.display = 'none'; 

  var Comment= document.getElementsByTagName('ul'); 
  if (Comment) {
  for ( ul=0; ul<Comment.length; ul++ ) {
    if ( Comment[ul].className == 'comments' )
      Comment[ul].style.display = 'block';
  }
  }

  var Comment= document.getElementsByTagName('form'); 
  if (Comment) {
  for ( ul=0; ul<Comment.length; ul++ )
    Comment[ul].style.display = 'block';
  }
  // ****************************************
  //  Kommentare umbenennen / ändern
  // ****************************************

  if (document.getElementById('article-comm') != null)  {
    document.getElementById('article-comm').placeholder = 'Bitte schreibe hier nur Kommentare über diesen Artikel. Meinungen zum Inhalt gehören ins Forum.';
  }
}
addOnloadHook(commentPreText);

//***********************************
// Klappt Navigation zusammen (Charakter / Orte ...)
//***********************************
function ausklappNavi( element ){
  if (element.className == 'Navi' && document.getElementById(element.id+'_body').style.display == 'none')		
    document.getElementById(element.id+'_body').style.display = '';
  else
    document.getElementById(element.id+'_body').style.display = 'none';
}
 
//***********************************
// Nachdem Seite geladen ist alle klappfähigen Elemente mit JavaScript ausstatten
//***********************************
function makeAusklapp(){
  var a = document.getElementsByTagName('div'); 
  for ( div=0; div<a.length; div++ ) {
    if ( a[div].className == 'Navi' )
      a[div].onclick = function () { ausklappNavi(this);}
  } 
}
addOnloadHook(makeAusklapp);

function closeAllAusklapp(){
  var Navi = document.getElementsByTagName('div'); 
  for ( div=0; div<Navi.length; div++ ) {
    if ( Navi[div].className == 'Navi' )
      document.getElementById(Navi[div].id+'_body').style.display = 'none';
  }
}
addOnloadHook(closeAllAusklapp);

// ******************************************+
// Ersetzt {{User}} mit dem Namen des Benutzers - benötigt die Vorlage:User
// ******************************************+

function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('span.insertusername').html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

/********************************************\
      MouseOver Funktion für MiniBox
\********************************************/
function MiniBoxMouseOver() {
  var MB_Bild = document.getElementsByTagName('div'); 
  for ( div=0; div<MB_Bild.length; div++ ) {
    if ( MB_Bild[div].className == 'MiniBox_NormalBild' ) {
      MB_Bild[div].onmouseover = function() { this.style.display = 'none'; this.nextSibling.style.display=''; };      
    }

    if ( MB_Bild[div].className == 'MiniBox_MouseOverBild' ) {
      MB_Bild[div].onmouseout = function() { this.style.display = 'none'; this.previousSibling.style.display=''; };
    }
  }

}
 addOnloadHook(MiniBoxMouseOver);

if (document.getElementById("Quiz-Start") == null && HTMLAgument['action'] != 'edit') {
// Einbetten der Überschrift in einen Anker
var Seitenbeginn = document.createElement('a');
    Seitenbeginn.name = 'Seitenanfang';
    if (document.getElementById('WikiaPageHeader'))
    document.getElementById('WikiaPageHeader').insertBefore(Seitenbeginn, document.getElementById('WikiaPageHeader').childNodes[0]);

var Toplink; var Hasenschuh;
var H2Elemente = document.getElementById('mw-content-text').getElementsByTagName('h2');
    for (var i = 0; i < H2Elemente.length; i ++)
    {
      Toplink = document.createElement('a');
      Toplink.href                 = '#Seitenanfang';
      Toplink.alt                  = 'Seitenanfang';      
      Toplink.style.float          = 'right';      
      Toplink.style.fontSize       = '75%';   
      Toplink.style.textDecoration = 'none';   
        Hasenschuh                 = document.createElement('img');
        Hasenschuh.style.cssText   = 'height: 20px; opacity: 0.5;';
        Hasenschuh.alt             = 'Springe zum Seitenanfang';
        Hasenschuh.src             = 'https://images.wikia.nocookie.net/__cb20140310140140/thewalkingdeadtv/de/images/f/f0/Hasenschuh_rechts_gedreht.png';
        Toplink.appendChild(Hasenschuh);
      H2Elemente[i].appendChild(Toplink);
    }
}