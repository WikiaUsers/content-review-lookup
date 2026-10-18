/**
 * Description: OpenStreetMap embedded inside articles
 * Maintainers: [[User:Haros]]
 * Note: this script uses text strings that must be passed as global variables
 */
mw.config.set( 'osm_proj_map', 'kart' ); //"map" in project language
mw.config.set( 'osm_proj_lang', 'no' );  //project language
mw.loader.load( 'https://meta.wikimedia.org/w/index.php?title=MediaWiki:OSM.js&action=raw&ctype=text/javascript' );