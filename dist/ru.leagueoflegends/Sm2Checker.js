mw.hook("wikipage.content").add(listArticlesWithSm2Error);

/**
 * Данная функция срабатывает, если на странице есть блок div с классом "check-sm2-audio"
 * Показывает статьи, где присутствуют ошибки файлов, вызываемых тегом sm2 Шаблон:Фч)
 * Не отслеживает ошибки скриптов Lua
 */ 
function listArticlesWithSm2Error() {
	var api = new mw.Api();
	var categories = [13973, 42224, 14484];
	$("div.check-sm2-audio").text("Список статей с ошибками аудиофайлов директивы sm2:");
	if($("div.check-sm2-audio").length > 0) {
		categories.forEach(function(cat) {
			api.get({
				action: "query", 
				generator: "categorymembers",
				gcmpageid: cat,
				gcmlimit: 500,
				format: "json",
				gcmprop: "ids"
			}).done(fetchPagesById);
		})
	}
	
	/**
	 * Извлекает необработанный HTML-код статьи (только основного содержимого статьи)
	 */ 
	function fetchPagesById(data) {
		var pagesIdList = data.query.pages;
		for(var e in pagesIdList) {
			var pageId = pagesIdList[e].pageid;
			api.get({
				action: "parse", 
				pageid: pageId,
				format: "json",
				prop: "text"
			}).done(checkText);
		}
	}
	
	/**
	 * Извлекает текст-строку и передает её на проверку регексом.
	 * Если найдено совпадение атрибутов ошибки sm2, то добавляет название страницы
	 * в div.
	 */ 
	function checkText(data) {
		var text = data.parse.text["*"];
		if(hasAudioTemplateError(text)) {
			$("div.check-sm2-audio").append("<br />" + data.parse.title);
		}
	}
	/**
	 * Регекс для поиска атрибутов ошибки sm2
	 */
	function hasAudioTemplateError(text) {
		var regex = /class="ext-audiobutton" data-state="error"/;
		return regex.exec(text);
	}
}