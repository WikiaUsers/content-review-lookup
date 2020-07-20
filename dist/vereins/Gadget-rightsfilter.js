/*
 Importiert die aktuelle Version des Gadgets Rightsfilter von Commons.
 Ermöglicht eine Filterung von Spezial:Log mit regulären Ausdrücken.
*/
var commonsBase = 'http://commons.wikimedia.org';
if ( mw.config.get( 'wgServer' ).indexOf('https://') === 0 ) {
        commonsBase = 'https://secure.wikimedia.org/wikipedia/commons';
}
mw.loader.load( commonsBase + '/w/index.php?title=MediaWiki:Gadget-rightsfilter.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400' );