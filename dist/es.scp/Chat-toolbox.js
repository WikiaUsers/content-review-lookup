@import
$(function() {
// Sonidos de notificaci�n
$('.sonidonotificacion a').append(' <span style="color:red;">[OFF]
</span>');
$('#ChatHeader').append('<audio id="notificacion" preload="auto">
<source 
src="https://images.wikia.nocookie.net/pruebasbf10/es/images/0/01/Notification.ogg">
</source></audio>');
$('.sonidonotificacion').click(function() {
if($('.sonidonotificacion a').text() == "Sonidos de notificaci�n 
[OFF]") {
$('.sonidonotificacion a').html('Sonidos de notificaci�n <span 
style="color:lime;">[ON]</span>');
} else {
$('.sonidonotificacion a').html('Sonidos de notificaci�n <span 
style="color:red;">[OFF]</span>');

'.Chat ul').bind('DOMNodeInserted', function(event) {
$('.sonidonotificacion a').text() == "Sonidos de notificaci�n 
]") {
"#notificacion")[0].play();