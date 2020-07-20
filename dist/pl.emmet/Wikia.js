/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

// Zmiana teł w zależności od pory dnia
 
$(function () {
	var d = new Date();
	if (d.getHours() < 5) {
		document.body.className += ' BG1';
		document.getElementById('WikiaPage').className += ' BG1-page';
	} else if (d.getHours() < 18) {
		document.body.className += ' BG2';
		document.getElementById('WikiaPage').className += ' BG2-page';
	} else if (d.getHours() < 22) {
		document.body.className += ' BG3';
		document.getElementById('WikiaPage').className += ' BG3-page';
	} else if (d.getHours() < 5) {
});
 
$('#WikiaPageBackground').append('<div class="WikiaPageBackgroundSub" id="WikiaPageBackgroundSub"></div>');