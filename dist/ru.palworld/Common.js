/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/** Оригинал: Minecraft Wiki **/
/** Автоматически выставляет "Без лицензии", если лицензию не указывать (так можно проверять изображения в категории) **/
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Upload' ) {
	var $license = $( '#wpLicense' );
	if ( $license.length ) {
		if ( $license.val() === '' ) {
			$license.val( 'Без лицензии' );
		}
		
		mw.loader.using( 'mediawiki.special.upload', function() {
			$license.change();
		} );
	}
}