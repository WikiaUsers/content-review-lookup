/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/** Кастомное подчеркивание у h2 **/
$(function() {
	$(".page").find("h2:has(.mw-headline)").wrapInner('<div class="h2-content" />');
});

/** Нормальное сворачивание для Шаблон:Световые конусы по категории Таблица **/
mw.loader.using(['mediawiki.util', 'mediawiki.api'], function() {
    $(".lightcone-table-buttons .mw-customtoggle-lightcone-passive").click(function() {
	if($(".lightcone-table #mw-customcollapsible-lightcone-passive").hasClass("mw-collapsed")){
		$(".lightcone-table #mw-customcollapsible-lightcone-description").attr("colspan", 3);
	} else {
		$(".lightcone-table #mw-customcollapsible-lightcone-description").attr("colspan", 5);
	}
    });
    $(".lightcone-table-buttons .mw-customtoggle-lightcone-description").click(function() {
	if($(".lightcone-table #mw-customcollapsible-lightcone-description").hasClass("mw-collapsed")){
		$(".lightcone-table #mw-customcollapsible-lightcone-passive").attr("colspan", 2);
	} else {
		$(".lightcone-table #mw-customcollapsible-lightcone-passive").attr("colspan", 5);
	}
    });
});

/** Взято с Minecraft Wiki **/
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