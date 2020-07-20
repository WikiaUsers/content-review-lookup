/*
 * ActivityRefresh
 * Napisane przez Py64
 * Data utworzenia: 17.10.2014r. 18:44
 * Przeładuj stronę aktywności na wiki co określony czas
*/
var refreshAfter = 60; // czas w sekundach
var autorefreshMsg = 'Autoodświeżenie za';
var remainingTime=refreshAfter;

$(document).ready(function(){ // wykonaj po załadowaniu dokumentu
if($('.mw-special-WikiActivity').length > 0) { // sprawdź, czy strona jest WikiActivity
if($('.mw-special-WikiActivity .activity-nav').length > 0) { // upewnij się
$('.activity-nav ul').append('<li><a class="nactivityrefresh">' + autorefreshMsg + ': ' + refreshAfter + '</a></li>');
startNARTimer(); // włącz licznik
}
}
});
function startNARTimer() {
setInterval(NARTick, 1000);
}
function NARTick(){
$('.activity-nav ul .nactivityrefresh').empty();
$('.activity-nav ul .nactivityrefresh').append(autorefreshMsg + ': ' + remainingTime);
if(remainingTime == 0) {
$('.activity-nav ul .nactivityrefresh').empty();
$('.activity-nav ul .nactivityrefresh').append(autorefreshMsg + ': teraz');
location.reload();
}
if(remainingTime < 0) {
$('.activity-nav ul .nactivityrefresh').empty();
$('.activity-nav ul .nactivityrefresh').append(autorefreshMsg + ': teraz');
}
remainingTime--;
}