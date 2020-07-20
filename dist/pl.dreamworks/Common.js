/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/*Tła*/
$(function() {
if($('#dostosujTlo').length > 0) {
var cl = $($('#dostosujTlo').get(0)).data('bg');
if(cl) {
cl = cl.replace(/[^0-9a-ząćęęłńóśźż]+/ig, '_');
$(document.body).addClass('tlo-' + cl);
}
}
});