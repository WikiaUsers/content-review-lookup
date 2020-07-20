// <nowiki>
/*********************************************************************
**                ***WARNING: GLOBAL GADGET FILE***                 **
**         any changes to this file will affect many users          **
**          please discuss changes on the talk page or at           **
**             [[Wikipedia talk:Gadget]] before editing             **
**     (consider dropping the script author a note as well...)      **
**                                                                  **
**********************************************************************
**             Script:        MoreMenu                              **
**             Author:        MusikAnimal, Haza-w                   **
**      Documentation:        [[User:MusikAnimal/MoreMenu]]         **
**                                                                  **
*********************************************************************/

(function(){
	if(mw.config.get( 'skin' ) === "vector") {
		mw.loader.load( '//en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=MediaWiki:Gadget-MoreMenu-core.js' );
	} else {
		mw.loader.load( '//en.wikipedia.org/w/index.php?action=raw&ctype=text/javascript&title=MediaWiki:Gadget-dropdown-menus.js' );
		mw.loader.load( '//en.wikipedia.org/w/index.php?action=raw&ctype=text/css&title=MediaWiki:Gadget-dropdown-menus.css', 'text/css' );
	}
})();
// </nowiki>