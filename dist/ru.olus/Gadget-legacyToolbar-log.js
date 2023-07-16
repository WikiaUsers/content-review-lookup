if ( mw.config.get( 'wgAction' ) == 'edit' || mw.config.get( 'wgAction' ) == 'submit' ) {
		mw.loader.load('https://minecraft.fandom.com/ru/index.php?title=MediaWiki:Gadget-legacyToolbar.js&action=raw&ctype=text/javascript');
		console.log ('MediaWiki:Gadget-legacyToolbar-log.js — loaded');
		}