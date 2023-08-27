/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/** Кастомное подчеркивание у h2 **/
$(function() {
	$(".page").find("h2:has(.mw-headline)").wrapInner('<div class="h2-content" />');
});

/** Кнопки и сворачивание **/
/*** Нормальное сворачивание для Шаблон:Световые конусы по категории Таблица ***/
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
/*** Симуляция сортировки используя сворачивание в одну кнопку ***/
mw.loader.using(['mediawiki.util', 'mediawiki.api'], function() {
    $(".sort__btn").click(function() {
		$(".ascending").toggleClass("collapsed");
		$(".descending").toggleClass("collapsed");
		if($(".ascending").hasClass("collapsed")){
			$(".sort__btn img").attr({
				src: "https://static.wikia.nocookie.net/honkai-star-rail/images/6/69/UI_%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%A1%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0_%D0%92%D0%B2%D0%B5%D1%80%D1%85.png/revision/latest?cb=20230821152822&format=original&path-prefix=ru",
				alt: "Сортировка вверх"
			});
		};
		if($(".descending").hasClass("collapsed")){
			$(".sort__btn img").attr({
				src: "https://static.wikia.nocookie.net/honkai-star-rail/images/a/a5/UI_%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%A1%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0_%D0%92%D0%BD%D0%B8%D0%B7.png/revision/latest?cb=20230821152912&format=original&path-prefix=ru",
				alt: "Сортировка вниз"
			});
		};
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