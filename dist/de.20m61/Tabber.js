var findallURL = document.getElementById('WikiaMainContent').getElementsByTagName("a");
for (var i=0; i < findallURL.length; i++) {
  if (findallURL[i].href.search('#') >= 0) {
    findallURL[i].onclick = function(){ OpenTabber(this); }; 
  }
}
 
function OpenTabber(LinkObjekt) { 
  var Sprungmarke = '';

  if (!LinkObjekt)          Sprungmarke = window.location.hash.slice(1);
  else if (LinkObjekt.href) Sprungmarke = LinkObjekt.href.slice(LinkObjekt.href.search('#')*1+1);
  else                      Sprungmarke = window.location.hash.slice(1);

  var CurrentObject = document.getElementsByName(Sprungmarke)[0];
  if (!CurrentObject) CurrentObject = document.getElementById(Sprungmarke);
  if (!CurrentObject || !Sprungmarke) 
    return false;
 
  while (CurrentObject.parentNode.className != 'WikiaArticle') {
    CurrentObject = CurrentObject.parentNode;
    if (CurrentObject.className.search('tabbertab') >= 0) {
      // Ziel ist in einem Tabber (hier ist das TabberTab gefunden worden)
      var GesamtesTab = CurrentObject.parentNode.getElementsByTagName('div');
      var TabID = 0;
      for (var i=0; i < GesamtesTab.length; i++) {
        if (GesamtesTab[i] == CurrentObject) {
          TabID = i;
          GesamtesTab[i].className = 'tabbertab';
        }
        else {
          GesamtesTab[i].className = 'tabbertab tabbertabhide';        
        }
      }
      GesamtesTab = CurrentObject.parentNode.getElementsByTagName('ul')[0].getElementsByTagName('li');
      for (i=0; i < GesamtesTab.length; i++) {
        if(i== TabID) 
          GesamtesTab[i].className='tabberactive';
        else 
          GesamtesTab[i].className='';
      }
    }
  }
  return true;
}
addOnloadHook(OpenTabber);