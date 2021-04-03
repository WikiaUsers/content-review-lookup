mw.loader.using(['site']).done(function() {
	if (mw.config.get("wgCanonicalNamespace") !== "Special") {
		$(mw.util.addPortletLink('p-cactions', 'javascript:;', "Нуль-правка", 'ca-null-edit', "Обновить страницу нулевой правкой", '2')).click(function() {
			if (!confirm("Страница будет перезагружена. Агась?")) return;
			new mw.Api().postWithToken('csrf',{action:"edit",title:mw.config.get("wgPageName"),appendtext:""}).done(function(data){
				location.reload();
			}).fail(function(code, data){
				alert("Нулевая правка не случилась. Причина: " + code);
			});
		});
	}
});