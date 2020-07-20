/* -------------------------------------------------------------- */
// Variables for later on
// Keep these in an object for organization
var _neuesKapitel_tr = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage')
};

// fallback: hole posttime falls beim posten nicht geholt wird 
importScriptPage('MediaWiki:Posttime.js', 'de.fanfictions');

var geschichte = '';
var letztes_kapitel = '';
var endung = '';

$('.vorlage-kapitel-link .CategoryTreeSection:last-child .CategoryTreeLabel').each(function(letztes_kapitel) {

var letztes_kapitel = $(this).text();

if (letztes_kapitel) {
/* wenn keine zahlen erkannt wurden */
var endung = 0;

} else {

var endung = 1;

}

//alert(letztes_kapitel);

$(this).parent().parent().after('<div class="neues-kapitel-button"><button data-geschichte="' + letztes_kapitel + '"  class="neues-kapitel-button-erstellen">+ Neues Kapitel hinzufügen</button></div>');

});

$(document).ready(function() {
	$('.neues-kapitel-button-erstellen').click(function() {

		var geschichte = $(this).attr('data-geschichte');

		if (geschichte.match(/\/\d+/) == null) { 
		
		//alert('Du kannst diese Funktion nur verwenden, wenn deine Kapitelnamen aus Nummern bestehen.');  
		
		$('.neues-kapitel-button-erstellen').fadeOut();
		$('.neues-kapitel-button').append('Name des neuen Kapitels: <input id="neues-kapitel-name" /> <button id="neues-kapitel-name-erstellen">Erstellen</button>');
		
		
		$('#neues-kapitel-name-erstellen').click(function() {
		
			var geschichte_kapitel = $('#neues-kapitel-name').val();
			
			var neues_kapitel = wgPageName + "/" + geschichte_kapitel;
			
			var kategorien = "[[Kategorie:Autor - " + wgUserName + "]]";
			
			var page = "{{Geschichtenbalken}}\n\n\Das neue Kapitel von " + geschichte.replace(/\/\.*/, '') + " entsteht hier im Moment!\n\n{{Bearbeiter}}" + kategorien;
			
			//alert(neues_kapitel);
			
			var url = _neuesKapitel_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(neues_kapitel) + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(_neuesKapitel_tr.edittoken) + '&summary=Neues Kapitel angelegt' + isBot;
			
			$.post(url, function() {
				window.location = "http://de.fanfictions.wikia.com/wiki/" + neues_kapitel + "?newchapter=1";
			});
			
		});
		
		} else if (geschichte.match(/\/\d+/) !== null) {

		//alert(geschichte);
		
		if (geschichte.replace(/.*\//, '').match(/\d+/) == null) {
/* das passiert, wenn das ende keine zahlenkette ist - /Kapitelname */

			alert('Du kannst diese Funktion nur verwenden, wenn deine Kapitelnamen aus Nummern bestehen.');
		
		} else {
/* das passiert, wenn das ende eine zahlenkette ist - /00123 */
			var geschichte_kapitel = parseInt(geschichte.replace(/.*\//, '')) + 1;
			
			var neues_kapitel = geschichte.replace(/\/\d+/, '') + "/" + ("0000" + geschichte_kapitel).substr(-3, 3);

			var kategorien = "[[Kategorie:Autor - " + wgUserName + "]]";
			
			var page = "{{Geschichtenbalken}}\n\n\Das neue Kapitel von " + geschichte.replace(/\/\d+/, '') + " entsteht hier im Moment!\n\n{{Bearbeiter}}" + kategorien;
			
			//alert(neues_kapitel);
			
			var url = _neuesKapitel_tr.server + '/api.php?action=edit&title=Geschichte:' + encodeURIComponent(neues_kapitel) + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(_neuesKapitel_tr.edittoken) + '&summary=Neues Kapitel angelegt' + isBot;
			
			$.post(url, function() {
				window.location = "http://de.fanfictions.wikia.com/wiki/Geschichte:" + neues_kapitel + "?newchapter=1";
			});

/* status-url aktualisieren? 
setStatusUrl = _neuesKapitel_tr.server + '/api.php?action=edit&title=' + encodeURIComponent(vorlagenOrt) + '&text=' + encodeURIComponent("neu") + '&token=' + encodeURIComponent(_neuesKapitel_tr.edittoken) + '&summary=Neues Kapitel hinzugefügt';
*/
		}

	}
	
	});
});