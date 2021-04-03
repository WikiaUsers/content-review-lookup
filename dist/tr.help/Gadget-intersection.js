$(function() {
	var links = $("#catlinks ul a");
	if (links.length <= 1) return;
	links.before('<input type="checkbox" checked="checked" class="intersect-checkbox" />');
	$("#catlinks ul").last().append('<li class="intersect-item"><button type="button" id="intersect-button">Benzer sayfaları bul</button></li>');
	mw.util.addCSS('#catlinks li.intersect-item {border-left: none}');
	$("#intersect-button").click(function() {
		var outList = "", outCount = 0;
		$("#catlinks .intersect-checkbox:checked + a").each(function() {
			outList += (outCount++ ? '::' : '') + $(this).text();
		});
		if (outCount == 0) {
			alert("Benzer sayfaları bulmak için en az bir kategori seçmelisiniz.");
			return;
		} else if (outCount == 1) {
			window.location = mw.util.getUrl('Kategori:' + outList);
		} else {
			window.location = mw.util.getUrl('Kesişim:' + outList);
		}
		$(this).text("Yönlendiriliyor...");
	});
});