/* Das folgende JavaScript wird für alle Benutzer geladen. */
jQuery( document ).ready( function( $ ) {
if(document.getElementById("Article")!=null){
window.location.href = "http://actors.fandom.com/de/wiki/" + document.getElementById("Article").innerHTML;
}
} );