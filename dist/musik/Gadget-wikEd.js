 // Gadget: Editor wikEd ([[w:en:User:Cacycle/wikEd]])
 
var enBase = 'http://en.wikipedia.org';
if ( mw.config.get( 'wgServer' ).indexOf('https://') === 0 ) {
        enBase = 'https://secure.wikimedia.org/wikipedia/en';
}
mw.loader.load( enBase + '/w/index.php?title=User:Cacycle/wikEd.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400' );