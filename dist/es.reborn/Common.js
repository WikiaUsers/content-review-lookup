if (mw.config.get('wgCanonicalSpecialPageName', '') == 'Upload') { 
$(function() { 
importScript('MediaWiki:Common.js/Clases/Gadget-HotCat.js'); 
}); 
}

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Líder Vongola', link:'Project:Administradores' },
		inactive: { u: 'No ha editado recientemente' }
	}
};

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