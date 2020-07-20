importArticles({ type: "script", articles: ["MediaWiki:PopUp"] });
function PopUp() {
  $(PopUp).appendTo($('header#WikiaPageHeader'));
 
  $('#close').click(function () {
    $('#PopUp').remove();					// sofortiges Löschen der Box
  });
}
document.getElementById('PopUpDIV').onclick = function(){ PopUp(); };