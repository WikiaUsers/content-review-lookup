/* Скопирован из английского раздела Terraria Wiki: https://terraria.gamepedia.com/MediaWiki:Gadget-nulledit.js
   Автор ReedemtheD3ad: https://terraria.gamepedia.com/User:ReedemtheD3ad */
mw.loader.using(['site']).done(function() {
	$(mw.util.addPortletLink('p-cactions', 'javascript:;', "Нулевая правка", 'ca-null-edit', "Совершить нулевую правку на этой странице", '2')).click(function() {
		if (!confirm("Это действие перезагрузит страницу. Продолжить?")) return;
		new mw.Api().postWithToken('csrf',{action:"edit",title:mw.config.get("wgPageName"),appendtext:""}).done(function(data){
			location.reload();
		}).fail(function(code, data){
			alert("Невозможно совершить нулевую правку. Причина: " + code);
		});
	});
});