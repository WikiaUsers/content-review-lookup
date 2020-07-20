/** Para UploadInPage **/
window.needsLicense = true;

/** No permitir que suban archivos en Special:Images **/
function especialUpload () {
	$('#page-header-add-new-photo').click(function() {
		window.location.replace('/wiki/Special:Upload');
	});
}
if (wgCanonicalSpecialPageName == "Images") {$(especialUpload);}

/* Código para l plantilla USERNAME */ 

/* Code by Seaside98 - Displays timer - Special thanks to Runescape wiki */
var refreshDate;
 
function addDate() {
    var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
    $('#showdate').empty().attr('title','Hora de tiempo universal coordinado').attr('style','text-decoration:none !important;').attr('href',window.location.href + '?action=purge').html(UTCDate.substring(5));
    window.clearTimeout(refreshDate);
    refreshDate = window.setTimeout(addDate, 1000);
}
 
/* Añadir botón para editar el mensaje de bienvenida del muro */
 
window.ajaxPages = ["Especial:CambiosRecientes","Especial:Seguimiento","Especial:Registro","Especial:Contribuciones","Especial:WikiActivity"];
window.AjaxRCRefreshText = 'Actualizar automáticamente';
window.AjaxRCRefreshHoverText = 'Automáticamente refresca la página';
window.ajaxindicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';

if (mw.config.get('skin') != 'oasis') { // The code works in other wikis, so is unnecessary to create the page here too
    importScriptPage('MediaWiki:Common.js/Categories.js', 'es.kirby');
}

/** A veces si buscamos por alguna razón no nos sugiere nada **/
$(function() {
	if (!mw.config.get('wgMWSuggestTemplate') && mw.loader.getVersion('mediawiki.legacy.mwsuggest')) {
		mw.config.set('wgMWSuggestTemplate', mw.util.wikiScript('api') + '?action=opensearch&search={searchTerms}&namespace={namespaces}&suggest');
		mw.config.set('wgSearchNamespaces', [0, 6, 10, 14, 110]);
		importScriptURI(mw.config.get('stylepath') + '/common/mwsuggest.js');
		window.setTimeout(function() {
			if (window.os_MWSuggestInit) {
				window.os_MWSuggestInit();
			}
		}, 1000);
	}
});

/** Para que el "editar sección" se vea mejor (monobook) **/
function moveEditSection(){
	if (window.oldEditsectionLinks) return;
	$('span.editsection').each(function() {
		var $span = $(this), h = $span.closest('h1,h2,h3,h4,h5,h6');
		if (h.length) {
			$span.addClass('editsection-nf').appendTo(h);
		}
	});
}
if (mw.config.get('skin') != 'oasis') {
	$(moveEditSection);
}

/** Link Preview **/
window.pPreview = {
	noimage: 'https://vignette.wikia.nocookie.net/mario/images/7/7c/Toad_detective.png/revision/latest?cb=20171123025303&path-prefix=es',
	RegExp: {
		ilinks: [/catego.*?:.*?/gim] // Ignorar categorías
	}
}