window.hotcat_translations_from_commons = true;
 
/*
 This imports the latest version of HotCat from Commons.
 HotCat is a gadget to make changes to categories much easier.
 Full documentation can be found at http://commons.wikimedia.org/wiki/Help:Gadget-HotCat
*/
if ( mw.config.get( 'wgServer' ).indexOf('https://') == 0 ) {
        mw.loader.load( 'https://secure.wikimedia.org/wikipedia/commons/w/index.php?title=MediaWiki:Gadget-HotCat.js&action=raw&ctype=text/javascript' );
} else {
        mw.loader.load( 'http://commons.wikimedia.org/w/index.php?title=MediaWiki:Gadget-HotCat.js&action=raw&ctype=text/javascript' );