/**
 * Certified icon V1.0 Wiki JPop Spanish
 * Plugin script con el que se indica que un contenido de Wiki JPop está verificado
 * y por lo tanto la confiabilidad del mismo es del 98% al 100%.
 * Este se complementa con CSS3 en MediaWiki:Wikia.css con el fin de que
 * solo los revisores correspondientes puedan certificar el contenido.
 */
function cVerified() {
	if ($('#WikiaPageHeader').length) {
        $('#WikiaPageHeader h1').after('<a class="cverified left-tip" data-tips="Contenido verificado" href="http://es.jpop.wikia.com/wiki/Wiki_J-Pop:Contenido_verificado"><span class="fa fa-check-circle"></span></a>');;
	}
}
$(cVerified);