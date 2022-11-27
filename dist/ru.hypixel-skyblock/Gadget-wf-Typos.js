/*
* Дополнение к викификатору для проверки правописания 
*/

if (mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit')	{
		mw.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-wfTypos.js&action=raw&ctype=text/javascript' );
	}