/* Añadir botones al editar artículo en modo normal */ if (typeof(mwCustomEditButtons) != 'undefined') { mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile" : "http://images1.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1", "speedTip" : "Proponer el artículo para ser borrado", "tagOpen" : "\{\{borrar|", "tagClose" : "\}\}", "sampleText": "Motivo"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile" : "http://upload.wikimedia.org/wikipedia/commons/e/ec/Button_aviso.png?1", "speedTip" : "Aviso de artículo/archivo/blog inadecuado", "tagOpen" : '{{Wikiacentral\n', "tagClose" : "\n}}", "sampleText": "|Nombre del artículo/archivo/blog que será borrado"}; mwCustomEditButtons[mwCustomEditButtons.length] = { "imageFile" : "http://images3.wikia.nocookie.net/es/images/8/8c/Bot%C3%B3n_wiki.png?1", "speedTip" : "Insertar Plantilla Wiki", "tagOpen" : "\{\{Wiki\r| logo = ", "tagClose" : "\r| descripción = \r| fundado = \r| fundador = \r| nombre_solicitado = \r| estado = \r\}\}", "sampleText": ""}; }
}
// **************************************************
// Bloqueo de comentarios para los blogs que no
// hayan sido comentados en más de 30 días
// Por: [[User:Joeyaa|Joey Ahmadi]]
// Traducción al español: [[User:Bola|Bola]]
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
$('#article-comm').attr('disabled','disabled').text('Esta entrada de blog no ha sido comentada en los últimos 30 días, por lo que no es necesario añadir nuevos comentarios.');
$('#article-comm-submit').attr('disabled','disabled');
$('.article-comm-reply').remove();
}
}
});