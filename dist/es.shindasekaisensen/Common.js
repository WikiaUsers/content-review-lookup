/* A�adir botones al editar art�culo en modo normal */ if (typeof(mwCustomEditButtons) != 'undefined') { mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile" : "http://images1.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1", "speedTip" : "Proponer el art�culo para ser borrado", "tagOpen" : "\{\{borrar|", "tagClose" : "\}\}", "sampleText": "Motivo"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile" : "http://upload.wikimedia.org/wikipedia/commons/e/ec/Button_aviso.png?1", "speedTip" : "Aviso de art�culo/archivo/blog inadecuado", "tagOpen" : '{{Wikiacentral\n', "tagClose" : "\n}}", "sampleText": "|Nombre del art�culo/archivo/blog que ser� borrado"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile" : "http://images3.wikia.nocookie.net/es/images/8/8c/Bot%C3%B3n_wiki.png?1", "speedTip" : "Insertar Plantilla Wiki", "tagOpen" : "\{\{Wiki\r| logo = ", "tagClose" : "\r| descripci�n = \r| fundado = \r| fundador = \r| nombre_solicitado = \r| estado = \r\}\}", "sampleText": ""}; }
}
// **************************************************
// Bloqueo de comentarios para los blogs que no
// hayan sido comentados en m�s de 30 d�as
// Por: [[User:Joeyaa|Joey Ahmadi]]
// Traducci�n al espa�ol: [[User:Bola|Bola]]
// **************************************************
 
$(function() {
if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
var then = $('#article-comments-ul > .article-comments-li:first .permalink').attr('href');
then = new String(then.match(/\d{8}/));
var monthnames = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
var year = then.match(/^\d{4}/);
var month = then.substring(4,6); 
month--;
month= monthnames[month];
var day = then.match(/\d{2}$/);
then = new Date(month+''+day+', '+year); 
var old = parseInt(now - then);
old = Math.floor(old/(1000*60*60*24));
if (old > 30) {
$('#article-comm').attr('disabled','disabled').text('Esta entrada de blog no ha sido comentada en los �ltimos 30 d�as, por lo que no es necesario a�adir nuevos comentarios.');
$('#article-comm-submit').attr('disabled','disabled');
$('.article-comm-reply').remove();
}
}
});