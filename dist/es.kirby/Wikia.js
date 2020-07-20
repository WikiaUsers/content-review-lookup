// Etiqueta para usuarios inactivos por mas de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
 
/******************************************************************
 *** Wikis aliados en el footer
 *** Basado en el código de [[User:Benfutbol10]]
 *** El estilo de este código está en MediaWiki:Wikia.css
 *******************************************************************/

$(function(){
    $('#WikiaFooter').prepend('<section id="wikisAliados"><div class="header-container"><h1>Comunidades aliadas</h1></div><ul></ul></section>');
        // Super Mario Wiki
        $('#wikisAliados ul').append('<li id="marioWiki"><a href="http://es.mario.wikia.com" title="Super Mario Wiki"><img src="https://vignette.wikia.nocookie.net/mario/images/8/89/Wiki-wordmark.png/revision/latest?cb=20141219035035&path-prefix=es" alt="Super Mario Wiki" /></a></li>');
        // SmashPedia
        $('#wikisAliados ul').append('<li id="smashWiki"><a href="http://es.ssb.wikia.com" title="SmashPedia"><img src="https://vignette.wikia.nocookie.net/ssbb/images/8/89/Wiki-wordmark.png/revision/latest?cb=20150102001203&path-prefix=es" /></a></li>');
        // Sonic Wiki
        $('#wikisAliados ul').append('<li id="sonicWiki"><a href="http://es.sonic.wikia.com" title="Sonic Wiki"><img src="https://vignette.wikia.nocookie.net/sonic/images/8/89/Wiki-wordmark.png/revision/latest?cb=20150102001203&path-prefix=es" /></a></li>');
        // Zelda Wiki
        $('#wikisAliados ul').append('<li id="zeldaWiki"><a href="http://es.zelda.wikia.com" title="Zelda Wiki"><img src="https://vignette.wikia.nocookie.net/zelda/images/8/89/Wiki-wordmark.png/revision/latest?cb=20170301051759&path-prefix=es" /></a></li>');
        // Nintendo Wiki
        $('#wikisAliados ul').append('<li id="nintendoWiki"><a href="http://es.nintendo.wikia.com" title="Nintendo Wiki"><img src="https://vignette.wikia.nocookie.net/nintendo/images/8/89/Wiki-wordmark.png/revision/latest?cb=20170108012140&path-prefix=es" /></a></li>');
        // Animal Crossing
        $('#wikisAliados ul').append('<li id="animalWiki"><a href="http://es.animalcrossing.wikia.com" title="Animal Crossing Enciclopedia"><img src="https://vignette.wikia.nocookie.net/animalcrossing/images/8/89/Wiki-wordmark.png/revision/latest?cb=20120828214038&path-prefix=es" /></a></li>');
        // Metroidover
        $('#wikisAliados ul').append('<li id="metroidOver"><a href="http://es.metroid.wikia.com" title="Metroidover"><img src="https://vignette.wikia.nocookie.net/metroid/images/8/89/Wiki-wordmark.png/revision/latest?cb=20150719111605&format=original&path-prefix=es" /></a></li>');
});

/**** Aviso de licencias ****/

$(function(){
	var texto = '<table style="border:2px solid #8B0000; background:#FFB6C1;" cellspacing="0">\
<tbody><tr>\
<td style="padding: 0.3em 2em; background:#FFB6C1;">\
<p>Las imágenes de Nintendo no nos pertenecen. Por eso las licencias nos ayudan a indicar el tipo de imagen y a quien pertenece (quien posee su copyright). Son muy importantes. <b>Ten en cuenta que si es de Kirby, la imagen no podrá ser libre, por eso siempre tendrás que recurrir a las licencias de imágenes con copyrights.</b>\
</p>\
</td></tr></tbody></table>';
	if({ edit:1, submit:1 }[mw.config.get('wgAction')]) {
		WikiaEditor.load("WikiaMiniUpload").done(function() {
			var _texto = WMU_indicator;
			WMU_indicator = function(arg1, arg2) {
				_texto.call(this, arg1, arg2);
				if(arg1 === 1 && !arg2) {
					var element = $("#ImageUploadMain");
					if(element.html()) element.html(element.html() + texto);
				}
			};
		});
	}
});