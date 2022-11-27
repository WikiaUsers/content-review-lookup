/*
** Викификатор взятый с оффециальной вики Minecraft
*/
if ( mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit' ) {
		mw.loader.load('https://minecraft.fandom.com/ru/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
		console.log('MediaWiki:Gadget-wikificator.js — Wikificator went to load');
	}