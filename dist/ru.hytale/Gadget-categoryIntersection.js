$(function() {
	var links = $("#catlinks ul a");
	if (links.length <= 1) return;
	links.before('<input type="checkbox" checked="checked" class="intersect-checkbox" />');
	$("#catlinks ul").last().append('<li class="intersect-item" style="float:right;vertical-align:bottom"><button type="button" id="intersect-button">Найти похожие страницы</button></li>');
	mw.util.addCSS('#catlinks li.intersect-item {border-left: none}');
	$("#intersect-button").click(function() {
		var outList = "", outCount = 0;
		$("#catlinks .intersect-checkbox:checked + a").each(function() {
			outList += (outCount++ ? '::' : '') + $(this).text();
		});
		if (outCount == 0) {
			alert("Вы должны выбрать хотя бы одну категорию, чтобы найти похожие страницы.");
			return;
		} else if (outCount == 1) {
			window.location = mw.util.getUrl('Категория:' + outList);
		} else {
			window.location = mw.util.getUrl('Пересечение:' + outList);
		}
		$(this).text("Перенаправление...");
	});
});