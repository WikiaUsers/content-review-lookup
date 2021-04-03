// Backgrounds (src: w:c:pl.dreamworks)
 
$(function() {
if($('#dostosujTlo').length > 0) {
var cl = $($('#dostosujTlo').get(0)).data('bg');
if(cl) {
cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
$(document.body).addClass('tlo-' + cl);
}
}
});

/* Podgląd linków */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = '';