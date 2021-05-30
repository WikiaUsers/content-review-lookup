/* JavaScript umieszony w tym pliku dotyczy wszystkich skórek */

/**
 * Import Change.js z The Elser Scrolls Wiki
 * Odpowiada za przełączanie zakładek z infoboksach
 */
importArticle( {
	type: 'script',
	article: 'u:pl.tes:MediaWiki:Change.js'
} );

/**
 * Widżet Discorda na [[Gothicpedia:Discord]]
 */
if ( mw.config.get( 'wgArticleId' ) === 133757 ) {
	const discordWidget = document.getElementById( 'discord-widget' );
	const widgetLink = document.createElement( 'a' );
	const widgetImg = document.createElement( 'img' );

	widgetLink.setAttribute( 'target', '_blank' );
	widgetLink.setAttribute( 'rel', 'nofollow' );
	widgetLink.setAttribute( 'href', 'https://discord.gg/' + discordWidget.dataset.invite );
	widgetImg.setAttribute( 'src', 'https://discord.com/api/guilds/' + discordWidget.dataset.id + '/widget.png?style=banner3' );

	widgetLink.appendChild( widgetImg );

	discordWidget.innerHTML = '';
	discordWidget.appendChild( widgetLink );
}