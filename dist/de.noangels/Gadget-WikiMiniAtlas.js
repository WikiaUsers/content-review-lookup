/**
 * WikiMiniAtlas is a popup click and drag world map.
 * See [[meta:WikiMiniAtlas]] for more information. 
 * Maintainers: [[w:User:Dschwen]]
 */
var metaBase = 'http://meta.wikimedia.org';
if ( mw.config.get( 'wgServer' ).indexOf('https://') === 0 ) {
        metaBase = 'https://secure.wikimedia.org/wikipedia/meta';
}
mw.loader.load( metaBase + '/w/index.php?title=MediaWiki:Wikiminiatlas.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400' );