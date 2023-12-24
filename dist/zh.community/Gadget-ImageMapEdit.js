/* 
 * @name ImageMapEdit
 * @author User:Dapete in https://meta.wikimedia.org
 * @source https://meta.wikimedia.org/wiki/User:Dapete/ImageMapEdit
 */
if (
	mw.config.get( 'wgNamespaceNumber' ) == 6 &&
	mw.config.get( 'wgAction' ) == 'view'
) {
	mw.loader.load( 'https://imagemapedit.toolforge.org/ime.js' );
}