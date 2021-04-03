/*********************************************************.
|*            Facebook kurz vor Seitenzähler              |
|*********************************************************|
|  FaceBook-Routine (Platziert FB-Like-Button vor Zähler) |
'--------------------------------------------------------*/
var ArtikelUeberschrift = document.getElementById("WikiaPageHeader");  
if (ArtikelUeberschrift != null)
{
  for ( anz=0; anz<ArtikelUeberschrift.childNodes.length; anz++ )
  {
    if (ArtikelUeberschrift.childNodes[anz].className == "tally")
    {
      var FBbutton = document.createElement("fb:like");

      var FBDatenSenden = document.createAttribute("data-send");
      var FBDatenLayout = document.createAttribute("data-layout");
      var FBDatenGesichter = document.createAttribute("data-show-faces");
      var FBDatenFarbschema = document.createAttribute("data-colorscheme");
      var FBPosition = document.createAttribute("position");
  
      FBDatenSenden.nodeValue = "true";
      FBDatenLayout.nodeValue = "button_count";
      FBDatenGesichter.nodeValue = "false";
      FBDatenFarbschema.nodeValue = "dark";
  
      FBbutton.setAttributeNode(FBDatenSenden);
      FBbutton.setAttributeNode(FBDatenLayout);
      FBbutton.setAttributeNode(FBDatenGesichter);
      FBbutton.setAttributeNode(FBDatenFarbschema);
  
      FBbutton.className = "fb-like";
      FBbutton.style.margin = "2px 0px 0px 0px";
      FBbutton.style.position = "absolute";
      ArtikelUeberschrift.insertBefore(FBbutton, ArtikelUeberschrift.childNodes[anz]);    
      break;
    }
  }
}
/*--------------------------------------------------------.
|  FaceBook-Routine (setzt Code von FB)                   |
'--------------------------------------------------------*/
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/de_DE/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));