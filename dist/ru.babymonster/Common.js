/* Выбор лицензирования добросовестного использования по умолчанию в Special:Upload */
$(document).on("submit", function(e) {
	if (e.target.id == "mw-upload-form") {
		$(e.target).find('[name="wpLicense"] [value=""]:not([disabled])').attr("value", "Fairuse");
	}
});
/* Конец лицензирования */