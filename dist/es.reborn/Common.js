if (mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload') { 
$(function() { 
importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js'); 
}); 
}

/*****************/
/* NOMBREUSUARIO */
/*****************/
 
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);