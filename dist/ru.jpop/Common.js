var Start = 0;

/* Credit to J-pop Wiki */
/* Раскрытый раздел категорий по умолчанию */
$(function() {
    $('.page-footer__categories.wds-is-collapsed').removeClass('wds-is-collapsed');
});
/* Конец раздела категорий */

/* Выбор лицензирования добросовестного использования по умолчанию в Special:Upload */
$(document).on("submit", function(e) {
	if (e.target.id == "mw-upload-form") {
		$(e.target).find('[name="wpLicense"] [value=""]:not([disabled])').attr("value", "Fairuse");
	}
});
/* Конец лицензирования */